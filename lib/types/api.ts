/**
 * Shared API types for request/response contracts
 * Used by both contact and lead endpoints
 */

export interface ApiResponse<T = any> {
  ok: boolean;
  id?: string;
  message?: string;
  error?: string;
  fields?: { [key: string]: string };
  retry_in_ms?: number;
  data?: T;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  hp_token: string;
  consent: boolean;
}

export interface LeadRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: "agent" | "automation" | "chatbot" | "n8n" | "course" | "other";
  budget?: "under_500" | "500_1500" | "1500_3000" | "3000_plus" | "unspecified";
  message: string;
  site_url?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  hp_token: string;
  consent: boolean;
}

export interface WebhookPayload {
  type: "contact" | "lead";
  data: ContactRequest | LeadRequest;
  meta: {
    ip: string;
    ua: string;
    ts: string;
    page: string | null;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface RateLimitInfo {
  allowed: boolean;
  retryInMs?: number;
}

export interface SpamCheckInfo {
  isSpam: boolean;
  reason?: string;
}

// Error response types
export interface ApiError {
  ok: false;
  error: "INVALID_INPUT" | "RATE_LIMITED" | "POTENTIAL_SPAM" | "UPSTREAM_UNAVAILABLE" | "SERVER_ERROR";
  fields?: { [key: string]: string };
  retry_in_ms?: number;
}

// Success response types
export interface ApiSuccess {
  ok: true;
  id: string;
  message: string;
}

// Self-test response
export interface SelfTestResponse {
  ok: true;
  message: "Self-test successful";
  schema: {
    contact: ContactRequest;
    lead: LeadRequest;
  };
}
