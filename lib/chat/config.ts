export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ecomkar.com";

export const N8N_WEBHOOK =
  process.env.NEXT_PUBLIC_N8N_CHATBOT_WEBHOOK || "";

// Use proxy to avoid CORS:
export const USE_PROXY = true;

export const CHAT_ENDPOINT = USE_PROXY
  ? "/api/relay/chatbot"
  : (N8N_WEBHOOK || "/api/relay/chatbot"); // fallback to proxy


