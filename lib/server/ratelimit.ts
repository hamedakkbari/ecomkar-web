/**
 * In-memory rate limiting with sliding window
 * TODO: Migrate to Redis/Upstash for production
 */

import { getServerEnv } from "./env";

interface RateLimitEntry {
  requests: number[];
  lastCleanup: number;
}

// In-memory store: IP -> Route -> RateLimitEntry
const rateLimitStore = new Map<string, Map<string, RateLimitEntry>>();

export interface RateLimitResult {
  allowed: boolean;
  retryInMs?: number;
}

export function checkRateLimit(ip: string, route: string): RateLimitResult {
  const env = getServerEnv();
  const now = Date.now();
  const windowMs = env.RATE_LIMIT_WINDOW_MS;
  const maxRequests = env.RATE_LIMIT_MAX;

  // Get or create IP entry
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, new Map());
  }

  const ipMap = rateLimitStore.get(ip)!;
  
  // Get or create route entry
  if (!ipMap.has(route)) {
    ipMap.set(route, {
      requests: [],
      lastCleanup: now
    });
  }

  const entry = ipMap.get(route)!;

  // Clean old requests (sliding window)
  const cutoff = now - windowMs;
  entry.requests = entry.requests.filter(timestamp => timestamp > cutoff);

  // Check if limit exceeded
  if (entry.requests.length >= maxRequests) {
    const oldestRequest = Math.min(...entry.requests);
    const retryInMs = (oldestRequest + windowMs) - now;
    
    return {
      allowed: false,
      retryInMs: Math.max(0, retryInMs)
    };
  }

  // Add current request
  entry.requests.push(now);
  entry.lastCleanup = now;

  return { allowed: true };
}

// Cleanup old entries periodically (simple garbage collection)
export function cleanupRateLimit(): void {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  for (const [ip, ipMap] of rateLimitStore.entries()) {
    for (const [route, entry] of ipMap.entries()) {
      if (now - entry.lastCleanup > maxAge) {
        ipMap.delete(route);
      }
    }
    
    if (ipMap.size === 0) {
      rateLimitStore.delete(ip);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimit, 5 * 60 * 1000);
}
