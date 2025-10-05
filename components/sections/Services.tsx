'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ServiceCard from '../ui/ServiceCard';
import { servicesContent } from '../../lib/content/services';
import { usePathname } from 'next/navigation';

/**
 * Services section
 * Features: Responsive grid layout, B2B/B2C service cards, pricing display
 * 
 * RTL: Right-to-left text alignment and proper spacing
 * A11y: Semantic H2, proper focus management, aria-labels
 * Analytics: View tracking on mount, service CTA tracking
 * Performance: Lightweight animations, no heavy dependencies
 * 
 * Layout: Responsive grid (1col mobile → 2col tablet → 3col desktop)
 * Content: All text/pricing from /lib/content/services.ts
 */

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const pathname = usePathname();

  // Analytics: Dispatch view event on mount
  useEffect(() => {
    const dispatchViewEvent = () => {
      const event = new CustomEvent('analytics', {
        detail: { action: 'view_services' }
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
      data-analytics="view_services"
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
            {servicesContent.heading}
          </h2>
          <p 
            className="inline-block text-lg md:text-xl leading-relaxed text-center max-w-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            {servicesContent.lead}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-12 mb-12"
        >
          {(useMemo(() => {
            const isHome = pathname === '/';
            const items = isHome
              ? servicesContent.items.filter(item => item.key !== 'sales_chatbot')
              : servicesContent.items;
            return { items, isHome };
          }, [pathname])).items.map((service, index) => (
            <ServiceCard
              key={service.key}
              service={service}
              delay={index * 0.1}
              ctaHref={(pathname === '/' ? '/consultation' : undefined)}
              ctaText={(pathname === '/' ? 'درخواست مشاوره' : undefined)}
            />
          ))}
        </motion.div>

        {/* Micro CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href={servicesContent.microCta.href}
            className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 hover:shadow-lg group btn-ghost"
            data-analytics="click_services_all"
            aria-label="مشاهده همه خدمات"
          >
            <span>{servicesContent.microCta.text}</span>
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

