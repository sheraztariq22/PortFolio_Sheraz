'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Globe,
  FileDown,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import { Section, Reveal } from './section';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:border-brand/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50';

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    // honeypot — bots fill hidden fields; humans never see it
    const trap = String(data.get('company') ?? '').trim();

    if (trap) {
      // silently accept so bots get no signal
      setStatus('success');
      form.reset();
      return;
    }
    if (!name || !EMAIL_RE.test(email) || message.length < 10) {
      setStatus('error');
      setError('Please add your name, a valid email, and a short message (10+ characters).');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company: trap }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError('Something went wrong sending your message. Please email me directly instead.');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
        <span className="bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 flex h-12 w-12 items-center justify-center rounded-full">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h4 className="text-foreground text-base font-semibold">Message sent</h4>
        <p className="text-muted-foreground max-w-sm text-sm">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-brand mt-2 text-sm font-medium hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-foreground mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Doe" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-foreground mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-foreground mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} placeholder="Tell me about the role or project…" className={inputClass + ' resize-y'} />
      </div>

      {/* honeypot: hidden from humans, catnip for bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="company">Company (leave this empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && error && (
        <p role="alert" aria-live="polite" className="text-destructive flex items-start gap-1.5 text-sm">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}

export function ContactSection() {
  const { personal, social, resume } = getConfig();

  const channels = [
    { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, icon: Mail },
    { label: 'GitHub', value: 'sheraztariq22', href: social.github, icon: Github },
    { label: 'LinkedIn', value: 'sheraz-tariq', href: social.linkedin, icon: Linkedin },
    ...(social.liveProduct
      ? [{ label: 'Live Product', value: 'ngedu.ai', href: social.liveProduct, icon: Globe }]
      : []),
  ];

  return (
    <Section
      id="contact"
      index="05"
      title="Get in touch"
      description="Have an ambitious Generative AI or agentic product in mind? Let's talk."
    >
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* form */}
          <div className="border-border bg-card rounded-2xl border p-6 md:p-8">
            <h3 className="text-foreground text-lg font-semibold tracking-tight">
              Send a message
            </h3>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              I read every message. Open to roles, contracts, and collaborations · Remote.
            </p>
            <ContactForm />
          </div>

          {/* direct channels */}
          <div className="flex flex-col gap-3">
            {channels.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group border-border bg-card hover:border-foreground/20 flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors"
              >
                <span className="border-border text-muted-foreground group-hover:text-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="text-muted-foreground block text-xs">{label}</span>
                  <span className="text-foreground block truncate text-sm font-medium">{value}</span>
                </span>
                <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}

            <a
              href={resume.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-card hover:border-foreground/20 mt-1 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors"
            >
              <FileDown className="h-4 w-4" />
              Download résumé
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default ContactSection;
