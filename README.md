# Aditya Raj Portfolio

A recruiter-focused portfolio for Aditya Raj, Computer Engineering student and Full-Stack Developer. It presents internship experience, five project case studies, skills, certifications, education, and direct contact links in a predominantly black and mint design.

## Features

- Responsive homepage with experience, projects, skills, certifications, education, about, and contact sections
- Image-led project index and statically generated case study pages for TalentFlow HRMS, DocAI Brain, EchoGuard, SyncSpace, and Placement Portal
- Ten optimized local project visuals, accessible galleries, and recruiter/engineer presentation modes
- Resume view and download links
- Open Graph/Twitter social preview image, favicon, canonical metadata, JSON-LD, `robots.txt`, and `sitemap.xml`
- Reduced-motion support, keyboard-accessible mobile navigation, and visible focus states
- Static rendering; no application backend, contact-form service, or analytics dependency

## Tech stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Vercel deployment target

## Project structure

```text
app/                 Routes, metadata, global styles, generated OG image
  projects/          Projects index and [slug] case studies
components/          Navigation, page sections, footer, motion and JSON-LD
data/                Project, experience, certification and skill content
lib/                 Site profile and canonical origin configuration
public/              Resume PDF and static public assets
```

## Local development

Requirements: Node.js 24.x and npm 11.x. Vercel's current Node.js 24 runtime is selected through `engines.node` in `package.json`.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Optional canonical origin for a custom production domain, such as `https://portfolio.example`. If blank, the app uses Vercel’s production URL variables when deployed. |

There are no API credentials or backend secrets. Keep local `.env*` files untracked; `.env.example` contains only a blank placeholder.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy to Vercel

1. In Vercel, select **New Project** and import this GitHub repository. Set the project root to the repository root (`./`) if it is not detected automatically.
2. Keep the detected **Next.js** framework preset, the default install command, and the build command `npm run build`. Leave the output directory unset so Vercel uses the Next.js integration.
3. In **Settings → Build and Deployment**, select Node.js `24.x` if it is not selected automatically. The repository also declares `engines.node` as `24.x`.
4. No environment variable is required. Set `NEXT_PUBLIC_SITE_URL` only when configuring a canonical public domain; use the same `https://` origin in Preview and Production only if that is intentional.
5. Add a custom domain under **Settings → Domains** and follow Vercel's DNS instructions. Choose one canonical host and redirect the alternate host.
6. Verify the homepage, all five project routes, resume links, project images, `/robots.txt`, `/sitemap.xml`, canonical/OG metadata, response headers, and deployment logs in Preview before promoting to Production.

Vercel’s Git integration creates preview deployments for changes and production deployments from the configured production branch. See [GitHub deployments](https://vercel.com/docs/git/vercel-for-github), [custom domains and DNS](https://vercel.com/docs/domains/set-up-custom-domain), and [environment variables](https://vercel.com/docs/environment-variables).

The application sends `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and HSTS headers. A Content Security Policy is not set: Next.js App Router emits inline bootstrap payloads, so a strict CSP needs a nonce/hash strategy tested against the production render rather than a broad `unsafe-inline` exception.

## Content/assets to supply later

- Confirmed live-demo URLs for TalentFlow HRMS and Placement Portal, if deployed
- Certification credential URLs, if available
- A confirmed public domain (or set `NEXT_PUBLIC_SITE_URL` after choosing one)

The ten supplied product visuals are optimized WebP assets under `public/projects/`; their complete compositions and intrinsic dimensions are preserved. They appear on project cards, the index, and interactive case-study galleries. Embedded sample figures are illustrative rather than measured project results. See [the image inventory](docs/project-assets.md) for provenance and sizes.

TalentFlow and Placement Portal content is based on source inspection, with receipts in [the source audit](docs/new-project-source-audit.md). Source inspection does not establish deployed runtime behavior. The dashboard artwork is illustrative and is not used as proof of runtime behavior or metrics. No analytics or application backend were added to the portfolio.

See [the redesign audit](docs/redesign-audit.md) and [implementation report](docs/redesign-report.md) for this refactor. The older [portfolio direction research](docs/portfolio-direction.md) retains its historical proposals for live project exhibits; those backend exhibits are not functionality shipped in this static portfolio.
