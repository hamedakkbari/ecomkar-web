'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ServiceItem } from '../../lib/content/services';

/**
 * Reusable ServiceCard component for Services section
 * Features: Glass morphism, pricing display, SLA, outcome, CTA
 * 
 * RTL: Right-to-left text alignment and proper spacing
 * A11y: Semantic structure with proper heading hierarchy
 * Analytics: Service CTA tracking with data attributes
 * Pricing: Formatted price display with SLA information
 */

interface ServiceCardProps {
  service: ServiceItem;
  delay?: number;
}

export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  // Dynamic icon import from lucide-react
  const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as LucideIcon;

  // Service type badge colors
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'B2B':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'B2C':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group h-full"
    >
      <div 
        className="h-full p-6 backdrop-blur-md rounded-2xl transition-all duration-300 relative card"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)'
        }}
      >
        {/* Service Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getBadgeColor(service.type)}`}>
            {service.type}
          </span>
        </div>

        {/* Optional Flags */}
        {service.flags?.limited && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full">
              ظرفیت محدود
            </span>
          </div>
        )}

        {service.flags?.draft && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full">
              پیش‌نویس
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="mb-4 mt-8">
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
        <div className="space-y-4">
          {/* Title */}
          <h3 
            className="text-lg font-semibold transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            {service.title}
          </h3>
          
          {/* Description */}
          <p 
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {service.description}
          </p>

          {/* Key Features */}
          <div className="space-y-2">
            {service.bullets.map((bullet, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--primary-neon)' }}
                />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* Pricing & SLA */}
          <div 
            className="pt-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div 
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                از قیمت
              </div>
              <div 
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {service.priceFrom}
              </div>
            </div>
            <div 
              className="flex items-center justify-between text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>زمان تحویل</span>
              <span>{service.sla}</span>
            </div>
          </div>

          {/* Outcome */}
          <div 
            className="p-3 rounded-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-control)'
            }}
          >
            <div 
              className="text-xs font-medium mb-1"
              style={{ color: 'var(--primary-neon)' }}
            >
              نتیجه قابل‌سنجش:
            </div>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-primary)' }}
            >
              {service.outcome}
            </p>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Link
              href={service.ctaHref}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-xl transition-all duration-200 shadow-lg btn-primary"
              data-analytics="click_service_cta"
              data-prop={service.key}
              aria-label={`درخواست جلسه برای ${service.title}`}
            >
              <span>درخواست جلسه</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

