"use client";

import { useState } from "react";
import IntakeForm from "@/components/agent/IntakeForm";
import AnalysisCards from "@/components/agent/AnalysisCards";
import AgentChat from "@/components/agent/AgentChat";
import Glow from "@/lib/ui/glow";
import type { AgentResponse } from "@/lib/agent/types";
import type { Message as MessageType } from "@/lib/types/agent";
import { agentContent } from "@/lib/content/agent";
import { motion } from "framer-motion";

export default function AgentIntakePage() {
  const [resp, setResp] = useState<AgentResponse | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAnalysis = (r: AgentResponse) => {
    setResp(r);
    if (r.ok && r.session?.id) {
      setSessionId(r.session.id);
      setShowChat(true);
      
      // Add initial analysis message to chat
      const analysisMessage: MessageType = {
        id: `analysis-${Date.now()}`,
        role: "assistant",
        content: r.analysis?.summary || r.message || "تحلیل هوشمند EcomKar برای شما آماده است!",
        timestamp: new Date().toISOString(),
        blocks: r.analysis ? {
          summary: r.analysis.summary,
          agents: r.analysis.agents,
          next_actions: r.analysis.next_actions
        } : undefined
      };
      setMessages([analysisMessage]);
    }
  };

  const handleNewMessage = async (message: string) => {
    if (!sessionId || isLoading) return;

    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/agent/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message: message
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        const assistantMessage: MessageType = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message || data.reply || "پاسخ دریافت شد",
          timestamp: new Date().toISOString(),
          blocks: data.analysis ? {
            summary: data.analysis.summary,
            agents: data.analysis.agents,
            next_actions: data.analysis.next_actions
          } : undefined
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setErrors({ general: data.message || "خطا در ارسال پیام" });
      }
    } catch (error) {
      setErrors({ general: "خطا در ارتباط با سرور" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlocksUpdate = (blocks: any) => {
    // Handle any block updates if needed
  };

  return (
    <main className="min-h-screen" style={{ background: "#0B0F14", color: "#E6F1FF" }}>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <Glow>
          <div className="rounded-3xl border p-8 bg-white/5">
            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold mb-2">
              مشاور هوشمند EcomKar — تحلیل فوری کسب‌وکار شما
            </motion.h1>
            <p className="opacity-80">
              {showChat 
                ? "تحلیل هوشمند شما آماده است. سوالات خود را بپرسید تا راه‌حل‌های عملی دریافت کنید."
                : "اطلاعات کلیدی را وارد کنید تا ایجنت‌های مناسب را دقیق پیشنهاد دهیم."
              }
            </p>
          </div>
        </Glow>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Glow>
              <div className="rounded-3xl border p-8 bg-white/5 h-[600px]">
                {showChat ? (
                  <AgentChat
                    content={agentContent}
                    sessionId={sessionId}
                    messages={messages}
                    onNewMessage={handleNewMessage}
                    onBlocksUpdate={handleBlocksUpdate}
                    isLoading={isLoading}
                    errors={errors}
                  />
                ) : (
                  <IntakeForm onAnalysis={handleAnalysis} />
                )}
              </div>
            </Glow>
          </div>
          <div className="lg:col-span-5">
            {resp?.ok ? (
              <Glow>
                <div className="rounded-3xl border p-6 bg-white/5">
                  <AnalysisCards analysis={resp.analysis || resp.reply || resp.text || resp} />
                </div>
              </Glow>
            ) : (
              <div className="rounded-3xl border p-6 bg-white/5 opacity-70">
                <div className="animate-pulse">
                  {showChat 
                    ? "نتایج تحلیل در چت نمایش داده می‌شود…"
                    : "نتایج تحلیل پس از ارسال فرم نمایش داده می‌شود…"
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


