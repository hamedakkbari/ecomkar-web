/**
 * Course Pricing Card Component
 * Displays pricing information with guarantee and CTA
 */

"use client";

import { motion } from "framer-motion";
import { CheckCircle, Shield, Clock, Users } from "lucide-react";
import type { CoursePricing } from "@/lib/content/pages/course";

interface PricingCardProps {
  pricing: CoursePricing;
  onEnrollClick: () => void;
}

export default function PricingCard({ pricing, onEnrollClick }: PricingCardProps) {
  const handleEnrollClick = () => {
    onEnrollClick();
    
    // Analytics event
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (command: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as unknown as { gtag: (command: string, action: string, params?: Record<string, unknown>) => void }).gtag("event", "click_course_enroll", {
        pricing_value: pricing.value
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/10 rounded-full translate-y-12 -translate-x-12" />
        
        {/* Header */}
        <div className="relative z-10 text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            {pricing.label}
          </h3>
          <div className="text-4xl font-bold text-blue-400 mb-2">
            {pricing.value}
          </div>
          {pricing.note && (
            <p className="text-sm text-gray-400">
              {pricing.note}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="relative z-10 space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>دسترسی مادام‌العمر به محتوا</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>گروه تلگرام اختصاصی</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>جلسات Q&A هفتگی</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>پروژه عملی و گواهی</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>پشتیبانی 24/7</span>
          </div>
        </div>

        {/* Guarantee */}
        {pricing.guarantee && (
          <div className="relative z-10 mb-8 p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
            <div className="flex items-center gap-3 text-green-400">
              <Shield className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                {pricing.guarantee}
              </span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <a
          href="/checkout"
          onClick={handleEnrollClick}
          data-analytics="click_course_enroll"
          className="relative z-10 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
        >
          ثبت‌نام در دوره
        </a>

        {/* Additional Info */}
        <div className="relative z-10 mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>ظرفیت محدود</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

