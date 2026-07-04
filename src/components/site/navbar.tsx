'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getConfig } from '@/lib/config-loader';
import { ThemeToggle } from './theme-toggle';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const config = getConfig();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-border bg-background/80 border-b backdrop-blur-md'
          : 'border-b border-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#home"
          className="group flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="bg-brand text-brand-foreground flex h-7 w-7 items-center justify-center rounded-md font-mono text-sm">
            ST
          </span>
          <span className="hidden sm:inline">Sheraz Tariq</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={config.resume.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background hover:bg-foreground/90 hidden items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors sm:inline-flex"
          >
            <FileDown className="h-4 w-4" />
            Resume
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="border-border text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="border-border bg-background/95 overflow-hidden border-b backdrop-blur-md md:hidden"
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={config.resume.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="bg-foreground text-background mt-2 inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2.5 text-sm font-medium"
              >
                <FileDown className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
