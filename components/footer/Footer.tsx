"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { footerContent, type FooterContent } from "@/lib/content/footer";

interface FooterProps {
  content?: FooterContent;
}

export default function Footer({ content = footerContent }: FooterProps) {
  const [currentLanguage, setCurrentLanguage] = useState(content.bottomBar.language?.default || "FA");
  const [currentTheme, setCurrentTheme] = useState(content.bottomBar.theme?.default || "dark");

  // Analytics: Dispatch view event on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("analytics", {
        detail: {
          action: "view_footer",
          data: { section: "footer" }
        }
      });
      window.dispatchEvent(event);
    }
  }, []);

  const handleLinkClick = (key: string, type: string) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("analytics", {
        detail: {
          action: "click_footer_link",
          data: { key, type }
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleEmailClick = () => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("analytics", {
        detail: {
          action: "click_footer_email",
          data: { email: content.contact?.email }
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    if (typeof window !== "undefined") {
      const event = new CustomEvent("analytics", {
        detail: {
          action: "click_footer_lang",
          data: { lang }
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    if (typeof window !== "undefined") {
      const event = new CustomEvent("analytics", {
        detail: {
          action: "click_footer_theme",
          data: { theme }
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined") {
      const event = new CustomEvent("analytics", {
        detail: {
          action: "click_footer_back_to_top",
          data: {}
        }
      });
      window.dispatchEvent(event);
    }
  };

  const renderLinkGroup = (section: any, type: string) => {
    if (!section || !section.items || section.items.length === 0) return null;

    return (
      <div className="space-y-4">
        {section.title && (
          <h3 className="text-lg font-semibold text-[#E6F1FF] mb-4" id={`footer-${type}`}>
            {section.title}
          </h3>
        )}
        <ul className="space-y-3" aria-labelledby={`footer-${type}`}>
          {section.items.map((item: any) => (
            <li key={item.key}>
              <Link
                href={item.href}
                onClick={() => handleLinkClick(item.key, type)}
                className="text-[#9FB3C8] hover:text-[#00E5FF] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                data-analytics="click_footer_link"
                data-prop={item.key}
                {...(type === "social" && { target: "_blank", rel: "noreferrer" })}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer 
      className="bg-[#0B0F14]/80 backdrop-blur-md border-t-2 border-t-gradient-to-r border-t-[#00E5FF] border-t-[#7A5CFF]"
      role="contentinfo"
      data-analytics="view_footer"
      dir="rtl"
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="xl:col-span-1 space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Image
                src={content.brand.logoSrc}
                alt={`${content.brand.name} لوگو`}
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <h2 className="text-xl font-bold text-[#E6F1FF]">{content.brand.name}</h2>
                {content.brand.tagline && (
                  <p className="text-sm text-[#9FB3C8]">{content.brand.tagline}</p>
                )}
              </div>
            </div>
            {content.brand.blurb && (
              <p className="text-[#9FB3C8] leading-relaxed max-w-sm">
                {content.brand.blurb}
              </p>
            )}
          </div>

          {/* Navigation Links */}
          {content.nav && renderLinkGroup(content.nav, "nav")}

          {/* Legal Links */}
          {content.legal && renderLinkGroup(content.legal, "legal")}

          {/* Social Links */}
          {content.social && renderLinkGroup(content.social, "social")}
        </div>

        {/* Contact Section */}
        {content.contact && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.contact.email && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#E6F1FF]">ایمیل</h3>
                  <a
                    href={`mailto:${content.contact.email}`}
                    onClick={handleEmailClick}
                    className="text-[#9FB3C8] hover:text-[#00E5FF] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                    data-analytics="click_footer_email"
                  >
                    {content.contact.email}
                  </a>
                </div>
              )}
              {content.contact.phone && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#E6F1FF]">تلفن</h3>
                  <a
                    href={`tel:${content.contact.phone}`}
                    className="text-[#9FB3C8] hover:text-[#00E5FF] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                  >
                    {content.contact.phone}
                  </a>
                </div>
              )}
              {content.contact.address && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#E6F1FF]">آدرس</h3>
                  <p className="text-[#9FB3C8]">{content.contact.address}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Extras - Badges */}
        {content.extras?.badges && content.extras.badges.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-wrap gap-4">
              {content.extras.badges.map((badge) => (
                <span
                  key={badge.key}
                  className="px-3 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full text-xs text-[#9FB3C8]"
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#0B0F14]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright & Contact */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 space-x-reverse">
              <p className="text-sm text-[#9FB3C8]">{content.bottomBar.copyright}</p>
              {content.contact?.email && (
                <a
                  href={`mailto:${content.contact.email}`}
                  onClick={handleEmailClick}
                  className="text-sm text-[#9FB3C8] hover:text-[#00E5FF] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                  data-analytics="click_footer_email"
                >
                  {content.contact.email}
                </a>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Language Switch - Hidden */}
              {/* {content.bottomBar.language && (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-[#9FB3C8]">زبان:</span>
                  <select
                    value={currentLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-[#0B0F14] border border-white/20 rounded px-2 py-1 text-sm text-[#E6F1FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                    data-analytics="click_footer_lang"
                    data-prop={currentLanguage}
                  >
                    {content.bottomBar.language.options.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang === "FA" ? "فارسی" : "English"}
                      </option>
                    ))}
                  </select>
                </div>
              )} */}

              {/* Theme Switch - Hidden */}
              {/* {content.bottomBar.theme && (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-[#9FB3C8]">تم:</span>
                  <select
                    value={currentTheme}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="bg-[#0B0F14] border border-white/20 rounded px-2 py-1 text-sm text-[#E6F1FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                    data-analytics="click_footer_theme"
                    data-prop={currentTheme}
                  >
                    {content.bottomBar.theme.options.map((theme) => (
                      <option key={theme} value={theme}>
                        {theme === "dark" ? "تیره" : "روشن"}
                      </option>
                    ))}
                  </select>
                </div>
              )} */}

              {/* Back to Top */}
              <button
                onClick={handleBackToTop}
                className="flex items-center space-x-2 space-x-reverse px-3 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-lg text-sm text-[#E6F1FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                data-analytics="click_footer_back_to_top"
                aria-label="بازگشت به بالای صفحه"
              >
                <span>↑</span>
                <span>بازگشت به بالا</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


