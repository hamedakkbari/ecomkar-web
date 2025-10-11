export interface FAQItem {
  key: string;
  q: string;
  a: string;
}

export interface MicroCTA {
  text: string;
  href: string;
}

export interface FAQContent {
  heading: string;
  lead?: string;
  items: FAQItem[];
  microCta?: MicroCTA;
}

export const faqContent: FAQContent = {
  heading: "سوالات متداول",
  lead: "اگر پاسخ سوالت اینجا نیست، با ما در تماس باش.",
  items: [
    {
      key: "setup_time",
      q: "راه‌اندازی ایجنت چقدر زمان می‌برد؟",
      a: "1 الی 6 هفته"
    },
    {
      key: "integrations",
      q: "به چه ابزارهایی وصل می‌شوید؟",
      a: "پیام‌رسان‌ها (تلگرام، واتساپ، اینستاگرام)، CRMها (HubSpot، Salesforce)، ایمیل (Gmail، Outlook)، پایگاه‌داده‌ها (Supabase، PostgreSQL)، پرداخت (زرین‌پال، Stripe)، شبکه‌های اجتماعی (یوتیوب، لینکدین) و هر API سفارشی که نیاز داشته باشید."
    },
    {
      key: "pricing",
      q: "قیمت‌گذاری چطور است؟",
      a: "بسته به دامنهٔ کار. برای تخمین سریع از قیمت‌های «از-قیمت» در بخش خدمات شروع کن."
    },
    {
      key: "security",
      q: "مسائل امنیتی و حریم خصوصی چگونه مدیریت می‌شود؟",
      a: "کلیدها در ENV امن نگهداری می‌شوند؛ دسترسی‌ها حداقل‌سازی و لاگ‌گیری کنترل‌شده است؛ به درخواست شما NDA امضا می‌شود."
    },
    {
      key: "support",
      q: "پشتیبانی بعد از راه‌اندازی دارید؟",
      a: "بله؛ پلن‌های نگه‌داری و بهینه‌سازی داریم (ماهانه/فصلی) شامل مانیتورینگ و به‌روزرسانی قوانین."
    },
    {
      key: "course",
      q: "آیا دورهٔ آموزشی هم دارید؟",
      a: "بله، «دورهٔ ساخت AI Agent» با دسترسی دائمی و آپدیت‌های مداوم—جزئیات در بخش Course."
    }
  ],
  microCta: { 
    text: "درخواست مشاوره", 
    href: "/consultation" 
  }
};
