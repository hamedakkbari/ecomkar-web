/**
 * POST /api/agent/new - Start new agent session
 * Handles validation, anti-spam, rate limiting, and session creation
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerEnv, isWebhookEnabled, isMockMode } from "@/lib/server/env";
import { validateNewSessionInput } from "@/lib/server/validators";
import { checkRateLimit } from "@/lib/server/ratelimit";
import { performSpamCheck, checkHoneypot } from "@/lib/server/antiSpam";
import { logger, sanitizeForLogging } from "@/lib/server/logger";
import { sendToWebhook } from "@/lib/server/fetcher";
import { extractRealIP, hashIP } from "@/lib/server/ip";
import { generateId } from "@/lib/utils/hash";
import type { NewSessionRequest, NewSessionResponse } from "@/lib/types/agent";

// In-memory session storage (Phase 2: move to Supabase)
const sessions = new Map<string, any>();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const route = "/api/agent/new";
  
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
        } as NewSessionResponse,
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
        { ok: false, error: "INVALID_INPUT" } as NewSessionResponse,
        { status: 415, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Validate input
    const validation = validateNewSessionInput(body);
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
          message: "برخی مقادیر فرم نامعتبر است. لطفاً فیلدهای مشخص‌شده را اصلاح کنید.",
          fields
        } as NewSessionResponse,
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Anti-spam (strictly honeypot only to avoid false-positives)
    const spamCheck = checkHoneypot(body.hp_token);
    if (spamCheck.isSpam) {
      const duration = Date.now() - startTime;
      logger.warn(route, ipHash, userAgent, duration, 422, "Spam detected", {
        reason: spamCheck.reason
      });
      
      return NextResponse.json(
        { ok: false, error: "POTENTIAL_SPAM", message: "درخواست شما به‌طور موقت مسدود شد. لطفاً کمی بعد دوباره تلاش کنید." } as NewSessionResponse,
        { status: 422, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Generate session ID
    const sessionId = generateId();
    
    // Store session in memory
    const sessionData = {
      id: sessionId,
      intake: {
        website_url: body.website_url,
        instagram_url: body.instagram_url,
        business_type: body.business_type,
        primary_goal: body.primary_goal,
        channels: body.channels,
        current_tools: body.current_tools,
        budget: body.budget,
        phone: body.phone,
        email: body.email
      },
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      messages: []
    };
    
    sessions.set(sessionId, sessionData);

    // Prepare webhook payload
    const webhookPayload = {
      type: "agent_new_session",
      data: {
        ...body as NewSessionRequest,
        session_id: sessionId
      },
      session_id: sessionId,
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
    
    let initialAnalysis: any = undefined;
    if (isWebhookEnabled(webhookUrl)) {
      // Send to n8n webhook with increased timeout and retries
      const webhookResult = await sendToWebhook(webhookUrl!, webhookPayload, {
        timeoutMs: 30000, // 30 seconds
        retries: 2, // Try 3 times total
        backoffMs: 1000 // Wait 1 second between retries
      });
      
      if (!webhookResult.success) {
        const duration = Date.now() - startTime;
        logger.error(route, ipHash, userAgent, duration, 502, "Webhook failed", {
          error: webhookResult.error,
          status: webhookResult.status
        });
        
        // Clean up session on webhook failure
        sessions.delete(sessionId);
        
        const status = webhookResult.status || 502;
        return NextResponse.json(
          { ok: false, error: "UPSTREAM_UNAVAILABLE", message: `Upstream وضعیت ${status}. لطفاً کمی بعد تلاش کنید.` } as NewSessionResponse,
          { status, headers: { "Cache-Control": "no-store" } }
        );
      } else {
        // Pass through any analysis-like payload from n8n if present
        if (webhookResult.data) {
          // Handle different response formats from n8n
          let data = webhookResult.data;
          
          // Handle n8n response format: [{"output": "json_string"}]
          if (Array.isArray(data) && data.length > 0 && data[0].output) {
            try {
              data = JSON.parse(data[0].output);
            } catch (e) {
              logger.warn(route, ipHash, userAgent, Date.now() - startTime, 200, "Failed to parse n8n output", {
                error: e instanceof Error ? e.message : "Unknown error",
                rawOutput: data[0].output
              });
            }
          }
          
          initialAnalysis = {
            analysis: data.analysis || data,
            blocks: data.blocks,
            reply: data.reply || data.text || data.message,
            text: data.text || data.reply || data.message
          };
          
          // Log the response for debugging
          const duration = Date.now() - startTime;
          logger.info(route, ipHash, userAgent, duration, 200, "Webhook response received", {
            sessionId,
            responseKeys: Object.keys(data),
            hasAnalysis: !!data.analysis,
            hasBlocks: !!data.blocks,
            hasReply: !!(data.reply || data.text || data.message)
          });
        }
      }
    } else {
      // Mock mode
      const duration = Date.now() - startTime;
      logger.warn(route, ipHash, userAgent, duration, 200, "Mock mode - webhook not configured", {
        sanitizedData: sanitizeForLogging(body),
        sessionId
      });
    }

    // Log success
    const duration = Date.now() - startTime;
    logger.info(route, ipHash, userAgent, duration, 200, "Agent session created successfully", {
      sanitizedData: sanitizeForLogging(body),
      sessionId
    });

    return NextResponse.json(
      {
        ok: true,
        session_id: sessionId,
        message: "جلسه با موفقیت ایجاد شد",
        analysis: initialAnalysis?.analysis || initialAnalysis,
        blocks: initialAnalysis?.blocks,
        reply: initialAnalysis?.reply || initialAnalysis?.text
      } as NewSessionResponse,
      { headers: { "Cache-Control": "no-store" } }
    );

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(route, ipHash, userAgent, duration, 500, "Internal server error", {
      error: error instanceof Error ? error.message : "Unknown error"
    });
    
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR", message: "خطای داخلی سرور رخ داد. لطفاً کمی بعد تلاش کنید." } as NewSessionResponse,
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

// Export sessions for message API
export { sessions };
