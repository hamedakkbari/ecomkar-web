"use client";

import { motion } from "framer-motion";
import type { Analysis } from "@/lib/agent/types";

type Props = { analysis: Analysis };

export default function AnalysisCards({ analysis }: Props) {
  // Handle different response formats from n8n
  console.log("Analysis data:", analysis); // Debug log
  
  // Handle both structured analysis and raw text responses
  const summary = analysis?.summary || analysis?.reply || analysis?.text || (typeof analysis === 'string' ? analysis : '');
  const agents = analysis?.agents || analysis?.recommendations || [];
  const nextActions = analysis?.next_actions || analysis?.plan_7d || [];
  const blocks = analysis?.blocks;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-6 bg-white/5">
        <h3 className="text-lg mb-2">تحلیل هوشمند EcomKar</h3>
        <div className="text-sm opacity-80 whitespace-pre-wrap">{summary}</div>
      </motion.div>

      {agents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {agents.map((a, idx) => (
            <motion.div key={a.name + idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border p-5 bg-white/5 hover:shadow-lg/20 hover:border-cyan-400/40 transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{a.name}</h4>
                <span className="text-xs opacity-70">{a.est_time}</span>
              </div>
              <p className="text-sm mb-3 opacity-90">{a.why}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {a.tools.map(t => (
                  <span key={t} className="text-xs rounded-full border px-2 py-0.5 opacity-80">{t}</span>
                ))}
              </div>
              <div className="text-xs opacity-70">پیچیدگی: {a.complexity} • KPI: {a.kpis.join("، ")}</div>
            </motion.div>
          ))}
        </div>
      )}

      {nextActions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-6 bg-white/5">
          <h3 className="text-lg mb-3">گام‌های بعدی</h3>
          <ul className="list-disc pr-6 space-y-1 opacity-90">
            {nextActions.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </motion.div>
      )}

      {blocks && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-6 bg-white/5">
          <h3 className="text-lg mb-3">جزئیات تحلیل</h3>
          <div className="text-sm opacity-80 whitespace-pre-wrap">
            {JSON.stringify(blocks, null, 2)}
          </div>
        </motion.div>
      )}
    </div>
  );
}



