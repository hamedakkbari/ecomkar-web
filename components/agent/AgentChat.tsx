"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Message from "./Message";
import SuggestionsBar from "./SuggestionsBar";
import type { AgentContent, QuickIntent } from "@/lib/content/agent";
import type { Message as MessageType } from "@/lib/types/agent";

interface AgentChatProps {
  content: AgentContent;
  sessionId: string;
  messages: MessageType[];
  onNewMessage: (message: string) => void;
  onBlocksUpdate: (blocks: any) => void;
  isLoading: boolean;
  errors: { [key: string]: string };
}

export default function AgentChat({ 
  content, 
  sessionId, 
  messages, 
  onNewMessage, 
  onBlocksUpdate, 
  isLoading, 
  errors 
}: AgentChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input after session starts
  useEffect(() => {
    if (sessionId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue("");
    setIsTyping(true);
    
    try {
      onNewMessage(message);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion: QuickIntent) => {
    setInputValue(suggestion.label);
    // Auto-send suggestion
    setTimeout(() => {
      setIsTyping(true);
      onNewMessage(suggestion.label);
      setIsTyping(false);
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 800) {
      setInputValue(value);
    }
  };

  return (
    <div 
      className="flex flex-col h-full"
      style={{ color: 'var(--text-primary)' }}
    >
      {/* Header */}
      <div 
        className="relative p-6 border-b backdrop-blur-md"
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="flex items-center space-x-3 space-x-reverse">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            style={{
              background: 'linear-gradient(135deg, var(--primary-neon), var(--secondary-purple))'
            }}
          >
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 
              className="text-lg font-extrabold gradient-text"
              style={{ color: 'var(--text-primary)' }}
            >
              ایجنت معمار EcomKar
            </h3>
            <p 
              className="text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              در حال آنلاین
            </p>
          </div>
        </div>
      </div>

      {/* Suggestions Bar */}
      <div 
        className="p-4 border-b backdrop-blur-md"
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <SuggestionsBar
          suggestions={content.quickIntents}
          onSuggestionClick={handleSuggestionClick}
          disabled={isLoading || isTyping}
        />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden p-8 space-y-6">
        {messages.length === 0 ? (
          <motion.div
            className="text-center py-12"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
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
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <p 
              className="text-xl font-bold mb-3 gradient-text"
              style={{ color: 'var(--text-primary)' }}
            >
              خوش آمدید!
            </p>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              سوالات خود را بپرسید تا راه‌حل‌های عملی دریافت کنید.
            </p>
          </motion.div>
        ) : (
          messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              isLatest={index === messages.length - 1}
            />
          ))
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            className="flex justify-start mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-[80%]">
              <div 
                className="px-4 py-3 rounded-2xl rounded-bl-md backdrop-blur-md border"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-card)'
                }}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="flex space-x-1 space-x-reverse">
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ 
                        background: 'var(--primary-neon)',
                        animationDelay: "0ms" 
                      }} 
                    />
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ 
                        background: 'var(--primary-neon)',
                        animationDelay: "150ms" 
                      }} 
                    />
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ 
                        background: 'var(--primary-neon)',
                        animationDelay: "300ms" 
                      }} 
                    />
                  </div>
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {content.chat.thinkingLabel}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {errors.general && (
          <motion.div
            className="bg-red-900/20 border border-red-800/50 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-red-300 text-center">
              {errors.general}
            </p>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div 
        className="relative border-t p-8 backdrop-blur-md"
        style={{
          borderTop: '1px solid var(--border)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <form onSubmit={handleSubmit} className="flex space-x-4 space-x-reverse">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={content.chat.placeholder}
              className="w-full px-6 py-4 border rounded-xl focus:ring-2 focus:border-transparent resize-none backdrop-blur-md transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-control)',
                color: 'var(--text-primary)'
              }}
              rows={1}
              disabled={isLoading || isTyping}
              aria-label="پیام خود را بنویسید"
            />
            <div className="flex justify-between items-center mt-3">
              <span 
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {inputValue.length}/800
              </span>
              <span 
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Enter برای ارسال، Shift+Enter برای خط جدید
              </span>
            </div>
          </div>
          
          <motion.button
            type="submit"
            disabled={!inputValue.trim() || isLoading || isTyping}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
              !inputValue.trim() || isLoading || isTyping
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "btn-primary"
            }`}
            data-analytics="agent_msg_send"
            whileHover={inputValue.trim() && !isLoading && !isTyping ? { scale: 1.05 } : {}}
            whileTap={inputValue.trim() && !isLoading && !isTyping ? { scale: 0.95 } : {}}
          >
            {isLoading || isTyping ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="flex items-center space-x-2 space-x-reverse">
                <span>{content.chat.sendLabel}</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
