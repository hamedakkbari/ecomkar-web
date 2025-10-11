/**
 * Page metadata helper for marketing pages
 * Provides consistent SEO metadata with per-page overrides
 */

import type { Metadata } from "next";
import { buildOG } from "./og";
import { siteMeta, getFullUrl } from "./siteMeta";

export interface PageMetaOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Generate metadata for marketing pages
 * @param options - Page-specific metadata options
 * @returns Complete metadata object for Next.js
 */
export function generatePageMeta(options: PageMetaOptions = {}): Metadata {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags
  } = options;

  // Build base metadata
  const metadata = buildPageMeta({
    title,
    description,
    keywords,
    image,
    url,
    type,
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags
  });

  return metadata;
}

/**
 * Build page metadata with base URL from ENV
 * @param options - Page-specific metadata options
 * @returns Complete metadata object for Next.js
 */
export function buildPageMeta(options: PageMetaOptions = {}): Metadata {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags
  } = options;

  const { openGraph, twitter } = buildOG({
    title,
    description,
    image,
    url,
    type,
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags
  });

  return {
    title: title || siteMeta.defaults.title,
    description: description || siteMeta.defaults.description,
    keywords: keywords || siteMeta.defaults.keywords,
    openGraph,
    twitter,
    metadataBase: new URL(siteMeta.site.baseUrl),
    alternates: {
      canonical: url ? getFullUrl(url) : siteMeta.site.baseUrl
    }
  };
}

/**
 * Generate metadata for home page
 */
export function generateHomeMeta(): Metadata {
  return generatePageMeta({
    title: "EcomKar — هوشی که کسب‌وکارت را می‌سازد",
    description: siteMeta.defaults.description,
    keywords: siteMeta.defaults.keywords,
    url: "/"
  });
}

/**
 * Generate metadata for services page
 */
export function generateServicesMeta(): Metadata {
  return generatePageMeta({
    title: "خدمات EcomKar - AI Agents & Automation",
    description: "خدمات کامل EcomKar شامل اتوماسیون هوشمند، ایجنت سایت، چت‌بات فروش و ویدیو AI. راه‌حل‌های آماده اجرا برای رشد کسب‌وکار.",
    keywords: ["خدمات EcomKar", "اتوماسیون", "AI Agent", "چت‌بات فروش", "n8n"],
    url: "/services"
  });
}

/**
 * Generate services metadata from content (override-safe)
 */
export function generateServicesMetaFromContent(content?: { seo?: { title?: string; description?: string; image?: string } }): Metadata {
  const title = content?.seo?.title || "خدمات EcomKar - AI Agents & Automation";
  const description = content?.seo?.description || "خدمات کامل EcomKar شامل اتوماسیون هوشمند، ایجنت سایت، چت‌بات فروش و ویدیو AI. راه‌حل‌های آماده اجرا برای رشد کسب‌وکار.";
  const image = content?.seo?.image;

  return generatePageMeta({
    title,
    description,
    keywords: ["خدمات EcomKar", "اتوماسیون", "AI Agent", "چت‌بات فروش", "n8n"],
    url: "/services",
    image
  });
}

/**
 * Generate metadata for course page
 */
export function generateCourseMeta(courseContent?: any): Metadata {
  const title = courseContent?.seo?.title || "دوره ساخت AI Agent - EcomKar";
  const description = courseContent?.seo?.description || "دوره جامع ساخت AI Agent از صفر تا صد. آموزش پروژه‌محور با n8n، Supabase و Next.js. گارانتی 7 روزه بازگشت وجه.";
  
  return generatePageMeta({
    title,
    description,
    keywords: ["دوره AI Agent", "آموزش n8n", "ساخت ایجنت", "اتوماسیون", "EcomKar"],
    url: "/course",
    type: "website",
    image: courseContent?.seo?.image
  });
}

/**
 * Generate metadata for about page
 */
export function generateAboutMeta(): Metadata {
  return generatePageMeta({
    title: "درباره EcomKar - تیم و ماموریت",
    description: "آشنایی با تیم EcomKar، ماموریت ما و داستان شکل‌گیری شرکت. متخصصان AI و اتوماسیون با تجربه در پروژه‌های موفق.",
    keywords: ["درباره EcomKar", "تیم EcomKar", "ماموریت", "داستان شرکت"],
    url: "/about"
  });
}

/**
 * Generate metadata for contact page
 */
export function generateContactMeta(): Metadata {
  return generatePageMeta({
    title: "تماس با EcomKar - درخواست مشاوره",
    description: "تماس با تیم EcomKar برای درخواست مشاوره، اطلاعات خدمات و شروع همکاری. پاسخ سریع در کمتر از 24 ساعت.",
    keywords: ["تماس EcomKar", "مشاوره", "درخواست همکاری", "پشتیبانی"],
    url: "/contact"
  });
}

/**
 * Generate metadata for demo page from content
 */
export function generatePageMetaFromContent(content?: { seo?: { title?: string; description?: string; image?: string } }): Metadata {
  const title = content?.seo?.title || "دموی تحلیل وب‌سایت - EcomKar";
  const description = content?.seo?.description || "تحلیل هوشمند وب‌سایت شما با AI. دریافت گزارش کامل از فرصت‌های بهبود SEO، UX و تبدیل.";
  const image = content?.seo?.image;

  return generatePageMeta({
    title,
    description,
    keywords: ["تحلیل وب‌سایت", "SEO", "UX", "CRO", "EcomKar", "AI"],
    url: "/demo",
    image
  });
}

/**
 * Generate metadata for agent page from content
 */
export function generateAgentMetaFromContent(content?: { seo?: { title?: string; description?: string; image?: string } }): Metadata {
  const title = content?.seo?.title || "ایجنت معمار EcomKar - مشاوره اتوماسیون";
  const description = content?.seo?.description || "مشاوره تخصصی اتوماسیون کسب‌وکار با AI. دریافت راه‌حل‌های عملی، ایده‌های درآمدزا و برنامه اجرایی ۷ روزه.";
  const image = content?.seo?.image;

  return generatePageMeta({
    title,
    description,
    keywords: ["مشاوره اتوماسیون", "AI Agent", "n8n", "اتوماسیون کسب‌وکار", "EcomKar"],
    url: "/agent",
    image
  });
}

