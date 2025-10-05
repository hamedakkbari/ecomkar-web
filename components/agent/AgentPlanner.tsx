"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CopyButton from "./CopyButton";
import type { AgentContent } from "@/lib/content/agent";
import type { AgentBlocks, Recommendation, Idea, DayPlan } from "@/lib/types/agent";

interface AgentPlannerProps {
  content: AgentContent;
  blocks: AgentBlocks | null;
}

export default function AgentPlanner({ content, blocks }: AgentPlannerProps) {
  const [activeTab, setActiveTab] = useState<"automations" | "ideas" | "plan">("automations");

  if (!blocks) {
    return (
      <div 
        className="relative rounded-3xl shadow-2xl border p-8 overflow-hidden card"
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
        <div 
          className="relative text-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          <div 
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(122, 92, 255, 0.2))',
              borderRadius: 'var(--radius-card)'
            }}
          >
            <svg 
              className="w-10 h-10" 
              style={{ color: 'var(--primary-neon)' }}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p 
            className="text-xl font-semibold mb-3 gradient-text"
            style={{ color: 'var(--text-primary)' }}
          >
            منتظر پیشنهادات...
          </p>
          <p 
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            پس از شروع گفتگو، پیشنهادات و برنامه‌ها اینجا نمایش داده می‌شوند.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "automations" as const, label: content.planner.tabs.automations },
    { key: "ideas" as const, label: content.planner.tabs.ideas },
    { key: "plan" as const, label: content.planner.tabs.plan }
  ];

  const getImpactColor = (impact: "L" | "M" | "H") => {
    switch (impact) {
      case "H": return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
      case "M": return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30";
      case "L": return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
    }
  };

  const getImpactText = (impact: "L" | "M" | "H") => {
    switch (impact) {
      case "H": return "بالا";
      case "M": return "متوسط";
      case "L": return "پایین";
    }
  };

  return (
    <div 
      className="relative rounded-3xl shadow-2xl border overflow-hidden h-full flex flex-col card"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-hero)',
        color: 'var(--text-primary)'
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(0, 229, 255, 0.06), transparent 45%)'
        }}
      ></div>
      <div className="relative flex-1 flex flex-col">
      {/* Summary */}
      {blocks.summary && (
        <div 
          className="relative p-6 border-b backdrop-blur-md"
          style={{
            borderBottom: '1px solid var(--border)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
        >
          <h3 
            className="text-xl font-bold mb-3 gradient-text"
            style={{ color: 'var(--text-primary)' }}
          >
            خلاصه
          </h3>
          <p 
            className="leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {blocks.summary}
          </p>
        </div>
      )}

      {/* Tabs */}
      <div 
        className="relative border-b backdrop-blur-md"
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <nav className="flex space-x-8 space-x-reverse px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative py-4 px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${
                activeTab === tab.key
                  ? "border-transparent"
                  : "border-transparent"
              }`}
              style={{
                borderBottomColor: activeTab === tab.key ? 'var(--primary-neon)' : 'transparent',
                color: activeTab === tab.key ? 'var(--primary-neon)' : 'var(--text-muted)',
                background: activeTab === tab.key ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === "automations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 
                className="text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {content.planner.tabs.automations}
              </h3>
              <CopyButton
                data={blocks.recommendations}
                blockKey="recommendations"
                label="کپی همه"
              />
            </div>
            
            {blocks.recommendations.length > 0 ? (
              <div className="space-y-4">
                {blocks.recommendations.map((rec: Recommendation, index: number) => (
                  <motion.div
                    key={index}
                    className="rounded-lg p-4 border backdrop-blur-md card"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-card)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 
                        className="text-lg font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {rec.title}
                      </h4>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(rec.impact)}`}>
                          {getImpactText(rec.impact)}
                        </span>
                        <CopyButton
                          data={rec}
                          blockKey={`recommendation_${index}`}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          هدف:
                        </span>
                        <p 
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {rec.goal}
                        </p>
                      </div>
                      
                      <div>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          دستور n8n:
                        </span>
                        <p 
                          className="font-mono text-sm p-2 rounded"
                          style={{
                            color: 'var(--primary-neon)',
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-control)'
                          }}
                        >
                          {rec.recipe}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse text-sm">
                        <div>
                          <span 
                            className="font-medium"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            ابزارها:
                          </span>
                          <span 
                            className="mr-2"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {rec.tools.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span 
                            className="font-medium"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            زمان:
                          </span>
                          <span 
                            className="mr-2"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {rec.est_time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p 
                className="text-center py-8"
                style={{ color: 'var(--text-muted)' }}
              >
                هنوز پیشنهادی ارائه نشده است.
              </p>
            )}
          </div>
        )}

        {activeTab === "ideas" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {content.planner.tabs.ideas}
              </h3>
              <CopyButton
                data={blocks.ideas}
                blockKey="ideas"
                label="کپی همه"
              />
            </div>
            
            {blocks.ideas.length > 0 ? (
              <div className="space-y-4">
                {blocks.ideas.map((idea: Idea, index: number) => (
                  <motion.div
                    key={index}
                    className="rounded-lg p-4 border border-white/10 bg-white/5 backdrop-blur-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-medium text-white">
                        {idea.title}
                      </h4>
                      <CopyButton
                        data={idea}
                        blockKey={`idea_${index}`}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-300">مدل درآمد:</span>
                        <p className="text-gray-300/80">{idea.revenue_model}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-300">اولین قدم:</span>
                        <p className="text-gray-300/80">{idea.first_step}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-300">کانال‌های هدف:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {idea.target_channels.map((channel, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-white/10 text-amber-200 text-xs rounded-full border border-white/10"
                            >
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                هنوز ایده‌ای ارائه نشده است.
              </p>
            )}
          </div>
        )}

        {activeTab === "plan" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {content.planner.tabs.plan}
              </h3>
              <CopyButton
                data={blocks.plan_7d}
                blockKey="plan_7d"
                label="کپی برنامه"
              />
            </div>
            
            {blocks.plan_7d.length > 0 ? (
              <div className="space-y-4">
                {blocks.plan_7d.map((day: DayPlan, index: number) => (
                  <motion.div
                    key={index}
                    className="rounded-lg p-4 border border-white/10 bg-white/5 backdrop-blur-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-medium text-white">
                        روز {day.day}
                      </h4>
                      <CopyButton
                        data={day}
                        blockKey={`day_${day.day}`}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-300">وظایف:</span>
                        <ul className="list-disc list-inside text-gray-300/80 mt-1">
                          {day.tasks.map((task, idx) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-300">معیار موفقیت:</span>
                        <p className="text-gray-300/80">{day.success_criteria}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                هنوز برنامه‌ای ارائه نشده است.
              </p>
            )}
          </div>
        )}

        {/* Tips */}
        {blocks.tips && blocks.tips.length > 0 && (
          <div className="mt-8 p-4 bg-amber-900/10 border border-amber-800/30 rounded-lg">
            <h4 className="text-sm font-medium text-amber-300 mb-2">
              نکات مهم:
            </h4>
            <ul className="text-sm text-amber-200 space-y-1">
              {blocks.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2 space-x-reverse">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTAs */}
        <div 
          className="mt-8 p-6 backdrop-blur-md border-t"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderTop: '1px solid var(--border)'
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={content.planner.ctas.meeting.href}
            className="flex-1 px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 text-center btn-primary"
            data-analytics="click_agent_contact"
          >
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{content.planner.ctas.meeting.label}</span>
            </div>
          </Link>
          <Link
            href={content.planner.ctas.checkout.href}
            className="flex-1 px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 text-center btn-ghost"
            data-analytics="click_agent_checkout"
          >
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v1H8V6zm4 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
              </svg>
              <span>{content.planner.ctas.checkout.label}</span>
            </div>
          </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
