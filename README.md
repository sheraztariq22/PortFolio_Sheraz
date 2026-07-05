# Sheraz Tariq — Portfolio

Personal portfolio for **Sheraz Tariq**, AI/ML Engineer (Generative AI, agentic/multi-agent systems, production RAG). A content-first, statically-prerendered single-page site with an optional AI assistant widget.

**Live:** [sheraztariq.com](https://sheraztariq.com) · **Product I build:** [ngedu.ai](https://www.ngedu.ai)

## Stack

Next.js 16 (App Router, React 19, Turbopack) · TypeScript · Tailwind CSS 3.4 · Framer Motion · Geist (Sans + Mono) · Radix UI · next-themes · Vercel Analytics. AI assistant on Google Gemini via the AI SDK; contact email via Resend.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000 (Turbopack)
npm run build    # production build — the main correctness gate
npm run start    # serve the production build
npx tsc --noEmit # typecheck (no test suite; tsc + build are the gates)
```

### Environment variables (`.env.local`)

| Variable | Required | Purpose |
|---|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` | for the chat widget | Gemini key ([Google AI Studio](https://aistudio.google.com/)). The static site renders fine without it; only the AI assistant needs it. |
| `RESEND_API_KEY` | for the contact form | [Resend](https://resend.com) API key. Without it, `/api/contact` returns a clean 503 and the form shows its "email me directly" fallback. |
| `CONTACT_TO_EMAIL` | optional | Where contact messages are delivered (defaults to Sheraz's inbox). |
| `CONTACT_FROM_EMAIL` | optional | Verified Resend sender. Defaults to `onboarding@resend.dev` for testing; set to a verified domain in production. |

## Editing content

Almost all content lives in **`portfolio-config.json`** at the repo root — personal info, experience, projects (with case-study fields), skills, education, certifications, resume, and the chatbot persona. Edit the JSON; the site reads it through `src/lib/config-loader.ts` → `config-parser.ts`. See **[CLAUDE.md](CLAUDE.md)** for the architecture and the set of files that must change together when the config *shape* changes.

- **Resume:** replace `public/SherazTariqResume.pdf` (the config links to it).
- **Profile image:** `public/profile.jpeg`.

## Deploy

Optimized for **Vercel**: push to GitHub, import the repo, set the environment variables above, and deploy. Security headers (CSP, HSTS, X-Frame-Options, etc.) are configured in `next.config.ts`.

## License

MIT — see [docs/LICENSE](docs/LICENSE). Originally scaffolded from an open-source portfolio template, since substantially rewritten.
