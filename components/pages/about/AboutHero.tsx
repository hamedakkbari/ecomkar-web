"use client";

import { motion } from "framer-motion";
import type { AboutPage } from "@/lib/content/pages/about";

interface AboutHeroProps {
  hero: AboutPage["hero"];
}

export default function AboutHero({ hero }: AboutHeroProps) {
  return (
    <section dir="rtl" className="text-center mb-12">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold text-[#E6F1FF] mb-3"
      >
        {hero.heading}
      </motion.h1>
      {hero.sub && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-lg text-[#9FB3C8] mb-3"
        >
          {hero.sub}
        </motion.p>
      )}
      {hero.proof && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-block px-3 py-1 text-sm text-cyan-300 bg-cyan-500/10 border border-white/10 rounded-full"
        >
          {hero.proof}
        </motion.span>
      )}
    </section>
  );
}


