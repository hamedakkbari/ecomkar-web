/**
 * Contact Page Client Component
 */

"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import ContactFormFull from "../../../components/pages/contact/ContactFormFull";
import Footer from "../../../components/footer/Footer";
import contactContent from "../../../lib/content/pages/contact";

// Channel icon mapping
const channelIcons = {
  email: Mail,
  telegram: MessageCircle,
  whatsapp: MessageCircle,
  phone: Phone
};

export default function ContactPageClient() {
  return (
    <div data-analytics="view_page_contact">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {contactContent.heading}
          </motion.h1>
          {contactContent.lead && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              {contactContent.lead}
            </motion.p>
          )}
        </div>
      </section>

      {/* Contact Channels */}
      {contactContent.channels && contactContent.channels.length > 0 && (
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                راه‌های ارتباط با ما
              </h2>
              <p className="text-gray-300 text-lg">
                انتخاب کنید که چگونه با ما در ارتباط باشید
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactContent.channels.map((channel, index) => {
                const IconComponent = channelIcons[channel.key];
                
                return (
                  <motion.a
                    key={channel.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-analytics="click_contact_channel"
                    data-prop={channel.key}
                    className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-colors">
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 text-blue-400" />
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold text-white mb-2 ${
                      channel.key === "phone" || channel.key === "whatsapp" ? "text-left" : "text-center"
                    }`}>
                      {channel.label}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {channel.key === "email" && "پاسخ در کمتر از 24 ساعت"}
                      {channel.key === "telegram" && "پاسخ سریع و مستقیم"}
                      {channel.key === "whatsapp" && "چت مستقیم"}
                      {channel.key === "phone" && "تماس مستقیم"}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              فرم تماس
            </h2>
            <p className="text-gray-300 text-lg">
              پیام خود را برای ما ارسال کنید
            </p>
          </motion.div>

          <ContactFormFull form={contactContent.form} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

