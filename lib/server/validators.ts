/**
 * Input validation schemas for API routes
 * Lightweight validation without external dependencies
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email regex - RFC5322-like but simplified
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

// Phone normalization - keep only digits and plus
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

// URL validation - accepts both full URLs and domain names
function isValidUrl(url: string): boolean {
  // First try to parse as full URL
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    // If not a full URL, check if it's a valid domain name
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return domainRegex.test(url) && url.length > 3 && url.length < 255;
  }
}

// Contact form validation
export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  hp_token: string;
  consent: boolean;
}

export function validateContactInput(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields
  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push({ field: "name", message: "نام باید حداقل ۲ کاراکتر باشد." });
  }

  if (!data.email || typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
    errors.push({ field: "email", message: "فرمت ایمیل نامعتبر است." });
  }

  if (!data.message || typeof data.message !== "string" || data.message.length < 10 || data.message.length > 2000) {
    errors.push({ field: "message", message: "پیام باید بین ۱۰ تا ۲۰۰۰ کاراکتر باشد." });
  }

  // Optional phone
  if (data.phone && typeof data.phone === "string") {
    const normalized = normalizePhone(data.phone);
    if (normalized.length < 10) {
      errors.push({ field: "phone", message: "شماره تلفن نامعتبر است." });
    }
  }

  // Consent must be true
  if (data.consent !== true) {
    errors.push({ field: "consent", message: "موافقت با قوانین الزامی است." });
  }

  // Honeypot must be empty
  if (data.hp_token && data.hp_token.trim() !== "") {
    errors.push({ field: "hp_token", message: "فیلد مخفی نباید پر باشد." });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Lead form validation
export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: "agent" | "automation" | "chatbot" | "n8n" | "course" | "other";
  budget?: "under_500" | "500_1500" | "1500_3000" | "3000_plus" | "unspecified";
  message: string;
  site_url?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  hp_token: string;
  consent: boolean;
}

const SERVICE_TYPES = ["agent", "automation", "chatbot", "n8n", "course", "other"];
const LEAD_BUDGET_OPTIONS = ["under_500", "500_1500", "1500_3000", "3000_plus", "unspecified"];

export function validateLeadInput(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields (same as contact)
  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push({ field: "name", message: "نام باید حداقل ۲ کاراکتر باشد." });
  }

  if (!data.email || typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
    errors.push({ field: "email", message: "فرمت ایمیل نامعتبر است." });
  }

  if (!data.message || typeof data.message !== "string" || data.message.length < 10 || data.message.length > 2000) {
    errors.push({ field: "message", message: "پیام باید بین ۱۰ تا ۲۰۰۰ کاراکتر باشد." });
  }

  // Service type validation
  if (!data.service_type || !SERVICE_TYPES.includes(data.service_type)) {
    errors.push({ field: "service_type", message: "نوع سرویس نامعتبر است." });
  }

  // Optional budget validation
  if (data.budget && !LEAD_BUDGET_OPTIONS.includes(data.budget)) {
    errors.push({ field: "budget", message: "محدوده بودجه نامعتبر است." });
  }

  // Optional phone (same as contact)
  if (data.phone && typeof data.phone === "string") {
    const normalized = normalizePhone(data.phone);
    if (normalized.length < 10) {
      errors.push({ field: "phone", message: "شماره تلفن نامعتبر است." });
    }
  }

  // Optional site URL validation
  if (data.site_url && typeof data.site_url === "string") {
    if (!isValidUrl(data.site_url)) {
      errors.push({ field: "site_url", message: "آدرس وب‌سایت نامعتبر است." });
    }
  }

  // Consent must be true
  if (data.consent !== true) {
    errors.push({ field: "consent", message: "موافقت با قوانین الزامی است." });
  }

  // Honeypot must be empty
  if (data.hp_token && data.hp_token.trim() !== "") {
    errors.push({ field: "hp_token", message: "فیلد مخفی نباید پر باشد." });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Demo analysis validation
export interface DemoAnalyzeInput {
  site_url: string;
  business_type?: string;
  consent: boolean;
  hp_token: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

const DEMO_BUSINESS_TYPES = ["فروشگاه آنلاین", "خدمات", "آموزش", "B2B", "سایر"];

export function validateDemoAnalyzeInput(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required site URL
  if (!data.site_url || typeof data.site_url !== "string") {
    errors.push({ field: "site_url", message: "آدرس وب‌سایت الزامی است." });
  } else if (!isValidUrl(data.site_url)) {
    errors.push({ field: "site_url", message: "آدرس وب‌سایت یا دامین نامعتبر است. مثال: example.com" });
  }

  // Optional business type validation
  if (data.business_type && !DEMO_BUSINESS_TYPES.includes(data.business_type)) {
    errors.push({ field: "business_type", message: "نوع کسب‌وکار نامعتبر است." });
  }

  // Consent must be true
  if (data.consent !== true) {
    errors.push({ field: "consent", message: "موافقت با قوانین الزامی است." });
  }

  // Honeypot must be empty
  if (data.hp_token && data.hp_token.trim() !== "") {
    errors.push({ field: "hp_token", message: "فیلد مخفی نباید پر باشد." });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Agent session validation
export interface NewSessionInput {
  website_url?: string;
  instagram_url?: string;
  business_type: string;
  primary_goal: string;
  channels: string[];
  current_tools: string;
  budget: string;
  phone: string;
  email: string;
  consent: boolean;
  hp_token: string;
  utm?: Record<string, string>;
}

const AGENT_BUSINESS_TYPES = ["فروشگاه آنلاین", "خدمات B2B", "آموزش", "B2C", "سایر"];
const AGENT_PRIMARY_GOALS = ["افزایش فروش", "خودکارسازی پشتیبانی", "افزایش لید", "بهبود UX", "کاهش هزینه‌ها"];
const AGENT_CHANNELS = ["وب‌سایت", "اینستاگرام", "تلگرام", "واتساپ", "ایمیل", "فیزیکی"];
const AGENT_BUDGET_OPTIONS = ["کمتر از ۵ میلیون", "۵-۱۵ میلیون", "۱۵-۳۰ میلیون", "بیش از ۳۰ میلیون"];

export function validateNewSessionInput(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Website URL validation (optional now)
  if (data.website_url && typeof data.website_url === "string") {
    if (!isValidUrl(data.website_url)) {
      errors.push({ field: "website_url", message: "آدرس وب‌سایت یا دامین نامعتبر است. مثال: example.com" });
    }
  }

  // Instagram URL validation (optional)
  if (data.instagram_url && typeof data.instagram_url === "string") {
    if (!isValidUrl(data.instagram_url)) {
      errors.push({ field: "instagram_url", message: "آدرس اینستاگرام نامعتبر است." });
    }
  }

  // Business type validation
  if (!data.business_type || !AGENT_BUSINESS_TYPES.includes(data.business_type)) {
    errors.push({ field: "business_type", message: "نوع کسب‌وکار نامعتبر است." });
  }

  // Primary goal validation
  if (!data.primary_goal || !AGENT_PRIMARY_GOALS.includes(data.primary_goal)) {
    errors.push({ field: "primary_goal", message: "هدف اصلی نامعتبر است." });
  }

  // Channels validation
  if (!Array.isArray(data.channels) || data.channels.length === 0) {
    errors.push({ field: "channels", message: "حداقل یک کانال انتخاب کنید." });
  } else {
    const invalidChannels = data.channels.filter((channel: string) => !AGENT_CHANNELS.includes(channel));
    if (invalidChannels.length > 0) {
      errors.push({ field: "channels", message: "کانال‌های انتخاب شده نامعتبر هستند." });
    }
  }

  // Current tools validation (accept string[] and normalize)
  if (Array.isArray(data.current_tools)) {
    data.current_tools = data.current_tools.join(", ");
  }
  if (!data.current_tools || typeof data.current_tools !== "string" || data.current_tools.trim().length < 3) {
    errors.push({ field: "current_tools", message: "ابزارهای فعلی باید حداقل ۳ کاراکتر باشد." });
  }

  // Budget validation
  if (!data.budget || !AGENT_BUDGET_OPTIONS.includes(data.budget)) {
    errors.push({ field: "budget", message: "بودجه نامعتبر است." });
  }

  // Phone validation (required)
  if (!data.phone || typeof data.phone !== "string") {
    errors.push({ field: "phone", message: "شماره تماس الزامی است." });
  } else {
    const normalized = normalizePhone(data.phone);
    if (normalized.length < 10) {
      errors.push({ field: "phone", message: "شماره تلفن نامعتبر است." });
    }
  }

  // Email validation (required)
  if (!data.email || typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
    errors.push({ field: "email", message: "فرمت ایمیل نامعتبر است." });
  }

  // Consent must be true
  if (data.consent !== true) {
    errors.push({ field: "consent", message: "موافقت با قوانین الزامی است." });
  }

  // Honeypot must be empty
  if (data.hp_token && data.hp_token.trim() !== "") {
    errors.push({ field: "hp_token", message: "فیلد مخفی نباید پر باشد." });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Agent chat message validation
export interface ChatMessageInput {
  session_id: string;
  message: string;
  hp_token: string;
  utm?: Record<string, string>;
}

export function validateChatMessageInput(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Session ID validation
  if (!data.session_id || typeof data.session_id !== "string" || data.session_id.trim().length === 0) {
    errors.push({ field: "session_id", message: "شناسه جلسه الزامی است." });
  }

  // Message validation
  if (!data.message || typeof data.message !== "string") {
    errors.push({ field: "message", message: "پیام الزامی است." });
  } else if (data.message.trim().length < 2) {
    errors.push({ field: "message", message: "پیام باید حداقل ۲ کاراکتر باشد." });
  } else if (data.message.length > 800) {
    errors.push({ field: "message", message: "پیام نباید بیش از ۸۰۰ کاراکتر باشد." });
  }

  // Honeypot must be empty
  if (data.hp_token && data.hp_token.trim() !== "") {
    errors.push({ field: "hp_token", message: "فیلد مخفی نباید پر باشد." });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}