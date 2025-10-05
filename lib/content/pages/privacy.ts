/**
 * Privacy page content schema and data
 */

export type PrivacyPage = {
  heading: string;
  updatedAt?: string;
  intro?: string;
  sections: Array<{
    id: string;
    title: string;
    body: string;
  }>;
  seo?: { title?: string; description?: string; image?: string };
};

const privacy: PrivacyPage = {
  heading: "سیاست حریم خصوصی EcomKar",
  updatedAt: "2025-09-30",
  intro: "این سیاست خلاصه‌ای از نحوهٔ جمع‌آوری، استفاده و حفاظت از داده‌های شماست.",
  sections: [
    { id: "data_we_collect", title: "چه داده‌هایی جمع‌آوری می‌کنیم", body: "فرم‌ها: نام، ایمیل، تلفن و پیام شما. لاگ‌های فنی حداقلی برای امنیت." },
    { id: "how_we_use", title: "نحوهٔ استفاده", body: "برای پاسخ‌گویی، ارائهٔ خدمات، بهبود کیفیت و ارتباطات مربوط به محصول." },
    { id: "analytics", title: "آنالیتیکس", body: "استفاده از Plausible/GA4 بر اساس تنظیمات محیط؛ بدون جمع‌آوری PII اضافی." },
    { id: "cookies", title: "کوکی‌ها", body: "استفاده محدود از کوکی‌های ضروری برای عملکرد سایت؛ بدون ردیابی تهاجمی." },
    { id: "data_sharing", title: "اشتراک‌گذاری", body: "انتقال داده فقط به پردازش‌گران ضروری و مطابق قراردادهای حفاظت داده." },
    { id: "security", title: "امنیت", body: "کلیدها در ENV امن نگهداری می‌شوند؛ دسترسی‌ها حداقلی و مبتنی بر نیاز هستند." },
    { id: "your_rights", title: "حقوق شما", body: "حق درخواست دسترسی، تصحیح یا حذف داده‌ها مطابق قوانین قابل اعمال." },
    { id: "contact", title: "تماس", body: "برای درخواست‌های مربوط به حریم خصوصی: hello@ecomkar.com" }
  ],
  seo: {
    title: "حریم خصوصی — EcomKar",
    description: "سیاست حریم خصوصی EcomKar دربارهٔ داده‌ها، کوکی‌ها و آنالیتیکس.",
    image: "/og.png"
  }
};

export default privacy;


