import type { AgentResponse, IntakePayload, ChatMessagePayload } from "./types";

async function postJson<T>(url: string, payload: any): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const errorData = await res.json().catch(() => ({}));
      return { 
        ok: false, 
        error: errorData.error || "API_ERROR",
        message: errorData.message || `خطای ${res.status}: ${res.statusText}`
      } as unknown as T;
    }
    
    const data = await res.json().catch(() => ({}));
    return data as T;
  } catch (e) {
    console.error("Network error:", e);
    if (e instanceof Error && e.name === 'AbortError') {
      return { ok: false, error: "TIMEOUT", message: "زمان انتظار به پایان رسید. لطفاً دوباره تلاش کنید." } as unknown as T;
    }
    return { ok: false, error: "NETWORK_ERROR", message: "خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید." } as unknown as T;
  }
}

export async function submitIntake(payload: IntakePayload): Promise<AgentResponse> {
  return postJson<AgentResponse>("/api/agent/new", payload);
}

export async function sendMessage(payload: ChatMessagePayload): Promise<AgentResponse> {
  return postJson<AgentResponse>("/api/agent/message", payload);
}



