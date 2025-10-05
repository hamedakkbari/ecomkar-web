'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import TestimonialCard from '../ui/TestimonialCard';
import { testimonialsContent } from '../../lib/content/testimonials';

/**
 * Testimonials & Logos Wall section
 * Features: Customer testimonials grid, company logos wall, social proof
 * 
 * RTL: Right-to-left text alignment and proper spacing
 * A11y: Semantic structure with proper heading hierarchy
 * Analytics: Testimonial and logo tracking
 * Performance: Lightweight animations, no heavy dependencies
 * 
 * Layout: Responsive grid (1col mobile → 2col tablet → 3col desktop)
 * Content: All text/logos from /lib/content/testimonials.ts
 */

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Analytics: Dispatch view event on mount
  useEffect(() => {
    const dispatchViewEvent = () => {
      const event = new CustomEvent('analytics', {
        detail: { action: 'view_testimonials' }
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
        background: 'linear-gradient(to bottom, var(--surface-hover), transparent)'
      }}
      data-analytics="view_testimonials"
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
            {testimonialsContent.heading}
          </h2>
          {testimonialsContent.lead && (
            <p 
              className="inline-block text-lg md:text-xl leading-relaxed text-center max-w-none"
              style={{ color: 'var(--text-secondary)' }}
            >
              {testimonialsContent.lead}
            </p>
          )}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-12 mb-16"
        >
          {testimonialsContent.items.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.key}
              testimonial={testimonial}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Logos Wall */}
        {testimonialsContent.logos && testimonialsContent.logos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 md:mt-10"
            data-analytics="view_logos_wall"
          >
            <div className="mb-6">
              <p 
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                مورد اعتماد تیم‌ها و کسب‌وکارهای پیشرو
              </p>
            </div>
            
            <div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center"
              role="list"
            >
              {testimonialsContent.logos.map((logo, index) => (
                <motion.div
                  key={logo.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                  className="group flex items-center justify-center"
                  role="listitem"
                >
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block transition-transform duration-200 group-hover:scale-105"
                      data-analytics="click_logo"
                      data-prop={logo.key}
                      aria-label={`Visit ${logo.name}`}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt || logo.name}
                        width={120}
                        height={40}
                        className={`h-10 md:h-12 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200 ${logo.className || ''}`}
                      />
                    </a>
                  ) : (
                    <div className="transition-transform duration-200 group-hover:scale-105">
                      <Image
                        src={logo.src}
                        alt={logo.alt || logo.name}
                        width={120}
                        height={40}
                        className={`h-10 md:h-12 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200 ${logo.className || ''}`}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Micro Copy */}
        {testimonialsContent.microCopy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-8"
          >
            <p 
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {testimonialsContent.microCopy}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

