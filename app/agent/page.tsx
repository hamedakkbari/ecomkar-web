"use client";

import { useState } from "react";
import IntakeForm from "@/components/agent/IntakeForm";
import AnalysisCards from "@/components/agent/AnalysisCards";
import Glow from "@/lib/ui/glow";
import type { AgentResponse } from "@/lib/agent/types";
import { motion } from "framer-motion";

export default function AgentIntakePage() {
  const [resp, setResp] = useState<AgentResponse | null>(null);

  const handleAnalysis = (r: AgentResponse) => setResp(r);

  return (
    <main className="min-h-screen" style={{ background: "#0B0F14", color: "#E6F1FF" }}>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <Glow>
          <div className="rounded-3xl border p-8 bg-white/5">
            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold mb-2">
              مشاور هوشمند EcomKar — تحلیل فوری کسب‌وکار شما
            </motion.h1>
            <p className="opacity-80">اطلاعات کلیدی را وارد کنید تا ایجنت‌های مناسب را دقیق پیشنهاد دهیم.</p>
          </div>
        </Glow>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Glow>
              <div className="rounded-3xl border p-8 bg-white/5">
                <IntakeForm onAnalysis={handleAnalysis} />
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
                <div className="animate-pulse">نتایج تحلیل پس از ارسال فرم نمایش داده می‌شود…</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


