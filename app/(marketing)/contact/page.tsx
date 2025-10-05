/**
 * Contact Page - Contact form and communication channels
 */

import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo/pageMeta";
import contactContent from "@/lib/content/pages/contact";
import ContactFormFull from "@/components/pages/contact/ContactFormFull";
import ContactChannels from "@/components/pages/contact/ContactChannels";

export const metadata: Metadata = generatePageMeta({
  title: contactContent.seo?.title,
  description: contactContent.seo?.description,
  image: contactContent.seo?.image,
  url: "/contact",
});

export default function ContactPage() {
  return (
    <div dir="rtl" data-analytics="view_page_contact" className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 text-right">
        <h1 
          className="text-3xl font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {contactContent.heading}
        </h1>
        {contactContent.lead && (
          <p style={{ color: 'var(--text-secondary)' }}>
            {contactContent.lead}
          </p>
        )}
      </header>

      {contactContent.channels && contactContent.channels.length > 0 && (
        <div className="mb-10">
          <ContactChannels channels={contactContent.channels} />
        </div>
      )}

      <ContactFormFull form={contactContent.form} />
    </div>
  );
}