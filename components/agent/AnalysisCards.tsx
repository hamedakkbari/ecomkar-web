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
    <div className="space-y-8">
      {/* Summary Section */}
      {summary && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">تحلیل کلی</h3>
            </div>
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">{summary}</div>
          </div>
        </motion.div>
      )}

      {/* Agents/Recommendations Section */}
      {agents.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">راهکارهای پیشنهادی</h3>
            <p className="text-gray-400">بر اساس تحلیل کسب‌وکار شما</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map((a, idx) => (
              <motion.div 
                key={a.name + idx} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-6 hover:border-cyan-400/40 transition-all duration-300 group-hover:shadow-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{a.name}</h4>
                        <span className="text-sm text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full">
                          {a.est_time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{a.why}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">ابزارهای مورد نیاز:</h5>
                      <div className="flex flex-wrap gap-2">
                        {a.tools.map((t, i) => (
                          <span key={i} className="text-xs bg-white/10 border border-white/20 px-3 py-1 rounded-full text-gray-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">پیچیدگی:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          a.complexity === 'low' ? 'bg-green-500/20 text-green-300' :
                          a.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {a.complexity === 'low' ? 'پایین' : a.complexity === 'medium' ? 'متوسط' : 'بالا'}
                        </span>
                      </div>
                    </div>
                    
                    {a.kpis && a.kpis.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-gray-400 mb-2">شاخص‌های کلیدی:</h5>
                        <div className="flex flex-wrap gap-1">
                          {a.kpis.map((kpi, i) => (
                            <span key={i} className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded-full">
                              {kpi}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Next Actions Section */}
      {nextActions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl"></div>
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">گام‌های بعدی</h3>
            </div>
            <div className="space-y-4">
              {nextActions.map((action, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-200 leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Debug Section for Blocks */}
      {blocks && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-6"
        >
          <h3 className="text-lg font-bold mb-4">جزئیات فنی</h3>
          <div className="text-sm text-gray-400 bg-black/20 p-4 rounded-xl overflow-x-auto">
            <pre>{JSON.stringify(blocks, null, 2)}</pre>
          </div>
        </motion.div>
      )}
    </div>
  );
}



