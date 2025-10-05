'use client';

import { motion, useInView } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AgentStep } from '../../lib/content/agentFlow';

/**
 * Reusable StepCard component for Agent Flow section
 * Features: Glass morphism, timeline support, RTL layout, accessibility
 * 
 * RTL: Right-to-left text alignment and proper spacing
 * A11y: Semantic structure with proper heading hierarchy
 * Analytics: Step view tracking with data attributes
 * Timeline: Supports zigzag layout with connector lines
 */

interface StepCardProps {
  step: AgentStep;
  index: number;
  isEven: boolean;
  delay?: number;
  showConnector?: boolean;
}

export default function StepCard({ 
  step, 
  index, 
  isEven, 
  delay = 0,
  showConnector = true 
}: StepCardProps) {
  const cardId = `agent-step-${step.key}-${index}`;
  // Dynamic icon import from lucide-react
  const IconComponent = LucideIcons[step.icon as keyof typeof LucideIcons] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, x: isEven ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className={`relative ${isEven ? 'xl:pr-8' : 'xl:pl-8'}`}
      data-analytics="view_agent_step"
      data-prop={step.key}
      id={cardId}
    >
      {/* Timeline Connector (Desktop only) */}
      {showConnector && index < 5 && (
        <div
          className="hidden xl:block absolute top-1/2 -translate-y-1/2 h-px z-0"
          style={{ 
            width: '2rem',
            right: isEven ? '50%' : 'auto',
            left: isEven ? 'auto' : '50%',
            background: isEven
              ? 'linear-gradient(270deg, rgba(16,185,129,0.35) 0%, rgba(59,130,246,0.5) 60%, rgba(217,70,239,0) 100%)'
              : 'linear-gradient(90deg, rgba(16,185,129,0.35) 0%, rgba(59,130,246,0.5) 60%, rgba(217,70,239,0) 100%)'
          }}
        />
      )}

      {/* Center Dot on the main line */}
      <div className="hidden xl:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 shadow-lg"
           style={{ 
             left: 'calc(50% - 0.375rem)',
             background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 60%, #D946EF 100%)',
             boxShadow: '0 0 18px rgba(59,130,246,0.35)'
           }}
      />

      {/* Card Content */}
      <div className={`relative z-20 ${isEven ? 'xl:ml-auto xl:max-w-md' : 'xl:mr-auto xl:max-w-md'}`}>
        <div 
          className="group h-full p-6 backdrop-blur-md rounded-2xl transition-all duration-300 shadow-sm card"
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
              className="text-lg md:text-xl font-semibold transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
            >
              {step.title}
            </h3>
            
            <p 
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {step.desc}
            </p>

            {/* Example */}
            <div 
              className="pt-2"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <div 
                className="text-xs md:text-sm font-medium mb-1"
                style={{ color: 'var(--primary-neon)' }}
              >
                مثال عملی:
              </div>
              <p 
                className="text-xs md:text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {step.example}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

