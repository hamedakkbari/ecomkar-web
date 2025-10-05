/**
 * About Page - Company story, mission, and team
 */

import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo/pageMeta";
import aboutContent from "@/lib/content/pages/about";
import AboutHero from "@/components/pages/about/AboutHero";
import MissionBlock from "@/components/pages/about/MissionBlock";
import Timeline from "@/components/pages/about/Timeline";
import TeamGrid from "@/components/pages/about/TeamGrid";
import AboutCTA from "@/components/pages/about/AboutCTA";

export const metadata: Metadata = generatePageMeta({
  title: aboutContent.seo?.title,
  description: aboutContent.seo?.description,
  image: aboutContent.seo?.image,
  url: "/about",
});

export default function AboutPage() {
  return (
    <div dir="rtl" data-analytics="view_page_about" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AboutHero hero={aboutContent.hero} />
      <MissionBlock title={aboutContent.mission.title} body={aboutContent.mission.body} />
      <Timeline events={aboutContent.timeline} />
      {aboutContent.team && aboutContent.team.length > 0 && (
        <TeamGrid members={aboutContent.team} />
      )}
      {aboutContent.cta && (
        <AboutCTA label={aboutContent.cta.label} href={aboutContent.cta.href} />
      )}
    </div>
  );
}