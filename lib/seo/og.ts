import { siteMeta, getFullUrl } from "./siteMeta";
import type { Metadata } from "next";

export interface OGImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface PageMeta {
  title?: string;
  description?: string;
  image?: string | OGImage;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export function buildOG(pageMeta: PageMeta = {}): {
  openGraph: Metadata["openGraph"];
  twitter: Metadata["twitter"];
} {
  const {
    title = siteMeta.defaults.title,
    description = siteMeta.defaults.description,
    image = siteMeta.defaults.image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags
  } = pageMeta;

  const fullUrl = url ? getFullUrl(url) : siteMeta.site.baseUrl;
  const imageUrl = typeof image === "string" ? getFullUrl(image) : image.url;

  const openGraph: Metadata["openGraph"] = {
    type,
    locale: siteMeta.site.localeDefault,
    url: fullUrl,
    siteName: siteMeta.site.name,
    title,
    description,
    images: [
      {
        url: imageUrl,
        width: typeof image === "object" ? image.width : 1200,
        height: typeof image === "object" ? image.height : 630,
        alt: typeof image === "object" ? image.alt : title
      }
    ],
    ...(publishedTime && { publishedTime }),
    ...(modifiedTime && { modifiedTime }),
    ...(authors && { authors }),
    ...(section && { section }),
    ...(tags && { tags })
  };

  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    site: siteMeta.site.twitterHandle,
    creator: siteMeta.site.twitterHandle,
    title,
    description,
    images: [imageUrl]
  };

  return { openGraph, twitter };
}

export function buildPageMeta(pageMeta: PageMeta = {}): Metadata {
  const { title, description, keywords, ...rest } = pageMeta;
  const { openGraph, twitter } = buildOG({ title, description, ...rest });

  return {
    title: title || siteMeta.defaults.title,
    description: description || siteMeta.defaults.description,
    keywords: keywords || siteMeta.defaults.keywords,
    openGraph,
    twitter,
    metadataBase: new URL(siteMeta.site.baseUrl)
  };
}

export function getPageAlternates(path: string, isCanonical: boolean = false): Metadata["alternates"] {
  const baseUrl = siteMeta.site.baseUrl;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}${cleanPath}`;

  const alternates: Metadata["alternates"] = {
    canonical: canonicalUrl
  };

  // Add locale alternates if multiple locales are configured
  if (siteMeta.site.locales && siteMeta.site.locales.length > 1) {
    alternates.languages = {};
    siteMeta.site.locales.forEach(locale => {
      if (locale !== siteMeta.site.localeDefault) {
        alternates.languages![locale] = `${baseUrl}/${locale}${cleanPath}`;
      }
    });
  }

  return alternates;
}