/**
 * Service Detail Modal Component
 * Shows detailed information about a service in a modal
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ServiceItem } from "@/lib/content/pages/services";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      // focus trap: focus the close button initially
      setTimeout(() => firstFocusableRef.current?.focus?.(), 0);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!service) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCTAClick = () => {
    // delegated analytics via data-analytics
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-dialog-title"
            ref={dialogRef}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 id="service-dialog-title" className="text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-300">
                    {service.description}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="بستن"
                  ref={firstFocusableRef}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Problem & Solution */}
              {service.detail && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-red-400 mb-3">
                        مشکل
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {service.detail.problem}
                      </p>
                    </div>
                    <div className="bg-green-900/20 border border-green-800/50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-green-400 mb-3">
                        راه‌حل
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {service.detail.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      تکنولوژی‌های استفاده شده
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {service.detail.stack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium border border-blue-800/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Implementation Steps */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      مراحل پیاده‌سازی
                    </h3>
                    <div className="space-y-3">
                      {service.detail.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-gray-300 leading-relaxed pt-1">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ */}
                  {service.detail.faq && service.detail.faq.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        سوالات متداول
                      </h3>
                      <div className="space-y-4">
                        {service.detail.faq.map((faq, index) => (
                          <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                            <h4 className="text-lg font-medium text-white mb-2">
                              {faq.q}
                            </h4>
                            <p className="text-gray-300 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Service Summary */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  خلاصه سرویس
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {service.priceFrom && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {service.priceFrom}
                      </div>
                      <div className="text-sm text-gray-400">قیمت از</div>
                    </div>
                  )}
                  {service.sla && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {service.sla}
                      </div>
                      <div className="text-sm text-gray-400">زمان تحویل</div>
                    </div>
                  )}
                  {service.outcome && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">
                        {service.outcome}
                      </div>
                      <div className="text-sm text-gray-400">نتیجه مورد انتظار</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-6 rounded-b-2xl">
              <div className="flex gap-4">
                <a
                  href={(service.detail?.cta?.href) || "/contact"}
                  onClick={handleCTAClick}
                  data-analytics="click_service_detail_contact"
                  data-prop={service.key}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-center"
                >
                  {(service.detail?.cta?.label) || "درخواست جلسه"}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

