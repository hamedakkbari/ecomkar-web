'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import checkoutContent from '../../../lib/content/checkout';
import { resolveEnvHref } from '../../../lib/payments/zarinpal';

export default function CheckoutPage() {
  useEffect(() => {
    // analytics view
    if (typeof window !== 'undefined') {
      const ev = new CustomEvent('analytics', { detail: { action: 'view_page_checkout' } });
      window.dispatchEvent(ev);
    }
  }, []);

  const { heading, lead, product, bullets, primaryCta, secondary } = checkoutContent.checkout;
  const paymentUrl = resolveEnvHref(primaryCta.href);

  const handlePay = () => {
    if (typeof window !== 'undefined') {
      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
      const ev = new CustomEvent('analytics', { detail: { action: 'click_checkout_zarinpal' } });
      window.dispatchEvent(ev);
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24" data-analytics="view_page_checkout">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center">{heading}</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8 text-center">{lead}</p>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="mb-6">
            <div className="text-white text-xl font-semibold mb-1">{product.name}</div>
            <div className="text-blue-400 font-bold">{product.price}</div>
          </div>

          <ul className="space-y-2 mb-8">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-white/80">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>

          <motion.button
            onClick={handlePay}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            {primaryCta.label}
          </motion.button>

          <div className="mt-4 text-center text-white/80">
            {secondary.text}{' '}
            <Link href={secondary.cta.href} className="text-blue-400 hover:text-blue-300" data-analytics="go_to_thank_you">
              {secondary.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}



