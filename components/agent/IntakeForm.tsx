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

    try {
      console.log("ارسال درخواست به n8n...");
      const resp = await submitIntake(payload);
      console.log("پاسخ دریافت شد:", resp);
    console.log("Agent response:", resp); // Debug log
    if (resp.ok) {
      // Handle different response formats
      const analysisData = resp.analysis || resp;
      onAnalysis({
        ok: true,
        analysis: analysisData,
        reply: resp.reply || resp.text || analysisData?.summary,
        text: resp.text || resp.reply || analysisData?.summary
      });
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
      } else if ((resp as any).error === "TIMEOUT") {
        setError("زمان انتظار به پایان رسید. n8n کمی دیر پاسخ داد. لطفاً دوباره تلاش کنید.");
      } else if ((resp as any).error === "NETWORK_ERROR") {
        setError("خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.");
      } else if (resp.message) {
        setError(resp.message);
      } else {
        setError("فعلاً سرور تحلیل شلوغه—کمی بعد دوباره تلاش کن.");
      }
    } catch (error) {
      console.error("خطا در ارسال درخواست:", error);
      setError("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

      return (
    <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-200" role="alert">
          {error}
          </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">آدرس وب‌سایت</label>
          <input className="w-full rounded-xl bg-transparent border p-3" dir="ltr" placeholder="yourwebsite.com" value={form.website_url} onChange={e => update("website_url", e.target.value)} />
        </div>
        <div>
          <label className="block mb-2">اینستاگرام</label>
          <input className="w-full rounded-xl bg-transparent border p-3" dir="ltr" placeholder="@username" value={form.instagram} onChange={e => update("instagram", e.target.value)} />
        </div>
        <div>
          <label className="block mb-2">نوع کسب‌وکار</label>
          <select className="w-full rounded-xl bg-transparent border p-3 text-white" value={form.business_type} onChange={e => update("business_type", e.target.value)}>
            <option className="text-black" value="">انتخاب کنید…</option>
            <option className="text-black">فروشگاه آنلاین</option>
            <option className="text-black">خدمات B2B</option>
            <option className="text-black">آموزش</option>
            <option className="text-black">B2C</option>
            <option className="text-black">سایر</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">بودجه ماهانه</label>
          <select className="w-full rounded-xl bg-transparent border p-3 text-white" value={form.budget} onChange={e => update("budget", e.target.value)}>
            <option className="text-black" value="">انتخاب کنید…</option>
            <option className="text-black">کمتر از ۵ میلیون</option>
            <option className="text-black">۵-۱۵ میلیون</option>
            <option className="text-black">۱۵-۳۰ میلیون</option>
            <option className="text-black">بیش از ۳۰ میلیون</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2">هدف اصلی</label>
          <select className="w-full rounded-xl bg-transparent border p-3 text-white" value={form.primary_goal} onChange={e => update("primary_goal", e.target.value)}>
            <option className="text-black" value="">انتخاب کنید…</option>
            <option className="text-black">افزایش فروش</option>
            <option className="text-black">خودکارسازی پشتیبانی</option>
            <option className="text-black">افزایش لید</option>
            <option className="text-black">بهبود UX</option>
            <option className="text-black">کاهش هزینه‌ها</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2">کانال‌های فروش</label>
          <div className="flex flex-wrap gap-2">
            {["وب‌سایت","اینستاگرام","تلگرام","واتساپ","ایمیل","فیزیکی"].map(ch => {
              const active = form.channels.includes(ch);
    return (
                <button
                  key={ch}
                  type="button"
                  onClick={() => update("channels", active ? form.channels.filter(c => c !== ch) : [...form.channels, ch])}
                  className={`px-4 py-2 rounded-full border transition ${active ? "border-cyan-400/60 bg-cyan-500/15" : "border-white/20 hover:border-white/40"}`}
                >
                  {ch}
                </button>
              );
            })}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2">ابزارهای فعلی</label>
          <input className="w-full rounded-xl bg-transparent border p-3" placeholder="مثلاً WordPress, Zarinpal" value={form.current_tools.join(", ")} onChange={e => update("current_tools", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
        </div>
        <div>
          <label className="block mb-2">شماره تماس</label>
          <input className="w-full rounded-xl bg-transparent border p-3" dir="ltr" value={form.phone} onChange={e => update("phone", e.target.value)} />
      </div>
        <div>
          <label className="block mb-2">ایمیل</label>
          <input className="w-full rounded-xl bg-transparent border p-3" dir="ltr" type="email" value={form.email} onChange={e => update("email", e.target.value)} />
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <input id="consent" type="checkbox" checked={form.consent} onChange={e => update("consent", e.target.checked)} />
          <label htmlFor="consent">با تحلیل و ارتباط از طریق ایمیل/پیام موافقم</label>
          <input type="text" aria-hidden name="hp_token" className="hidden" value={form.hp_token} onChange={() => {}} />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30 transition disabled:opacity-50 flex items-center gap-2" disabled={loading}>
          {loading && (
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          )}
          {loading ? "در حال ارسال به n8n و دریافت تحلیل…" : "دریافت تحلیل هوشمند"}
        </button>
            </div>
      </motion.form>
  );
}


