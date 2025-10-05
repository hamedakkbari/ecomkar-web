/**
 * POST /api/lead - Lead form submission
 * Handles validation, anti-spam, rate limiting, and n8n webhook
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerEnv, isWebhookEnabled, isMockMode } from "@/lib/server/env";
import { validateLeadInput } from "@/lib/server/validators";
import { checkRateLimit } from "@/lib/server/ratelimit";
import { performSpamCheck } from "@/lib/server/antiSpam";
import { logger, sanitizeForLogging } from "@/lib/server/logger";
import { sendToWebhook } from "@/lib/server/fetcher";
import { extractRealIP, hashIP } from "@/lib/server/ip";
import { generateId } from "@/lib/utils/hash";
import type { ApiResponse, LeadRequest, WebhookPayload, SelfTestResponse } from "@/lib/types/api";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const route = "/api/lead";
  
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
        } as ApiResponse,
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
        { ok: false, error: "INVALID_INPUT" } as ApiResponse,
        { status: 415, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Self-test mode (development only)
    if (body._self_test === true && isMockMode()) {
      const duration = Date.now() - startTime;
      logger.info(route, ipHash, userAgent, duration, 200, "Self-test successful");
      
      const selfTestResponse: SelfTestResponse = {
        ok: true,
        message: "Self-test successful",
        schema: {
          contact: {
            name: "Test User",
            email: "test@example.com",
            phone: "+989123456789",
            message: "Test message",
            utm: { source: "test" },
            hp_token: "",
            consent: true
          },
          lead: {
            name: "Test User",
            email: "test@example.com",
            phone: "+989123456789",
            company: "Test Company",
            service_type: "agent",
            budget: "under_500",
            message: "Test message",
            site_url: "https://example.com",
            utm: { source: "test" },
            hp_token: "",
            consent: true
          }
        }
      };
      
      return NextResponse.json(selfTestResponse, { headers: { "Cache-Control": "no-store" } });
    }

    // Validate input
    const validation = validateLeadInput(body);
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
        } as ApiResponse,
        { status: 400, headers: { "Cache-Control": "no-store" } }
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
        { ok: false, error: "POTENTIAL_SPAM" } as ApiResponse,
        { status: 422, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Prepare webhook payload
    const webhookPayload: WebhookPayload = {
      type: "lead",
      data: body as LeadRequest,
      meta: {
        ip: realIP,
        ua: userAgent,
        ts: new Date().toISOString(),
        page: request.headers.get("referer")
      }
    };

    // Send to webhook or mock
    const env = getServerEnv();
    const webhookUrl = env.N8N_WEBHOOK_LEAD;
    
    let responseId: string;
    let responseMessage: string;
    
    if (isWebhookEnabled(webhookUrl)) {
      // Send to n8n webhook
      const webhookResult = await sendToWebhook(webhookUrl, webhookPayload);
      
      if (webhookResult.success) {
        responseId = webhookResult.data?.id || generateId();
        responseMessage = "درخواست دریافت شد.";
      } else {
        const duration = Date.now() - startTime;
        logger.error(route, ipHash, userAgent, duration, 502, "Webhook failed", {
          error: webhookResult.error,
          status: webhookResult.status
        });
        
        return NextResponse.json(
          { ok: false, error: "UPSTREAM_UNAVAILABLE" } as ApiResponse,
          { status: 502, headers: { "Cache-Control": "no-store" } }
        );
      }
    } else {
      // Mock mode
      responseId = generateId();
      responseMessage = "در حالت نمایشی ثبت شد.";
      
      const duration = Date.now() - startTime;
      logger.warn(route, ipHash, userAgent, duration, 200, "Mock mode - webhook not configured", {
        sanitizedData: sanitizeForLogging(body)
      });
    }

    // Log success
    const duration = Date.now() - startTime;
    logger.info(route, ipHash, userAgent, duration, 200, "Lead submitted successfully", {
      sanitizedData: sanitizeForLogging(body),
      responseId
    });

    return NextResponse.json(
      {
        ok: true,
        id: responseId,
        message: responseMessage
      } as ApiResponse,
      { headers: { "Cache-Control": "no-store" } }
    );

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(route, ipHash, userAgent, duration, 500, "Internal server error", {
      error: error instanceof Error ? error.message : "Unknown error"
    });
    
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" } as ApiResponse,
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
