/**
 * Services Grid Component
 * Displays services in a responsive grid with filtering capabilities
 */

"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Workflow, Bot, MessageCircle, Video, ShoppingCart, Target } from "lucide-react";
import type { ServicePage, ServiceItem } from "@/lib/content/pages/services";
import ServiceDetailModal from "@/components/pages/services/ServiceDetailModal";

interface ServicesGridProps {
  content: ServicePage;
}

// Icon mapping for services
const iconMap = {
  Workflow,
  Bot,
  MessageCircle,
  Video,
  ShoppingCart,
  Target
};

export default function ServicesGrid({ content }: ServicesGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Filter services based on active filter
  const filteredServices = useMemo(() => {
    if (activeFilter === "all") return content.items;
    
    return content.items.filter(service => {
      switch (activeFilter) {
        case "b2b":
          return service.type === "B2B";
        case "b2c":
          return service.type === "B2C";
        case "agent":
          return service.key.includes("agent") || service.key.includes("chatbot");
        case "automation":
          return service.key.includes("automation") || service.key.includes("workflow");
        default:
          return true;
      }
    });
  }, [content.items, activeFilter]);

  const handleFilterClick = (filterKey: string) => {
    setActiveFilter(filterKey);
  };

  const handleOpenService = (service: ServiceItem, triggerEl?: HTMLElement | null) => {
    lastFocusedRef.current = triggerEl || (document.activeElement as HTMLElement | null);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      lastFocusedRef.current?.focus?.();
    }, 0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          {content.heading}
        </h1>
        {content.lead && (
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {content.lead}
          </p>
        )}
      </div>

      {/* Filters */}
      {content.filters && content.filters.length > 0 && (
        <div role="tablist" aria-label="فیلتر خدمات" className="flex flex-wrap justify-center gap-3 mb-12">
          {content.filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                id={`services-filter-${filter.key}`}
                onClick={() => handleFilterClick(filter.key)}
                data-analytics="filter_services"
                data-prop={filter.key}
                role="tab"
                aria-selected={isActive}
                aria-controls="services-grid"
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Services Grid */}
      <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => {
          const IconComponent = iconMap[service.icon as keyof typeof iconMap];
          
          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
            >
              {/* Service Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-600/20 rounded-xl group-hover:bg-blue-600/30 transition-colors">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  service.type === "B2B" 
                    ? "bg-green-600/20 text-green-400" 
                    : "bg-purple-600/20 text-purple-400"
                }`}>
                  {service.type}
                </span>
              </div>

              {/* Service Title & Description */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Service Features */}
              <ul className="space-y-2 mb-6">
                {service.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 ml-3 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Service Details */}
              <div className="space-y-3 mb-6">
                {service.priceFrom && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">قیمت از:</span>
                    <span className="text-lg font-semibold text-green-400">
                      {service.priceFrom}
                    </span>
                  </div>
                )}
                {service.sla && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">زمان تحویل:</span>
                    <span className="text-sm text-blue-400">{service.sla}</span>
                  </div>
                )}
                {service.outcome && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">نتیجه:</span>
                    <span className="text-sm text-yellow-400">{service.outcome}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex gap-3">
                <button
                  onClick={(e) => handleOpenService(service, e.currentTarget)}
                  data-analytics="open_service_detail"
                  data-prop={service.key}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  جزئیات بیشتر
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Section */}
      {content.cta && (
        <div className="text-center mt-12">
          <a
            href={content.cta.href}
            data-analytics="click_services_contact"
            data-prop="page_cta"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {content.cta.label}
          </a>
        </div>
      )}

      <ServiceDetailModal service={selectedService} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

