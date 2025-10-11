/**
 * POST /api/agent/message - Send message to agent
 * Handles validation, anti-spam, rate limiting, and n8n webhook
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerEnv, isWebhookEnabled, isMockMode } from "@/lib/server/env";
import { validateChatMessageInput } from "@/lib/server/validators";
import { checkRateLimit } from "@/lib/server/ratelimit";
import { performSpamCheck } from "@/lib/server/antiSpam";
import { logger, sanitizeForLogging } from "@/lib/server/logger";
import { sendToWebhook } from "@/lib/server/fetcher";
import { extractRealIP, hashIP } from "@/lib/server/ip";
import { generateId } from "@/lib/utils/hash";
import { sessions } from "../new/route";
import SYSTEM_PROMPT from "@/lib/agent/systemPrompt";
import type { ChatMessageRequest, ChatMessageResponse, AgentBlocks } from "@/lib/types/agent";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const route = "/api/agent/message";
  
  // Extract IP and user agent
  const realIP = extractRealIP(request);
  const ipHash = hashIP(realIP);
  const userAgent = request.headers.get("user-agent") || "unknown";
  
  try {
    // Check rate limiting
    const rateLimitResult = checkRateLimit(realIP, route);
    if (!rateLimitResult.allowed) {
      const duration = Date.now() - startTime;
      logger.warn(route, ipHash, userAgent, duration, 429, "Rate limit exceeded", {
        retryInMs: rateLimitResult.retryInMs
      });
      
      return NextResponse.json(
        {
          ok: false,
          error: "RATE_LIMITED",
          retry_in_ms: rateLimitResult.retryInMs
        } as ChatMessageResponse,
        { status: 429, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Parse JSON body
    let body: any;
    try {
      body = await request.json();
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error(route, ipHash, userAgent, duration, 415, "Invalid JSON", { error: "JSON parse error" });
      
      return NextResponse.json(
        { ok: false, error: "INVALID_INPUT" } as ChatMessageResponse,
        { status: 415, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Validate input
    const validation = validateChatMessageInput(body);
    if (!validation.isValid) {
      const duration = Date.now() - startTime;
      logger.warn(route, ipHash, userAgent, duration, 400, "Validation failed", {
        errors: validation.errors
      });
      
      const fields: { [key: string]: string } = {};
      validation.errors.forEach(error => {
        fields[error.field] = error.message;
      });
      
      return NextResponse.json(
        {
          ok: false,
          error: "INVALID_INPUT",
          fields
        } as ChatMessageResponse,
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Get session
    const session = sessions.get(body.session_id);
    if (!session) {
      const duration = Date.now() - startTime;
      logger.warn(route, ipHash, userAgent, duration, 404, "Session not found", {
        sessionId: body.session_id
      });
      
      return NextResponse.json(
        { ok: false, error: "SESSION_NOT_FOUND" } as ChatMessageResponse,
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Anti-spam check
    const spamCheck = performSpamCheck(
      body.hp_token,
      userAgent,
      body.message
    );
    
    if (spamCheck.isSpam) {
      const duration = Date.now() - startTime;
      logger.warn(route, ipHash, userAgent, duration, 422, "Spam detected", {
        reason: spamCheck.reason
      });
      
      return NextResponse.json(
        { ok: false, error: "POTENTIAL_SPAM" } as ChatMessageResponse,
        { status: 422, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Add user message to session
    const userMessage = {
      id: generateId(),
      role: "user" as const,
      content: body.message,
      timestamp: new Date().toISOString()
    };
    
    session.messages.push(userMessage);
    session.lastActivity = new Date().toISOString();

    // Prepare webhook payload
    const webhookPayload = {
      type: "agent_chat",
      session_id: body.session_id,
      message: body.message,
      context: {
        intake: session.intake,
        history: session.messages.slice(-10) // Last 10 messages for context
      },
      system_prompt: SYSTEM_PROMPT,
      meta: {
        ip: realIP,
        ua: userAgent,
        ts: new Date().toISOString(),
        page: request.headers.get("referer")
      }
    };

    // Send to webhook or mock
    const env = getServerEnv();
    const webhookUrl = env.N8N_WEBHOOK_AGENT;
    
    let responseData: ChatMessageResponse;
    
    if (isWebhookEnabled(webhookUrl)) {
      // Send to n8n webhook
      const webhookResult = await sendToWebhook(webhookUrl, webhookPayload);
      
      if (webhookResult.success) {
        const agentReply = webhookResult.data;
        
        // Handle different response formats from n8n
        const replyText = agentReply.reply || agentReply.text || agentReply.message || agentReply.analysis?.summary || "";
        
        // Add assistant message to session
        const assistantMessage = {
          id: generateId(),
          role: "assistant" as const,
          content: replyText,
          timestamp: new Date().toISOString()
        };
        
        session.messages.push(assistantMessage);
        
        responseData = {
          ok: true,
          reply: replyText,
          blocks: agentReply.blocks,
          session_id: body.session_id
        };
        
        // Log the response for debugging
        const duration = Date.now() - startTime;
        logger.info(route, ipHash, userAgent, duration, 200, "Webhook response received", {
          sessionId: body.session_id,
          responseKeys: Object.keys(agentReply),
          hasBlocks: !!agentReply.blocks,
          hasReply: !!replyText,
          replyLength: replyText.length
        });
      } else {
        const duration = Date.now() - startTime;
        logger.error(route, ipHash, userAgent, duration, 502, "Webhook failed", {
          error: webhookResult.error,
          status: webhookResult.status
        });
        
        return NextResponse.json(
          { ok: false, error: "UPSTREAM_UNAVAILABLE" } as ChatMessageResponse,
          { status: 502, headers: { "Cache-Control": "no-store" } }
        );
      }
    } else {
      // Mock mode - return sample data
      const mockReply = "بر اساس اطلاعات شما، چند پیشنهاد عملی دارم:";
      const mockBlocks: AgentBlocks = {
        summary: "پیشنهادات اولیه برای بهبود کسب‌وکار شما",
        recommendations: [
          {
            title: "پیگیری خودکار لیدها",
            goal: "افزایش تبدیل لید تا ۲۰٪",
            recipe: "Form → n8n(Webhook) → Delay 5m → Telegram API → Tag in Sheet",
            tools: ["n8n", "Google Sheets", "Telegram API"],
            est_time: "1 روز",
            impact: "H"
          },
          {
            title: "بات پاسخ‌گوی فروش",
            goal: "پاسخ‌دهی ۲۴/۷ به مشتریان",
            recipe: "Telegram → n8n(Webhook) → AI Response → Send Reply",
            tools: ["n8n", "OpenAI API", "Telegram Bot"],
            est_time: "2-3 روز",
            impact: "M"
          }
        ],
        ideas: [
          {
            title: "سرویس اشتراک ماهانه",
            revenue_model: "اشتراک ۵۰ هزار تومان ماهانه",
            first_step: "ایجاد فرم ثبت‌نام و پرداخت",
            target_channels: ["وب‌سایت", "تلگرام"]
          }
        ],
        plan_7d: [
          {
            day: 1,
            tasks: ["نقشه‌برداری جریان‌ها", "ایجاد n8n project"],
            success_criteria: "پروژه n8n آماده شد"
          },
          {
            day: 2,
            tasks: ["اتصال فرم به webhook", "تست اولیه"],
            success_criteria: "فرم به درستی کار می‌کند"
          }
        ],
        tips: ["از لینک پرداخت کوتاه زرین‌پال استفاده کنید"]
      };
      
      // Add assistant message to session
      const assistantMessage = {
        id: generateId(),
        role: "assistant" as const,
        content: mockReply,
        timestamp: new Date().toISOString()
      };
      
      session.messages.push(assistantMessage);
      
      responseData = {
        ok: true,
        reply: mockReply,
        blocks: mockBlocks,
        session_id: body.session_id
      };
      
      const duration = Date.now() - startTime;
      logger.warn(route, ipHash, userAgent, duration, 200, "Mock mode - webhook not configured", {
        sanitizedData: sanitizeForLogging(body),
        sessionId: body.session_id
      });
    }

    // Log success
    const duration = Date.now() - startTime;
    logger.info(route, ipHash, userAgent, duration, 200, "Agent message processed successfully", {
      sanitizedData: sanitizeForLogging(body),
      sessionId: body.session_id,
      messageCount: session.messages.length
    });

    return NextResponse.json(
      responseData,
      { headers: { "Cache-Control": "no-store" } }
    );

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(route, ipHash, userAgent, duration, 500, "Internal server error", {
      error: error instanceof Error ? error.message : "Unknown error"
    });
    
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" } as ChatMessageResponse,
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

// Handle other methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { 
      status: 405, 
      headers: { 
        "Allow": "POST",
        "Cache-Control": "no-store"
      } 
    }
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { 
      status: 405, 
      headers: { 
        "Allow": "POST",
        "Cache-Control": "no-store"
      } 
    }
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { 
      status: 405, 
      headers: { 
        "Allow": "POST",
        "Cache-Control": "no-store"
      } 
    }
  );
}
