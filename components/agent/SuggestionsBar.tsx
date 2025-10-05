"use client";

import { motion } from "framer-motion";
import type { QuickIntent } from "@/lib/content/agent";

interface SuggestionsBarProps {
  suggestions: QuickIntent[];
  onSuggestionClick: (suggestion: QuickIntent) => void;
  disabled?: boolean;
}

export default function SuggestionsBar({ suggestions, onSuggestionClick, disabled = false }: SuggestionsBarProps) {
  if (suggestions.length === 0) return null;

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 space-x-reverse">
        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
        <span className="text-sm font-semibold text-amber-200">
          پیشنهادات سریع:
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {suggestions.map((suggestion) => (
          <motion.button
            key={suggestion.key}
            onClick={() => onSuggestionClick(suggestion)}
            disabled={disabled}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
              disabled
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-white/5 text-white border border-white/10 hover:border-amber-400/30 hover:bg-white/10 hover:scale-105 shadow-sm hover:shadow-md"
            }`}
            data-analytics="agent_quick_intent"
            data-prop={suggestion.key}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            {suggestion.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
