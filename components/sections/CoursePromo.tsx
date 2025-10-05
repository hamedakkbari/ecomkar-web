'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { coursePromoContent } from '../../lib/content/coursePromo';

/**
 * Course Promo section
 * Features: Two-column layout, course pricing, guarantee, media display
 * 
 * RTL: Right-to-left text alignment and proper spacing
 * A11y: Semantic structure with proper heading hierarchy
 * Analytics: Course promotion tracking
 * Performance: Lightweight animations, no heavy dependencies
 * 
 * Layout: Desktop two-column (7/5 ratio), mobile single column
 * Content: All text/pricing from /lib/content/coursePromo.ts
 */

export default function CoursePromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Analytics: Dispatch view event on mount
  useEffect(() => {
    const dispatchViewEvent = () => {
      const event = new CustomEvent('analytics', {
        detail: { action: 'view_course_promo' }
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
      data-analytics="view_course_promo"
    >
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content Column (7/12 on desktop) */}
          <div className="lg:col-span-7 max-w-[780px] mx-auto lg:mx-0 text-right">
            
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {coursePromoContent.heading}
            </motion.h2>

            {/* Lead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {coursePromoContent.lead}
            </motion.p>

            {/* Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 mb-8"
            >
              {coursePromoContent.bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90">{bullet}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Price & Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              {/* Price */}
              <div className="flex items-center gap-4 mb-4">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl">
                  <div className="text-sm text-blue-300 font-medium mb-1">
                    {coursePromoContent.price.label}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {coursePromoContent.price.value}
                  </div>
                </div>
                
                {/* Guarantee Badge */}
                {coursePromoContent.guarantee && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-300 font-medium">
                      {coursePromoContent.guarantee.text}
                    </span>
                  </div>
                )}
              </div>

              {/* Price Note */}
              {coursePromoContent.price.note && (
                <p className="text-sm text-orange-400 font-medium">
                  {coursePromoContent.price.note}
                </p>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <Link
                href={coursePromoContent.primaryCta.href}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                data-analytics="click_course_enroll"
              >
                <span>{coursePromoContent.primaryCta.label}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              {coursePromoContent.secondaryCta && (
                <Link
                  href={coursePromoContent.secondaryCta.href}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200"
                  data-analytics="click_course_curriculum"
                >
                  <span>{coursePromoContent.secondaryCta.label}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </motion.div>

            {/* Micro Copy */}
            {coursePromoContent.microCopy && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-sm text-gray-400 text-center"
              >
                {coursePromoContent.microCopy}
              </motion.p>
            )}
          </div>

          {/* Media Column (5/12 on desktop) */}
          {coursePromoContent.media && (
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
              >
                {coursePromoContent.media.type === 'video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={coursePromoContent.media.poster}
                    className="w-full h-auto"
                  >
                    <source src={coursePromoContent.media.src} type="video/mp4" />
                    {/* Fallback image for mobile */}
                    <Image
                      src={coursePromoContent.media.poster || coursePromoContent.media.src}
                      alt={coursePromoContent.media.alt}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </video>
                ) : (
                  <Image
                    src={coursePromoContent.media.src}
                    alt={coursePromoContent.media.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                )}
                
                {/* Play overlay for video */}
                {coursePromoContent.media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

