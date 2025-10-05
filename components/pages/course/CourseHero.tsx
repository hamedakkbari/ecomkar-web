'use client';

import { motion } from 'framer-motion';
import { Play, CheckCircle, Clock, Users } from 'lucide-react';
import type { CoursePricing } from '../../../lib/content/pages/course';

interface CourseHeroProps {
  heading: string;
  sub: string;
  media?: {
    type: 'image' | 'video';
    src: string;
    alt: string;
    poster?: string;
  };
  highlights: string[];
  pricing: CoursePricing;
}

export default function CourseHero({ 
  heading, 
  sub, 
  media, 
  highlights, 
  pricing 
}: CourseHeroProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {heading}
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              {sub}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Micro Proof */}
            {pricing.bullets && pricing.bullets.length > 0 && (
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>دسترسی دائمی</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>آپدیت‌های رایگان</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Media */}
          {media && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                {media.type === 'video' ? (
                  <video
                    className="w-full h-auto"
                    poster={media.poster}
                    muted
                    loop
                    playsInline
                    aria-label={media.alt}
                  >
                    <source src={media.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={media.src}
                    alt={media.alt}
                    className="w-full h-auto"
                  />
                )}
                
                {/* Play Overlay for Video */}
                {media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

