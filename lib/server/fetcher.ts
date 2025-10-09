/**
 * HTTP client with timeout, retry, and error handling for n8n webhooks
 * AbortController for timeout, exponential backoff for retries
 */

import { getServerEnv } from "./env";

export interface FetchOptions {
  body: any;
  timeoutMs?: number;
  retries?: number;
  backoffMs?: number;
}

export interface FetchResult {
  success: boolean;
  data?: any;
  error?: string;
  status?: number;
}

export async function fetchWithRetry(
  url: string,
  options: FetchOptions
): Promise<FetchResult> {
  const env = getServerEnv();
  const {
    body,
    timeoutMs = env.API_TIMEOUT_MS,
    retries = 1,
    backoffMs = 300
  } = options;

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "EcomKar-API/1.0"
      };
      if (env.N8N_WEBHOOK_SECRET) {
        headers["X-Webhook-Secret"] = env.N8N_WEBHOOK_SECRET;
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      let data: any;
      try {
        data = await response.json();
      } catch {
        // Tolerate empty/non-JSON responses from webhook
        data = {};
      }
      
      return {
        success: true,
        data,
        status: response.status
      };

    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on certain errors
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            error: "Request timeout",
            status: 408
          };
        }
        
        if (error.message.includes("404") || error.message.includes("401")) {
          return {
            success: false,
            error: "Webhook endpoint not found or unauthorized",
            status: 404
          };
        }
      }

      // If this was the last attempt, return the error
      if (attempt === retries) {
        return {
          success: false,
          error: lastError.message,
          status: 502
        };
      }

      // Wait before retrying (exponential backoff)
      if (attempt < retries) {
        const delay = backoffMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || "Unknown error",
    status: 502
  };
}

export async function sendToWebhook(
  webhookUrl: string,
  payload: any
): Promise<FetchResult> {
  if (!webhookUrl || webhookUrl.trim().length === 0) {
    return {
      success: false,
      error: "Webhook URL not configured",
      status: 500
    };
  }

  return fetchWithRetry(webhookUrl, { body: payload });
}
