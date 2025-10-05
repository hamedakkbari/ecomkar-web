/**
 * Content schema for Testimonials section
 * Modular content separation for easy updates without UI changes
 * RTL-first design with Persian content
 * 
 * Customer testimonials with KPIs and company logos
 * Note: Sample data - replace with real testimonials and KPIs
 */

export interface TestimonialItem {
  key: string;
  name: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  quote: string;       // ≤280 chars
  kpi?: string;        // e.g., "+22% Conversion"
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface LogoItem {
  key: string;
  name: string;
  src: string;
  href?: string;       // Optional link for logo
  alt?: string;        // Optional alt text, falls back to name
  className?: string;  // Optional custom styling per logo
}

export interface TestimonialsContent {
  heading: string;
  lead?: string;
  items: TestimonialItem[];
  logos?: LogoItem[];
  microCopy?: string;
}

export const testimonialsContent: TestimonialsContent = {
  heading: "صدای مشتریان",
  lead: "چند نظر کوتاه از تیم‌ها و کسب‌وکارهایی که با EcomKar رشد کردند.",
  items: [
    {
      key: "t1",
      name: "سارا رضایی",
      role: "Head of Growth",
      company: "NovaShop",
      quote: "ایجنت EcomKar باعث شد پاسخ‌گویی 24/7 واقعی بشه و نرخ تبدیل لید تا ۲۲٪ بالا بره.",
      kpi: "+22% Conversion",
      rating: 5
    },
    {
      key: "t2",
      name: "امیر احمدی",
      role: "COO",
      company: "Techlance",
      quote: "اتوماسیون n8n + ایجنت وب‌سایت، ۶۰٪ زمان تیم پشتیبانی رو آزاد کرد.",
      kpi: "-60% Support Time",
      rating: 5
    },
    {
      key: "t3",
      name: "نگین مرادی",
      role: "E-commerce Lead",
      company: "GigaMart",
      quote: "ایجنت یوتیوب برام هر روز طبق یک ساعت مشخصی محتوا میسازه و بصورت خودکار آپلود میکنه.",
      kpi: "Auto Content Creation",
      rating: 4
    }
  ],
  logos: [
    // Add your company logos here
    // Example:
    // { key: "companya", name: "Company A", src: "/logos/companya.svg", href: "https://companya.com" },
    // { key: "companyb", name: "Company B", src: "/logos/companyb.svg", alt: "Custom alt text" },
    // { key: "companyc", name: "Company C", src: "/logos/companyc.svg", className: "h-8" },
  ],
  microCopy: "نتایج ممکن است بسته به صنعت و مقیاس متفاوت باشد."
};

