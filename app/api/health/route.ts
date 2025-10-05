/**
 * GET /api/health - Health check endpoint
 * Returns system status and masked ENV configuration
 * No sensitive data exposed
 */

import { NextRequest, NextResponse } from "next/server";
import { env, maskSecret } from "@/lib/server/env";

export interface HealthResponse {
  ok: boolean;
  uptime_ms: number;
  now_iso: string;
  env: {
    site_url_present: boolean;
    analytics_provider: string;
    n8n_contact_present: boolean;
    n8n_lead_present: boolean;
    mail_provider: string;
    payments: {
      zarinpal_present: boolean;
      stripe_pk_present: boolean;
    };
    supabase_present: boolean;
    locale: string;
    alt_locale_present: boolean;
  };
  issues?: string[];
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const uptime = process.uptime();
  const now = new Date().toISOString();
  
  const issues: string[] = [];
  
  // Check critical configurations
  if (!env.NEXT_PUBLIC_SITE_URL || env.NEXT_PUBLIC_SITE_URL === "https://localhost:3000") {
    issues.push("NEXT_PUBLIC_SITE_URL not properly configured");
  }
  
  if (env.ANALYTICS_PROVIDER === "plausible" && !env.ANALYTICS_DOMAIN) {
    issues.push("ANALYTICS_DOMAIN required for Plausible");
  }
  
  if (env.ANALYTICS_PROVIDER === "ga" && !env.GA_MEASUREMENT_ID) {
    issues.push("GA_MEASUREMENT_ID required for Google Analytics");
  }
  
  if (env.MAIL_PROVIDER === "mailgun" && (!env.MAILGUN_API_KEY || !env.MAILGUN_DOMAIN)) {
    issues.push("Mailgun configuration incomplete");
  }
  
  if (env.MAIL_PROVIDER === "resend" && !env.RESEND_API_KEY) {
    issues.push("Resend API key missing");
  }
  
  // Check if we're in production with missing critical webhooks
  if (env.NODE_ENV === "production") {
    if (!env.N8N_WEBHOOK_CONTACT) {
      issues.push("N8N_WEBHOOK_CONTACT missing in production");
    }
    if (!env.N8N_WEBHOOK_LEAD) {
      issues.push("N8N_WEBHOOK_LEAD missing in production");
    }
  }
  
  const response: HealthResponse = {
    ok: issues.length === 0,
    uptime_ms: Math.round(uptime * 1000),
    now_iso: now,
    env: {
      site_url_present: Boolean(env.NEXT_PUBLIC_SITE_URL),
      analytics_provider: env.ANALYTICS_PROVIDER,
      n8n_contact_present: Boolean(env.N8N_WEBHOOK_CONTACT),
      n8n_lead_present: Boolean(env.N8N_WEBHOOK_LEAD),
      mail_provider: env.MAIL_PROVIDER,
      payments: {
        zarinpal_present: Boolean(env.ZARINPAL_MERCHANT_ID),
        stripe_pk_present: Boolean(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      },
      supabase_present: Boolean(env.NEXT_PUBLIC_SUPABASE_URL),
      locale: env.NEXT_PUBLIC_SITE_LOCALE,
      alt_locale_present: Boolean(env.NEXT_PUBLIC_SITE_ALT_LOCALE)
    }
  };
  
  // Add issues if any
  if (issues.length > 0) {
    response.issues = issues;
  }
  
  // Log health check
  const duration = Date.now() - startTime;
  console.log(`Health check completed in ${duration}ms`, {
    ok: response.ok,
    issues: issues.length
  });
  
  // Return appropriate status code
  const status = response.ok ? 200 : 503;
  
  return NextResponse.json(response, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json"
    }
  });
}

// Handle other methods
export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { 
      status: 405, 
      headers: { 
        "Allow": "GET",
        "Cache-Control": "no-store"
      } 
    }
  );
}