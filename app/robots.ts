import { siteMeta } from "@/lib/seo/siteMeta";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/admin/*", "/_next/*", "/private/*"]
      }
    ],
    sitemap: `${siteMeta.site.baseUrl}/sitemap.xml`,
    host: siteMeta.site.baseUrl
  };
}
