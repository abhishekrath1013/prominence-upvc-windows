# Prominance — Website Rebuild

A human-first, conversion-focused rebuild of the Prominance uPVC windows & doors website, built with Astro + Tailwind CSS v4. No UI framework (React/Vue) — interactivity is handled with small vanilla TypeScript islands to keep the JS footprint minimal.

## Project structure

```text
src/
├── assets/images/
│   ├── real/       # Genuine Prominance photography, downloaded from prominance.com (products, factory, colour swatches, brand marks)
│   └── stock/      # Curated stock photography used only for lifestyle/aspirational shots (hero, ambience) — Prominance has no equivalent asset
├── components/
│   ├── layout/     # Header (mega menu), MobileNav, Footer, StickyCTA
│   ├── home/       # Homepage sections
│   ├── product/    # Product detail building blocks (hero, specs, FAQ, related, interior visualizer)
│   ├── colours/    # Colour/laminate selector
│   ├── compare/    # Comparison table
│   ├── forms/      # Contact form, multi-step quote wizard
│   └── ui/         # Generic primitives (Button, Badge, Accordion, SectionHeading)
├── content/        # Content collections: products, colours, faqs, cities (all real, verified data)
├── content.config.ts
├── data/           # brand.ts (single source of truth for verified stats/certs/contact info), images.ts (asset resolver)
├── layouts/        # BaseLayout (SEO/meta/JSON-LD), ProductLayout
├── pages/          # Routes
└── utils/motion.ts # Lenis smooth scroll + IntersectionObserver reveals + count-up, all reduced-motion aware
```

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Type-check and lint `.astro` files |

## Content is data-driven

Product specs, colour options, FAQs and sample city pages live in `src/content/` as JSON/Markdown, validated against schemas in `src/content.config.ts`. All facts (stats, certifications, test results, construction specs) are centralized in `src/data/brand.ts` — every number there was extracted from the live prominance.com site during research and should be re-verified against the source before any future edit.

## Known gaps before launch

- **Forms have no backend.** `ContactForm.astro` and `QuoteWizard.astro` validate and show a success state client-side only — wire their submit handlers to a real endpoint (Formspree, a serverless function, CRM webhook, etc.) before going live.
- **Legal pages are placeholders.** `/privacy/` and `/terms/` contain stub copy, not real policy text.
- **FAQs and city pages are representative subsets** (18 of 60+ FAQs, 5 of 20+ regional offices), each built from the same content-collection pattern — add more entries the same way to expand.
- **Legacy URL redirects** are defined in `legacyRedirects` in `src/data/brand.ts` and wired into `astro.config.mjs`'s `redirects` option (they build as meta-refresh pages). For proper 301s, configure true server/CDN-level redirects from that same map at deploy time.
- **Stock photography** (`src/assets/images/stock/`) is placeholder lifestyle imagery, not Prominance's own photography — replace with real project/lifestyle photos when available.
