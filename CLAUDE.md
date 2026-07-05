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

Requires `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local` for the chat widget. The static site renders fine without it; only the chatbot fails.

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

`config-loader.ts` exports both `getConfig()` (raw config) and pre-computed values (`systemPrompt`, `skillsData`, `projectData`, `contactInfo`, etc.). The AI **system prompt is generated at build time** from the config by `ConfigParser.generateSystemPrompt()` — it frames the bot as Sheraz being interviewed and instructs it to always call tools.

**When changing the shape of `skills` / `personal` / `social` / `projects`, update all of these together** or the build breaks:
1. `portfolio-config.json` (the data)
2. `src/types/portfolio.ts` (the `PortfolioConfig` interface — the type contract)
3. `src/lib/config-parser.ts` (system-prompt string + the relevant `generate*()` method)
4. `src/lib/config-loader.ts` fallback config (must satisfy the same interface)
5. The `src/components/site/*` section that renders it
6. The chat tools in `src/app/api/chat/tools/*.ts` and their renderers (`src/components/skills.tsx`, `presentation.tsx`, etc.)

Note: `skills` uses six fixed category keys — `languages`, `genai_agents`, `ai_ml`, `backend_web`, `cloud_data`, `enterprise_crm`. These key names are hardcoded across the parser and tools, not derived dynamically.

### Two UI layers: static site + chat widget

- **`src/components/site/*`** — the real portfolio. `page.tsx` composes `Navbar → Hero, About, Experience, Projects, SkillsSection, ContactSection → Footer → AIChatWidget`. Each section reads straight from `getConfig()`. `section.tsx` exports the shared `Section` wrapper and `Reveal` scroll-animation helper. This layer must stay statically prerenderable (keep it a Server Component where possible; `"use client"` only where interaction requires it).
- **`src/components/chat/*` + `src/components/site/ai-chat-widget.tsx`** — the AI chatbot, now a floating "Ask my AI" launcher opening a full-screen overlay. It is a bonus feature, not the primary entry point. The chat tool result renderers live at `src/components/{skills,presentation,contact,resume,AvailabilityCard}.tsx` and `src/components/projects/*`.

### AI chat backend

`src/app/api/chat/route.ts` (`POST`, `maxDuration = 30`) streams from Gemini 2.5 Flash via the AI SDK with a fixed tool set: `getProjects, getPresentation, getResume, getContact, getSkills, getInternship` (in `src/app/api/chat/tools/`). Each tool is an `ai` SDK `tool()` that reads from `getConfig()` and returns structured data the client renders with a matching component. The system prompt is injected via `messages.unshift(SYSTEM_PROMPT)` where `SYSTEM_PROMPT` (`prompt.ts`) wraps the config-generated string. **Never log the API key** — the route deliberately checks for the key without printing it.

### Theming

Vercel/Linear-minimal aesthetic. Dark mode is default (`next-themes`, `attribute="class"`, `defaultTheme="dark"`). Colors are oklch tokens in `src/app/globals.css` plus a `--brand` accent (indigo-violet) exposed as Tailwind `brand`. Fonts: Inter (`--font-sans`) + JetBrains Mono (`--font-mono`), wired in `layout.tsx` and `tailwind.config.ts`.

**Use theme tokens, never hardcoded colors** (`bg-background`, `text-muted-foreground`, `text-primary`, `bg-card`, etc. — not `bg-white` / `text-gray-*` / hex values) so light and dark both hold. `globals.css` was deliberately stripped of `!important` z-index hacks; don't reintroduce them.

### SEO

`src/app/layout.tsx` holds all metadata, OpenGraph/Twitter cards, and the Person JSON-LD. Keep it in sync with `portfolio-config.json` when identity/positioning changes.
