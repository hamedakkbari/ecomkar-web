/**
 * Content schema for Services section
 * Modular content separation for easy updates without UI changes
 * RTL-first design with Persian content
 * 
 * B2B and B2C service offerings with pricing, SLA, and outcomes
 */

export type ServiceType = "B2B" | "B2C";

export interface ServiceFlags {
  limited?: boolean;
  draft?: boolean;
}

export interface ServiceItem {
  key: string;
  type: ServiceType;
  icon: string;        // lucide-react icon name
  title: string;       // Short title (2-4 words)
  description: string; // One-line description ≤90 chars
  bullets: string[];   // 3 key features, each ≤8-10 words
  priceFrom: string;   // Display format (e.g., "$1,500" or "13M Toman")
  sla: string;         // Approximate time range (e.g., "1–2 هفته")
  outcome: string;     // One-line measurable outcome
  ctaHref: string;
  flags?: ServiceFlags; // Optional flags for limited/draft status
}

export interface MicroCTA {
  text: string;
  href: string;
}

export interface ServicesContent {
  heading: string;
  lead: string;
  items: ServiceItem[];
  microCta: MicroCTA;
}

export const servicesContent: ServicesContent = {
  heading: "خدمات EcomKar",
  lead: "راهکارهای آمادهٔ اجرا برای خودکارسازی، رشد، و مقیاس‌پذیری.",
  items: [
    {
      key: "b2b_automation",
      type: "B2B",
      icon: "Workflow",
      title: "اتوماسیون هوشمند",
      description: "حذف کارهای دستی، اتصال سیستم‌ها، تحویل سریع.",
      bullets: ["یکپارچگی n8n + API", "کاهش خطا", "گزارش‌دهی بلادرنگ"],
      priceFrom: "$3,000",
      sla: "2–4 هفته",
      outcome: "تا 70% کاهش زمان عملیات",
      ctaHref: "/consultation"
    },
    {
      key: "agent_site",
      type: "B2B",
      icon: "Bot",
      title: "ایجنت سایت",
      description: "پاسخ خودکار، جمع‌آوری لید، هدایت فروش.",
      bullets: ["دموی تعاملی", "آموزش مداوم", "اتصال CRM"],
      priceFrom: "$1,500",
      sla: "1–2 هفته",
      outcome: "افزایش کانورژن ورودی تا 25%",
      ctaHref: "/consultation"
    },
    {
      key: "sales_chatbot",
      type: "B2B",
      icon: "MessageCircle",
      title: "چت‌بات فروش",
      description: "پاسخ 24/7 با پیشنهاد شخصی‌سازی‌شده.",
      bullets: ["NLU پیشرفته", "اسکریپت فروش", "A/B تست پیام"],
      priceFrom: "$1,200",
      sla: "1–2 هفته",
      outcome: "افزایش نرخ پاسخ تا 40%",
      ctaHref: "/consultation"
    },
    {
      key: "b2c_video_ai",
      type: "B2C",
      icon: "Video",
      title: "ویدیو وایرال AI",
      description: "تولید محتوای یوتیوب/اینستاگرام با اتوماسیون.",
      bullets: ["سناریونویسی", "ادیت هوشمند", "زمان‌بندی انتشار"],
      priceFrom: "$600",
      sla: "3–7 روز",
      outcome: "رشد ارگانیک و جذب لید",
      ctaHref: "/consultation"
    }
  ],
  microCta: {
    text: "مشاهده همهٔ خدمات",
    href: "/services"
  }
};

