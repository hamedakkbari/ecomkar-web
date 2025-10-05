"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CopyButtonProps {
  data: any;
  blockKey: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ data, blockKey, label = "کپی", className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      let textToCopy: string;
      
      if (typeof data === "string") {
        textToCopy = data;
      } else if (Array.isArray(data)) {
        textToCopy = data.map((item, index) => {
          if (typeof item === "object") {
            return `${index + 1}. ${JSON.stringify(item, null, 2)}`;
          }
          return `${index + 1}. ${item}`;
        }).join("\n\n");
      } else if (typeof data === "object") {
        textToCopy = JSON.stringify(data, null, 2);
      } else {
        textToCopy = String(data);
      }

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`inline-flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        copied 
          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
      } ${className}`}
      aria-label={`کپی ${label}`}
      data-analytics="agent_copy_block"
      data-prop={blockKey}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>کپی شد!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
}
