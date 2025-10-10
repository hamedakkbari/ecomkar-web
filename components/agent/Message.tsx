"use client";

import { motion } from "framer-motion";
import type { Message } from "@/lib/types/agent";

interface MessageProps {
  message: Message;
  isLatest?: boolean;
}

export default function Message({ message, isLatest = false }: MessageProps) {
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
        {/* Message bubble */}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-gradient-to-r from-amber-500 to-rose-500 text-black rounded-br-md shadow-md"
              : "bg-white/5 text-white border border-white/10 backdrop-blur-md rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* EcomKar Analysis Blocks */}
        {!isUser && message.blocks && (
          <motion.div
            className="mt-3 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Summary Block */}
            {message.blocks.summary && (
              <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
                <h4 className="text-sm font-bold text-cyan-300 mb-2 flex items-center">
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  تحلیل هوشمند EcomKar
                </h4>
                <p className="text-xs text-cyan-100 leading-relaxed">
                  {message.blocks.summary}
                </p>
              </div>
            )}

            {/* Agents Block */}
            {message.blocks.agents && message.blocks.agents.length > 0 && (
              <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4">
                <h4 className="text-sm font-bold text-purple-300 mb-3 flex items-center">
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ایجنت‌های پیشنهادی
                </h4>
                <div className="space-y-2">
                  {message.blocks.agents.slice(0, 3).map((agent: any, idx: number) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-purple-200">{agent.name}</span>
                        <span className="text-xs text-purple-300">{agent.est_time}</span>
                      </div>
                      <p className="text-xs text-purple-100 mb-2">{agent.why}</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.tools?.slice(0, 3).map((tool: string, toolIdx: number) => (
                          <span key={toolIdx} className="text-xs bg-purple-400/20 text-purple-200 px-2 py-0.5 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Actions Block */}
            {message.blocks.next_actions && message.blocks.next_actions.length > 0 && (
              <div className="rounded-xl border border-green-400/30 bg-green-500/10 p-4">
                <h4 className="text-sm font-bold text-green-300 mb-3 flex items-center">
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  گام‌های بعدی
                </h4>
                <ul className="space-y-1">
                  {message.blocks.next_actions.slice(0, 4).map((action: string, idx: number) => (
                    <li key={idx} className="text-xs text-green-100 flex items-start">
                      <span className="text-green-400 ml-2 mt-0.5">•</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Timestamp */}
        <div className={`text-xs text-gray-400 mt-1 ${isUser ? "text-left" : "text-right"}`}>
          {timestamp}
        </div>
      </div>
      
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? "bg-gradient-to-r from-amber-500 to-rose-500 order-1 ml-3" : "bg-white/10 border border-white/10 order-2 mr-3"
      }`}>
        {isUser ? (
          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </motion.div>
  );
}
