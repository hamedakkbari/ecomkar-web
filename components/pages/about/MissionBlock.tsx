"use client";

import { motion } from "framer-motion";

interface MissionBlockProps {
  title: string;
  body: string;
}

export default function MissionBlock({ title, body }: MissionBlockProps) {
  return (
    <section dir="rtl" className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl font-bold text-[#E6F1FF] mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-[#9FB3C8] leading-8 max-w-3xl"
      >
        {body}
      </motion.p>
    </section>
  );
}


