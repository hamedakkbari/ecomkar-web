/**
 * Content schema for Course Promo section
 * Modular content separation for easy updates without UI changes
 * RTL-first design with Persian content
 * 
 * Course promotion with pricing, guarantee, and media
 */

export interface PriceInfo {
  label: string;
  value: string;
  note?: string;
}

export interface GuaranteeInfo {
  text: string;
  icon?: string; // lucide icon name
}

export interface MediaInfo {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string; // for video
}

export interface CTAButton {
  label: string;
  href: string;
}

export interface CoursePromoContent {
  heading: string;
  lead: string;
  bullets: string[]; // 3-4 items
  price: PriceInfo;
  guarantee?: GuaranteeInfo;
  media?: MediaInfo;
  primaryCta: CTAButton;
  secondaryCta?: CTAButton;
  microCopy?: string;
}

export const coursePromoContent: CoursePromoContent = {
  heading: "دوره ساخت AI AGENT با هوش‌مصنوعی (پروژه محور)",
  lead: "مسیر تبدیل شدن به یک AI Engineer حرفه‌ای",
  bullets: [
    "پروژه‌محور",
    "ساخت درآمد غیرفعال با اتوماسیون",
    "طراحی پروژه واقعی برای بیزنس‌ها",
    "تمرین‌های واقعی B2B/B2C"
  ],
  price: {
    label: "قیمت",
    value: "12,900,000 تومان"
  },
  media: {
    type: "image",
    src: "/media/ecomkar-agent-cover.png",
    alt: "کاور دوره ایجنت EcomKar (تصویر ربات)"
  },
  primaryCta: {
    label: "ثبت‌نام دوره",
    href: "/checkout"
  },
  secondaryCta: {
    label: "سرفصل‌ها و جزئیات",
    href: "/course#curriculum"
  },
  microCopy: "دسترسی دائمی + آپدیت‌های مداوم"
};

