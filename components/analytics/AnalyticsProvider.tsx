/**
 * Analytics Provider Component
 * Main component that initializes analytics and handles event tracking
 */

"use client";

import { useEffect, useState } from "react";
import { createAnalyticsProvider, createClarityProvider } from "@/lib/analytics/provider";
import { createEventQueue } from "@/lib/analytics/events";
import { useAnalyticsRouter } from "@/lib/analytics/router";
import type { AnalyticsProvider } from "@/lib/analytics/provider";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [provider, setProvider] = useState<AnalyticsProvider | null>(null);
  const [clarityProvider, setClarityProvider] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize analytics providers
  useEffect(() => {
    const initAnalytics = async () => {
      try {
        // Initialize main analytics provider
        const analyticsProvider = createAnalyticsProvider();
        if (analyticsProvider) {
          await analyticsProvider.init();
          setProvider(analyticsProvider);
        }

        // Initialize Clarity if configured
        const clarity = createClarityProvider();
        if (clarity) {
          await clarity.init();
          setClarityProvider(clarity);
        }

        setIsInitialized(true);
      } catch (error) {
        console.warn("Analytics initialization failed:", error);
        setIsInitialized(true);
      }
    };

    initAnalytics();
  }, []);

  // Setup event tracking
  useEffect(() => {
    if (!isInitialized) return;

    const eventQueue = createEventQueue(provider);
    eventQueue.setup();

    // Store event queue globally for manual tracking
    if (typeof window !== "undefined") {
      (window as any).__analytics = eventQueue;
    }
  }, [provider, isInitialized]);

  // Setup router integration
  useAnalyticsRouter(provider);

  return <>{children}</>;
}

// ===========================================
// MANUAL TRACKING HOOK
// ===========================================

export function useAnalytics() {
  const track = (eventName: string, props?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).__analytics) {
      (window as any).__analytics.track(eventName, props);
    }
  };

  const pageview = (path: string) => {
    if (typeof window !== "undefined" && (window as any).__analytics) {
      (window as any).__analytics.pageview(path);
    }
  };

  return { track, pageview };
}
