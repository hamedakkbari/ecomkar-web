'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TestimonialItem } from '../../lib/content/testimonials';

/**
 * Reusable TestimonialCard component for customer testimonials
 * Features: Avatar, quote, KPI badge, star rating, RTL support
 * 
 * RTL: Right-to-left text alignment and proper spacing
 * A11y: Semantic blockquote with cite, proper focus management
 * Analytics: Card view tracking with data attributes
 * Performance: Lightweight animations, no heavy dependencies
 */

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  delay?: number;
}

export default function TestimonialCard({ testimonial, delay = 0 }: TestimonialCardProps) {
  // Generate star rating display
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group h-full"
      data-analytics="view_testimonial_card"
      data-prop={testimonial.key}
    >
      <div 
        className="h-full p-6 backdrop-blur-md rounded-2xl transition-all duration-300 card"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)'
        }}
      >
        
        {/* Header: Name + Role */}
        <div className="mb-4">
          <h4 
            className="font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {testimonial.name}
          </h4>
          <p 
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            {testimonial.role && testimonial.company 
              ? `${testimonial.role}، ${testimonial.company}`
              : testimonial.role || testimonial.company || ''
            }
          </p>
        </div>

        {/* Quote */}
        <blockquote className="mb-4">
          <p 
            className="leading-relaxed text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            "{testimonial.quote}"
          </p>
          <cite className="sr-only">
            {testimonial.name}
            {testimonial.company && `، ${testimonial.company}`}
          </cite>
        </blockquote>

        {/* Footer: KPI + Rating */}
        <div 
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {/* KPI Badge */}
          {testimonial.kpi && (
            <div 
              className="px-3 py-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 163, 0.2), rgba(0, 229, 255, 0.2))',
                border: '1px solid var(--accent-green)',
                borderRadius: 'var(--radius-control)'
              }}
            >
              <span 
                className="text-xs font-medium"
                style={{ color: 'var(--accent-green)' }}
              >
                {testimonial.kpi}
              </span>
            </div>
          )}
          
          {/* Star Rating */}
          {testimonial.rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm">
                {renderStars(testimonial.rating)}
              </span>
              <span 
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {testimonial.rating}/5
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

