/**
 * Lightweight validation utilities for Demo Teaser form
 * No heavy dependencies - using native JavaScript patterns
 * RTL-friendly error messages in Persian
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormData {
  name: string;
  email: string;
  site_url: string;
  business_type?: string;
  consent: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation and normalization
const URL_REGEX = /^https?:\/\/.+/;

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate and normalize URL
 */
export function validateAndNormalizeUrl(url: string): { isValid: boolean; normalized?: string } {
  const trimmed = url.trim();
  
  if (!trimmed) {
    return { isValid: false };
  }
  
  // Add https:// if no protocol specified
  if (!URL_REGEX.test(trimmed)) {
    const normalized = `https://${trimmed}`;
    return { isValid: true, normalized };
  }
  
  return { isValid: true, normalized: trimmed };
}

/**
 * Validate name (minimum 2 characters)
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * Validate phone allowed chars (+, digits, spaces)
 */
export function validatePhoneChars(phone: string): boolean {
  if (!phone) return true;
  return /^[+\d\s()-]*$/.test(phone);
}

/**
 * Validate message length 10-2000
 */
export function validateMessageLength(message: string): boolean {
  const len = (message || "").trim().length;
  return len >= 10 && len <= 2000;
}

/**
 * Validate consent checkbox
 */
export function validateConsent(consent: boolean): boolean {
  return consent === true;
}

/**
 * Comprehensive form validation
 */
export function validateFormData(data: FormData): ValidationResult {
  const errors: ValidationError[] = [];
  
  // Name validation
  if (!validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'نام باید حداقل ۲ کاراکتر باشد'
    });
  }
  
  // Email validation
  if (!validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'فرمت ایمیل صحیح نیست'
    });
  }
  
  // URL validation
  const urlValidation = validateAndNormalizeUrl(data.site_url);
  if (!urlValidation.isValid) {
    errors.push({
      field: 'site_url',
      message: 'آدرس وب‌سایت باید با http یا https شروع شود'
    });
  }
  
  // Consent validation
  if (!validateConsent(data.consent)) {
    errors.push({
      field: 'consent',
      message: 'لطفاً موافقت خود را با قوانین حریم خصوصی اعلام کنید'
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Normalize form data (fix URLs, trim strings)
 */
export function normalizeFormData(data: FormData): FormData {
  const urlValidation = validateAndNormalizeUrl(data.site_url);
  
  return {
    ...data,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    site_url: urlValidation.normalized || data.site_url.trim()
  };
}

/**
 * Get UTM parameters from current URL
 */
export function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  return utmParams;
}

/**
 * Create webhook payload
 */
export function createWebhookPayload(formData: FormData): any {
  const utmParams = getUTMParams();
  
  return {
    name: formData.name,
    email: formData.email,
    site_url: formData.site_url,
    business_type: formData.business_type || null,
    utm: utmParams,
    consent: formData.consent,
    ts: new Date().toISOString()
  };
}

/**
 * Throttle function to prevent spam
 */
export function createThrottle(delay: number = 10000) {
  let lastCall = 0;
  
  return function throttle(): boolean {
    const now = Date.now();
    if (now - lastCall < delay) {
      return false; // Too soon
    }
    lastCall = now;
    return true;
  };
}

