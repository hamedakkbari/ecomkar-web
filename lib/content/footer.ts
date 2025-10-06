export interface FooterLink {
  key: string;
  label: string;
  href: string;
}

export interface FooterSection {
  title?: string;
  items: FooterLink[];
}

export interface BrandInfo {
  logoSrc: string;
  name: string;
  tagline?: string;
  blurb?: string;
}

export interface ContactInfo {
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface LanguageConfig {
  default: "FA" | "EN";
  options: Array<"FA" | "EN">;
}

export interface ThemeConfig {
  default: "dark" | "light";
  options: Array<"dark" | "light">;
}

export interface BottomBar {
  copyright: string;
  language?: LanguageConfig;
  theme?: ThemeConfig;
}

export interface NewsletterConfig {
  enabled: boolean;
  title?: string;
  placeholder?: string;
  ctaLabel?: string;
  webhookEnv?: string;
}

export interface Badge {
  key: string;
  label: string;
}

export interface Extras {
  newsletter?: NewsletterConfig;
  badges?: Badge[];
}

export interface FooterContent {
  brand: BrandInfo;
  nav?: FooterSection;
  legal?: FooterSection;
  social?: FooterSection;
  contact?: ContactInfo;
  bottomBar: BottomBar;
  extras?: Extras;
}

export const footerContent: FooterContent = {
  brand: {
    logoSrc: "/logo.png",
    name: "EcomKar",
    tagline: "AI Agents & Automation",
    blurb: "ایجنت‌های هوشمند برای رشد، اتوماسیون و مقیاس‌پذیری کسب‌وکار شما."
  },
  nav: {
    title: "لینک‌ها",
    items: [
      { key: "services", label: "خدمات", href: "/services" },
      { key: "course", label: "دوره ایجنت", href: "/course" },
      { key: "about", label: "درباره", href: "/about" },
      
    ]
  },
  legal: {
    title: "قوانین",
    items: [
      { key: "terms", label: "شرایط استفاده", href: "/terms" },
      { key: "privacy", label: "حریم خصوصی", href: "/privacy" },
      
    ]
  },
  social: {
    title: "شبکه‌ها",
    items: [
      { key: "instagram", label: "اینستاگرام", href: "https://instagram.com/ecomkar" },
      { key: "telegram", label: "تلگرام", href: "https://t.me/ecomkar" },
      { key: "youtube", label: "یوتیوب", href: "https://youtube.com/@ecomkar" }
    ]
  },
  
  bottomBar: {
    copyright: "© 2025 EcomKar, Inc"
  },
  extras: {
    newsletter: {
      enabled: false,
      title: "خبرنامه",
      placeholder: "ایمیل شما",
      ctaLabel: "عضویت",
      webhookEnv: "N8N_WEBHOOK_NEWSLETTER"
    },
    badges: []
  }
};
