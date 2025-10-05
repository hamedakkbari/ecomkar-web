export interface SiteInfo {
  name: string;
  tagline: string;
  domain: string;
  baseUrl: string;
  localeDefault: string;
  locales?: string[];
  twitterHandle?: string;
}

// ENV-based base URL with validation
function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) {
    return "https://ecomkar.com";
  }
  
  // Validate URL format
  try {
    const url = new URL(envUrl);
    if (url.protocol !== "https:") {
      if (process.env.NODE_ENV === "development") {
        console.warn(`⚠️  NEXT_PUBLIC_SITE_URL should use HTTPS: ${envUrl}`);
      }
    }
    if (url.hostname.includes("localhost") || url.hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`⚠️  NEXT_PUBLIC_SITE_URL should use domain, not IP/localhost: ${envUrl}`);
      }
    }
    return envUrl;
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn(`⚠️  Invalid NEXT_PUBLIC_SITE_URL: ${envUrl}`);
    }
    return "https://ecomkar.com";
  }
}

const BASE_URL = getBaseUrl();

export interface DefaultMeta {
  title: string;
  description: string;
  keywords: string[];
  image: string;
}

export interface OrganizationInfo {
  legalName: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactEmail: string;
}

export interface WebSiteInfo {
  searchActionUrl?: string;
}

export interface CourseInfo {
  name: string;
  description: string;
  url: string;
  provider: {
    name: string;
    type: string;
  };
}

export interface SiteMeta {
  site: SiteInfo;
  defaults: DefaultMeta;
  organization: OrganizationInfo;
  webSite: WebSiteInfo;
  course: CourseInfo;
}

export const siteMeta: SiteMeta = {
  site: {
    name: "EcomKar",
    tagline: "AI Agents & Automation",
    domain: "ecomkar.com",
    baseUrl: BASE_URL,
    localeDefault: process.env.NEXT_PUBLIC_SITE_LOCALE || "fa-IR",
    locales: [
      process.env.NEXT_PUBLIC_SITE_LOCALE || "fa-IR",
      process.env.NEXT_PUBLIC_SITE_ALT_LOCALE || "en-US"
    ],
    twitterHandle: "@ecomkar"
  },
  defaults: {
    title: "EcomKar — AI Agents & Automation",
    description: "ایجنت‌های هوشمند برای رشد فروش، اتوماسیون و مقیاس‌پذیری کسب‌وکار.",
    keywords: ["AI Agent", "اتوماسیون", "n8n", "E-commerce", "EcomKar"],
    image: "/og.png"
  },
  organization: {
    legalName: "EcomKar",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      "https://instagram.com/ecomkar",
      "https://t.me/ecomkar",
      "https://www.linkedin.com/company/ecomkar"
    ],
    contactEmail: "hello@ecomkar.com"
  },
  webSite: {
    searchActionUrl: `${BASE_URL}/search?q={query}`
  },
  course: {
    name: "دورهٔ ساخت AI Agent (EcomKar)",
    description: "آموزش پروژه‌محور ساخت ایجنت: معماری ۶ لایه، اتوماسیون n8n، اتصال API، دیپلوی و بهینه‌سازی.",
    url: `${BASE_URL}/course`,
    provider: {
      name: "EcomKar",
      type: "Organization"
    }
  }
};

// Helper function to get full URL
export function getFullUrl(path: string = ""): string {
  const baseUrl = siteMeta.site.baseUrl;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

// Helper function to get locale-specific URL
export function getLocaleUrl(path: string = "", locale?: string): string {
  const baseUrl = siteMeta.site.baseUrl;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  if (locale && locale !== siteMeta.site.localeDefault) {
    return `${baseUrl}/${locale}${cleanPath}`;
  }
  
  return `${baseUrl}${cleanPath}`;
}

// Export BASE_URL for use in other files
export { BASE_URL };
