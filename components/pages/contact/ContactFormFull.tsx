/**
 * Full Contact Form Component
 * Handles contact form submission with validation and analytics
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { ContactForm } from "@/lib/content/pages/contact";
import { validateEmail, validateName, validatePhoneChars, validateMessageLength, createThrottle } from "@/lib/utils/validation";

interface ContactFormFullProps {
  form: ContactForm;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  consent: boolean;
  hp_token: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactFormFull({ form }: ContactFormFullProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    consent: false,
    hp_token: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    form.fields.forEach(field => {
      if (field.required && !formData[field.key as keyof FormData]) {
        newErrors[field.key] = `${field.label} الزامی است`;
      }
    });

    if (!validateName(formData.name)) {
      newErrors.name = "نام باید حداقل ۲ کاراکتر باشد";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "فرمت ایمیل نامعتبر است";
    }

    if (formData.phone && !validatePhoneChars(formData.phone)) {
      newErrors.phone = "فقط +، ارقام و فاصله مجاز است";
    }

    if (!validateMessageLength(formData.message)) {
      newErrors.message = "پیام باید بین ۱۰ تا ۲۰۰۰ کاراکتر باشد";
    }

    if (!formData.consent) {
      newErrors.consent = "موافقت با قوانین الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const throttle = useMemo(() => createThrottle(6000), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.hp_token) {
      setSubmitStatus("error");
      setSubmitMessage(form.errorText || "مشکلی رخ داد؛ دوباره تلاش کنید.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!throttle()) {
      setSubmitStatus("error");
      setSubmitMessage("لطفاً چند ثانیه بعد دوباره تلاش کنید.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Collect UTM from URL
      const url = new URL(window.location.href);
      const utm = {
        source: url.searchParams.get("utm_source") || undefined,
        medium: url.searchParams.get("utm_medium") || undefined,
        campaign: url.searchParams.get("utm_campaign") || undefined,
        term: url.searchParams.get("utm_term") || undefined,
        content: url.searchParams.get("utm_content") || undefined,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          message: formData.message,
          consent: formData.consent,
          hp_token: formData.hp_token,
          utm,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setSubmitStatus("success");
        setSubmitMessage(form.successText);
        
        // Analytics will be captured by data-analytics attribute

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          consent: false,
          hp_token: ""
        });
      } else {
        setSubmitStatus("error");
        if (result.status === 429 || result.status === 422) {
          setSubmitMessage("درخواست زیاد یا اسپم تشخیص داده شد؛ چند ثانیه بعد تلاش کنید.");
        } else if (result.status === 400) {
          setSubmitMessage(form.errorText || "مشکل اعتبارسنجی—فیلدها را بررسی کنید.");
        } else if (result.status === 502) {
          setSubmitMessage("دریافت شد—در حال پیگیری هستیم.");
        } else {
          setSubmitMessage(result.message || form.errorText || "خطا در ارسال پیام");
        }
        
        // Set field errors if provided
        if (result.fields) {
          setErrors(result.fields);
        }
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("خطا در اتصال به سرور");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" dir="rtl">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="backdrop-blur-md rounded-2xl p-8 card"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)'
        }}
        data-analytics="submit_contact_full"
      >
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {form.fields.map((field) => (
            <div key={field.key} className={field.key === "message" ? "md:col-span-2" : ""}>
              <label
                htmlFor={field.key}
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {field.label}
                {field.required && <span className="text-red-400 mr-1">*</span>}
              </label>
              
              {field.key === "message" ? (
                <textarea
                  id={field.key}
                  name={field.key}
                  value={formData[field.key as keyof FormData] as string}
                  onChange={(e) => handleInputChange(field.key as keyof FormData, e.target.value)}
                  placeholder={field.placeholder}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                    errors[field.key] ? "border-red-500" : ""
                  }`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: errors[field.key] ? '1px solid #ef4444' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-control)',
                    color: 'var(--text-primary)'
                  }}
                  aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                />
              ) : (
                <input
                  type={field.key === "email" ? "email" : field.key === "phone" ? "tel" : "text"}
                  id={field.key}
                  name={field.key}
                  value={formData[field.key as keyof FormData] as string}
                  onChange={(e) => handleInputChange(field.key as keyof FormData, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                    errors[field.key] ? "border-red-500" : ""
                  }`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: errors[field.key] ? '1px solid #ef4444' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-control)',
                    color: 'var(--text-primary)'
                  }}
                  dir={field.key === "email" || field.key === "phone" ? "ltr" : "rtl"}
                  aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                />
              )}
              
              {errors[field.key] && (
                <p id={`${field.key}-error`} className="mt-2 text-sm text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors[field.key]}
                </p>
              )}
            </div>
          ))}

          {/* Consent Checkbox */}
          <div className="md:col-span-2 flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => handleInputChange("consent", e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label 
              htmlFor="consent" 
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {form.consentLabel}
              <a
                href={form.privacyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline mr-1"
                style={{ color: 'var(--primary-neon)' }}
              >
                قوانین حریم خصوصی
              </a>
            </label>
          </div>
          
          {errors.consent && (
            <p className="md:col-span-2 text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {errors.consent}
            </p>
          )}

          {/* Honeypot field */}
          <div className="hidden" aria-hidden>
            <label htmlFor="hp_token">Do not fill</label>
            <input
              type="text"
              id="hp_token"
              name="hp_token"
              value={formData.hp_token}
              onChange={(e) => handleInputChange("hp_token", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Submit Status */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-900/20 border border-green-800/50 rounded-lg"
            data-analytics="success_contact_full"
            aria-live="polite"
          >
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>{submitMessage}</span>
            </div>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-900/20 border border-red-800/50 rounded-lg"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{submitMessage}</span>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 px-6 py-4 font-semibold rounded-xl disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3 focus-visible:outline-none btn-primary"
          aria-busy={isSubmitting || undefined}
          aria-live="polite"
          role="status"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              در حال ارسال...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {form.submitLabel}
            </>
          )}
        </button>

        {form.note && (
          <p 
            className="mt-4 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            {form.note}
          </p>
        )}
      </motion.form>
    </div>
  );
}

