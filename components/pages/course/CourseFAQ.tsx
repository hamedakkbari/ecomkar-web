'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface CourseFAQProps {
  faqs: FAQItem[];
}

export default function CourseFAQ({ faqs }: CourseFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);

    // Analytics
    if (typeof window !== 'undefined') {
      const ev = new CustomEvent('analytics', { 
        detail: { 
          action: 'toggle_course_faq',
          prop: index.toString()
        } 
      });
      window.dispatchEvent(ev);
    }
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openItems.has(index);
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full p-6 text-right flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`faq-${index}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white text-right">
                  {faq.q}
                </h3>
              </div>
              
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Answer */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`faq-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-white/10">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="text-gray-300 leading-relaxed pt-4"
                    >
                      {faq.a}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

