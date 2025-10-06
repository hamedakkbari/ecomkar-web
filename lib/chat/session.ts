export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") {
    return "server-" + Math.random().toString(36).slice(2);
  }
  const KEY = "ek_chat_sess";
  let sid = localStorage.getItem(KEY);
  if (!sid) {
    const uuid = (globalThis.crypto?.randomUUID?.() ??
      Math.random().toString(36).slice(2));
    sid = `${uuid}-${Date.now()}`;
    localStorage.setItem(KEY, sid);
  }
  return sid;
}


