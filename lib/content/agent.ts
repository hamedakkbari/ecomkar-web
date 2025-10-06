/**
 * Agent Architect content and configuration
 */

export interface IntakeField {
  key: string;
  label: string;
  options?: string[];
  placeholder?: string;
  multi?: boolean;
}

export interface QuickIntent {
  key: string;
  label: string;
}

export interface AgentContent {
  page: {
    title: string;
    lead: string;
  };
  n8n?: {
    intakeWebhook?: string;
    messageWebhook?: string;
  };
  intake: {
    heading: string;
    fields: IntakeField[];
    consentLabel: string;
    startLabel: string;
  };
  chat: {
    placeholder: string;
    sendLabel: string;
    thinkingLabel: string;
  };
  quickIntents: QuickIntent[];
  planner: {
    tabs: {
      automations: string;
      ideas: string;
      plan: string;
    };
    ctas: {
      meeting: { label: string; href: string };
      checkout: { label: string; href: string };
    };
  };
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export const agentContent = {
  page: {
    title: "ایجنت معمار EcomKar",
    lead: "اطلاعات کسب‌وکارت را وارد کن تا با هوش مصنوعی تحلیل کاملی از فرصت‌های بهبود و اتوماسیون دریافت کنی."
  },
  n8n: {
    intakeWebhook: process.env.NEXT_PUBLIC_N8N_CHATBOT_WEBHOOK,
    messageWebhook: process.env.NEXT_PUBLIC_N8N_CHATBOT_WEBHOOK
  },
  intake: {
    heading: "اطلاعات کسب‌وکار",
    fields: [
      { 
        key: "website_url", 
        label: "آدرس وب‌سایت", 
        placeholder: "yourwebsite.com" 
      },
      {
        key: "instagram_url",
        label: "آدرس اینستاگرام",
        placeholder: "@username"
      },
      { 
        key: "business_type", 
        label: "نوع کسب‌وکار", 
        options: ["فروشگاه آنلاین", "خدمات B2B", "آموزش", "B2C", "سایر"] 
      },
      { 
        key: "primary_goal", 
        label: "هدف اصلی", 
        options: ["افزایش فروش", "خودکارسازی پشتیبانی", "افزایش لید", "بهبود UX", "کاهش هزینه‌ها"] 
      },
      { 
        key: "channels", 
        label: "کانال‌های فروش", 
        options: ["وب‌سایت", "اینستاگرام", "تلگرام", "واتساپ", "ایمیل", "فیزیکی"], 
        multi: true 
      },
      { 
        key: "current_tools", 
        label: "ابزارهای فعلی", 
        placeholder: "مثلاً WordPress + Zarinpal + WhatsApp" 
      },
      { 
        key: "budget", 
        label: "بودجه ماهانه", 
        options: ["کمتر از ۵ میلیون", "۵-۱۵ میلیون", "۱۵-۳۰ میلیون", "بیش از ۳۰ میلیون"] 
      },
      {
        key: "phone",
        label: "شماره تماس",
        placeholder: "0912xxxxxxx"
      },
      {
        key: "email",
        label: "ایمیل",
        placeholder: "you@example.com"
      }
    ],
    consentLabel: "با تحلیل و ارتباط از طریق ایمیل/پیام موافقم",
    startLabel: "شروع تحلیل"
  },
  chat: {
    placeholder: "پیام خود را بنویسید...",
    sendLabel: "ارسال",
    thinkingLabel: "در حال فکر کردن..."
  },
  quickIntents: [
    { key: "website_analysis", label: "تحلیل وب‌سایت من" },
    { key: "sales_boost", label: "افزایش فروش" },
    { key: "automation", label: "خودکارسازی فرآیندها" },
    { key: "chatbot", label: "چت‌بات هوشمند" },
    { key: "seo_improvement", label: "بهبود SEO" },
    { key: "conversion_optimization", label: "بهینه‌سازی تبدیل" }
  ],
  planner: {
    tabs: {
      analysis: "تحلیل وب‌سایت",
      automations: "پیشنهادات اتوماسیون",
      ideas: "ایده‌های درآمدزا",
      plan: "برنامه اجرایی"
    },
    ctas: {
      meeting: { label: "جلسه مشاوره رایگان", href: "/contact" },
      checkout: { label: "درخواست پیاده‌سازی", href: "/checkout" }
    }
  },
  seo: {
    title: "ایجنت معمار EcomKar - تحلیل هوشمند کسب‌وکار",
    description: "تحلیل کامل وب‌سایت و کسب‌وکار با هوش مصنوعی. دریافت پیشنهادات عملی برای افزایش فروش، خودکارسازی و بهبود عملکرد.",
    image: "/og.png"
  }
} as AgentContent;

export default agentContent;
