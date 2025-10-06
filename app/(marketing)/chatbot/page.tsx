"use client";

import { useMemo, useState } from "react";
import agentContent from "@/lib/content/agent";
import { motion } from "framer-motion";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    const value = input.trim();
    if (!value || isSending) return;
    setInput("");
    setIsSending(true);

    try {
      const isFirst = !sessionId;
      const targetUrl = isFirst ? (agentContent.n8n?.intakeWebhook || "/api/agent/new") : (agentContent.n8n?.messageWebhook || "/api/agent/message");
      const payload: any = isFirst ? { message: value, hp_token: "", page: "/chatbot", site_url: process.env.NEXT_PUBLIC_SITE_URL, user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined, referer: typeof document !== 'undefined' ? document.referrer : undefined } : { session_id: sessionId, message: value, hp_token: "", page: "/chatbot", site_url: process.env.NEXT_PUBLIC_SITE_URL, user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined, referer: typeof document !== 'undefined' ? document.referrer : undefined };
      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessages((prev) => [...prev, { role: "user", content: value }]);
        if (isFirst && typeof data.session_id === 'string' && data.session_id.length > 0) {
          setSessionId(data.session_id);
        }
        const reply = data?.reply || data?.message || "پاسخ دریافت شد.";
        setMessages((prev) => [...prev, { role: "assistant", content: String(reply) }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: `خطا در ارسال پیام (${res.status})` }]);
      }
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "خطا در ارتباط. لطفاً دوباره تلاش کنید." }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-3xl font-bold mb-4">
          گفتگو
        </motion.h1>
        <div className="rounded-2xl border" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="h-[60vh] overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] px-3 py-2 rounded-xl ${m.role === 'user' ? 'ml-auto bg-blue-600 text-white' : 'mr-auto bg-white/5'}`}>
                {m.content}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 border-t" style={{ borderTop: '1px solid var(--border)' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none px-3 py-2"
              placeholder="پیام خود را بنویسید..."
            />
            <button onClick={handleSend} disabled={isSending} className="px-4 py-2 rounded-lg btn-primary">
              ارسال
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


