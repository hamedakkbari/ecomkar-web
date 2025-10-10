"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sendMessage } from "@/lib/agent/api";
import type { AgentResponse } from "@/lib/agent/types";

type Message = { id: string; role: "user" | "assistant"; content: string };

type Props = {
  sessionId: string;
  initialNextActions?: string[];
};

export default function ChatUI({ sessionId, initialNextActions }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Seed with initial assistant message from sessionStorage if present
  useEffect(() => {
    try {
      const fromReply = sessionStorage.getItem("agent_initial_reply");
      if (fromReply && fromReply.length > 0) {
        setMessages([{ id: String(Date.now()), role: "assistant", content: fromReply }]);
        return;
      }
      const rawAnalysis = sessionStorage.getItem("agent_initial_analysis");
      if (rawAnalysis) {
        const parsed = JSON.parse(rawAnalysis);
        const initialText = parsed?.summary || parsed?.reply || undefined;
        if (initialText && typeof initialText === "string") {
          setMessages([{ id: String(Date.now()), role: "assistant", content: initialText }]);
          return;
        }
      }
      const rawAny = sessionStorage.getItem("agent_initial_raw");
      if (rawAny) {
        const parsedAny = JSON.parse(rawAny);
        const guess = parsedAny?.reply || parsedAny?.text || parsedAny?.analysis?.summary || ""; // intentionally skip generic message
        if (guess) {
          setMessages([{ id: String(Date.now()), role: "assistant", content: String(guess) }]);
        }
      }
    } catch {}
  }, []);

  // Auto-fetch first assistant message from n8n by sending a synthetic init message
  useEffect(() => {
    (async () => {
      // If already have a seeded assistant message, skip auto-init
      if (messages.length > 0) return;
      try {
        const resp: AgentResponse = await sendMessage({ session_id: sessionId, message: "__init__", hp_token: "" });
        const reply = resp?.analysis?.summary || (resp as any)?.reply || (resp as any)?.text || "";
        if (reply) {
          setMessages([{ id: String(Date.now()), role: "assistant", content: reply }]);
        }
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const onSend = async () => {
    const content = input.trim();
    if (!content || sending) return;
    const userMsg: Message = { id: String(Date.now()), role: "user", content };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setSending(true);

    const resp: AgentResponse = await sendMessage({ session_id: sessionId, message: content, hp_token: "" });
    const reply = resp?.analysis?.summary || resp?.message || "پاسخ دریافت شد.";
    const aiMsg: Message = { id: String(Date.now() + 1), role: "assistant", content: reply };
    setMessages(prev => [...prev, aiMsg]);
    setSending(false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 rounded-2xl border bg-white/5 p-4 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map(m => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className={m.role === "user" ? "ml-16" : "mr-16"}>
              <div className="rounded-2xl border px-4 py-2 bg-white/5">
                <div className="text-sm opacity-80">{m.role === "user" ? "شما" : "EcomKar"}</div>
                <div>{m.content}</div>
              </div>
            </motion.div>
          ))}
          {sending && (
            <div className="mr-16">
              <div className="rounded-2xl border px-4 py-2 bg-white/5 opacity-70 animate-pulse">در حال فکر کردن…</div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div className="mt-3 flex items-end gap-3">
          <textarea className="flex-1 rounded-xl bg-transparent border p-3 min-h-[60px]" placeholder="سؤال‌ت رو بپرس… مثلا: برای فروش اینستاگرام از کدوم ایجنت شروع کنم؟" value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} />
          <button onClick={onSend} disabled={sending || !input.trim()} className="px-5 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 disabled:opacity-50">ارسال</button>
        </div>
      </div>
      <div className="lg:col-span-4 space-y-3">
        {initialNextActions && initialNextActions.length > 0 && (
          <div className="rounded-2xl border bg-white/5 p-4">
            <div className="font-semibold mb-2">پیشنهادهای بعدی</div>
            <ul className="list-disc pr-5 space-y-1 text-sm opacity-90">
              {initialNextActions.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}



