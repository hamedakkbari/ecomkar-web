'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import IconCard from '../ui/IconCard';
import { highlightsContent } from '../../lib/content/highlights';

/**
 * Highlights/Value Props section
 * Features: 3-column responsive grid, glass morphism cards, RTL support
 * 
 * RTL: Right-to-left text alignment and proper spacing
 * A11y: Semantic H2, proper focus management, aria-labels
 * Analytics: View tracking on mount, click tracking on links
 * Performance: Lightweight animations, no heavy dependencies
 */

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Analytics: Dispatch view event on mount
  useEffect(() => {
    const dispatchViewEvent = () => {
      const event = new CustomEvent('analytics', {
        detail: { action: 'view_highlights' }
      });
      window.dispatchEvent(event);
    };

    if (isInView) {
      dispatchViewEvent();
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24"
      style={{
        background: 'linear-gradient(to bottom, transparent, var(--surface-hover))'
      }}
      data-analytics="view_highlights"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {highlightsContent.heading}
          </h2>
          <p 
            className="inline-block text-lg md:text-xl leading-relaxed text-center max-w-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            {highlightsContent.lead}
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-12 mb-12"
        >
          {highlightsContent.items.map((item, index) => (
            <IconCard
              key={item.key}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              href={item.href}
              analytics={`click_highlight_learn`}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Micro CTA - Only show if text is not empty */}
        {highlightsContent.microCta.text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link
              href={highlightsContent.microCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 hover:shadow-lg group btn-ghost"
              data-analytics="click_highlights_all_services"
              aria-label="مشاهده همه خدمات"
            >
              <span>{highlightsContent.microCta.text}</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

