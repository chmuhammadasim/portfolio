# Muhammad Asim Chattha — Engineering Portfolio

A cyberfuturistic portfolio and engineering showcase built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Three.js / React Three Fiber**.

The site presents verified resume content, 20 project case studies, a structured skill matrix, live GitHub telemetry, a full HTML resume, and a technical blog — with a complete SEO and discovery layer.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Overview: hero, capabilities, featured projects, skills preview, security domains, live GitHub stats, experience, education, writing, contact |
| `/projects` | Searchable/filterable project explorer, case-study anatomy, GitHub archive, full index |
| `/projects/[slug]` | 20 project case studies with architecture, features, contribution, challenges, results |
| `/skills` | 64-skill matrix with proficiency levels, evidence links, specialization, credentials |
| `/experience` | Full career timeline, education, and 15 verifiable Coursera credentials |
| `/github` | Live repository explorer with languages, stars, and filtering |
| `/resume` | Complete HTML resume with PDF download, print styles, credentials, FAQ |
| `/blogs` | Technical writing with category/search filters |
| `/blogs/[slug]` | 15 long-form articles |
| `/llms.txt` | Curated AI-agent site map |
| `/sitemap.xml`, `/robots.txt`, `/rss.xml` | Machine-readable discovery |
| `/api/og` | Dynamic 1200×630 social preview image |

## Content model

- `src/lib/site-data.ts` — profile, experience, skills, capabilities, education, certifications, FAQs.
- `src/lib/projects-data.ts` — 20 full case studies (8 with engineering deep-dives) + 9 archive entries.
- `src/lib/github.ts` — server-side GitHub API with hourly revalidation and a curated offline fallback.
- `src/lib/blog-data.ts` — 15 technical notes with word-count-derived read times.
- `src/lib/blog-extensions.ts` — long-form sections appended to each note so the published read time stays honest.
- `src/components/ArchitectureDiagram.tsx` — accessible, text-based architecture flow rendered from each case study's architecture steps.

All content is grounded in the published resume/CV, Coursera credential IDs, public GitHub metadata, and repository documentation. No invented metrics or clients. Private platforms are described only at the level their public metadata and the resume support.

## SEO layer

- Per-page metadata: titles, descriptions, keywords, canonical URLs, Open Graph, Twitter cards.
- JSON-LD graph: `Person`, `WebSite`, `ProfilePage`, `CollectionPage`, `ItemList`, `SoftwareSourceCode`, `BreadcrumbList`, `Blog`, `BlogPosting`, `FAQPage`, `DefinedTermSet`, and `EducationalOccupationalCredential`.
- Stable-date sitemap covering every indexable route.
- AI crawler allowances, `llms.txt`, `humans.txt`, `security.txt`.
- Semantic headings, breadcrumbs, internal links, descriptive alt text, skip links.
- Security headers and a CSP that permits the analytics and GitHub integrations in use.

## 3D and motion

- Hero neural-core scene: faceted shell, emissive core, orbital rings, data shards, particle field, and billboarded HUD labels — pointer/scroll reactive and paused when offscreen or hidden.
- 3D technology sphere on `/skills`: glowing core, wireframe shells, orbital rings, and 12 floating stack labels.
- Project constellation on `/projects`, ambient scenes on `/`, `/experience`, `/resume`, `/github`, and the contact section.
- CSS 3D system: rotating logo cube, holographic sheen, perspective hero text plane, 3D system-map rings, scroll-progress HUD, and a sci-fi display face (Orbitron) paired with Geist for body copy.
- All WebGL is lazy-loaded client-side, mounts only near the viewport, caps DPR, pauses offscreen, respects `prefers-reduced-motion`, and falls back to CSS-only visuals when WebGL is unavailable.
- Card tilt, spotlight, scanlines, marquees, and reveals all respect reduced motion. Content remains visible without JavaScript.

## Getting started

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

Optional environment variables:

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Raises GitHub API rate limits for live telemetry |
| `GOOGLE_VERIFICATION_CODE` | Emits the Google Search Console verification tag |

Without a token, GitHub data falls back to a curated snapshot, so builds work offline.

## Deployment

The project is configured for Cloudflare Pages via `@cloudflare/next-on-pages` and also deploys cleanly on Vercel.

```bash
npx @cloudflare/next-on-pages
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build (type-check + lint)
- `npm start` — production server
- `npm run lint` — ESLint
- `node scripts/audit.cjs` — route-level SEO audit against a running server
- `node scripts/shoot.cjs <url> <prefix>` — CDP screenshot harness
- `node scripts/check-light.cjs` — light-theme hydration/console check

## Deployment checklist

- The canonical host lives in `SITE_URL` (`src/lib/site-data.ts`). Change it there before deploying to a different domain; schema `@id`s, sitemap, robots, RSS, and share links derive from it.
- `https://chmuhammadasim.site` must point at the deployment. A Cloudflare Registrar parking page means the custom domain is not connected yet, and every canonical/sitemap URL will be wrong until it is.
- The downloadable resume PDF is generated from `/resume` via headless Chromium so the PDF and HTML cannot drift:
  ```bash
  msedge --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf=public/Muhammad_Asim_Chattha_Resume.pdf \
    http://localhost:3000/resume
  ```
- The older `Asim_SE_CV.pdf` permanently redirects to the canonical resume PDF.

## Visual review harness

`scripts/shoot.cjs` connects to a headless Chromium instance over the DevTools protocol and captures viewport screenshots at scroll positions. It is a development utility only and is not part of the deployed site.
