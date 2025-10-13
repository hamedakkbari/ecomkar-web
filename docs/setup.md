# EcomKar Setup Guide

Complete setup guide for EcomKar AI Agents platform.

## Quick Start (10 Steps)

### 1. Prerequisites
- **Node.js**: v18+ (recommended: v20 LTS)
- **PNPM**: v8+ (recommended: v9)
- **Git**: Latest version

```bash
# Check versions
node --version  # Should be v18+
pnpm --version  # Should be v8+
git --version
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env.local

# Edit with your values
nano .env.local  # or your preferred editor
```

**Critical ENV variables to set:**
- `NEXT_PUBLIC_SITE_URL` - Your domain (e.g., https://ecomkar.com)
- `N8N_WEBHOOK_CONTACT` - Contact form webhook
- `N8N_WEBHOOK_LEAD` - Lead form webhook

### 3. Domain & HTTPS Setup
- **DNS**: Point A/AAAA records to your server
- **SSL**: Enable HTTPS (Let's Encrypt recommended)
- **CDN**: Optional (Cloudflare recommended)

```bash
# Test domain resolution
nslookup yourdomain.com
curl -I https://yourdomain.com
```

### 4. Analytics Configuration

#### Option A: Plausible Analytics (Recommended)
```bash
# In .env.local
ANALYTICS_PROVIDER=plausible
ANALYTICS_DOMAIN=yourdomain.com
```

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Copy the domain value to `ANALYTICS_DOMAIN`

#### Option B: Google Analytics 4
```bash
# In .env.local
ANALYTICS_PROVIDER=ga
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Test in Network tab: `gtag` requests should appear

### 5. n8n Webhook Setup

#### Create Webhooks in n8n:
1. **Contact Webhook**:
   - Create new workflow
   - Add "Webhook" trigger
   - Copy webhook URL → `N8N_WEBHOOK_CONTACT`
   - Test with: `curl -X POST [webhook-url] -H "Content-Type: application/json" -d '{"test": true}'`

2. **Lead Webhook**:
   - Similar process
   - Copy URL → `N8N_WEBHOOK_LEAD`

3. **Demo Webhook** (Optional):
   - For demo form submissions
   - Copy URL → `N8N_WEBHOOK_DEMO`

#### Test Webhooks:
```bash
# Test contact webhook
curl -X POST $N8N_WEBHOOK_CONTACT \
  -H "Content-Type: application/json" \
  -d '{"type":"contact","data":{"name":"Test","email":"test@example.com","message":"Test message","consent":true,"hp_token":""}}'

# Test lead webhook  
curl -X POST $N8N_WEBHOOK_LEAD \
  -H "Content-Type: application/json" \
  -d '{"type":"lead","data":{"name":"Test","email":"test@example.com","service_type":"agent","message":"Test lead","consent":true,"hp_token":""}}'
```

### 6. Email Provider Setup

#### Option A: Mailgun (Recommended)
```bash
# In .env.local
MAIL_PROVIDER=mailgun
MAILGUN_API_KEY=key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MAILGUN_DOMAIN=mg.yourdomain.com
```

1. Sign up at [mailgun.com](https://mailgun.com)
2. Add domain (verify DNS records)
3. Get API key from Settings → API Keys
4. Test sending: Check Mailgun logs

#### Option B: Resend
```bash
# In .env.local
MAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

1. Sign up at [resend.com](https://resend.com)
2. Get API key from dashboard
3. Test sending: Check Resend logs

### 7. Payment Gateways

#### Zarinpal (Iranian Payments)
```bash
# In .env.local
ZARINPAL_MERCHANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
ZARINPAL_CALLBACK_URL=https://yourdomain.com/api/payments/zarinpal/callback
```

1. Register at [zarinpal.com](https://zarinpal.com)
2. Get Merchant ID
3. Set callback URL in dashboard
4. Test with sandbox mode

#### Stripe (International Payments)
```bash
# In .env.local
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

1. Sign up at [stripe.com](https://stripe.com)
2. Get test keys from dashboard
3. Test with Stripe test cards
4. Switch to live keys for production

### 8. Supabase Setup (Phase 2)

```bash
# In .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

1. Create project at [supabase.com](https://supabase.com)
2. Get URL and keys from Settings → API
3. Create tables for leads/contacts
4. Set up Row Level Security (RLS)

### 9. Assets & Branding

#### Required Images:
- **OG Image**: `/public/og.png` (1200x630px)
- **Logo**: `/public/logo.svg` (vector format)
- **Favicon**: `/public/logo.png` (256x256px)
- **Apple Touch Icon**: `/app/apple-touch-icon.png` (180x180px)

#### Image Optimization:
```bash
# Optimize images
npx @squoosh/cli --webp public/og.png
npx @squoosh/cli --webp app/icon.png
```

### 10. CI/CD & Deployment

#### Health Check:
```bash
# Test health endpoint
curl https://yourdomain.com/api/health

# Expected response:
{
  "ok": true,
  "uptime_ms": 12345,
  "now_iso": "2024-01-01T00:00:00.000Z",
  "env": {
    "site_url_present": true,
    "analytics_provider": "plausible",
    "n8n_contact_present": true,
    "n8n_lead_present": true,
    "mail_provider": "mailgun",
    "payments": {
      "zarinpal_present": true,
      "stripe_pk_present": true
    }
  }
}
```

#### Environment Variables in CI/CD:
- Set all ENV variables in your deployment platform
- Use secrets management for sensitive data
- Test with health check after deployment

## Validation Matrix

| Provider | Required ENV Variables | Optional |
|----------|----------------------|----------|
| **Plausible** | `ANALYTICS_PROVIDER=plausible`<br>`ANALYTICS_DOMAIN=yourdomain.com` | `CLARITY_ID` |
| **Google Analytics** | `ANALYTICS_PROVIDER=ga`<br>`GA_MEASUREMENT_ID=G-XXXXXXXXXX` | `CLARITY_ID` |
| **Mailgun** | `MAIL_PROVIDER=mailgun`<br>`MAILGUN_API_KEY=key-xxx`<br>`MAILGUN_DOMAIN=mg.domain.com` | - |
| **Resend** | `MAIL_PROVIDER=resend`<br>`RESEND_API_KEY=re_xxx` | - |
| **Zarinpal** | `ZARINPAL_MERCHANT_ID=xxx`<br>`ZARINPAL_CALLBACK_URL=https://domain.com/callback` | - |
| **Stripe** | `STRIPE_SECRET_KEY=sk_xxx`<br>`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx` | - |
| **Supabase** | `NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co`<br>`NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`<br>`SUPABASE_SERVICE_ROLE_KEY=eyJ...` | - |

## Troubleshooting

### 1. 502 Upstream n8n Error
**Problem**: API returns 502 when submitting forms
**Solution**:
```bash
# Check webhook URL
curl -I $N8N_WEBHOOK_CONTACT

# Test webhook manually
curl -X POST $N8N_WEBHOOK_CONTACT \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### 2. CORS Issues
**Problem**: Browser blocks requests
**Solution**:
- Check `NEXT_PUBLIC_SITE_URL` matches your domain
- Verify HTTPS is working
- Check browser console for CORS errors

### 3. Analytics Not Firing
**Problem**: No analytics data appearing
**Solution**:
```bash
# Check ENV variables
echo $ANALYTICS_PROVIDER
echo $ANALYTICS_DOMAIN

# Test in browser console
gtag('event', 'test', { 'event_category': 'test' });
```

### 4. Email Not Sending
**Problem**: No emails received
**Solution**:
```bash
# Check mail provider
echo $MAIL_PROVIDER

# Test with curl
curl -X POST https://api.mailgun.net/v3/$MAILGUN_DOMAIN/messages \
  -u api:$MAILGUN_API_KEY \
  -F from='test@yourdomain.com' \
  -F to='your@email.com' \
  -F subject='Test' \
  -F text='Test message'
```

### 5. Health Check Failing
**Problem**: `/api/health` returns 503
**Solution**:
```bash
# Check health endpoint
curl https://yourdomain.com/api/health

# Look for issues in response
# Fix missing ENV variables
# Restart application
```

## Production Checklist

- [ ] All ENV variables set correctly
- [ ] HTTPS enabled and working
- [ ] Analytics tracking verified
- [ ] n8n webhooks tested
- [ ] Email sending confirmed
- [ ] Payment gateways configured
- [ ] Health check passing
- [ ] Images optimized and uploaded
- [ ] DNS records configured
- [ ] SSL certificate valid
- [ ] CDN configured (optional)
- [ ] Monitoring set up
- [ ] Backup strategy in place

## Support

- **Documentation**: Check this guide first
- **Health Check**: `/api/health` for system status
- **Logs**: Check application logs for errors
- **Issues**: Create GitHub issue with health check output
