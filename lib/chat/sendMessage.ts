import { CHAT_ENDPOINT, SITE_URL } from "./config";
import { getOrCreateSessionId } from "./session";

export type ChatResponse = {
  ok?: boolean;
  reply?: string;
  session_id?: string;
  model?: string;
  error?: string;
  [k: string]: any;
};

export async function sendChatMessage(userMessage: string): Promise<ChatResponse> {
  const session_id = getOrCreateSessionId();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        session_id,
        message: userMessage,
        hp_token: "",
        page: "/chatbot",
        site_url: SITE_URL,
      }),
    });

    const text = await res.text();

    let data: ChatResponse;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: res.ok, reply: text } as ChatResponse;
    }

    if (!res.ok || !data?.reply) {
      return {
        ok: false,
        error: (data as any)?.error || "invalid-reply",
        raw: data,
      } as any;
    }

    return data;
  } catch (err: any) {
    return { ok: false, error: err?.message || "network-error" };
  } finally {
    clearTimeout(timeout);
  }
}


