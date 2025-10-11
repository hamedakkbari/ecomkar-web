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
