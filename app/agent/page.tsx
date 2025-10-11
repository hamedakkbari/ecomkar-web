"use client";

import { useState } from "react";
import Link from "next/link";
import IntakeForm from "@/components/agent/IntakeForm";
import AnalysisCards from "@/components/agent/AnalysisCards";
import Glow from "@/lib/ui/glow";
import type { AgentResponse } from "@/lib/agent/types";
import { motion } from "framer-motion";

export default function AgentIntakePage() {
  const [resp, setResp] = useState<AgentResponse | null>(null);

  const handleAnalysis = (r: AgentResponse) => setResp(r);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#0B0F14", color: "#E6F1FF" }}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 text-sm font-medium">مشاور هوشمند EcomKar</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent text-center">
            تحلیل فوری کسب‌وکار شما
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed text-center">
            اطلاعات کلیدی را وارد کنید تا ایجنت‌های مناسب را دقیق پیشنهاد دهیم و 
            <span className="text-cyan-300 font-semibold"> راهکارهای عملی</span> برای رشد کسب‌وکارتان ارائه دهیم
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Glow>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">اطلاعات کسب‌وکار شما</h2>
              </div>
              <IntakeForm onAnalysis={handleAnalysis} />
            </div>
          </Glow>
        </motion.div>

        {/* Analysis Results Section */}
        {resp?.ok && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-300 text-sm font-medium">تحلیل تکمیل شد</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">نتایج تحلیل هوشمند</h2>
              <p className="text-gray-300">بر اساس اطلاعات شما، راهکارهای زیر پیشنهاد می‌شود:</p>
            </div>
            
            <Glow>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8 shadow-2xl">
                <AnalysisCards analysis={resp.analysis || resp.reply || resp.text || resp} />
              </div>
            </Glow>

            {/* Consultation CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">نیاز به مشاوره تخصصی دارید؟</h3>
                <p className="text-gray-300 text-center">
                  برای پیاده‌سازی راهکارهای پیشنهادی و دریافت مشاوره شخصی‌سازی شده
                </p>
              </div>

              <Glow>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    
                    <h4 className="text-xl font-bold mb-4">مشاوره دریافت کنید</h4>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      متخصصان ما آماده‌اند تا با شما در مورد پیاده‌سازی راهکارهای پیشنهادی 
                      و رشد کسب‌وکارتان گفتگو کنند
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link
                        href="/consultation"
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
                        data-analytics="click_consultation_from_agent"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        درخواست مشاوره
                      </Link>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>پاسخ در کمتر از 24 ساعت</span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>مشاوره تخصصی</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>راهنمایی عملی</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>پشتیبانی کامل</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Glow>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        {!resp?.ok && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">آماده برای تحلیل هوشمند؟</h3>
              <p className="text-gray-300 mb-6 text-center">
                فرم بالا را پر کنید تا تحلیل کاملی از کسب‌وکارتان دریافت کنید و 
                راهکارهای عملی برای رشد آن را ببینید.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>تحلیل هوشمند</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>پاسخ فوری</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>راهکارهای عملی</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}


