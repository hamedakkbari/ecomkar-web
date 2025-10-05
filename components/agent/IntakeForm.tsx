"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { AgentContent, IntakeField } from "@/lib/content/agent";

interface IntakeFormProps {
  content: AgentContent;
  onSubmit: (data: {
    website_url: string;
    business_type: string;
    primary_goal: string;
    channels: string[];
    current_tools: string;
    budget: string;
    phone: string;
    email: string;
    consent: boolean;
    hp_token: string;
  }) => void;
  isLoading: boolean;
  errors: { [key: string]: string };
}

export default function IntakeForm({ content, onSubmit, isLoading, errors }: IntakeFormProps) {
  const [formData, setFormData] = useState({
    website_url: "",
    business_type: "",
    primary_goal: "",
    channels: [] as string[],
    current_tools: "",
    budget: "",
    phone: "",
    email: "",
    consent: true,
    hp_token: "" // Honeypot field
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizeWebsiteUrl = (url: string) => {
      const trimmed = (url || "").trim();
      if (!trimmed) return trimmed;
      if (/^https?:\/\//i.test(trimmed)) return trimmed;
      return `https://${trimmed}`;
    };
    
    // Client-side validation
    if (!formData.website_url || !formData.business_type || !formData.primary_goal || formData.channels.length === 0 || !formData.current_tools || !formData.budget || !formData.phone || !formData.email) {
      return;
    }

    onSubmit({
      ...formData,
      website_url: normalizeWebsiteUrl(formData.website_url)
    });
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field as keyof typeof prev] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [field]: newValues
      };
    });
  };


  const renderField = (field: IntakeField) => {
    const fieldValue = formData[field.key as keyof typeof formData];
    const hasError = errors[field.key];

    if (field.multi && field.options) {
      return (
        <div key={field.key} className="space-y-4">
          <label 
            className="block text-lg font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            {field.label}
            <span className="text-red-500 mr-1">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {field.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleMultiSelect(field.key, option)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  Array.isArray(fieldValue) && fieldValue.includes(option)
                    ? "btn-primary"
                    : "btn-ghost"
                } ${hasError ? "border border-red-500" : ""}`}
                disabled={isLoading}
              >
                {option}
              </button>
            ))}
          </div>
          {hasError && (
            <p className="text-sm text-red-400" role="alert">
              {hasError}
            </p>
          )}
        </div>
      );
    }

    if (field.options) {
      return (
        <div key={field.key} className="space-y-4">
          <label 
            htmlFor={field.key} 
            className="block text-lg font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            {field.label}
            <span className="text-red-500 mr-1">*</span>
          </label>
          <select
            id={field.key}
            name={field.key}
            value={fieldValue as string}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className={`w-full px-6 py-4 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm ${
              hasError 
                ? "border-red-500 bg-red-50 dark:bg-red-900/20" 
                : ""
            }`}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: hasError ? '1px solid #ef4444' : '1px solid var(--border)',
              borderRadius: 'var(--radius-control)',
              color: 'var(--text-primary)'
            }}
            aria-describedby={hasError ? `${field.key}_error` : undefined}
            disabled={isLoading}
            required
          >
            <option value="">انتخاب کنید...</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {hasError && (
            <p id={`${field.key}_error`} className="text-sm text-red-400" role="alert">
              {hasError}
            </p>
          )}
        </div>
      );
    }

    return (
      <div key={field.key} className="space-y-4">
        <label 
          htmlFor={field.key} 
          className="block text-lg font-semibold"
          style={{ color: 'var(--text-secondary)' }}
        >
          {field.label}
          <span className="text-red-500 mr-1">*</span>
        </label>
        <input
          type={field.key === "email" ? "email" : field.key === "phone" ? "tel" : "text"}
          id={field.key}
          name={field.key}
          value={fieldValue as string}
          onChange={(e) => handleInputChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={`w-full px-6 py-4 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm ${
            hasError 
              ? "border-red-500 bg-red-50 dark:bg-red-900/20" 
              : ""
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: hasError ? '1px solid #ef4444' : '1px solid var(--border)',
            borderRadius: 'var(--radius-control)',
            color: 'var(--text-primary)'
          }}
          aria-describedby={hasError ? `${field.key}_error` : undefined}
          disabled={isLoading}
          required
        />
        {hasError && (
          <p id={`${field.key}_error`} className="text-sm text-red-400" role="alert">
            {hasError}
          </p>
        )}
      </div>
    );
  };

  // Check if all required fields are filled
  const isFormValid = formData.website_url && 
                     formData.business_type && 
                     formData.primary_goal && 
                     formData.channels.length > 0 && 
                     formData.current_tools && 
                     formData.budget && 
                     formData.phone && 
                     formData.email;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(to bottom right, rgba(0, 229, 255, 0.05), rgba(122, 92, 255, 0.05))'
        }}
      ></div>
      <motion.form
        onSubmit={handleSubmit}
        className="relative space-y-8 p-8 h-full overflow-hidden flex flex-col max-h-[900px]"
        data-analytics="agent_session_start"
      >
        <div className="text-center mb-8">
          <h2 
            className="text-3xl font-bold mb-3 gradient-text"
            style={{ color: 'var(--text-primary)' }}
          >
            {content.intake.heading}
          </h2>
          <p 
            style={{ color: 'var(--text-secondary)' }}
          >
            اطلاعات کسب‌وکار خود را وارد کنید تا تحلیل کاملی دریافت کنید
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 py-2 scrollbar-thin">
          {content.intake.fields.map(renderField)}
        </div>

        {/* Consent removed per request; implicit consent true in payload */}

        {/* Honeypot Field (Hidden) */}
        <input
          type="text"
          name="hp_token"
          value={formData.hp_token}
          onChange={(e) => handleInputChange("hp_token", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px" }}
          aria-hidden="true"
        />

        {/* Combined Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !isFormValid}
          className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform ${
            isLoading || !isFormValid
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "btn-primary"
          }`}
          whileHover={!isLoading && isFormValid ? { scale: 1.05 } : {}}
          whileTap={!isLoading && isFormValid ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span role="status" aria-live="polite">در حال ایجاد جلسه...</span>
            </div>
          ) : (
            "شروع تحلیل با چت‌بات"
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

