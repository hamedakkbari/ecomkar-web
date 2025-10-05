import { siteMeta, getFullUrl, getLocaleUrl } from "./siteMeta";
import type { Metadata } from "next";

export interface AlternateConfig {
  canonicalPath: string;
  hasEN?: boolean;
  locale?: string;
}

export interface AlternateResult {
  canonical: string;
  languages?: {
    [locale: string]: string;
  };
}

export function buildAlternates(config: AlternateConfig): AlternateResult {
  const { canonicalPath, hasEN = false, locale } = config;
  
  const canonical = getFullUrl(canonicalPath);
  const result: AlternateResult = { canonical };

  // Add language alternates if multiple locales are configured
  if (hasEN && siteMeta.site.locales && siteMeta.site.locales.length > 1) {
    const languages: { [locale: string]: string } = {};
    
    siteMeta.site.locales.forEach((loc) => {
      languages[loc] = getLocaleUrl(canonicalPath, loc);
    });
    
    result.languages = languages;
  }

  return result;
}

export function buildAlternateMetadata(config: AlternateConfig): Metadata["alternates"] {
  const { canonical, languages } = buildAlternates(config);
  
  const alternates: Metadata["alternates"] = {
    canonical
  };

  if (languages) {
    alternates.languages = languages;
  }

  return alternates;
}

// Helper function for common page alternates
export function getPageAlternates(path: string, hasEN: boolean = false): Metadata["alternates"] {
  return buildAlternateMetadata({
    canonicalPath: path,
    hasEN
  });
}
