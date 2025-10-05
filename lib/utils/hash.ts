/**
 * Utility functions for hashing sensitive data
 * SHA256 for email hashing, simple hash for other data
 */

import { createHash } from "crypto";

export function hashEmail(email: string): string {
  if (!email || typeof email !== "string") return "invalid-email";
  
  const normalizedEmail = email.toLowerCase().trim();
  const hash = createHash("sha256").update(normalizedEmail).digest("hex");
  
  // Return first 8 characters of hash for logging
  return hash.substring(0, 8);
}

export function hashString(input: string): string {
  if (!input || typeof input !== "string") return "invalid-input";
  
  const hash = createHash("sha256").update(input).digest("hex");
  return hash.substring(0, 12);
}

export function generateId(): string {
  // Generate a UUID-like string for response IDs
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}-${random}`;
}

export function maskEmail(email: string): string {
  if (!email || typeof email !== "string") return "invalid-email";
  
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "invalid-email";
  
  const maskedLocal = localPart.length > 3 
    ? localPart.substring(0, 3) + "***"
    : "***";
  
  return `${maskedLocal}@${domain}`;
}
