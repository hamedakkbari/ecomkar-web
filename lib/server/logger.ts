/**
 * PII-safe logging with configurable levels
 * Hashes sensitive data, truncates messages, never logs full PII
 */

import { getServerEnv } from "./env";
import { hashEmail } from "../utils/hash";

export type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  route: string;
  ipHash: string;
  userAgent: string;
  duration: number;
  status: number;
  message: string;
  data?: any;
}

export class SafeLogger {
  private logLevel: LogLevel;

  constructor() {
    const env = getServerEnv();
    this.logLevel = env.LOG_LEVEL;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = { error: 0, warn: 1, info: 2 };
    return levels[level] <= levels[this.logLevel];
  }

  private formatLogEntry(entry: LogEntry): string {
    const { timestamp, level, route, ipHash, userAgent, duration, status, message, data } = entry;
    
    let logLine = `[${timestamp}] ${level.toUpperCase()} ${route} ${ipHash} ${userAgent} ${duration}ms ${status} ${message}`;
    
    if (data) {
      logLine += ` ${JSON.stringify(data)}`;
    }
    
    return logLine;
  }

  private log(level: LogLevel, entry: Omit<LogEntry, "timestamp" | "level">): void {
    if (!this.shouldLog(level)) return;

    const fullEntry: LogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      level
    };

    const logLine = this.formatLogEntry(fullEntry);
    
    // Use console methods based on level
    switch (level) {
      case "error":
        console.error(logLine);
        break;
      case "warn":
        console.warn(logLine);
        break;
      case "info":
        console.log(logLine);
        break;
    }
  }

  info(route: string, ipHash: string, userAgent: string, duration: number, status: number, message: string, data?: any): void {
    this.log("info", { route, ipHash, userAgent, duration, status, message, data });
  }

  warn(route: string, ipHash: string, userAgent: string, duration: number, status: number, message: string, data?: any): void {
    this.log("warn", { route, ipHash, userAgent, duration, status, message, data });
  }

  error(route: string, ipHash: string, userAgent: string, duration: number, status: number, message: string, data?: any): void {
    this.log("error", { route, ipHash, userAgent, duration, status, message, data });
  }
}

// Safe data sanitization
export function sanitizeForLogging(data: any): any {
  if (!data || typeof data !== "object") return data;

  const sanitized = { ...data };

  // Hash email addresses
  if (sanitized.email) {
    sanitized.email = hashEmail(sanitized.email);
  }

  // Truncate long messages
  if (sanitized.message && typeof sanitized.message === "string") {
    sanitized.message = sanitized.message.length > 120 
      ? sanitized.message.substring(0, 120) + "..."
      : sanitized.message;
  }

  // Remove honeypot token completely
  if (sanitized.hp_token) {
    delete sanitized.hp_token;
  }

  // Truncate UTM data
  if (sanitized.utm) {
    sanitized.utm = {
      source: sanitized.utm.source ? sanitized.utm.source.substring(0, 20) + "..." : undefined,
      medium: sanitized.utm.medium ? sanitized.utm.medium.substring(0, 20) + "..." : undefined,
      campaign: sanitized.utm.campaign ? sanitized.utm.campaign.substring(0, 20) + "..." : undefined
    };
  }

  return sanitized;
}

// Create logger instance
export const logger = new SafeLogger();
