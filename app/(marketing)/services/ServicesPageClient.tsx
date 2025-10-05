/**
 * Services Page Client Component
 * Handles client-side functionality like state and analytics
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ServicesGrid from "../../../components/pages/services/ServicesGrid";
import ServiceDetailModal from "../../../components/pages/services/ServiceDetailModal";
import Footer from "../../../components/footer/Footer";
import servicesContent from "../../../lib/content/pages/services";
import type { ServiceItem } from "../../../lib/content/pages/services";

// Analytics component for page view tracking
function PageAnalytics() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (command: string, action: string, params?: Record<string, unknown>) => void }).gtag) {
      (window as unknown as { gtag: (command: string, action: string, params?: Record<string, unknown>) => void }).gtag("event", "view_page_services");
    }
  }, []);

  return null;
}

export default function ServicesPageClient() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleServiceClick = (service: ServiceItem) => {
  //   setSelectedService(service);
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <PageAnalytics />
      <div data-analytics="view_page_services">
        {/* Hero Section */}
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              {servicesContent.heading}
            </motion.h1>
            {servicesContent.lead && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
              >
                {servicesContent.lead}
              </motion.p>
            )}
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-900">
          <ServicesGrid content={servicesContent} />
        </section>

        {/* CTA Section */}
        {servicesContent.cta && (
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
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-300 mb-8"
              >
                با تیم متخصص ما تماس بگیرید و بهترین راه‌حل را برای کسب‌وکارتان پیدا کنید
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                href={servicesContent.cta.href}
                data-analytics="click_services_cta"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                {servicesContent.cta.label}
              </motion.a>
            </div>
          </section>
        )}

        {/* Service Detail Modal */}
        <ServiceDetailModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        <Footer />
      </div>
    </>
  );
}

