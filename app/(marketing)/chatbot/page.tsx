"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    const value = input.trim();
    if (!value || isSending) return;
    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("https://n8n.ecomkar.com/webhook/website-chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });
      const data = await res.json().catch(() => ({}));
      const reply = data?.reply || data?.message || "پاسخ دریافت شد.";
      setMessages((prev) => [...prev, { role: "assistant", content: String(reply) }]);
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


