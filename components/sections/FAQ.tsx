"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqContent, type FAQContent } from "@/lib/content/faq";

interface FAQProps {
  content?: FAQContent;
}

export default function FAQ({ content = faqContent }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Analytics: Dispatch view event on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dispatch analytics event
      const event = new CustomEvent("analytics", {
        detail: {
          action: "view_faq",
          data: { section: "faq" }
        }
      });
      window.dispatchEvent(event);
    }
  }, []);

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      
      // Analytics: Dispatch toggle event
      if (typeof window !== "undefined") {
        const event = new CustomEvent("analytics", {
          detail: {
            action: "toggle_faq",
            data: { key, isOpen: newSet.has(key) }
          }
        });
        window.dispatchEvent(event);
      }
      
      return newSet;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent, key: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleItem(key);
    }
  };

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8"
      data-analytics="view_faq"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E6F1FF] mb-4">
            {content.heading}
          </h2>
          {content.lead && (
            <p className="inline-block text-lg text-[#9FB3C8] text-center max-w-none">
              {content.lead}
            </p>
          )}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {content.items.map((item, index) => {
            const isOpen = openItems.has(item.key);
            
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-[#0B0F14]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#00E5FF]/10">
                  <button
                    onClick={() => toggleItem(item.key)}
                    onKeyDown={(e) => handleKeyDown(e, item.key)}
                    className="w-full px-6 py-5 text-right flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14] transition-all duration-200"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.key}`}
                    data-analytics="toggle_faq"
                    data-prop={item.key}
                  >
                    <span className="text-[#E6F1FF] font-medium text-lg leading-relaxed flex-1 ml-4">
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown 
                        className="w-5 h-5 text-[#9FB3C8] group-hover:text-[#00E5FF] transition-colors duration-200" 
                        aria-hidden="true"
                      />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.key}`}
                        role="region"
                        aria-labelledby={`faq-question-${item.key}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-[#9FB3C8] leading-relaxed text-base">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Micro CTA */}
        {content.microCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={content.microCta.href}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00E5FF] to-[#7A5CFF] text-[#0B0F14] font-medium rounded-xl hover:shadow-lg hover:shadow-[#00E5FF]/25 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
              data-analytics="click_faq_contact"
            >
              {content.microCta.text}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
