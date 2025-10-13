import type { Metadata } from "next";
import { Suspense } from "react";
import { Vazirmatn, Inter } from "next/font/google";
import "./globals.css";
import "../styles/header.css";
import Header from "../components/header/Header";
import AnalyticsProvider from "../components/analytics/AnalyticsProvider";
import { getBaseSchemasRaw } from "../lib/seo/schema";
import { siteMeta } from "../lib/seo/siteMeta";

const vazirmatn = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.site.baseUrl),
  title: { 
    default: "EcomKar — AI Agents & Automation", 
    template: "%s — EcomKar" 
  },
  description: "ایجنت‌های هوشمند برای رشد فروش، اتوماسیون و مقیاس‌پذیری.",
  icons: {
    icon: [
      { url: "/logo.png?v=3", type: "image/png", sizes: "32x32" },
      { url: "/logo.png?v=3", type: "image/png", sizes: "192x192" },
      { url: "/logo.png?v=3", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/logo.png?v=3",
    apple: "/logo.png?v=3"
  },
  openGraph: {
    type: "website",
    siteName: "EcomKar",
    url: "/",
    images: ["/og.png"],
    locale: "fa_IR"
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ecomkar"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { organization, webSite } = getBaseSchemasRaw();

  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png?v=3" />
        {/* Apple touch icon handled via metadata.icons; removing hard link to avoid conflicts */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0B0F14" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization, null, 2) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite, null, 2) }}
        />
      </head>
      <body
        className={`${vazirmatn.variable} ${inter.variable} antialiased scrollbar-thin`}
        style={{
          background: 'var(--background)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-vazir)'
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AnalyticsProvider>
            <Header />
            <main id="main-content">
              {children}
            </main>
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
}
