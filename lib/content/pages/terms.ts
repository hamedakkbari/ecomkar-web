/**
 * Terms page content schema and data
 */

export type TermsPage = {
  heading: string;
  updatedAt?: string;
  intro?: string;
  sections: Array<{
    id: string;
    title: string;
    body: string;
  }>;
  seo?: { title?: string; description?: string; image?: string };
};

const terms: TermsPage = {
  heading: "شرایط استفاده از خدمات EcomKar",
  updatedAt: "2025-09-30",
  intro: "این سند مشاورهٔ حقوقی نیست و ممکن است نیازمند تطبیق با قوانین محلی شما باشد.",
  sections: [
    { id: "acceptance", title: "پذیرش شرایط", body: "با استفاده از سایت و خدمات، شما با شرایط حاضر موافقت می‌کنید." },
    { id: "changes", title: "تغییرات", body: "ممکن است این شرایط به‌روزرسانی شود؛ نسخهٔ جدید در همین صفحه منتشر خواهد شد." },
    { id: "payments", title: "پرداخت‌ها", body: "پرداخت‌ها از طریق درگاه‌های معتبر (مانند زرین‌پال) انجام می‌شود." },
    { id: "refund", title: "بازگشت وجه", body: "در صورت عدم رضایت از برخی خدمات دیجیتال، بازگشت وجه تا ۷ روز مطابق شرایط اعلام‌شده امکان‌پذیر است." },
    { id: "liability", title: "محدودیت مسئولیت", body: "EcomKar مسئولیتی نسبت به خسارات غیرمستقیم یا تبعی ندارد؛ استفاده از خدمات با مسئولیت کاربر است." },
    { id: "contact", title: "تماس", body: "برای سوالات حقوقی یا قراردادی، از طریق ایمیل hello@ecomkar.com با ما در ارتباط باشید." }
  ],
  seo: {
    title: "شرایط استفاده — EcomKar",
    description: "قوانین و شرایط استفاده از خدمات و وب‌سایت EcomKar.",
    image: "/og.png"
  }
};

export default terms;


