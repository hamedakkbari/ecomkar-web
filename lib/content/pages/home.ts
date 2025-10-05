/**
 * Home page content configuration
 * Controls which sections are displayed and their order
 */

export interface HomePageSection {
  key: string;
  enabled: boolean;
}

export interface HomePageContent {
  sections: HomePageSection[];
  seo?: { title?: string; description?: string; image?: string };
}

export default {
  sections: [
    { key: "Hero", enabled: true },
    { key: "Highlights", enabled: true },
    { key: "HowItWorks", enabled: true },
    { key: "Services", enabled: true },
    { key: "DemoTeaser", enabled: true },
    { key: "CoursePromo", enabled: true },
    { key: "Testimonials", enabled: true },
    { key: "FAQ", enabled: true },
    { key: "FinalCTA", enabled: true },
  ]
} as HomePageContent;

