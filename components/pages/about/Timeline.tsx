/**
 * Timeline Component for About Page
 * Displays company history and milestones
 */

"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "@/lib/content/pages/about";

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <section dir="rtl" className="mb-12" aria-label="خط زمان">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl font-bold text-[#E6F1FF] mb-6 text-right"
      >
        خط زمان
      </motion.h2>

      <ul className="relative space-y-10">
        <div className="absolute right-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-indigo-500/50 to-purple-500/40" />
        {events.map((event, index) => (
          <li key={index} className="relative">
            <div className="absolute -right-2 top-1.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(0,229,255,0.5)]" aria-hidden />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="ml-6 mr-8 p-5 bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 text-xs rounded-full bg-cyan-500/15 text-cyan-300 border border-white/10">{event.year}</span>
              </div>
              <h3 className="text-[#E6F1FF] font-semibold mb-2">{event.title}</h3>
              <p className="text-[#9FB3C8] leading-7">{event.body}</p>
            </motion.div>
          </li>
        ))}
      </ul>
    </section>
  );
}

