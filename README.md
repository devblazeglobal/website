# Blaze Global website

Marketing site for Blaze Global Pte. Ltd. (accounting and corporate
secretarial, Singapore). Production target: www.blazeglobal.com.sg.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, static generation
- `next/font` (Newsreader for headings; Helvetica for text), `next/image`
- No UI framework: one stylesheet, `app/site.css`, ported from the approved mock-up
- Hosted on Vercel; pnpm; Node 24

## Commands

```bash
pnpm dev          # local development
pnpm build        # production build (every page is static)
pnpm typecheck
pnpm lint
pnpm start        # serve the build
pnpm check:seo    # against a running build: every old Wix URL still answers
```

## Structure

| Path | What it holds |
| --- | --- |
| `app/` | Routes. One folder per URL. |
| `components/views/` | Home, About and Start a business, ported from the mock-up markup |
| `components/views/service-pages.tsx` | Templates for service, accounting and solution pages |
| `components/ui.tsx` | Shared server blocks: credentials, reviews, help, FAQ, cards |
| `components/interactive.tsx`, `widgets.tsx`, `calculator.tsx`, `modals.tsx` | Client components |
| `lib/content-data.ts` | Page copy and data, generated from the mock-up |
| `lib/deadlines.ts` | Statutory deadline rules (ECI, AGM, annual return, XBRL, Form C-S) |
| `lib/catalog.ts`, `lib/routes.ts` | Every public URL; feeds the sitemap, `llms.txt` and structured data |
| `content/blog/` | Articles in Markdown |
| `docs/brand/home-mockup.html` | The approved design mock-up |
| `docs/roadmap/agents.md` | Proposal for future sales and marketing agents (not agreed) |
| `scripts/port/` | The tool that ported the mock-up to components |

## Rules kept by the code

- WhatsApp buttons are green with navy text everywhere.
- Every old Wix URL keeps its path or redirects permanently (`next.config.ts`).
- Only `NEXT_PUBLIC_SITE_ENV=production` deployments are indexable; every
  preview and the `*.vercel.app` site send `noindex`. Set the variable at DNS cutover.
