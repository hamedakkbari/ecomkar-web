"use client";

import { useMemo } from "react";
import ChatUI from "@/components/agent/ChatUI";
import Glow from "@/lib/ui/glow";
import { useSearchParams, useRouter } from "next/navigation";

export default function AgentChatPage() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = useMemo(() => params.get("session_id") || "", [params]);

  if (!sessionId) {
    return (
      <main className="min-h-screen" style={{ background: "#0B0F14", color: "#E6F1FF" }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="rounded-3xl border p-8 bg-white/5">
            <div className="mb-4">شناسه سشن پیدا نشد.</div>
            <button onClick={() => router.push("/agent")} className="px-5 py-3 rounded-xl border">
              بازگشت به فرم
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "#0B0F14", color: "#E6F1FF" }}>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <Glow>
          <div className="rounded-3xl border p-8 bg-white/5">
            <h1 className="text-2xl font-bold">EcomKar Agent Advisor — گفتگو</h1>
          </div>
        </Glow>
        <ChatUI sessionId={sessionId} />
      </div>
    </main>
  );
}


