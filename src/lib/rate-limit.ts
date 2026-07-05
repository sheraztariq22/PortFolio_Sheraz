/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * Deliberately dependency-free and stateless-friendly: no Redis/DB, per the
 * "don't add a backend service unless you need persistence" constraint. The
 * tradeoff is that limits are per-serverless-instance and reset on cold start,
 * which is acceptable for a personal site's spam/abuse throttling. If this ever
 * needs global accuracy, swap the Map for Upstash Redis behind the same API.
 */

type Bucket = { count: number; reset: number };

const store = new Map<string, Bucket>();
const MAX_KEYS = 10_000; // hard cap so the map can't grow unbounded

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  reset: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now > existing.reset) {
    // opportunistic prune when the map gets large
    if (store.size > MAX_KEYS) {
      for (const [k, v] of store) if (now > v.reset) store.delete(k);
    }
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, reset: now + windowMs };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { ok: false, remaining: 0, reset: existing.reset };
  }
  return { ok: true, remaining: limit - existing.count, reset: existing.reset };
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

/** Mask an IP for logs — keep enough to correlate abuse, drop the rest (PII). */
export function maskIp(ip: string): string {
  if (ip.includes('.')) {
    const parts = ip.split('.');
    return `${parts[0]}.${parts[1]}.x.x`;
  }
  if (ip.includes(':')) return ip.split(':').slice(0, 2).join(':') + '::x';
  return 'unknown';
}
