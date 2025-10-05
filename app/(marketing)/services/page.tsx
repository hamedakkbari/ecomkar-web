/**
 * Services Page - Comprehensive service offerings
 */

import type { Metadata } from "next";
import ServicesGrid from "@/components/pages/services/ServicesGrid";
import servicesContent from "@/lib/content/pages/services";
import { generateServicesMetaFromContent } from "@/lib/seo/pageMeta";

export const metadata: Metadata = generateServicesMetaFromContent(servicesContent);

export default function ServicesPage() {
  return (
    <div dir="rtl" data-analytics="view_page_services">
      <ServicesGrid content={servicesContent} />
    </div>
  );
}
