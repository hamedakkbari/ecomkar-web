/**
 * Content schema for Highlights section
 * Modular content separation for easy updates without UI changes
 * RTL-first design with Persian content
 */

export interface HighlightItem {
  key: string;
  icon: string;
  title: string;
  desc: string;
  href: string;
}

export interface MicroCTA {
  text: string;
  href: string;
}

export interface HighlightsContent {
  heading: string;
  lead: string;
  items: HighlightItem[];
  microCta: MicroCTA;
}

export const highlightsContent: HighlightsContent = {
  heading: "چرا EcomKar؟",
  lead: "سه دلیل برای اینکه آینده‌ی کسب‌وکارت را همین امروز ارتقا بدهی 🚀",
  items: [
    {
      key: "automation",
      icon: "Zap",
      title: "اتوماسیون بدون مرز",
      desc: "تمام فرآیندهایت، از داده تا اجرا، در یک جریان روان و بی‌نقص.\n➝ کار کمتر، نتیجه بیشتر، بدون خطای انسانی.",
      href: "/services#automation"
    },
    {
      key: "growth",
      icon: "TrendingUp",
      title: "رشد مداوم و پایدار",
      desc: "سیستمی که با هر روز استفاده، هوشمندتر و قدرتمندتر می‌شود.\n➝ همراهی که نه‌تنها کارها را انجام می‌دهد، بلکه مسیر رشدت را هموار می‌کند.",
      href: "/services#growth"
    },
    {
      key: "impact",
      icon: "Rocket",
      title: "تاثیر سریع، آینده مطمئن",
      desc: "به‌جای انتظار طولانی، از همان ابتدا تغییرات واقعی را لمس کن.\n➝ شتاب بگیر، رقبا را پشت سر بگذار، و همیشه یک قدم جلوتر باش.",
      href: "/services#impact"
    }
  ],
  microCta: {
    text: "",
    href: ""
  }
};

