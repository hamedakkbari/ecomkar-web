import { siteMeta } from "./siteMeta";

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  legalName: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    email: string;
    contactType: string;
  };
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

export interface CourseSchema {
  "@context": "https://schema.org";
  "@type": "Course";
  name: string;
  description: string;
  url: string;
  provider: {
    "@type": "Organization";
    name: string;
  };
  courseMode: string;
  educationalLevel: string;
  inLanguage: string;
}

export function organizationJSONLD(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteMeta.organization.legalName,
    legalName: siteMeta.organization.legalName,
    url: siteMeta.organization.url,
    logo: siteMeta.organization.logo,
    sameAs: siteMeta.organization.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteMeta.organization.contactEmail,
      contactType: "customer service"
    }
  };
}

export function webSiteJSONLD(): WebSiteSchema {
  const schema: WebSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMeta.site.name,
    url: siteMeta.site.baseUrl,
    description: siteMeta.defaults.description
  };

  if (siteMeta.webSite.searchActionUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: siteMeta.webSite.searchActionUrl,
      "query-input": "required name=query"
    };
  }

  return schema;
}

export function courseJSONLD(): CourseSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: siteMeta.course.name,
    description: siteMeta.course.description,
    url: siteMeta.course.url,
    provider: {
      "@type": "Organization",
      name: siteMeta.course.provider.name
    },
    courseMode: "online",
    educationalLevel: "beginner",
    inLanguage: siteMeta.site.localeDefault
  };
}

// Helper function to render JSON-LD script tag
export function renderJSONLD(schema: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

// Helper function to get all base schemas (Organization + WebSite)
export function getBaseSchemas(): { organization: string; webSite: string } {
  return {
    organization: renderJSONLD(organizationJSONLD()),
    webSite: renderJSONLD(webSiteJSONLD())
  };
}

// Helper function to get raw JSON objects for use in layout
export function getBaseSchemasRaw(): { organization: OrganizationSchema; webSite: WebSiteSchema } {
  return {
    organization: organizationJSONLD(),
    webSite: webSiteJSONLD()
  };
}

// Helper function to get course schema
export function getCourseSchema(): string {
  return renderJSONLD(courseJSONLD());
}
