# Aditya Raj Portfolio

A recruiter-focused portfolio for Aditya Raj, Computer Engineering student and Full-Stack Developer. It presents internship experience, two project case studies, skills, certifications, education, and direct contact links.

## Features

- Responsive homepage with experience, projects, skills, certifications, education, about, and contact sections
- Project index and statically generated case study pages for EchoGuard and SyncSpace
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
public/               Resume PDF and static public assets
```

## Local development

Requirements: Node.js 20.9 or later and npm.

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

1. Create or use a GitHub repository and push the `main` branch. Review the public resume’s contact details before committing it.
2. In Vercel, select **New Project**, import the GitHub repository, and deploy with the detected Next.js preset and default build command (`npm run build`).
3. In the Vercel project, open **Settings → Domains**, add the chosen custom domain, and configure the DNS records Vercel shows for the domain.
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical `https://` domain in the Production environment if you want to override Vercel’s detected production URL. Redeploy after changing it.
5. After DNS verification, Vercel provisions HTTPS automatically. Choose one canonical host (apex or `www`) and configure the other to redirect to it.
6. Verify the homepage, project routes, resume links, `/robots.txt`, `/sitemap.xml`, canonical/OG metadata, and the production deployment logs.

Vercel’s Git integration creates preview deployments for changes and production deployments from the configured production branch. See [GitHub deployments](https://vercel.com/docs/git/vercel-for-github), [custom domains and DNS](https://vercel.com/docs/domains/set-up-custom-domain), and [environment variables](https://vercel.com/docs/environment-variables).

## Content/assets to supply later

- Project repository and live-demo URLs, if available
- Authentic project screenshots, if available
- Certification credential URLs, if available
- A confirmed public domain (or set `NEXT_PUBLIC_SITE_URL` after choosing one)

The project diagrams are high-level flows based on the resume, not fabricated screenshots. No analytics are included; for this static portfolio, avoiding an analytics script keeps the page lighter and avoids unnecessary tracking.
