'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

/**
 * Reusable IconCard component for Highlights section
 * Features: Glass morphism, hover effects, RTL support, accessibility
 * 
 * RTL: Right-to-left text alignment and spacing
 * A11y: Focus-visible, aria-labels, semantic structure
 * Analytics: Click tracking with data attributes
 */

interface IconCardProps {
  icon: string;
  title: string;
  desc: string;
  href: string;
  analytics: string;
  delay?: number;
}

export default function IconCard({ 
  icon, 
  title, 
  desc, 
  href, 
  analytics,
  delay = 0 
}: IconCardProps) {
  // Dynamic icon import from lucide-react
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div 
        className="h-full p-4 md:p-6 backdrop-blur-md rounded-2xl transition-all duration-300 focus-within:ring-2 focus-within:outline-none card"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)'
        }}
      >
        {/* Icon */}
        <div className="mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(122, 92, 255, 0.2))',
              borderRadius: 'var(--radius-control)'
            }}
          >
            {IconComponent && (
              <IconComponent 
                className="w-6 h-6 transition-colors duration-300"
                style={{ color: 'var(--primary-neon)' }}
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 
            className="text-lg font-semibold transition-all duration-300 group-hover:scale-105 gradient-text"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h3>
          
          <p 
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {desc}
          </p>

          {/* Learn More Link */}
          <div className="pt-2">
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group/link"
              style={{ color: 'var(--primary-neon)' }}
              data-analytics={analytics}
              aria-label={`بیشتر دربارهٔ ${title}`}
            >
              <span>بیشتر بدانید</span>
              <svg 
                className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

