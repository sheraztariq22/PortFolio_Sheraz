# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Sheraz Tariq's personal portfolio — a Next.js 16 (App Router, React 19, TypeScript, Tailwind 3.4) single-page site. Nearly all content is data-driven from a single JSON file; the homepage is statically prerendered content-first, with an AI chatbot (Gemini) offered as an optional floating widget.

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build — run this to verify changes compile & prerender
npm run start    # serve the production build
npm run lint     # eslint (next lint)
npx tsc --noEmit # typecheck without emitting — the primary correctness gate
```

There is no test suite. **Verify any change with `npx tsc --noEmit` then `npm run build`** (build catches prerender/RSC boundary errors that tsc misses).

### Environment (`.env.local`)

- `GOOGLE_GENERATIVE_AI_API_KEY` — Gemini key for the chat widget. Static site renders fine without it; only the chatbot fails.
- `RESEND_API_KEY` — for `/api/contact`. Without it the route returns 503 and the form shows its fallback; nothing else breaks.
- `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` — optional overrides for contact delivery (sensible defaults baked in).

All API keys are read server-side only and **never logged**.

## Architecture

### Content is config-driven — edit JSON, not JSX

`portfolio-config.json` (repo root) is the **single source of truth** for all content (personal info, experience, skills, projects, education, certifications, social links, resume, chatbot persona, preset questions). The data flow:

```
portfolio-config.json
  → src/lib/config-loader.ts   (require()s the JSON; has a fallback config if load fails;
                                 exports getConfig() + pre-parsed getters)
  → src/lib/config-parser.ts   (ConfigParser: builds the AI system prompt + generate*() shapers)
  → consumed by site sections, chat tools, and the API route
```

`config-loader.ts` exports both `getConfig()` (raw config) and pre-computed values (`systemPrompt`, `skillsData`, `projectData`, `contactInfo`, etc.). The AI **system prompt is generated at build time** from the config by `ConfigParser.generateSystemPrompt()` — it frames the bot as a *grounded portfolio assistant* (answers only from the config, refuses to fabricate credentials/metrics, off-topic, or adversarial role-play) and instructs it to always call tools.

Featured projects carry structured **case-study fields** on the `Project` type (`caseStudy: { problem, approach, role, impact }` + `metrics: {label, value}[]`), rendered as full case studies by `site/projects.tsx`; non-featured projects fall back to a compact "More work" card. `personal.proofPoint` is the hero's above-the-fold quantified proof.

**When changing the shape of `skills` / `personal` / `social` / `projects`, update all of these together** or the build breaks:
1. `portfolio-config.json` (the data)
2. `src/types/portfolio.ts` (the `PortfolioConfig` interface — the type contract)
3. `src/lib/config-parser.ts` (system-prompt string + the relevant `generate*()` method)
4. `src/lib/config-loader.ts` fallback config (must satisfy the same interface)
5. The `src/components/site/*` section that renders it
6. The chat tools in `src/app/api/chat/tools/*.ts` and their renderers (`src/components/skills.tsx`, `presentation.tsx`, etc.)

Note: `skills` uses six fixed category keys — `languages`, `genai_agents`, `ai_ml`, `backend_web`, `cloud_data`, `enterprise_crm`. These key names are hardcoded across the parser and tools, not derived dynamically.

### Two UI layers: static site + chat widget

- **`src/components/site/*`** — the real portfolio. `page.tsx` composes `Navbar → Hero, About, Experience, Projects, SkillsSection, ContactSection → Footer → AIChatWidget`. Each section reads straight from `getConfig()`. `section.tsx` exports the shared `Section` wrapper + `Reveal` scroll-animation helper; `motion-primitives.tsx` exports `Magnetic` + `HoverLift`. This layer must stay statically prerenderable (keep it a Server Component where possible; `"use client"` only where interaction requires it). **All motion is reduced-motion aware** — `Reveal`, `Magnetic`, `HoverLift`, and the Hero graph each check `useReducedMotion()`, backed by a global `prefers-reduced-motion` CSS net.
- **`src/components/chat/*` + `src/components/site/ai-chat-widget.tsx`** — the AI chatbot, now a floating "Ask my AI" launcher opening a full-screen overlay. It is a bonus feature, not the primary entry point. The chat tool result renderers live at `src/components/{skills,presentation,contact,resume,AvailabilityCard}.tsx` and `src/components/projects/*`.

### API routes (`src/app/api/*`)

- **`chat/route.ts`** (`POST`, `maxDuration = 30`) streams from Gemini 2.5 Flash via the AI SDK with a fixed tool set: `getProjects, getPresentation, getResume, getContact, getSkills, getInternship` (in `chat/tools/`). Each tool is an `ai` SDK `tool()` reading from `getConfig()`, returning structured data the client renders with a matching component. System prompt injected via `messages.unshift(SYSTEM_PROMPT)`. Rate-limited 20/min per IP.
- **`contact/route.ts`** (Node runtime) validates + honeypot-checks the contact form, delivers via **Resend**, rate-limited 5/min per IP, degrades to 503 if `RESEND_API_KEY` is unset. Logs are **PII-safe** (masked IP + outcome only — never name/email/message).
- **`src/lib/rate-limit.ts`** — shared in-memory fixed-window limiter (`rateLimit`, `getClientIp`, `maskIp`). Per-instance / resets on cold start; fine for a personal site. Swap the `Map` for Upstash Redis behind the same API if global accuracy is ever needed.

Security headers (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are set in `next.config.ts`. The CSP uses `'unsafe-inline'` (required by Next hydration + JSON-LD + Tailwind) and scopes `'unsafe-eval'` to dev only.

### Theming

Vercel/Linear-minimal aesthetic. Dark mode is default (`next-themes`, `attribute="class"`, `defaultTheme="dark"`). Colors are oklch tokens in `src/app/globals.css`: `--brand` (indigo-violet, Tailwind `brand`) is the primary accent and `--accent-2` (cyan-teal, Tailwind `accent2`) is the secondary, reserved for metrics/data. Fonts: **Geist Sans** (`--font-sans`) + **Geist Mono** (`--font-mono`), wired in `layout.tsx` + `tailwind.config.ts`. Signature utilities in `globals.css`: `.text-hero` (fluid display), `.bg-mesh`, `.bg-noise`, `.glass`.

**Use theme tokens, never hardcoded colors** (`bg-background`, `text-muted-foreground`, `text-brand`, `text-accent2`, `bg-card`, etc. — not `bg-white` / `text-gray-*` / hex values) so light and dark both hold. `globals.css` keeps `!important` only for the sanctioned `prefers-reduced-motion` net — don't reintroduce z-index band-aids.

### SEO

`src/app/layout.tsx` holds all metadata, OpenGraph/Twitter cards, and the Person JSON-LD. Keep it in sync with `portfolio-config.json` when identity/positioning changes.
