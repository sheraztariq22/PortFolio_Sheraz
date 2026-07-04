'use client';

import React from 'react';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Globe,
  FileDown,
} from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import { Section, Reveal } from './section';

export function ContactSection() {
  const { personal, social, resume } = getConfig();

  const channels = [
    { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, icon: Mail },
    { label: 'GitHub', value: 'sheraztariq22', href: social.github, icon: Github },
    {
      label: 'LinkedIn',
      value: 'sheraz-tariq',
      href: social.linkedin,
      icon: Linkedin,
    },
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
        <div className="border-border bg-card overflow-hidden rounded-2xl border">
          {/* headline row */}
          <div className="from-brand/10 relative bg-gradient-to-br to-transparent p-6 md:p-8">
            <div className="bg-dot-grid mask-radial-faded absolute inset-0 opacity-40" />
            <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
              <div>
                <h3 className="text-foreground text-2xl font-semibold tracking-tight">
                  Let&apos;s work together
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Open to AI/ML roles, contracts, and collaborations · Remote.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
                <a
                  href={resume.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-background/60 hover:bg-accent inline-flex items-center gap-1.5 rounded-md border px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors"
                >
                  <FileDown className="h-4 w-4" />
                  Resume
                </a>
              </div>
            </div>
          </div>

          {/* channels grid */}
          <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 sm:divide-x divide-border border-t border-border">
            {channels.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group hover:bg-accent/50 flex items-center gap-3 px-6 py-4 transition-colors"
              >
                <span className="border-border text-muted-foreground group-hover:text-foreground flex h-9 w-9 items-center justify-center rounded-md border transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="text-muted-foreground block text-xs">
                    {label}
                  </span>
                  <span className="text-foreground block truncate text-sm font-medium">
                    {value}
                  </span>
                </span>
                <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default ContactSection;
