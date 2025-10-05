/**
 * Services page content schema
 * Comprehensive service offerings with filtering and detailed information
 */

export type ServiceType = "B2B" | "B2C";

export interface ServiceFilter {
  key: string;
  label: string;
}

export interface ServiceDetail {
  problem: string;
  solution: string;
  stack: string[];
  steps: string[];
  faq?: Array<{ q: string; a: string }>;
  cta: { label: string; href: string };
}

export interface ServiceItem {
  key: string;
  type: ServiceType;
  icon: string;                 // lucide icon name
  title: string;
  description: string;
  bullets: string[];            // 3–5 key features
  priceFrom?: string;
  sla?: string;
  outcome?: string;
  detail?: ServiceDetail;
}

export interface ServicePage {
  heading: string;
  lead?: string;
  filters?: ServiceFilter[];
  items: ServiceItem[];
  cta?: { label: string; href: string };
  seo?: { title?: string; description?: string; image?: string };
}

export default {
  heading: "خدمات EcomKar",
  lead: "انتخاب کن؛ نقشه اجرا را بگیر.",
  filters: [
    { key: "all", label: "همه" },
    { key: "b2b", label: "B2B" },
    { key: "b2c", label: "B2C" },
    { key: "agent", label: "ایجنت" },
    { key: "automation", label: "اتوماسیون" }
  ],
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
      detail: {
        problem: "کارهای تکراری و دستی باعث کاهش بهره‌وری و افزایش خطا می‌شوند.",
        solution: "اتوماسیون کامل فرآیندها با n8n و اتصال API های مختلف.",
        stack: ["n8n", "Supabase", "Stripe", "Zapier", "Webhooks"],
        steps: [
          "تحلیل فرآیندهای موجود",
          "طراحی workflow اتوماسیون",
          "پیاده‌سازی با n8n",
          "تست و بهینه‌سازی",
          "آموزش تیم",
          "پشتیبانی و نگهداری"
        ],
        faq: [
          { q: "چه نوع فرآیندهایی قابل اتوماسیون هستند؟", a: "اکثر فرآیندهای تکراری مثل پردازش سفارشات، ارسال ایمیل، همگام‌سازی داده‌ها و گزارش‌گیری." },
          { q: "آیا نیاز به دانش فنی خاصی داریم؟", a: "خیر، ما تمام پیاده‌سازی را انجام می‌دهیم و آموزش کامل ارائه می‌کنیم." }
        ],
        cta: { label: "درخواست مشاوره", href: "/contact" }
      }
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
      detail: {
        problem: "مشتریان سوالات زیادی دارند اما پاسخ‌دهی 24/7 امکان‌پذیر نیست.",
        solution: "ایجنت هوشمند که به سوالات پاسخ می‌دهد و لید جمع‌آوری می‌کند.",
        stack: ["Next.js", "OpenAI", "Supabase", "Vercel", "Webhooks"],
        steps: [
          "تحلیل سوالات متداول",
          "طراحی شخصیت ایجنت",
          "پیاده‌سازی و آموزش",
          "اتصال به CRM",
          "تست و بهینه‌سازی",
          "راه‌اندازی و پشتیبانی"
        ],
        faq: [
          { q: "ایجنت چقدر هوشمند است؟", a: "با استفاده از GPT-4 و آموزش اختصاصی، قابلیت پاسخ‌دهی به 90% سوالات را دارد." },
          { q: "آیا می‌تواند به CRM متصل شود؟", a: "بله، به تمام CRM های رایج مثل HubSpot، Salesforce و Pipedrive متصل می‌شود." }
        ],
        cta: { label: "درخواست مشاوره", href: "/contact" }
      }
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
      detail: {
        problem: "مشتریان بالقوه در ساعات غیرکاری از دست می‌روند.",
        solution: "چت‌بات فروش که 24/7 فعال است و مشتریان را به خرید هدایت می‌کند.",
        stack: ["Dialogflow", "WhatsApp API", "Telegram Bot", "CRM Integration"],
        steps: [
          "تحلیل فرآیند فروش",
          "طراحی سناریوهای گفتگو",
          "پیاده‌سازی چت‌بات",
          "اتصال به کانال‌های ارتباطی",
          "تست و بهینه‌سازی",
          "راه‌اندازی و پشتیبانی"
        ],
        faq: [
          { q: "چت‌بات در چه پلتفرم‌هایی کار می‌کند؟", a: "WhatsApp، Telegram، وب‌سایت و اپلیکیشن‌های موبایل." },
          { q: "آیا می‌تواند پرداخت دریافت کند؟", a: "بله، با اتصال به درگاه‌های پرداخت ایرانی و خارجی." }
        ],
        cta: { label: "درخواست مشاوره", href: "/contact" }
      }
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
      detail: {
        problem: "تولید محتوای ویدیویی زمان‌بر و هزینه‌بر است.",
        solution: "اتوماسیون تولید ویدیو با AI برای محتوای وایرال.",
        stack: ["OpenAI", "RunwayML", "Canva API", "YouTube API", "Instagram API"],
        steps: [
          "تحلیل محتوای هدف",
          "تولید سناریو با AI",
          "ایجاد ویدیو خودکار",
          "بهینه‌سازی برای پلتفرم",
          "زمان‌بندی انتشار",
          "تحلیل عملکرد"
        ],
        faq: [
          { q: "چه نوع ویدیوهایی تولید می‌شود؟", a: "ویدیوهای آموزشی، معرفی محصول، تیزر و محتوای سرگرمی." },
          { q: "آیا کیفیت ویدیوها مناسب است؟", a: "بله، با استفاده از AI پیشرفته، کیفیت ویدیوها حرفه‌ای است." }
        ],
        cta: { label: "درخواست مشاوره", href: "/contact" }
      }
    },
    {
      key: "ecommerce_automation",
      type: "B2B",
      icon: "ShoppingCart",
      title: "اتوماسیون فروشگاه",
      description: "مدیریت خودکار موجودی، قیمت‌گذاری، و پشتیبانی.",
      bullets: ["همگام‌سازی موجودی", "قیمت‌گذاری پویا", "پشتیبانی خودکار"],
      priceFrom: "$2,000",
      sla: "2–3 هفته",
      outcome: "افزایش فروش تا 35%",
      detail: {
        problem: "مدیریت فروشگاه آنلاین پیچیده و زمان‌بر است.",
        solution: "اتوماسیون کامل فرآیندهای فروشگاه از موجودی تا پشتیبانی.",
        stack: ["WooCommerce", "Shopify", "n8n", "Supabase", "Stripe"],
        steps: [
          "تحلیل فرآیندهای فروشگاه",
          "اتصال به سیستم‌های موجود",
          "پیاده‌سازی اتوماسیون",
          "تست و بهینه‌سازی",
          "آموزش تیم",
          "پشتیبانی و نگهداری"
        ],
        faq: [
          { q: "با چه پلتفرم‌هایی سازگار است؟", a: "WooCommerce، Shopify، Magento و سایر پلتفرم‌های فروشگاه." },
          { q: "آیا موجودی خودکار به‌روزرسانی می‌شود؟", a: "بله، موجودی در تمام کانال‌ها به‌صورت خودکار همگام‌سازی می‌شود." }
        ],
        cta: { label: "درخواست مشاوره", href: "/contact" }
      }
    },
    {
      key: "lead_generation",
      type: "B2B",
      icon: "Target",
      title: "جمع‌آوری لید هوشمند",
      description: "شناسایی و جذب مشتریان بالقوه با AI.",
      bullets: ["شناسایی خودکار", "پیش‌بینی نیاز", "هدایت هدفمند"],
      priceFrom: "$1,800",
      sla: "1–2 هفته",
      outcome: "افزایش لید تا 60%",
      detail: {
        problem: "شناسایی و جذب مشتریان بالقوه دشوار و هزینه‌بر است.",
        solution: "سیستم هوشمند جمع‌آوری لید با استفاده از AI و اتوماسیون.",
        stack: ["OpenAI", "LinkedIn API", "Google Ads", "Facebook Ads", "CRM"],
        steps: [
          "تحلیل بازار هدف",
          "طراحی کمپین‌های جذب",
          "پیاده‌سازی سیستم هوشمند",
          "اتصال به کانال‌های بازاریابی",
          "تست و بهینه‌سازی",
          "راه‌اندازی و پشتیبانی"
        ],
        faq: [
          { q: "چگونه مشتریان بالقوه شناسایی می‌شوند؟", a: "با استفاده از AI و تحلیل رفتار آنلاین، مشتریان بالقوه شناسایی می‌شوند." },
          { q: "آیا با GDPR سازگار است؟", a: "بله، تمام قوانین حریم خصوصی و GDPR رعایت می‌شود." }
        ],
        cta: { label: "درخواست مشاوره", href: "/contact" }
      }
    }
  ],
  cta: { label: "درخواست جلسه", href: "/contact" },
  seo: {
    title: "خدمات EcomKar — ایجنت‌ها و اتوماسیون",
    description: "سرویس‌های EcomKar برای B2B و B2C: ایجنت سایت، چت‌بات فروش، اتوماسیون و تولید محتوا.",
    image: "/og.png"
  }
} as ServicePage;

