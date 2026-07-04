'use client';

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

export function Footer() {
  const { personal, social } = getConfig();

  const socials = [
    { label: 'GitHub', href: social.github, icon: Github },
    { label: 'LinkedIn', href: social.linkedin, icon: Linkedin },
    { label: 'Email', href: `mailto:${personal.email}`, icon: Mail },
  ];

  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-muted-foreground text-sm">
          © {personal.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
