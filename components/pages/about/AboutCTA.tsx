"use client";

import { motion } from "framer-motion";

interface AboutCTAProps {
  label: string;
  href: string;
}

export default function AboutCTA({ label, href }: AboutCTAProps) {
  return (
    <section dir="rtl" className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-8 bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl text-center"
      >
        
        <a
          href={href}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          data-analytics="click_about_cta"
        >
          درخواست مشاوره
        </a>
      </motion.div>
    </section>
  );
}


