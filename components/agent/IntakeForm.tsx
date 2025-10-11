"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitIntake } from "@/lib/agent/api";
import type { AgentResponse, IntakePayload } from "@/lib/agent/types";

type Props = {
  onAnalysis: (resp: AgentResponse) => void;
};

export default function IntakeForm({ onAnalysis }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    website_url: "",
    instagram: "",
    business_type: "",
    primary_goal: "",
    channels: [] as string[],
    current_tools: [] as string[],
    budget: "",
    phone: "",
    email: "",
    consent: true,
    hp_token: ""
  });

  const update = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  const normalizeInstagram = (val?: string) => {
    const v = (val || "").trim();
    if (!v) return undefined;
    if (v.startsWith("http://") || v.startsWith("https://")) return v;
    const handle = v.startsWith("@") ? v.slice(1) : v;
    return `https://instagram.com/${handle}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (!form.email || !form.primary_goal || !form.business_type || form.channels.length === 0 || form.current_tools.length === 0) {
      setError("لطفاً فیلدهای الزامی را تکمیل کنید.");
      return;
    }

    setLoading(true);
    console.log("Starting analysis request..."); // Debug log
    
    try {
    const payload: IntakePayload = {
      website_url: form.website_url?.trim(),
      instagram_url: normalizeInstagram(form.instagram),
      business_type: form.business_type,
      primary_goal: form.primary_goal,
      channels: form.channels,
      current_tools: Array.isArray(form.current_tools) ? form.current_tools.join(", ") : (form.current_tools as unknown as string),
      budget: form.budget,
      phone: form.phone?.trim(),
      email: form.email.trim(),
      consent: !!form.consent,
      hp_token: ""
    };

      // Add timeout for frontend request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 35000); // 35 seconds
      });
      
      const resp = await Promise.race([
        submitIntake(payload),
        timeoutPromise
      ]) as any;
      
      console.log("Agent response:", resp); // Debug log
    if (resp.ok) {
      onAnalysis(resp);
    } else {
      if (resp.fields && Object.keys(resp.fields).length > 0) {
        const first = Object.values(resp.fields)[0];
        setError(first);
      } else if ((resp as any).error === "POTENTIAL_SPAM") {
        setError("درخواست شما به‌طور موقت مسدود شد — لطفاً صحت اطلاعات را بررسی کنید یا کمی بعد دوباره تلاش کنید.");
      } else if ((resp as any).error === "UPSTREAM_UNAVAILABLE") {
        setError("خدمت تحلیل در دسترس نیست. لطفاً کمی بعد دوباره تلاش کنید.");
      } else if ((resp as any).error === "RATE_LIMITED") {
        setError("محدودیت سرعت موقتاً اعمال شده است. کمی بعد دوباره تلاش کنید.");
      } else if ((resp as any).error === "SERVER_ERROR") {
        setError("خطای داخلی سرور رخ داد. کمی بعد دوباره تلاش کنید.");
      } else if ((resp as any).error === "INVALID_INPUT") {
        setError("برخی مقادیر فرم نامعتبر است. لطفاً فیلدها را بررسی کنید.");
      } else if (resp.message) {
        setError(resp.message);
      } else {
        setError("فعلاً سرور تحلیل شلوغه—کمی بعد دوباره تلاش کن.");
      }
    }
    } catch (error) {
      console.error("Analysis request failed:", error);
      if (error instanceof Error && error.message === "Request timeout") {
        setError("درخواست تحلیل زمان زیادی طول کشید. لطفاً دوباره تلاش کنید.");
      } else {
        setError("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
      }
    } finally {
    setLoading(false);
    }
  };

      return (
    <motion.form onSubmit={handleSubmit} className="space-y-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 flex items-center gap-3" role="alert">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
          </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">آدرس وب‌سایت</label>
          <input 
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200" 
            dir="ltr" 
            placeholder="yourwebsite.com" 
            value={form.website_url} 
            onChange={e => update("website_url", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">اینستاگرام</label>
          <input 
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200" 
            dir="ltr" 
            placeholder="@username" 
            value={form.instagram} 
            onChange={e => update("instagram", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">نوع کسب‌وکار</label>
          <select 
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200" 
            value={form.business_type} 
            onChange={e => update("business_type", e.target.value)}
          >
            <option className="bg-gray-800 text-white" value="">انتخاب کنید…</option>
            <option className="bg-gray-800 text-white">فروشگاه آنلاین</option>
            <option className="bg-gray-800 text-white">خدمات B2B</option>
            <option className="bg-gray-800 text-white">آموزش</option>
            <option className="bg-gray-800 text-white">B2C</option>
            <option className="bg-gray-800 text-white">سایر</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">بودجه ماهانه</label>
          <select 
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200" 
            value={form.budget} 
            onChange={e => update("budget", e.target.value)}
          >
            <option className="bg-gray-800 text-white" value="">انتخاب کنید…</option>
            <option className="bg-gray-800 text-white">کمتر از ۵ میلیون</option>
            <option className="bg-gray-800 text-white">۵-۱۵ میلیون</option>
            <option className="bg-gray-800 text-white">۱۵-۳۰ میلیون</option>
            <option className="bg-gray-800 text-white">بیش از ۳۰ میلیون</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-300">هدف اصلی</label>
          <select 
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200" 
            value={form.primary_goal} 
            onChange={e => update("primary_goal", e.target.value)}
          >
            <option className="bg-gray-800 text-white" value="">انتخاب کنید…</option>
            <option className="bg-gray-800 text-white">افزایش فروش</option>
            <option className="bg-gray-800 text-white">خودکارسازی پشتیبانی</option>
            <option className="bg-gray-800 text-white">افزایش لید</option>
            <option className="bg-gray-800 text-white">بهبود UX</option>
            <option className="bg-gray-800 text-white">کاهش هزینه‌ها</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-3">
          <label className="block text-sm font-medium text-gray-300">کانال‌های فروش</label>
          <div className="flex flex-wrap gap-3">
            {["وب‌سایت","اینستاگرام","تلگرام","واتساپ","ایمیل","فیزیکی"].map(ch => {
              const active = form.channels.includes(ch);
    return (
                <button
                  key={ch}
                  type="button"
                  onClick={() => update("channels", active ? form.channels.filter(c => c !== ch) : [...form.channels, ch])}
                  className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                    active 
                      ? "border-cyan-400/60 bg-cyan-500/15 text-cyan-300 shadow-lg shadow-cyan-500/20" 
                      : "border-white/20 hover:border-white/40 hover:bg-white/5 text-gray-300"
                  }`}
                >
                  {ch}
                </button>
              );
            })}
          </div>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-300">ابزارهای فعلی</label>
          <input 
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200" 
            placeholder="مثلاً WordPress, Zarinpal" 
            value={form.current_tools.join(", ")} 
            onChange={e => update("current_tools", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">شماره تماس</label>
          <input 
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200" 
            dir="ltr" 
            placeholder="09123456789"
            value={form.phone} 
            onChange={e => update("phone", e.target.value)} 
          />
      </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">ایمیل</label>
          <input 
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200" 
            dir="ltr" 
            type="email" 
            placeholder="your@email.com"
            value={form.email} 
            onChange={e => update("email", e.target.value)} 
          />
        </div>
        <div className="md:col-span-2 flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
          <input 
            id="consent" 
            type="checkbox" 
            checked={form.consent} 
            onChange={e => update("consent", e.target.checked)}
            className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-400/50 focus:ring-2"
          />
          <label htmlFor="consent" className="text-sm text-gray-300 leading-relaxed">
            با تحلیل و ارتباط از طریق ایمیل/پیام موافقم
          </label>
          <input type="text" aria-hidden name="hp_token" className="hidden" value={form.hp_token} onChange={() => {}} />
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <button 
          type="submit" 
          className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden" 
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-3">
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>در حال تحلیل هوشمند...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>دریافت تحلیل هوشمند</span>
              </>
            )}
          </div>
        </button>
            </div>
      </motion.form>
  );
}


