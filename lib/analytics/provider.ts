/**
 * Analytics Provider Interface and Implementations
 * Supports Plausible, GA4, and Clarity with privacy-first approach
 */

import { env } from "@/lib/server/env";

// ===========================================
// TYPES & INTERFACES
// ===========================================

export interface AnalyticsEvent {
  name: string;
  props?: Record<string, any>;
  timestamp?: number;
}

export interface AnalyticsProvider {
  name: string;
  isReady: boolean;
  init(): Promise<void>;
  track(event: AnalyticsEvent): void;
  pageview(path: string): void;
}

// ===========================================
// PLAUSIBLE PROVIDER
// ===========================================

class PlausibleProvider implements AnalyticsProvider {
  name = "plausible";
  isReady = false;
  private domain: string;

  constructor(domain: string) {
    this.domain = domain;
  }

  async init(): Promise<void> {
    if (typeof window === "undefined") return;

    // Load Plausible script
    const script = document.createElement("script");
    script.src = "https://plausible.io/js/script.js";
    script.setAttribute("data-domain", this.domain);
    script.defer = true;
    script.async = true;
    
    document.head.appendChild(script);

    // Wait for script to load
    return new Promise((resolve) => {
      script.onload = () => {
        this.isReady = true;
        resolve();
      };
    });
  }

  track(event: AnalyticsEvent): void {
    if (!this.isReady || typeof window === "undefined") return;

    const plausible = (window as any).plausible;
    if (plausible) {
      plausible(event.name, { props: event.props });
    }
  }

  pageview(path: string): void {
    if (!this.isReady || typeof window === "undefined") return;

    const plausible = (window as any).plausible;
    if (plausible) {
      // Plausible auto-tracks pageviews, but we can send manual ones for SPA
      plausible("pageview", { props: { path } });
    }
  }
}

// ===========================================
// GA4 PROVIDER
// ===========================================

class GA4Provider implements AnalyticsProvider {
  name = "ga4";
  isReady = false;
  private measurementId: string;

  constructor(measurementId: string) {
    this.measurementId = measurementId;
  }

  async init(): Promise<void> {
    if (typeof window === "undefined") return;

    // Load gtag script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    script.async = true;
    script.defer = true;
    
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
    (window as any).gtag = gtag;

    gtag("js", new Date());
    gtag("config", this.measurementId, {
      page_path: window.location.pathname,
      send_page_view: false // We'll send manual pageviews for SPA
    });

    return new Promise((resolve) => {
      script.onload = () => {
        this.isReady = true;
        resolve();
      };
    });
  }

  track(event: AnalyticsEvent): void {
    if (!this.isReady || typeof window === "undefined") return;

    const gtag = (window as any).gtag;
    if (gtag) {
      gtag("event", event.name, event.props);
    }
  }

  pageview(path: string): void {
    if (!this.isReady || typeof window === "undefined") return;

    const gtag = (window as any).gtag;
    if (gtag) {
      gtag("config", this.measurementId, {
        page_path: path
      });
    }
  }
}

// ===========================================
// CLARITY PROVIDER (Optional)
// ===========================================

class ClarityProvider {
  name = "clarity";
  isReady = false;
  private clarityId: string;

  constructor(clarityId: string) {
    this.clarityId = clarityId;
  }

  async init(): Promise<void> {
    if (typeof window === "undefined") return;

    // Load Clarity script
    const script = document.createElement("script");
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${this.clarityId}");
    `;
    script.defer = true;
    
    document.head.appendChild(script);

    return new Promise((resolve) => {
      script.onload = () => {
        this.isReady = true;
        resolve();
      };
    });
  }
}

// ===========================================
// PROVIDER FACTORY
// ===========================================

export function createAnalyticsProvider(): AnalyticsProvider | null {
  // Check for Do Not Track
  if (typeof window !== "undefined") {
    const dnt = navigator.doNotTrack === "1" || 
                (window as any).doNotTrack === "1" ||
                navigator.doNotTrack === "yes";
    if (dnt) {
      console.info("Analytics disabled: Do Not Track enabled");
      return null;
    }
  }

  // Check environment configuration
  const provider = env.ANALYTICS_PROVIDER;
  
  if (provider === "none") {
    console.info("Analytics disabled: ANALYTICS_PROVIDER=none");
    return null;
  }

  if (provider === "plausible") {
    const domain = env.ANALYTICS_DOMAIN;
    if (!domain) {
      console.warn("Analytics disabled: ANALYTICS_DOMAIN not configured for Plausible");
      return null;
    }
    return new PlausibleProvider(domain);
  }

  if (provider === "ga") {
    const measurementId = env.GA_MEASUREMENT_ID;
    if (!measurementId) {
      console.warn("Analytics disabled: GA_MEASUREMENT_ID not configured for GA4");
      return null;
    }
    return new GA4Provider(measurementId);
  }

  console.warn("Analytics disabled: Unknown provider", provider);
  return null;
}

export function createClarityProvider(): ClarityProvider | null {
  const clarityId = env.CLARITY_ID;
  if (!clarityId) return null;
  
  return new ClarityProvider(clarityId);
}
