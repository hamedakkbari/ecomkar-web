"use client";

import { useState } from "react";
import { sendChatMessage } from "@/lib/chat/sendMessage";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export default function ClientChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    const content = input.trim();
    if (!content || sending) return;

    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setSending(true);
    setError(null);

    const res = await sendChatMessage(content);
    setSending(false);

    if (!res.ok || !res.reply) {
      setError("پاسخ معتبر دریافت نشد. لطفاً دوباره امتحان کنید.");
      console.debug("chat-error:", res);
      return;
    }

    setMessages((m) => [...m, { role: "assistant", content: res.reply! }]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-3 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={`inline-block rounded-2xl px-4 py-2 ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="text-sm text-gray-400">در حال ارسال...</div>
        )}
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-gray-100 outline-none"
          placeholder="پیامت رو بنویس..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={sending}
          className="rounded-xl px-4 py-2 bg-teal-500 text-black disabled:opacity-50"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}


