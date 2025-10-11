import type { AgentResponse, IntakePayload, ChatMessagePayload } from "./types";

async function postJson<T>(url: string, payload: any): Promise<T> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    return data as T;
  } catch (e) {
    return { ok: false, message: "network_error" } as unknown as T;
  }
}

export async function submitIntake(payload: IntakePayload): Promise<AgentResponse> {
  return postJson<AgentResponse>("/api/agent/new", payload);
}

export async function sendMessage(payload: ChatMessagePayload): Promise<AgentResponse> {
  return postJson<AgentResponse>("/api/agent/message", payload);
}



