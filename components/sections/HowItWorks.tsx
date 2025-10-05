'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import StepCard from '../ui/StepCard';
import { agentFlowContent } from '../../lib/content/agentFlow';

/**
 * How It Works / Agent Flow section
 * Features: Zigzag timeline layout, 6-step agent architecture, RTL support
 * 
 * RTL: Right-to-left text alignment and proper spacing
 * A11y: Semantic H2, proper focus management, aria-labels
 * Analytics: View tracking on mount, step tracking on cards
 * Performance: Lightweight animations, no heavy dependencies
 * 
 * Layout: Desktop zigzag timeline, mobile single column
 * Content: All text/icons from /lib/content/agentFlow.ts
 */

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Analytics: Dispatch view event on mount
  useEffect(() => {
    const dispatchViewEvent = () => {
      const event = new CustomEvent('analytics', {
        detail: { action: 'view_agent_flow' }
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
      data-analytics="view_agent_flow"
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
            {agentFlowContent.heading}
          </h2>
          <p 
            className="inline-block text-lg md:text-xl leading-relaxed text-center max-w-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            {agentFlowContent.lead}
          </p>
        </motion.div>

        {/* Agent Flow Steps */}
        <div className="relative">
          {/* Central Vertical Line - Desktop */}
          <div className="hidden xl:block pointer-events-none" aria-hidden>
            <div 
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px"
              style={{
                background: 'linear-gradient(to bottom, var(--accent-green), var(--primary-neon), var(--secondary-purple))'
              }}
            />
            {/* Glow */}
            <div 
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 blur-2xl opacity-40"
              style={{
                background: 'linear-gradient(to bottom, var(--accent-green), var(--primary-neon), var(--secondary-purple))'
              }}
            />
          </div>

          {/* Mobile/Tablet left-side guide line (very subtle) */}
          <div className="xl:hidden pointer-events-none" aria-hidden>
            <div 
              className="absolute inset-y-0 left-4 w-px"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 229, 255, 0.2), rgba(122, 92, 255, 0.2), rgba(0, 255, 163, 0.2))'
              }}
            />
          </div>

          {/* Desktop: Alternating Timeline */}
          <div className="hidden xl:block relative">
            <div className="space-y-14">
              {agentFlowContent.steps.map((step, index) => (
                <div 
                  key={step.key}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <StepCard
                    step={step}
                    index={index}
                    isEven={index % 2 === 0}
                    delay={index * 0.1}
                    showConnector={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: Single Column */}
          <div className="xl:hidden space-y-6">
            {agentFlowContent.steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <StepCard
                  step={step}
                  index={index}
                  isEven={false}
                  delay={0}
                  showConnector={false}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Micro CTA removed per request */}
      </div>
    </section>
  );
}

