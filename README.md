# EcomKar - AI Agents & Automation Platform

A modern Next.js 14 platform for AI agents, automation, and business growth. Built with TypeScript, Tailwind CSS, and RTL support.

## Quick Start

### 1. Install Dependencies
```bash
# Install with pnpm (recommended)
pnpm install

# Or with npm
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env.local

# Edit with your values
nano .env.local
```

### 3. Run Development Server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### 4. Health Check
```bash
# Check system status
curl http://localhost:3000/api/health
```

## Complete Setup

For production deployment and full configuration, see our comprehensive [Setup Guide](/docs/setup.md).

## Features

- 🚀 **Next.js 14** with App Router
- 🎨 **Tailwind CSS** with RTL support
- 🔒 **Security-first** API design
- 📊 **Analytics** (Plausible/GA4)
- 📧 **Email** (Mailgun/Resend)
- 💳 **Payments** (Zarinpal/Stripe)
- 🤖 **n8n Integration**
- 🌐 **SEO Optimized**
- 📱 **PWA Ready**

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (Phase 2)
- **Analytics**: Plausible/Google Analytics
- **Email**: Mailgun/Resend
- **Payments**: Zarinpal/Stripe
- **Automation**: n8n

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

## Environment Variables

See [env.example](env.example) for all available environment variables.

**Critical variables:**
- `NEXT_PUBLIC_SITE_URL` - Your domain
- `N8N_WEBHOOK_CONTACT` - Contact form webhook
- `N8N_WEBHOOK_LEAD` - Lead form webhook

## Configuration

Set the following environment variables:

- NEXT_PUBLIC_SITE_URL: Canonical site URL used for SEO/meta/links. Example: https://ecomkar.com
- NEXT_PUBLIC_N8N_CHATBOT_WEBHOOK: Direct POST endpoint for chatbot messages. Example: https://n8n.ecomkar.com/webhook/website-chatbot

For local development, add them to `.env.local`. For production, configure them in your hosting platform.

## API Endpoints

- `GET /api/health` - System health check
- `POST /api/contact` - Contact form submission
- `POST /api/lead` - Lead form submission

## Documentation

- [Setup Guide](/docs/setup.md) - Complete setup instructions
- [API Documentation](/docs/api.md) - API reference
- [Deployment Guide](/docs/deployment.md) - Production deployment

## Support

- **Health Check**: `/api/health` for system status
- **Issues**: Create GitHub issue with health check output
- **Documentation**: Check `/docs/setup.md` first

## License

MIT License - see [LICENSE](LICENSE) for details.
