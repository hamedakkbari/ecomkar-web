/**
 * Home Page - Marketing Landing Page
 * Composes existing sections based on content configuration
 */

import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo/pageMeta";
import Hero from "@/components/hero/Hero";
import Highlights from "@/components/sections/Highlights";
import HowItWorks from "@/components/sections/HowItWorks";
import Services from "@/components/sections/Services";
import DemoTeaser from "@/components/sections/DemoTeaser";
import CoursePromo from "@/components/sections/CoursePromo";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import homeContent from "@/lib/content/pages/home";
import "@/styles/hero.css";
import "@/styles/sections.css";

export const metadata: Metadata = generatePageMeta({
  title: homeContent.seo?.title,
  description: homeContent.seo?.description,
  image: homeContent.seo?.image,
  url: "/",
});

const sectionComponents: Record<string, React.ComponentType> = {
  Hero,
  Highlights,
  HowItWorks,
  Services,
  DemoTeaser,
  CoursePromo,
  Testimonials,
  FAQ,
  FinalCTA,
};

function toKebabCase(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export default function Home() {
  return (
    <main data-analytics="view_page_home">
      {homeContent.sections
        .filter((s) => s.enabled)
        .map((s) => {
          const Component = sectionComponents[s.key];
          if (!Component) {
            if (process.env.NODE_ENV === "development") {
              console.warn(`Unknown or layout-managed section key: ${s.key}`);
            }
            return null;
          }
          const id = toKebabCase(s.key);
          return (
            <div key={s.key} id={id} data-analytics={`view_${id}`}>
              <Component />
            </div>
          );
        })}
    </main>
  );
}
