/**
 * App Router Integration for Analytics
 * Handles SPA navigation and pageview tracking
 */

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { createEventQueue } from "./events";
import { AnalyticsProvider } from "./provider";

// ===========================================
// ROUTER HOOK
// ===========================================

export function useAnalyticsRouter(provider: AnalyticsProvider | null) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const eventQueue = useRef(createEventQueue(provider));
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    // Get current path
    const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    
    // Skip if it's the same path (initial load)
    if (previousPath.current === currentPath) return;
    
    // Update previous path
    previousPath.current = currentPath;
    
    // Send pageview
    if (provider && provider.isReady) {
      eventQueue.current.pageview(currentPath);
    }
  }, [pathname, searchParams, provider]);

  return eventQueue.current;
}

// ===========================================
// PATH UTILITIES
// ===========================================

export function normalizePath(path: string): string {
  // Remove query parameters for cleaner paths
  const [pathname] = path.split("?");
  
  // Remove trailing slash except for root
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  
  return pathname;
}

export function getCanonicalPath(): string {
  if (typeof window === "undefined") return "/";
  
  const path = window.location.pathname;
  return normalizePath(path);
}

// ===========================================
// NAVIGATION TRACKING
// ===========================================

export function trackNavigation(from: string, to: string): void {
  // This can be used for more detailed navigation tracking
  // Currently handled by useAnalyticsRouter
  console.debug("Navigation:", from, "→", to);
}
