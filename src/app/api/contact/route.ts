import { Resend } from 'resend';
import { getClientIp, maskIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 15;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  // Throttle: 5 messages per minute per IP.
  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return json({ error: 'Too many messages. Please try again in a minute.' }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();
  const honeypot = String(body.company ?? '').trim();

  // Honeypot: a filled hidden field means a bot. Return 200 so it gets no signal.
  if (honeypot) {
    return json({ ok: true }, 200);
  }

  if (!name || name.length > 100) {
    return json({ error: 'Please provide your name.' }, 400);
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return json({ error: 'Please provide a valid email address.' }, 400);
  }
  if (message.length < 10 || message.length > 5000) {
    return json({ error: 'Message must be between 10 and 5000 characters.' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'sheraztariq2978@gmail.com';
  // Verify your own domain in Resend, then set CONTACT_FROM_EMAIL to it.
  // Until then, Resend's onboarding sender works for testing.
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

  if (!apiKey) {
    // Never log the key. Fail cleanly so the client shows its fallback.
    console.error('[CONTACT] RESEND_API_KEY is not set — cannot deliver message.');
    return json({ error: 'Email service is not configured yet.' }, 503);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    if (error) throw error;

    // PII-safe log: masked IP + outcome only. No name/email/message content.
    console.log(`[CONTACT] delivered ok ip=${maskIp(ip)}`);
    return json({ ok: true }, 200);
  } catch (err) {
    console.error(
      '[CONTACT] send failed:',
      err instanceof Error ? err.message : 'unknown error',
    );
    return json({ error: 'Failed to send message. Please email me directly.' }, 502);
  }
}

/** Escape user input before embedding in the HTML email body. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
