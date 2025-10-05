export interface CheckoutContent {
  checkout: {
    heading: string;
    lead: string;
    product: { name: string; price: string };
    bullets: string[];
    primaryCta: { label: string; href: string }; // href can be ENV:ZARINPAL_PAYMENT_URL placeholder
    secondary: { text: string; cta: { label: string; href: string } };
  };
  thankyou: {
    heading: string;
    lead: string;
    form: {
      email: { label: string; placeholder: string };
      payment_ref: { label: string; placeholder: string };
      note: { label: string; placeholder: string };
      consentLabel: string;
      submit: string;
    };
    success: { heading: string; body: string };
  };
}

const content: CheckoutContent = {
  checkout: {
    heading: "تکمیل خرید با زرین‌پال",
    lead: "برای فعال‌سازی دسترسی، پرداخت را انجام بده؛ سپس در صفحهٔ بعدی اطلاعات تأیید را ثبت کن.",
    product: { name: "دوره ساخت AI AGENT با هوش‌مصنوعی (پروژه محور)", price: "12,900,000 تومان" },
    bullets: ["پرداخت امن • زرین‌پال", "بدون ایجاد حساب", "تأیید دستی سریع"],
    primaryCta: { label: "پرداخت با زرین‌پال", href: "ENV:ZARINPAL_PAYMENT_URL" },
    secondary: { text: "قبلاً پرداخت کردی؟", cta: { label: "ثبت تأیید پرداخت", href: "/thank-you" } }
  },
  thankyou: {
    heading: "پرداخت انجام شد؟ تأییدش کن",
    lead: "ایمیل‌ات و «رفرنس/کد پیگیری» را وارد کن تا دسترسی/لینک بعدی برایت ارسال شود.",
    form: {
      email: { label: "ایمیل", placeholder: "you@example.com" },
      payment_ref: { label: "رفرنس/کد پیگیری زرین‌پال", placeholder: "مثلاً Authority/RefID" },
      note: { label: "توضیح (اختیاری)", placeholder: "هر توضیحی که کمک می‌کند" },
      consentLabel: "ارتباط از طریق ایمیل را می‌پذیرم",
      submit: "ارسال تأیید"
    },
    success: { heading: "تأیید دریافت شد", body: "به‌زودی نتیجه را ایمیل می‌کنیم. اگر فوریت داری، در تماس پیام بده." }
  }
};

export default content;



