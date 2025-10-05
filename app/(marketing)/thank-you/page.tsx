'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import checkoutContent from '../../../lib/content/checkout';

interface ConfirmResponse {
  ok: boolean;
  message?: string;
}

export default function ThankYouPage() {
  const [email, setEmail] = useState('');
  const [paymentRef, setPaymentRef] = useState('');
  const [note, setNote] = useState('');
  const [hpToken, setHpToken] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | { heading: string; body: string }>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ev = new CustomEvent('analytics', { detail: { action: 'view_page_thankyou' } });
      window.dispatchEvent(ev);
    }
  }, []);

  const { heading, lead, form, success: successContent } = checkoutContent.thankyou;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/order/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, payment_ref: paymentRef, note, hp_token: hpToken, consent })
      });
      const data: ConfirmResponse = await res.json();
      if (data && data.ok) {
        setSuccess(successContent);
        if (typeof window !== 'undefined') {
          const ev = new CustomEvent('analytics', { detail: { action: 'success_order_confirm' } });
          window.dispatchEvent(ev);
        }
      } else {
        setError(data?.message || 'خطا در ثبت تأیید');
      }
    } catch (err: any) {
      setError('خطای شبکه');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24" data-analytics="view_page_thankyou">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">{heading}</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8 text-center">{lead}</p>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
          {success ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{success.heading}</h2>
              <p className="text-white/80 mb-6">{success.body}</p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/" className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">بازگشت به خانه</Link>
                <Link href="/course" className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white">مشاهده دوره</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" aria-describedby={error ? 'form-error' : undefined}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">{form.email.label}</label>
                <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={form.email.placeholder} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/30" dir="ltr" />
              </div>
              <div>
                <label htmlFor="payment_ref" className="block text-sm font-medium text-white mb-2">{form.payment_ref.label}</label>
                <input id="payment_ref" required value={paymentRef} onChange={e => setPaymentRef(e.target.value)} placeholder={form.payment_ref.placeholder} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/30" dir="ltr" />
              </div>
              <div>
                <label htmlFor="note" className="block text-sm font-medium text-white mb-2">{form.note.label}</label>
                <textarea id="note" rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder={form.note.placeholder} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </div>
              {/* Honeypot */}
              <input type="text" value={hpToken} onChange={e => setHpToken(e.target.value)} className="honeypot" tabIndex={-1} autoComplete="off" />

              <label className="flex items-center gap-2 text-white/80">
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                <span>{form.consentLabel}</span>
              </label>

              {error && (
                <div id="form-error" className="text-red-400 text-sm">{error}</div>
              )}

              <motion.button type="submit" disabled={submitting} whileTap={{ scale: 0.98 }} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 disabled:opacity-60 text-white font-semibold">
                {form.submit}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


