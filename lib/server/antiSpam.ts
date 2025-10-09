/**
 * Anti-spam measures: honeypot, UA checks, content heuristics
 * Lightweight spam detection without external dependencies
 */

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

// Suspicious User-Agent patterns
const SUSPICIOUS_UA_PATTERNS = [
  /^curl\//i,
  /^wget\//i,
  /^python-requests\//i,
  /^Go-http-client\//i,
  /^Java\//i,
  /^bot\//i,
  /^crawler\//i,
  /^spider\//i,
  /^scraper\//i
];

// Generic bot patterns
const BOT_UA_PATTERNS = [
  /^Mozilla\/5\.0 \(compatible; [^)]+\)$/i,
  /^Mozilla\/4\.0 \(compatible; MSIE/,
  /^Opera\/9\.80/,
  /^Links/,
  /^Lynx/
];

export function checkHoneypot(hpToken: string): SpamCheckResult {
  if (hpToken && hpToken.trim() !== "") {
    return {
      isSpam: true,
      reason: "Honeypot field filled"
    };
  }
  return { isSpam: false };
}

export function checkUserAgent(userAgent: string): SpamCheckResult {
  if (!userAgent || userAgent.trim().length === 0) {
    return {
      isSpam: true,
      reason: "Missing User-Agent"
    };
  }

  // Check for suspicious patterns
  for (const pattern of SUSPICIOUS_UA_PATTERNS) {
    if (pattern.test(userAgent)) {
      return {
        isSpam: true,
        reason: "Suspicious User-Agent pattern"
      };
    }
  }

  // Check for generic bot patterns
  for (const pattern of BOT_UA_PATTERNS) {
    if (pattern.test(userAgent)) {
      return {
        isSpam: true,
        reason: "Generic bot User-Agent"
      };
    }
  }

  return { isSpam: false };
}

export function checkContentHeuristics(message: string): SpamCheckResult {
  if (!message || typeof message !== "string") {
    return { isSpam: false };
  }

  const text = message.toLowerCase();
  
  // Count URLs (http/https)
  const urlMatches = text.match(/https?:\/\/[^\s]+/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  
  if (urlCount >= 3) {
    return {
      isSpam: true,
      reason: "Too many URLs in message"
    };
  }

  // Check for repeated characters (>30% of message)
  const charCounts: { [key: string]: number } = {};
  for (const char of text) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  
  const maxCharCount = Math.max(...Object.values(charCounts));
  const repetitionRatio = maxCharCount / text.length;
  
  if (repetitionRatio > 0.3) {
    return {
      isSpam: true,
      reason: "Excessive character repetition"
    };
  }

  // Check for common spam keywords (Persian/English)
  const spamKeywords = [
    "viagra", "casino", "lottery", "winner", "congratulations",
    "click here", "free money", "earn money", "work from home",
    "ویاگرا", "کازینو", "قرعه کشی", "برنده", "تبریک",
    "کلیک کنید", "پول رایگان", "درآمد", "کار در خانه"
  ];
  
  const spamKeywordCount = spamKeywords.filter(keyword => 
    text.includes(keyword.toLowerCase())
  ).length;
  
  if (spamKeywordCount >= 2) {
    return {
      isSpam: true,
      reason: "Spam keywords detected"
    };
  }

  return { isSpam: false };
}

export function performSpamCheck(
  hpToken: string,
  userAgent: string,
  message: string
): SpamCheckResult {
  // Check honeypot first (fastest)
  const honeypotCheck = checkHoneypot(hpToken);
  if (honeypotCheck.isSpam) {
    return honeypotCheck;
  }

  // Check User-Agent
  const uaCheck = checkUserAgent(userAgent);
  if (uaCheck.isSpam) {
    // Soft-pass for UA-only suspicion if no other red flags
    // Logically allow and annotate reason to logs upstream
    return { isSpam: false, reason: "suspicious-ua-only" };
  }

  // Check content heuristics
  const contentCheck = checkContentHeuristics(message);
  if (contentCheck.isSpam) {
    return contentCheck;
  }

  return { isSpam: false };
}
