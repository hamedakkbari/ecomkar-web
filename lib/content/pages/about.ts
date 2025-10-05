/**
 * About page content schema
 * Company story, mission, timeline, and team information
 */

export interface TimelineEvent {
  year: string;
  title: string;
  body: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  link?: string;
}

export interface AboutPage {
  hero: {
    heading: string;
    sub?: string;
    proof?: string;
  };
  mission: {
    title: string;
    body: string;
  };
  timeline: TimelineEvent[];
  team?: TeamMember[];
  cta?: { label: string; href: string };
  seo?: { title?: string; description?: string; image?: string };
}

export default {
  hero: {
    heading: "EcomKar — مغز دیجیتالی کسب‌وکار",
    sub: "ایجنت‌های هوشمند برای رشد پایدار",
    proof: "۲۰+ پیاده‌سازی در تجارت الکترونیک"
  },
  mission: {
    title: "ماموریت",
    body: "ما در EcomKar معتقدیم که آینده کسب‌وکار در دست ایجنت‌های هوشمند است. ماموریت ما این است که با استفاده از تکنولوژی‌های پیشرفته AI و اتوماسیون، کسب‌وکارها را به سمت رشد پایدار و مقیاس‌پذیری هدایت کنیم. ما نه تنها ابزارهای هوشمند می‌سازیم، بلکه راه‌حل‌های جامعی ارائه می‌دهیم که واقعاً کار می‌کنند و نتایج ملموس دارند."
  },
  timeline: [
    {
      year: "2024",
      title: "شروع EcomKar",
      body: "شروع کار با ایده ساده: ساخت ایجنت‌های هوشمند که واقعاً کار می‌کنند. اولین پروژه‌ها روی اتوماسیون فروشگاه‌های آنلاین متمرکز شد."
    },
    {
      year: "2024",
      title: "اولین ایجنت موفق",
      body: "پیاده‌سازی اولین ایجنت فروش برای یک فروشگاه آنلاین که 40% افزایش فروش را به همراه داشت. این موفقیت مسیر ما را مشخص کرد."
    },
    {
      year: "2024",
      title: "توسعه پلتفرم n8n",
      body: "ادغام عمیق با n8n و ایجاد workflow های پیچیده برای اتوماسیون کسب‌وکار. بیش از 50 پروژه موفق در این سال."
    },
    {
      year: "2025",
      title: "Agent v2",
      body: "راه‌اندازی نسل دوم ایجنت‌ها با قابلیت‌های پیشرفته‌تر، یادگیری مداوم و ادغام بهتر با سیستم‌های موجود."
    },
    {
      year: "2025",
      title: "دوره آموزشی",
      body: "راه‌اندازی دوره جامع ساخت AI Agent برای انتقال دانش و تجربه به علاقه‌مندان و توسعه‌دهندگان."
    }
  ],
  team: [],
  cta: { label: "درخواست مشاوره", href: "/consultation" },
  seo: {
    title: "درباره EcomKar — تیم و مسیر",
    description: "داستان، ماموریت و تیم EcomKar؛ سازندگان ایجنت‌های هوشمند و اتوماسیون.",
    image: "/og.png"
  }
} as AboutPage;

