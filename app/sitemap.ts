import { siteMeta } from "@/lib/seo/siteMeta";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMeta.site.baseUrl;
  const lastModified = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage - Highest priority
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0
    },
    // Core service pages - High priority
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/agent`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/course`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9
    },
    // Important pages - Medium-high priority
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7
    },
    // Transactional pages - Medium priority
    {
      url: `${baseUrl}/checkout`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/thank-you`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5
    },
    // Legal pages - Lower priority
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];

  // Add locale-specific routes if multiple locales are configured
  const allRoutes: MetadataRoute.Sitemap = [...staticRoutes];

  if (siteMeta.site.locales && siteMeta.site.locales.length > 1) {
    const altLocale = siteMeta.site.locales.find(locale => locale !== siteMeta.site.localeDefault);
    
    if (altLocale) {
      const altRoutes: MetadataRoute.Sitemap = staticRoutes.map(route => ({
        ...route,
        url: route.url.replace(baseUrl, `${baseUrl}/${altLocale}`),
        priority: (route.priority || 0.8) * 0.9 // Slightly lower priority for alternate locales
      }));
      
      allRoutes.push(...altRoutes);
    }
  }

  return allRoutes;
}
