/**
 * Content schema for How It Works / Agent Flow section
 * Modular content separation for easy updates without UI changes
 * RTL-first design with Persian content
 * 
 * Six-layer agent architecture: Perception → Reasoning → Planning → Execution → Learning → Interaction
 */

export type AgentStepKey = 
  | "perception" 
  | "reasoning" 
  | "planning" 
  | "execution" 
  | "learning" 
  | "interaction";

export interface AgentStep {
  key: AgentStepKey;
  icon: string;       // lucide-react icon name
  title: string;      // Short title in Persian
  desc: string;       // Description ≤120 chars in Persian
  example: string;    // Real example ≤80 chars in Persian
}

export interface MicroCTA {
  text: string;
  href: string;
}

export interface AgentFlowContent {
  heading: string;
  lead: string;
  steps: AgentStep[];
  microCta: MicroCTA;
}

export const agentFlowContent: AgentFlowContent = {
  heading: "ایجنت EcomKar چطور کار می‌کند؟",
  lead: "از دریافت داده تا تعامل انسانی—شش لایه برای اجرای هوشمند، سریع و مقیاس‌پذیر.",
  steps: [
    {
      key: "perception",
      icon: "ScanLine",
      title: "ادراک داده",
      desc: "متن، لاگ، فرم، شبکه‌های اجتماعی—تبدیل دادهٔ خام به سیگنال قابل‌فهم.",
      example: "نمونه: تحلیل پیام‌های اینستاگرام و تیکت‌ها"
    },
    {
      key: "reasoning",
      icon: "Brain",
      title: "استدلال",
      desc: "استخراج نیت/الگو، اولویت‌بندی وظایف، انتخاب مسیر بهینه.",
      example: "نمونه: شناسایی لیدهای داغ برای پیگیری"
    },
    {
      key: "planning",
      icon: "Route",
      title: "برنامه‌ریزی",
      desc: "چینش گام‌ها، تخصیص منابع، تنظیم وابستگی‌ها و SLA.",
      example: "نمونه: نقشهٔ پیگیری چندکاناله فروش"
    },
    {
      key: "execution",
      icon: "PlayCircle",
      title: "اجرا",
      desc: "فراخوانی APIها، ارسال پیام، ایجاد تسک—به‌صورت خودکار و امن.",
      example: "نمونه: پاسخ خودکار DM + ثبت در CRM"
    },
    {
      key: "learning",
      icon: "LineChart",
      title: "یادگیری",
      desc: "بازخوردگیری، ارزیابی نتیجه، بهبود مداوم قوانین/پرومپت‌ها.",
      example: "نمونه: افزایش CTR با اصلاح پیام خوش‌آمد"
    },
    {
      key: "interaction",
      icon: "MessageSquare",
      title: "تعامل",
      desc: "گفت‌وگو با تیم/مشتری، گزارش‌دهی و درخواست تایید در لحظه.",
      example: "نمونه: خلاصهٔ روزانه در تلگرام تیم"
    }
  ],
  microCta: {
    text: "",
    href: ""
  }
};

