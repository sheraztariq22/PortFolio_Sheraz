'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const { personal, social, resume } = getConfig();

  const iconLinks = [
    { label: 'GitHub', href: social.github, icon: Github },
    { label: 'LinkedIn', href: social.linkedin, icon: Linkedin },
    { label: 'Email', href: `mailto:${personal.email}`, icon: Mail },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[94vh] items-center overflow-hidden"
    >
      {/* Decorative dotted grid + brand glow */}
      <div className="bg-dot-grid mask-radial-faded pointer-events-none absolute inset-0 opacity-60" />
      <div className="bg-brand/10 pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-5xl px-6 pt-24"
      >
        {/* Availability */}
        <motion.div variants={item}>
          <span className="border-border bg-background/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to AI/ML roles &amp; collaborations
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-foreground mt-6 text-5xl font-semibold tracking-tight md:text-7xl"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-muted-foreground mt-4 max-w-3xl text-lg font-medium md:text-2xl"
        >
          AI/ML Engineer building{' '}
          <span className="text-foreground">Generative AI</span>,{' '}
          <span className="text-foreground">agentic (multi-agent) systems</span>{' '}
          &amp; <span className="text-foreground">production RAG</span>.
        </motion.p>

        <motion.p
          variants={item}
          className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed"
        >
          {personal.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
          >
            View my work
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="border-border hover:bg-accent inline-flex items-center gap-1.5 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Get in touch
          </a>
          <a
            href={resume.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
          >
            <FileDown className="h-4 w-4" />
            Resume
          </a>
        </motion.div>

        {/* Social icon row */}
        <motion.div variants={item} className="mt-8 flex items-center gap-2">
          {iconLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          {social.liveProduct && (
            <a
              href={social.liveProduct}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 ml-1 inline-flex items-center gap-1.5 rounded-md border px-3 h-10 text-sm font-medium transition-colors"
            >
              ngedu.ai
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
