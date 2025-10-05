/**
 * Course page content schema
 * Comprehensive course information with curriculum, pricing, and FAQs
 */

export interface CourseMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface CourseLesson {
  title: string;
  duration?: string;
  free?: boolean;
}

export interface CourseModule {
  key: string;
  title: string;
  brief?: string;
  lessons: CourseLesson[];
}

export interface CoursePricing {
  label: string;
  value: string;
  note?: string;
  guarantee?: string;
  bullets?: string[];
}

export interface CourseCTA {
  label: string;
  href: string;
}

export interface CoursePage {
  hero: {
    heading: string;
    sub: string;
    media?: CourseMedia;
  };
  highlights: string[];
  curriculum: CourseModule[];
  pricing: CoursePricing;
  faqs?: Array<{ q: string; a: string }>;
  ctas: {
    primary: CourseCTA;
    secondary?: CourseCTA;
  };
}

export default {
  hero: {
    heading: "دوره ساخت AI AGENT با هوش‌مصنوعی (پروژه محور)",
    sub: "از صفر تا ایجنت عملی",
    media: {
      type: "image",
      src: "/media/course-cover.jpg",
      alt: "کاور دوره ساخت AI Agent"
    }
  },
  highlights: [
    "پروژه‌محور و عملی",
    "n8n + Supabase + Webhooks",
    "چک‌لیست دیپلوی و امنیت",
    "تمرین‌های واقعی B2B/B2C"
  ],
  curriculum: [
    {
      key: "m1",
      title: "معماری ۶ لایه ایجنت",
      brief: "آشنایی با ساختار کلی و لایه‌های مختلف یک ایجنت هوشمند",
      lessons: [
        { title: "Perception تا Interaction" },
        { title: "Memory و Context Management" },
        { title: "Decision Making Layer" },
        { title: "Action Execution" }
      ]
    },
    {
      key: "m2",
      title: "اتوماسیون با n8n",
      brief: "پیاده‌سازی workflow های پیچیده با n8n",
      lessons: [
        { title: "Webhooks & Flows" },
        { title: "API Integration" },
        { title: "Error Handling" },
        { title: "Performance Optimization" }
      ]
    },
    {
      key: "m3",
      title: "پایگاه داده و ذخیره‌سازی",
      brief: "مدیریت داده‌ها با Supabase و PostgreSQL",
      lessons: [
        { title: "Database Design" },
        { title: "Real-time Subscriptions" },
        { title: "Authentication & Security" },
        { title: "Backup & Recovery" }
      ]
    },
    {
      key: "m4",
      title: "پایه و زیرساخت",
      brief: "نصب و راه‌اندازی n8n روی سیستم شخصی و سرور",
      lessons: [
        { title: "تنظیمات امنیتی و HTTPS برای نودها" },
        { title: "تنظیمات Google Cloud برای نودهای گوگل" },
        { title: "چهار روش استفاده از دیتابیس Postgres برای حافظه ایجنت" }
      ]
    },
    {
      key: "m5",
      title: "یادگیری محیط و ابزارها",
      brief: "معرفی کامل محیط n8n و بررسی عملکرد نودها",
      lessons: [
        { title: "روش‌های دریافت APIهای پریمیوم به صورت رایگان" },
        { title: "دسترسی نامحدود به مدل‌ها و APIهای هوش مصنوعی" }
      ]
    },
    {
      key: "m6",
      title: "هوش صوتی و تعاملی",
      brief: "ایجنت صدا به متن و متن به صدا با کلون صدای شخصی",
      lessons: [
        { title: "ایجنت صدا به متن (STT) – مقایسه Whisper، Gemini و Speechmatics" },
        { title: "ایجنت متن به صدا (TTS) + کلون صدای شخصی – با ElevenLabs و Gemini" },
        { title: "ایجنت تلفنی با خطوط اپراتوری بین‌المللی – اتصال Twilio + VAPI" }
      ]
    },
    {
      key: "m7",
      title: "خزنده و جمع‌آوری داده",
      brief: "ساخت بستر اختصاصی تولید عکس و ویدیو با n8n",
      lessons: [
        { title: "ایجنت خزنده مقالات، ارز، طلا و کریپتو" },
        { title: "ساخت بستر اختصاصی تولید عکس و ویدیو با n8n" }
      ]
    },
    {
      key: "m8",
      title: "اتوماسیون شبکه‌های اجتماعی",
      brief: "ایجنت‌های پیشرفته برای تمام پلتفرم‌های اجتماعی",
      lessons: [
        { title: "ایجنت اینستاگرام – اتوماسیون پست، ریلز و پاسخ به دایرکت" },
        { title: "ایجنت واتس‌اپ – چت‌بات هوشمند با پشتیبانی متن و صوت" },
        { title: "ایجنت تلگرام – ربات‌های پیشرفته با ورودی فارسی" },
        { title: "ایجنت لینکدین – تولید خودکار محتوا و انتشار حرفه‌ای" },
        { title: "ایجنت توییتر (X) – مدیریت و ارسال خودکار توییت‌ها" },
        { title: "ایجنت یوتیوب – تولید و انتشار ویدیو، مدیریت کانال" }
      ]
    },
    {
      key: "m9",
      title: "پروژه‌های پیشرفته",
      brief: "ایجنت RAG با حافظه هوشمند و امبدینگ‌های جدید",
      lessons: [
        { title: "ایجنت RAG (حافظه هوشمند با Vector DB) – پرسش و پاسخ از اسناد" },
        { title: "آپدیت پروژه RAG با امبدینگ‌های جدید جمینای گوگل" }
      ]
    }
  ],
  pricing: {
    label: "قیمت",
    value: "12,900,000 تومان",
    bullets: ["دسترسی دائمی", "آپدیت‌های رایگان", "پشتیبانی 24/7"]
  },
  faqs: [
    {
      q: "پیش‌نیاز چیست؟",
      a: "هیچ پیش‌نیازی لازم نیست. همه‌چیز از پایه و قدم‌به‌قدم آموزش داده می‌شود."
    },
    {
      q: "چقدر زمان نیاز دارم؟",
      a: "حدود ۱۰ تا ۱۵ ساعت در هفته برای ۶ هفته کافی است. می‌توانید با سرعت و برنامه‌ی خودتان پیش بروید."
    },
    {
      q: "آیا گواهی دریافت می‌کنم؟",
      a: "بله. پس از تکمیل پروژه نهایی، یک گواهی معتبر از EcomKar دریافت خواهید کرد که نشان‌دهنده‌ی مهارت واقعی شماست."
    },
    {
      q: "آیا پشتیبانی دارم؟",
      a: "بله. به گروه اختصاصی تلگرام دسترسی دارید تا در هر مرحله از مسیر، تنها نباشید."
    },
  ],
  ctas: {
    primary: { label: "ثبت‌نام دوره", href: "/checkout" },
    secondary: { label: "سرفصل‌ها", href: "/course#curriculum" }
  }
} as CoursePage;

