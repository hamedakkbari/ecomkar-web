/**
 * Contact page content schema
 * Contact information, channels, and form configuration
 */

export type ContactChannel = "email" | "telegram" | "whatsapp" | "phone";

export interface ContactChannelItem {
  key: ContactChannel;
  label: string;
  href: string;
}

export interface ContactFormField {
  key: "name" | "email" | "phone" | "company" | "message";
  label: string;
  placeholder: string;
  required?: boolean;
}

export interface ContactForm {
  fields: ContactFormField[];
  consentLabel: string;
  privacyHref: string;
  submitLabel: string;
  successText: string;   // پیام موفقیت
  errorText?: string;    // پیام کلی خطا (fallback)
  note?: string;         // micro-copy زیر فرم
}

export interface ContactPage {
  heading: string;
  lead?: string;
  channels?: ContactChannelItem[];
  form: ContactForm;
  seo?: { title?: string; description?: string; image?: string };
}

export default {
  heading: "تماس با ایکام‌کار",
  lead: "سریع‌ترین مسیر برای شروع همکاری.",
  channels: [
    { key: "email", label: "info@ecomkar.com", href: "mailto:hello@ecomkar.com" },
    { key: "telegram", label: "Telegram", href: "https://t.me/ecomkar" },
    { key: "whatsapp", label: "WhatsApp", href: "https://wa.me/989128497929" },
    { key: "phone", label: "09128497929", href: "tel:+989128497929" }
  ],
  form: {
    fields: [
      { key: "name", label: "نام", placeholder: "نام شما", required: true },
      { key: "email", label: "ایمیل", placeholder: "you@example.com", required: true },
      { key: "phone", label: "تلفن", placeholder: "09128497929", required: true },
      { key: "company", label: "شرکت", placeholder: "(اختیاری)", required: false },
      { key: "message", label: "پیام", placeholder: "چگونه کمک کنیم؟", required: true }
    ],
    consentLabel: "اطلاع‌رسانی از طریق ایمیل/پیام را می‌پذیرم",
    privacyHref: "/privacy",
    submitLabel: "ارسال پیام",
    successText: "پیام شما ثبت شد؛ به‌زودی پاسخ می‌دهیم.",
    errorText: "ارسال ناموفق بود؛ لطفاً دوباره تلاش کنید.",
    note: "پاسخ سریع در ساعات کاری"
  },
  seo: {
    title: "تماس با EcomKar — درخواست جلسه و پشتیبانی",
    description: "از طریق ایمیل، تلگرام یا واتساپ پیام دهید یا فرم را پر کنید. پاسخ سریع.",
    image: "/og.png"
  }
} as ContactPage;

