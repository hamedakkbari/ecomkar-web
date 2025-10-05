import { getServerEnv } from "../server/env";

export function getZarinpalPaymentUrl(): string {
  const env = getServerEnv();
  // We use a fixed short link configured via env var, fallback to example value if missing (dev only)
  const url = process.env.ZARINPAL_PAYMENT_URL || "https://zarinp.al/737806";
  return url;
}

export function resolveEnvHref(href: string): string {
  // Replace ENV:ZARINPAL_PAYMENT_URL placeholder with actual env URL
  if (href.startsWith("ENV:ZARINPAL_PAYMENT_URL")) {
    return getZarinpalPaymentUrl();
  }
  return href;
}



