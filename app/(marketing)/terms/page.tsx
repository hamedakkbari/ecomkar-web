/**
 * Terms Page - Renders legal terms content
 */

import type { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo/pageMeta";
import termsContent from "@/lib/content/pages/terms";
import "@/styles/legal.css";

export const metadata: Metadata = generatePageMeta({
  title: termsContent.seo?.title,
  description: termsContent.seo?.description,
  image: termsContent.seo?.image,
  url: "/terms",
});

function sanitize(html: string): string {
  // Very light sanitizer: remove script/style and on* attributes
  let out = html.replace(/<\/(?:script|style)>/gi, "").replace(/<(?:script|style)[\s\S]*?>[\s\S]*?<\/(?:script|style)>/gi, "");
  out = out.replace(/ on[a-z]+="[^"]*"/gi, "");
  return out;
}

export default function TermsPage() {
  return (
    <main dir="rtl" data-analytics="view_page_terms" className="mx-auto max-w-[880px] px-4 py-10 legal-prose">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#E6F1FF] mb-2">{termsContent.heading}</h1>
        {termsContent.updatedAt && (
          <p className="text-sm text-[#9FB3C8]">آخرین به‌روزرسانی: {termsContent.updatedAt}</p>
        )}
        {termsContent.intro && (
          <p className="mt-4 text-[#9FB3C8] leading-loose">{termsContent.intro}</p>
        )}
      </header>

      {/* TOC */}
      {termsContent.sections?.length > 0 && (
        <nav className="mb-8 p-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
          <ul className="list-disc pr-5 space-y-2">
            {termsContent.sections.map((s) => (
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
        {termsContent.sections.map((s) => (
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


