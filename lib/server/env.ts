/**
 * Environment variables validation and type safety
 * Strict validation with fallbacks and dev-time warnings
 * No external dependencies - pure TypeScript
 */

// ===========================================
// TYPE DEFINITIONS
// ===========================================

export type AnalyticsProvider = "plausible" | "ga" | "none";
export type MailProvider = "mailgun" | "resend" | "none";
export type LogLevel = "info" | "warn" | "error";

export interface ServerEnv {
  // App Configuration
  NEXT_PUBLIC_SITE_URL: string;
  NODE_ENV: "development" | "production" | "test";
  
  // Analytics
  ANALYTICS_PROVIDER: AnalyticsProvider;
  ANALYTICS_DOMAIN?: string;
  GA_MEASUREMENT_ID?: string;
  CLARITY_ID?: string;
  
  // n8n Webhooks
  N8N_WEBHOOK_CONTACT?: string;
  N8N_WEBHOOK_LEAD?: string;
  N8N_WEBHOOK_DEMO?: string;
  N8N_WEBHOOK_NEWSLETTER?: string;
  
  // Payments
  ZARINPAL_MERCHANT_ID?: string;
  ZARINPAL_CALLBACK_URL?: string;
  STRIPE_SECRET_KEY?: string;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
  
  // Email
  MAIL_PROVIDER: MailProvider;
  MAILGUN_API_KEY?: string;
  MAILGUN_DOMAIN?: string;
  RESEND_API_KEY?: string;
  
  // Supabase (Phase 2)
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  
  // SEO & i18n
  NEXT_PUBLIC_SITE_LOCALE: string;
  NEXT_PUBLIC_SITE_ALT_LOCALE?: string;
  
  // API Infrastructure
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
  API_TIMEOUT_MS: number;
  LOG_LEVEL: LogLevel;
}

// ===========================================
// VALIDATION HELPERS
// ===========================================

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEnum<T extends string>(value: string, validValues: readonly T[]): value is T {
  return validValues.includes(value as T);
}

function parsePositiveInt(value: string | undefined, defaultValue: number): number {
  const parsed = parseInt(value || String(defaultValue), 10);
  return isNaN(parsed) || parsed <= 0 ? defaultValue : parsed;
}

// ===========================================
// VALIDATION LOGIC
// ===========================================

function validateEnv(): ServerEnv {
  const isDev = process.env.NODE_ENV !== "production";
  const warnings: string[] = [];
  const errors: string[] = [];

  // App Configuration
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    errors.push("NEXT_PUBLIC_SITE_URL is required");
  } else if (!isValidUrl(siteUrl)) {
    errors.push("NEXT_PUBLIC_SITE_URL must be a valid URL");
  }

  const nodeEnv = process.env.NODE_ENV || "development";
  if (!isValidEnum(nodeEnv, ["development", "production", "test"])) {
    warnings.push("NODE_ENV should be development, production, or test");
  }

  // Analytics
  const analyticsProvider = process.env.ANALYTICS_PROVIDER || "none";
  if (!isValidEnum(analyticsProvider, ["plausible", "ga", "none"])) {
    warnings.push("ANALYTICS_PROVIDER must be plausible, ga, or none");
  }

  if (analyticsProvider === "plausible" && !process.env.ANALYTICS_DOMAIN) {
    warnings.push("ANALYTICS_DOMAIN required when ANALYTICS_PROVIDER=plausible");
  }

  if (analyticsProvider === "ga" && !process.env.GA_MEASUREMENT_ID) {
    warnings.push("GA_MEASUREMENT_ID required when ANALYTICS_PROVIDER=ga");
  }

  // Email
  const mailProvider = process.env.MAIL_PROVIDER || "none";
  if (!isValidEnum(mailProvider, ["mailgun", "resend", "none"])) {
    warnings.push("MAIL_PROVIDER must be mailgun, resend, or none");
  }

  if (mailProvider === "mailgun" && (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN)) {
    warnings.push("MAILGUN_API_KEY and MAILGUN_DOMAIN required when MAIL_PROVIDER=mailgun");
  }

  if (mailProvider === "resend" && !process.env.RESEND_API_KEY) {
    warnings.push("RESEND_API_KEY required when MAIL_PROVIDER=resend");
  }

  // Log warnings in development
  if (isDev && warnings.length > 0) {
    console.warn("ENV Configuration Warnings:", warnings);
  }

  // Log errors (but don't crash in production)
  if (errors.length > 0) {
    if (isDev) {
      console.error("ENV Configuration Errors:", errors);
    } else {
      console.error("Critical ENV errors:", errors);
    }
  }

  return {
    // App Configuration
    NEXT_PUBLIC_SITE_URL: siteUrl || "https://localhost:3000",
    NODE_ENV: nodeEnv as "development" | "production" | "test",
    
    // Analytics
    ANALYTICS_PROVIDER: analyticsProvider as AnalyticsProvider,
    ANALYTICS_DOMAIN: process.env.ANALYTICS_DOMAIN,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    CLARITY_ID: process.env.CLARITY_ID,
    
    // n8n Webhooks
    N8N_WEBHOOK_CONTACT: process.env.N8N_WEBHOOK_CONTACT,
    N8N_WEBHOOK_LEAD: process.env.N8N_WEBHOOK_LEAD,
    N8N_WEBHOOK_DEMO: process.env.N8N_WEBHOOK_DEMO,
    N8N_WEBHOOK_NEWSLETTER: process.env.N8N_WEBHOOK_NEWSLETTER,
    
    // Payments
    ZARINPAL_MERCHANT_ID: process.env.ZARINPAL_MERCHANT_ID,
    ZARINPAL_CALLBACK_URL: process.env.ZARINPAL_CALLBACK_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    
    // Email
    MAIL_PROVIDER: mailProvider as MailProvider,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    
    // SEO & i18n
    NEXT_PUBLIC_SITE_LOCALE: process.env.NEXT_PUBLIC_SITE_LOCALE || "fa-IR",
    NEXT_PUBLIC_SITE_ALT_LOCALE: process.env.NEXT_PUBLIC_SITE_ALT_LOCALE,
    
    // API Infrastructure
    RATE_LIMIT_WINDOW_MS: parsePositiveInt(process.env.RATE_LIMIT_WINDOW_MS, 60000),
    RATE_LIMIT_MAX: parsePositiveInt(process.env.RATE_LIMIT_MAX, 10),
    API_TIMEOUT_MS: parsePositiveInt(process.env.API_TIMEOUT_MS, 3500),
    LOG_LEVEL: (process.env.LOG_LEVEL as LogLevel) || "info"
  };
}

// ===========================================
// EXPORTS
// ===========================================

export const env = validateEnv();

// Legacy functions for backward compatibility
export function getServerEnv(): ServerEnv {
  return env;
}

export function isWebhookEnabled(webhookUrl?: string): boolean {
  return Boolean(webhookUrl && webhookUrl.trim().length > 0);
}

export function isMockMode(): boolean {
  return env.NODE_ENV !== "production";
}

export function maskSecret(secret: string | undefined, visibleChars: number = 4): string {
  if (!secret || secret.length <= visibleChars * 2) return "***";
  return secret.substring(0, visibleChars) + "***" + secret.substring(secret.length - visibleChars);
}
