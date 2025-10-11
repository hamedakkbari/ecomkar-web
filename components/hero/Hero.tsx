'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, Play, Calendar, Zap, Clock, Shield, Gauge, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';
import AgentDock from './AgentDock';
import AgentDemoModal from './AgentDemoModal';
import heroContent from '../../lib/content/hero';

export default function Hero() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isMagneticActive, setIsMagneticActive] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });

  // Typing animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Magnetic effect for desktop CTA
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current || window.innerWidth < 1024) return;
      
      const rect = ctaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      
      if (distance < 100) {
        setIsMagneticActive(true);
        ctaRef.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
      } else {
        setIsMagneticActive(false);
        ctaRef.current.style.transform = 'translate(0, 0) scale(1)';
      }
    };

    const handleMouseLeave = () => {
      if (ctaRef.current) {
        setIsMagneticActive(false);
        ctaRef.current.style.transform = 'translate(0, 0) scale(1)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const iconMap = { Clock, Shield, Gauge, TrendingUp, DollarSign };
  const kpiData = heroContent.kpiData.map(item => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap]
  }));

  const trustLogos = heroContent.trustLogos;

  return (
    <section 
      ref={heroRef}
      className="relative z-0 min-h-screen flex items-center justify-center overflow-hidden mt-3 sm:mt-4"
      data-analytics="view_hero"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(11, 15, 20, 0.4), rgba(11, 15, 20, 0.6))' }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Bottom Gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ 
            background: 'linear-gradient(to top, var(--background), rgba(11, 15, 20, 0.5), transparent)' 
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-0 container mx-auto px-4 max-w-screen-xl xl:max-w-[1400px]">
        <div className="max-w-[780px] md:max-w-none mx-auto text-right">
          
          {/* Welcome Typed Line - Clickable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              href="/agent"
              className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-control)',
                color: 'var(--text-primary)'
              }}
              data-analytics="click_agent_pill_hero"
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--accent-green)' }}
              />
              <span className="font-medium group-hover:text-cyan-300 transition-colors duration-200">
                {isTypingComplete ? (
                  'سلام، من ایجنت ایکام‌کارم — این فقط شروع یه گفت‌وگو نیست، نقطه‌ی آغاز عصر هوشمندسازی کسب‌وکار توئه'
                ) : (
                  <span className="inline-block">
                    سلام، من ایجنت ایکام‌کارم — این فقط شروع یه گفت‌وگو نیست، نقطه‌ی آغاز عصر هوشمندسازی کسب‌وکار توئه
                    <span className="animate-pulse">|</span>
                  </span>
                )}
              </span>
            </Link>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(1.75rem,6vw,2.5rem)] sm:text-[clamp(2rem,7vw,3rem)] md:text-[clamp(2.75rem,4.5vw,4rem)] lg:text-[clamp(3.25rem,4vw,4.5rem)] xl:text-[clamp(3.75rem,4vw,5rem)] font-bold mb-6 leading-[1.05] md:leading-[1.08] sm:whitespace-normal md:whitespace-nowrap tracking-tight md:max-w-none gradient-text"
          >
            <span dir="ltr" className="inline-block">EcomKar</span>؛ هوشی که همه‌چیز را خودکار می‌کند
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-[68ch] md:max-w-none sm:whitespace-normal md:whitespace-nowrap mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            {heroContent.subheading}
          </motion.p>

          {/* Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-3 mb-8"
          >
            {[
              'ساخت ایجنت‌های هوشمند',
              'اتوماسیون هوشمند برای رشد کسب‌وکار ها',
              'هوش مصنوعی را به خدمت بگیر، نه صرفاً یاد بگیر'
            ].map((bullet, index) => (
              <div key={index} className="flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                <Zap className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--primary-neon)' }} />
                <span>{bullet}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <Link
              href={heroContent.ctaPrimary.href}
              className="group relative px-8 py-4 font-semibold rounded-xl transition-all duration-300 shadow-lg text-center btn-primary"
              data-analytics={heroContent.ctaPrimary.analytics}
            >
              <Play className="w-5 h-5 inline-block ml-2" />
              {heroContent.ctaPrimary.text}
            </Link>
            
            <Link
              href={heroContent.ctaSecondary.href}
              className="px-8 py-4 font-semibold rounded-xl transition-all duration-300 text-center btn-ghost"
              data-analytics={heroContent.ctaSecondary.analytics}
            >
              <Calendar className="w-5 h-5 inline-block ml-2" />
              {heroContent.ctaSecondary.text}
            </Link>
          </motion.div>

          {/* Micro-copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-sm mb-8"
            style={{ color: 'var(--text-muted)' }}
          >
            {heroContent.microCopy}
          </motion.div>

          {/* KPI Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {kpiData.map((kpi, index) => {
              // Custom SVG icons for each KPI
              const getCustomIcon = (label: string) => {
                if (label.includes('رشد فروش')) {
                  return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11zm4-2h2v12h-2V9z"/>
                    </svg>
                  );
                } else if (label.includes('کاهش هزینه')) {
                  return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  );
                } else if (label.includes('فعالیت مداوم')) {
                  return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  );
                }
                return null;
              };

              return (
                <motion.div 
                  key={index} 
                  className="group relative"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="relative backdrop-blur-xl rounded-xl p-4 text-center transition-all duration-300 card"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-card)'
                    }}
                  >
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-xl opacity-50" />
                    
                    {/* Icon */}
                    <div 
                      className="relative z-10 mb-3 transition-colors duration-300"
                      style={{ color: 'var(--primary-neon)' }}
                    >
                      {getCustomIcon(kpi.label)}
                    </div>
                    
                    {/* Value */}
                    <div 
                      className="relative z-10 text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300"
                      style={{ 
                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        fontVariantNumeric: 'tabular-nums',
                        fontFeatureSettings: '"tnum"',
                        unicodeBidi: 'bidi-override',
                        direction: 'ltr',
                        background: 'linear-gradient(135deg, #00E5FF 0%, #7A5CFF 50%, #00FFA3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
                      }}
                    >
                      {kpi.value}
                    </div>
                    
                    {/* Label */}
                    <div 
                      className="relative z-10 text-sm transition-colors duration-300 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {kpi.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {trustLogos.map((logo, index) => (
                <div 
                  key={index} 
                  className="w-16 h-8 rounded flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-control)'
                  }}
                >
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-0"
      >
        <a
          href="#next"
          className="flex flex-col items-center gap-2 transition-colors duration-300"
          style={{ color: 'var(--text-muted)' }}
          aria-label="اسکرول به پایین"
        >
          <span className="text-sm">ادامه</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>

      {/* Agent Dock */}
      <AgentDock />
    </section>
  );
}

