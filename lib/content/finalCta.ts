export interface CTAButton {
  label: string;
  href: string;
}

export interface FinalCTAContent {
  heading: string;
  lead?: string;
  primaryCta: CTAButton;
  secondaryCta?: CTAButton;
  microCopy?: string;
  variant?: "band" | "card";
  tone?: "neon" | "glass";
}

export const finalCtaContent: FinalCTAContent = {
  heading: "آماده‌ای ایجنتت را فعال کنی؟",
  lead: "همین امروز با یک دموی زنده شروع کن یا جلسهٔ سریع رزرو کن.",
  primaryCta: {
    label: "دموی ایجنت",
    href: "/agent"
  },
  secondaryCta: {
    label: "جلسه ۱۵ دقیقه‌ای",
    href: "/contact"
  },
  microCopy: "بدون پیش‌پرداخت • پاسخ فوری • قابل اندازه‌گیری",
  variant: "band",
  tone: "neon"
};
