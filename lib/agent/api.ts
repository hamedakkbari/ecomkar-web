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
  // Map client payload to server contract
  const normalizeInstagram = (val?: string) => {
    if (!val) return undefined;
    const v = val.trim();
    if (!v) return undefined;
    // If it's already a URL, pass through
    if (/^https?:\/\//i.test(v)) return v;
    // If it starts with @ or is a handle, convert to profile URL
    const handle = v.replace(/^@+/, "");
    return `https://instagram.com/${handle}`;
  };

  const toEnglishDigits = (val?: string) => {
    if (!val) return val;
    const map: Record<string, string> = {
      "۰": "0","۱": "1","۲": "2","۳": "3","۴": "4","۵": "5","۶": "6","۷": "7","۸": "8","۹": "9",
      "٠": "0","١": "1","٢": "2","٣": "3","٤": "4","٥": "5","٦": "6","٧": "7","٨": "8","٩": "9"
    };
    return val.replace(/[۰-۹٠-٩]/g, d => map[d] || d);
  };

  const normalizePhone = (val?: string) => {
    if (!val) return val;
    const en = toEnglishDigits(val) || "";
    return en.replace(/[^\d+]/g, "");
  };

  const serverBody: any = {
    website_url: payload.website_url,
    instagram_url: normalizeInstagram(payload.instagram),
    business_type: payload.business_type,
    primary_goal: payload.primary_goal,
    channels: payload.channels,
    current_tools: Array.isArray(payload.current_tools)
      ? payload.current_tools.join(", ")
      : payload.current_tools,
    budget: payload.budget,
    phone: normalizePhone(payload.phone),
    email: payload.email?.trim(),
    consent: payload.consent,
    hp_token: payload.hp_token ?? ""
  };

  const raw = await postJson<any>("/api/agent/new", serverBody);
  // Normalize response to AgentResponse
  const sessionId = raw?.session?.id || raw?.session_id;
  const normalized: AgentResponse = {
    ok: Boolean(raw?.ok),
    analysis: raw?.analysis,
    session: sessionId ? { id: String(sessionId) } : undefined,
    message: raw?.message || raw?.error
  };
  return normalized;
}

export async function sendMessage(payload: ChatMessagePayload): Promise<AgentResponse> {
  return postJson<AgentResponse>("/api/agent/message", payload);
}



