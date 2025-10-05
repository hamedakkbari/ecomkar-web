"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { finalCtaContent, type FinalCTAContent } from "@/lib/content/finalCta";

interface FinalCTAProps {
  content?: FinalCTAContent;
}

export default function FinalCTA({ content = finalCtaContent }: FinalCTAProps) {
  // Analytics: Dispatch view event on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("analytics", {
        detail: {
          action: "view_final_cta",
          data: { section: "final_cta" }
        }
      });
      window.dispatchEvent(event);
    }
  }, []);

  const handleCTAClick = (type: "demo" | "meeting") => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("analytics", {
        detail: {
          action: `click_final_${type}`,
          data: { cta_type: type }
        }
      });
      window.dispatchEvent(event);
    }
  };

  const isBand = content.variant === "band";
  const isNeon = content.tone === "neon";

  const containerClasses = isBand
    ? "w-full py-20 px-4 sm:px-6 lg:px-8"
    : "max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8";

  const backgroundClasses = isBand
    ? isNeon
      ? "bg-gradient-to-r from-[#00E5FF]/10 via-[#7A5CFF]/10 to-[#00E5FF]/10 relative overflow-hidden"
      : "bg-[#0B0F14]/80 backdrop-blur-xl border-t border-b border-white/10"
    : "bg-[#0B0F14]/80 backdrop-blur-xl border border-white/10 rounded-2xl";

  const contentClasses = isBand
    ? "max-w-4xl mx-auto text-center"
    : "text-center";

  return null;
}
