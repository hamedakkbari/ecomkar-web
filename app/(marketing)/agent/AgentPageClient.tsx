"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import agentContent from "@/lib/content/agent";
import IntakeForm from "@/components/agent/IntakeForm";
import AgentChat from "@/components/agent/AgentChat";
import AgentPlanner from "@/components/agent/AgentPlanner";
import type { Message, AgentBlocks } from "@/lib/types/agent";

type ViewState = "intake" | "chat";

export default function AgentPageClient() {
  const [viewState, setViewState] = useState<ViewState>("intake");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [blocks, setBlocks] = useState<AgentBlocks | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const chatRef = useRef<HTMLDivElement>(null);

  const handleIntakeSubmit = async (formData: {
    website_url: string;
    business_type: string;
    primary_goal: string;
    channels: string[];
    current_tools: string;
    budget: string;
    phone: string;
    email: string;
    consent: boolean;
    hp_token: string;
  }) => {
    setIsLoading(true);
    setErrors({});

    try {
      const webhook = agentContent.n8n?.intakeWebhook;
      const response = await fetch(webhook && webhook.length > 0 ? webhook : "/api/agent/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        setSessionId(data.session_id);
        setViewState("chat");
        
        // Scroll to chat after state change
        setTimeout(() => {
          chatRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        if (data.fields) {
          setErrors(data.fields);
        } else {
          setErrors({ 
            general: data.error === "POTENTIAL_SPAM" 
              ? "درخواست شما به عنوان اسپم شناسایی شد." 
              : "خطا در ایجاد جلسه. لطفاً دوباره تلاش کنید." 
          });
        }
      }
    } catch (error) {
      setErrors({ 
        general: "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewMessage = async (message: string) => {
    if (!sessionId) return;

    setIsLoading(true);
    setErrors({});

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      const webhook = agentContent.n8n?.messageWebhook;
      const targetUrl = webhook && webhook.length > 0 ? webhook : "/api/agent/message";
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit",
        body: JSON.stringify({
          session_id: sessionId,
          message
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        // Add assistant message
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: data.reply || data.message || "پاسخ دریافت شد.",
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Update blocks
        if (data.blocks) {
          setBlocks(data.blocks);
        }
      } else {
        if (data.fields) {
          setErrors(data.fields);
        } else {
          setErrors({ 
            general: typeof data.error === 'string' && data.error.length > 0
              ? data.error
              : `خطا در ارسال پیام (${response.status}). لطفاً دوباره تلاش کنید.`
          });
        }
      }
    } catch (error) {
      setErrors({ 
        general: "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlocksUpdate = (newBlocks: AgentBlocks) => {
    setBlocks(newBlocks);
  };

  return (
    <main 
      data-analytics="view_page_agent" 
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'var(--background)',
        color: 'var(--text-primary)'
      }}
    >
      {/* EcomKar luxury background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'rgba(0, 229, 255, 0.08)' }}
        />
        <div 
          className="absolute top-1/3 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: 'rgba(122, 92, 255, 0.06)' }}
        />
        <div 
          className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full blur-[90px]"
          style={{ background: 'rgba(0, 255, 163, 0.05)' }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
              style={{
                background: 'conic-gradient(from 180deg at 50% 50%, rgba(0, 229, 255, 0.25) 0deg, rgba(122, 92, 255, 0.2) 120deg, transparent 360deg)'
              }}
            ></div>
            <div 
              className="relative backdrop-blur-md rounded-2xl p-8 shadow-2xl border"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-hero)'
              }}
            >
              <h1 
                className="text-5xl font-extrabold tracking-tight mb-4 gradient-text"
                style={{ color: 'var(--text-primary)' }}
              >
                {agentContent.page.title}
              </h1>
              <p 
                className="text-xl max-w-3xl mx-auto leading-relaxed text-center"
                style={{ color: 'var(--text-secondary)' }}
              >
                {agentContent.page.lead}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-7">
            <div 
              className="relative rounded-3xl shadow-2xl border h-[900px] overflow-hidden card"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-hero)'
              }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at top right, rgba(0, 229, 255, 0.06), transparent 45%)'
                }}
              ></div>
              {viewState === "intake" ? (
                <div className="relative h-full overflow-hidden">
                  <IntakeForm
                    content={agentContent}
                    onSubmit={handleIntakeSubmit}
                    isLoading={isLoading}
                    errors={errors}
                  />
                </div>
              ) : (
                <div ref={chatRef} className="relative h-full flex flex-col overflow-hidden">
                  <AgentChat
                    content={agentContent}
                    sessionId={sessionId!}
                    messages={messages}
                    onNewMessage={handleNewMessage}
                    onBlocksUpdate={handleBlocksUpdate}
                    isLoading={isLoading}
                    errors={errors}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Planner Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 relative h-[900px]">
              <div 
                className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                style={{
                  background: 'radial-gradient(ellipse at bottom left, rgba(122, 92, 255, 0.18), transparent 50%)'
                }}
              ></div>
              <div className="relative h-full">
                <AgentPlanner
                  content={agentContent}
                  blocks={blocks}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Planner below chat */}
        <div className="lg:hidden mt-8">
          <AgentPlanner
            content={agentContent}
            blocks={blocks}
          />
        </div>
      </div>
    </main>
  );
}






