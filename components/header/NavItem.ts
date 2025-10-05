export interface NavItem {
  id: string;
  label: string;
  href: string;
  analytics: string;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  analytics: string;
}

export const navigationItems: NavItem[] = [
  {
    id: 'home',
    label: 'خانه',
    href: '/',
    analytics: 'nav_home'
  },
  {
    id: 'services',
    label: 'خدمات',
    href: '/services',
    analytics: 'nav_services',
    submenu: [
      {
        id: 'automation',
        title: 'اتوماسیون B2B',
        description: 'خودکارسازی فرآیندهای کسب‌وکار با هوش مصنوعی',
        icon: 'Zap',
        href: '/services/automation',
        analytics: 'nav_services_automation'
      },
      {
        id: 'agent-website',
        title: 'ایجنت سایت',
        description: 'نماینده هوشمند برای وب‌سایت شما',
        icon: 'Bot',
        href: '/services/agent-website',
        analytics: 'nav_services_agent'
      },
      {
        id: 'sales-chatbot',
        title: 'چت‌بات فروش',
        description: 'فروش خودکار با مکالمه طبیعی',
        icon: 'MessageCircle',
        href: '/services/chatbot',
        analytics: 'nav_services_chatbot'
      },
      {
        id: 'n8n-integration',
        title: 'یکپارچگی n8n',
        description: 'اتصال سیستم‌ها و خودکارسازی گردش کار',
        icon: 'Link',
        href: '/services/n8n',
        analytics: 'nav_services_n8n'
      }
    ]
  },
  {
    id: 'course',
    label: 'دوره ایجنت',
    href: '/course',
    analytics: 'nav_course'
  },
  {
    id: 'about',
    label: 'درباره ایکام‌کار',
    href: '/about',
    analytics: 'nav_about'
  },
  
];

export const socialLinks = [
  {
    id: 'instagram',
    label: 'اینستاگرام',
    href: 'https://instagram.com/Ecomkar',
    icon: 'Instagram',
    analytics: 'social_instagram'
  },
  {
    id: 'telegram',
    label: 'تلگرام',
    href: 'https://t.me/Ecomkar',
    icon: 'Send',
    analytics: 'social_telegram'
  },
  {
    id: 'linkedin',
    label: 'لینکدین',
    href: 'https://linkedin.com/in/Ecomkar',
    icon: 'Linkedin',
    analytics: 'social_linkedin'
  },
  {
    id: 'youtube',
    label: 'یوتیوب',
    href: 'https://youtube.com/@Ecomkar',
    icon: 'Youtube',
    analytics: 'social_youtube'
  }
];

export const commandPaletteActions = [
  {
    id: 'agent',
    label: 'ایجنت معمار',
    description: 'مشاوره هوشمند و تحلیل کسب‌وکار',
    href: '/agent',
    icon: 'Bot',
    analytics: 'cmdk_action_agent'
  },
  {
    id: 'meeting',
    label: 'درخواست جلسه',
    description: 'رزرو جلسه مشاوره رایگان',
    href: '/contact',
    icon: 'Calendar',
    analytics: 'cmdk_action_meeting'
  },
  {
    id: 'docs',
    label: 'باز کردن Docs',
    description: 'مستندات و راهنما',
    href: '/docs',
    icon: 'BookOpen',
    analytics: 'cmdk_action_docs'
  },
  {
    id: 'whatsapp',
    label: 'پیام واتساپ',
    description: 'ارسال پیام مستقیم',
    href: 'https://wa.me/+989128497929',
    icon: 'MessageSquare',
    analytics: 'cmdk_action_whatsapp'
  }
];

