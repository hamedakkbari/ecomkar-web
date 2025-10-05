/**
 * Privacy Page - Renders privacy policy content
 */

import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo/pageMeta";
import privacyContent from "@/lib/content/pages/privacy";
import "@/styles/legal.css";

export const metadata: Metadata = generatePageMeta({
  title: privacyContent.seo?.title,
  description: privacyContent.seo?.description,
  image: privacyContent.seo?.image,
  url: "/privacy",
});

function sanitize(html: string): string {
  // Very light sanitizer: remove script/style and on* attributes
  let out = html.replace(/<\/(?:script|style)>/gi, "").replace(/<(?:script|style)[\s\S]*?>[\s\S]*?<\/(?:script|style)>/gi, "");
  out = out.replace(/ on[a-z]+="[^"]*"/gi, "");
  return out;
}

export default function PrivacyPage() {
  return (
    <main dir="rtl" data-analytics="view_page_privacy" className="mx-auto max-w-[880px] px-4 py-10 legal-prose">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#E6F1FF] mb-2">{privacyContent.heading}</h1>
        {privacyContent.updatedAt && (
          <p className="text-sm text-[#9FB3C8]">آخرین به‌روزرسانی: {privacyContent.updatedAt}</p>
        )}
        {privacyContent.intro && (
          <p className="mt-4 text-[#9FB3C8] leading-loose">{privacyContent.intro}</p>
        )}
      </header>

      {/* TOC */}
      {privacyContent.sections?.length > 0 && (
        <nav className="mb-8 p-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
          <ul className="list-disc pr-5 space-y-2">
            {privacyContent.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="underline text-cyan-300 hover:text-cyan-200"
                  aria-label={`رفتن به بخش ${s.title}`}
                  data-analytics="click_legal_toc"
                  data-prop={s.id}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Sections */}
      <div className="space-y-10">
        {privacyContent.sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2 className="text-2xl font-bold text-[#E6F1FF] mb-3">{s.title}</h2>
            <div
              className="text-[#9FB3C8] leading-loose legal-content"
              dangerouslySetInnerHTML={{ __html: sanitize(s.body) }}
            />
          </section>
        ))}
      </div>
    </main>
  );
}


