/**
 * About Page Client Component
 */

"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import Timeline from "../../../components/pages/about/Timeline";
import TeamGrid from "../../../components/pages/about/TeamGrid";
import Footer from "../../../components/footer/Footer";
import aboutContent from "../../../lib/content/pages/about";

export default function AboutPageClient() {
  return (
    <div data-analytics="view_page_about">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {aboutContent.hero.heading}
          </motion.h1>
          {aboutContent.hero.sub && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              {aboutContent.hero.sub}
            </motion.p>
          )}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">
                {aboutContent.mission.title}
              </h2>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              {aboutContent.mission.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Timeline events={aboutContent.timeline} />
        </div>
      </section>

      {/* Team Section */}
      {aboutContent.team && aboutContent.team.length > 0 && (
        <section className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <TeamGrid members={aboutContent.team} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      {aboutContent.cta && (
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              آماده شروع همکاری هستید؟
            </motion.h2>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              href={aboutContent.cta.href}
              data-analytics="click_about_cta"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              {aboutContent.cta.label}
            </motion.a>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

