/**
 * Real IP extraction from various headers
 * Handles x-forwarded-for, cf-connecting-ip, x-real-ip, and fallbacks
 */

export function extractRealIP(request: Request): string {
  // Try to get IP from various headers in order of preference
  const headers = request.headers;
  
  // 1. x-forwarded-for (first IP in chain)
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",").map(ip => ip.trim());
    const firstIP = ips[0];
    if (isValidIP(firstIP)) {
      return firstIP;
    }
  }
  
  // 2. cf-connecting-ip (Cloudflare)
  const cfConnectingIP = headers.get("cf-connecting-ip");
  if (cfConnectingIP && isValidIP(cfConnectingIP)) {
    return cfConnectingIP;
  }
  
  // 3. x-real-ip (nginx)
  const xRealIP = headers.get("x-real-ip");
  if (xRealIP && isValidIP(xRealIP)) {
    return xRealIP;
  }
  
  // 4. x-client-ip (some proxies)
  const xClientIP = headers.get("x-client-ip");
  if (xClientIP && isValidIP(xClientIP)) {
    return xClientIP;
  }
  
  // 5. Fallback to request.ip (Next.js)
  // Note: This might not be available in all environments
  if (typeof (request as any).ip === "string" && isValidIP((request as any).ip)) {
    return (request as any).ip;
  }
  
  // 6. Ultimate fallback
  return "0.0.0.0";
}

function isValidIP(ip: string): boolean {
  if (!ip || typeof ip !== "string") return false;
  
  // Basic IPv4 validation
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(ip)) return true;
  
  // Basic IPv6 validation (simplified)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (ipv6Regex.test(ip)) return true;
  
  // Check for private/local IPs (still valid for rate limiting)
  if (ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return true;
  }
  
  return false;
}

export function hashIP(ip: string): string {
  // Simple hash for logging (not cryptographically secure)
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}
