// next.config.ts
import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // عملکرد و پایداری
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // برای اجرا در سرور (Coolify)
  output: 'standalone',

  // جلوی توقف بیلد به‌خاطر خطاهای ESLint/TS را می‌گیرد
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // اگر از تصاویر خارجی استفاده می‌کنی، مشکل Image Optimization نداشته باشی
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // در صورت نیاز می‌تونی محدودش کنی
    ],
  },

  // ریدایرکت www → بدون www (اختیاری؛ اگر در Cloudflare هم انجام می‌دهی، می‌تونی حذفش کنی)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ecomkar.com' }],
        destination: 'https://ecomkar.com/:path*',
        permanent: true,
      },
    ];
  },

  // متغیر عمومی پایه (اختیاری)
  env: {
    NEXT_PUBLIC_BASE_URL: isProd ? 'https://ecomkar.com' : 'http://localhost:3000',
  },
};

export default nextConfig;
