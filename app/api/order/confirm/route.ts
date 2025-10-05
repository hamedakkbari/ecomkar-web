import { NextRequest, NextResponse } from 'next/server';
import { logger, sanitizeForLogging } from '../../../../lib/server/logger';
import { getServerEnv, isWebhookEnabled } from '../../../../lib/server/env';
import { checkHoneypot } from '../../../../lib/server/antiSpam';
import { fetchWithRetry } from '../../../../lib/server/fetcher';

// Lightweight validation per spec
function isEmail(value: string): boolean {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value);
}

function isValidRef(value: string): boolean {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (v.length < 6 || v.length > 64) return false;
  return /^[A-Za-z0-9_\-]+$/.test(v);
}

export async function POST(req: NextRequest) {
  const start = Date.now();
  const route = '/api/order/confirm';
  const env = getServerEnv();
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const ua = req.headers.get('user-agent') || '';

  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.toLowerCase().trim() : '';
    const payment_ref = typeof body.payment_ref === 'string' ? body.payment_ref.trim() : '';
    const note = typeof body.note === 'string' ? body.note.trim().slice(0, 400) : '';
    const consent = body.consent === true;
    const hp_token = typeof body.hp_token === 'string' ? body.hp_token : '';

    // Honeypot first
    const hp = checkHoneypot(hp_token);
    if (hp.isSpam) {
      logger.warn(route, ip, ua, Date.now() - start, 400, 'Honeypot triggered');
      return NextResponse.json({ ok: false, message: 'Invalid submission' }, { status: 400 });
    }

    // Validate
    const errors: { field: string; message: string }[] = [];
    if (!isEmail(email)) errors.push({ field: 'email', message: 'ایمیل نامعتبر' });
    if (!isValidRef(payment_ref)) errors.push({ field: 'payment_ref', message: 'رفرنس نامعتبر' });
    if (consent !== true) errors.push({ field: 'consent', message: 'تأیید الزامی' });

    if (errors.length > 0) {
      logger.warn(route, ip, ua, Date.now() - start, 422, 'Validation failed', sanitizeForLogging({ errors, email, payment_ref }));
      return NextResponse.json({ ok: false, errors }, { status: 422 });
    }

    // Send to n8n if configured
    const webhook = process.env.N8N_WEBHOOK_ORDER_CONFIRM;
    if (isWebhookEnabled(webhook)) {
      const payload = {
        type: 'order_confirm',
        data: { email, payment_ref, note },
        meta: { ip, ua, ts: Date.now(), page: 'thank-you' }
      };
      const result = await fetchWithRetry(webhook as string, { body: payload });
      if (!result.success) {
        logger.warn(route, ip, ua, Date.now() - start, result.status || 502, 'Webhook failed', sanitizeForLogging({ email, payment_ref }));
        return NextResponse.json({ ok: true, mock: true }, { status: 200 });
      }
    }

    logger.info(route, ip, ua, Date.now() - start, 200, 'Order confirm recorded', sanitizeForLogging({ email, payment_ref }));
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    logger.error(route, ip, ua, Date.now() - start, 500, 'Unhandled error', { error: error?.message });
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}


