'use client';

import React from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

/* -------------------------------------------------------------------------- */
/*  Signature element: interactive multi-agent system graph (ngedu.ai).       */
/*  SVG connectors behind, HTML node chips in front for crisp themed text.    */
/*  Cursor drives a subtle 3D tilt; nodes sit at different depths (parallax). */
/*  Fully disabled under prefers-reduced-motion.                              */
/* -------------------------------------------------------------------------- */

type Node = { id: string; label: string; kind: 'core' | 'agent' | 'data'; x: number; y: number };

const NODES: Node[] = [
  { id: 'core', label: 'ngedu.ai', kind: 'core', x: 50, y: 50 },
  { id: 'tutor', label: 'Tutor', kind: 'agent', x: 50, y: 9 },
  { id: 'classroom', label: 'Classroom', kind: 'agent', x: 91, y: 37 },
  { id: 'coach', label: 'Coach', kind: 'agent', x: 74, y: 90 },
  { id: 'advisor', label: 'Advisor', kind: 'agent', x: 26, y: 90 },
  { id: 'rag', label: 'RAG', kind: 'data', x: 9, y: 37 },
];

const CORE = NODES[0];
const DEPTH: Record<Node['kind'], number> = { core: 46, agent: 26, data: 26 };

function AgentGraph() {
  const reduce = useReducedMotion();

  // normalized pointer offset from center, -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const glowX = useTransform(sx, [-0.5, 0.5], ['32%', '68%']);
  const glowY = useTransform(sy, [-0.5, 0.5], ['32%', '68%']);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      aria-hidden
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className="glass relative mx-auto aspect-square w-full max-w-[26rem] rounded-2xl p-4 [transform-style:preserve-3d]"
    >
      {/* pointer-following brand glow */}
      {!reduce && (
        <motion.div
          className="bg-brand/20 pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ left: glowX, top: glowY }}
        />
      )}

      {/* connectors */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {NODES.slice(1).map((n) => (
          <motion.line
            key={n.id}
            x1={CORE.x}
            y1={CORE.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--brand)"
            strokeWidth={0.4}
            strokeDasharray="2.5 2.5"
            vectorEffect="non-scaling-stroke"
            opacity={0.45}
            animate={reduce ? undefined : { strokeDashoffset: [0, -10] }}
            transition={
              reduce
                ? undefined
                : { duration: 1.6, repeat: Infinity, ease: 'linear' }
            }
          />
        ))}
      </svg>

      {/* nodes — each lifted on its own Z plane for parallax under tilt */}
      {NODES.map((n) => {
        const isCore = n.kind === 'core';
        const isData = n.kind === 'data';
        return (
          <div
            key={n.id}
            className="absolute"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              transform: `translate(-50%, -50%) translateZ(${reduce ? 0 : DEPTH[n.kind]}px)`,
            }}
          >
            <span
              className={
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium whitespace-nowrap backdrop-blur-sm ' +
                (isCore
                  ? 'border-brand/40 bg-brand/15 text-foreground shadow-sm'
                  : isData
                    ? 'border-accent2/40 bg-accent2/10 text-accent2'
                    : 'border-border bg-background/70 text-muted-foreground')
              }
            >
              <span
                className={
                  'inline-block h-1.5 w-1.5 rounded-full ' +
                  (isCore
                    ? 'bg-brand'
                    : isData
                      ? 'bg-accent2'
                      : 'bg-muted-foreground/60') +
                  (reduce ? '' : ' animate-pulse-node')
                }
              />
              {n.label}
            </span>
          </div>
        );
      })}

      {/* caption */}
      <span className="text-muted-foreground absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase">
        Live multi-agent system
      </span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

export function Hero() {
  const { personal, social, resume } = getConfig();
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.07 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const iconLinks = [
    { label: 'GitHub', href: social.github, icon: Github },
    { label: 'LinkedIn', href: social.linkedin, icon: Linkedin },
    { label: 'Email', href: `mailto:${personal.email}`, icon: Mail },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
    >
      {/* layered background: mesh + grain + dotted grid */}
      <div className="bg-mesh pointer-events-none absolute inset-0 opacity-70" />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]" />
      <div className="bg-dot-grid mask-radial-faded pointer-events-none absolute inset-0 opacity-40" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-12 lg:grid-cols-[1.05fr_0.95fr]"
      >
        {/* ---- left: positioning ---- */}
        <div>
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
            className="text-hero text-foreground mt-6 font-semibold"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-muted-foreground mt-5 max-w-xl text-lg font-medium md:text-xl"
          >
            AI/ML Engineer building{' '}
            <span className="text-foreground">Generative AI</span>,{' '}
            <span className="text-foreground">agentic systems</span> &amp;{' '}
            <span className="text-brand">production RAG</span>.
          </motion.p>

          {/* quantified proof point above the fold */}
          {personal.proofPoint && (
            <motion.div
              variants={item}
              className="glass mt-6 max-w-xl rounded-xl p-4"
            >
              <span className="text-accent2 font-mono text-[10px] font-semibold tracking-widest uppercase">
                In production
              </span>
              <p className="text-foreground/90 mt-1.5 text-sm leading-relaxed">
                {personal.proofPoint}
              </p>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
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

          {/* social row */}
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
                className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 ml-1 inline-flex h-10 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors"
              >
                ngedu.ai
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </motion.div>
        </div>

        {/* ---- right: signature element (hidden on small screens, degrades gracefully) ---- */}
        <motion.div variants={item} className="hidden lg:block">
          <AgentGraph />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
