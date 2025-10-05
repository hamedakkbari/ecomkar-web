/**
 * Hero section content configuration
 * Centralized content source for Hero component
 */

export interface HeroContent {
  heading: string;
  subheading: string;
  ctaPrimary: {
    text: string;
    href: string;
    analytics: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
    analytics: string;
  };
  microCopy: string;
  kpiData: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
  trustLogos: Array<{
    name: string;
    src: string;
  }>;
}

export default {
  heading: "EcomKar؛ هوشی که همه‌چیز را خودکار می‌کند",
  subheading: "ایجنت‌هایی که فروش، پشتیبانی و عملیاتت را خودکار می‌کنند؛ بی‌وقفه، دقیق و در حال رشد.",
  ctaPrimary: {
    text: "دوره AI AGENT",
    href: "/course",
    analytics: "click_hero_cta_primary"
  },
  ctaSecondary: {
    text: "درخواست مشاوره",
    href: "/consultation",
    analytics: "click_hero_cta_secondary"
  },
  microCopy: "پاسخ فوری • بدون خستگی • مقیاس‌پذیر",
  kpiData: [
    { icon: "TrendingUp", value: "+40%", label: "رشد فروش با AI Agent" },
    { icon: "DollarSign", value: "-70%", label: "کاهش هزینه‌های عملیاتی" },
    { icon: "Clock", value: "24/7", label: "فعالیت مداوم بدون خطا" }
  ],
  trustLogos: []
} as HeroContent;
