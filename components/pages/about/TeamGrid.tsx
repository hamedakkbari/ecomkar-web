"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/content/pages/about";

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  if (!members || members.length === 0) return null;

  return (
    <section dir="rtl" className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl font-bold text-[#E6F1FF] mb-6"
      >
        تیم
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((m, idx) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 + idx * 0.05 }}
            className="group p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md border border-white/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="text-center">
              <div className="text-[#E6F1FF] font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                {m.name}
              </div>
              <div className="text-[#9FB3C8] text-sm group-hover:text-cyan-200 transition-colors duration-300">
                {m.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
