# Portfolio redesign audit

14 October 2026. Recorded before refactoring.

## Existing implementation

- Next.js App Router, React, TypeScript, Tailwind 4, Lucide, and an installed Framer Motion dependency. No new dependencies are needed.
- Routes: `/`, `/projects`, and statically generated `/projects/[slug]` pages for DocAI Brain, EchoGuard, and SyncSpace. Project data lives in `data/projects.ts`; experience, skills, and certifications have their own data modules.
- Shared navigation, footer, mobile resume/contact bar, project presentation context, and reusable reveal wrapper. Reveal uses IntersectionObserver and the Web Animations API with reduced-motion detection.
- The homepage contains hero, projects, internships, about, skills, certifications, education, and contact. The working light theme uses warm neutrals, blue accents, a small geometric hero illustration, and hand-drawn project system flows.
- Case studies preserve source/demo links, overview/problem/solution, architecture, features, engineering decisions, static parameters, metadata, JSON-LD, and next-project navigation.
- SEO includes canonical URL configuration, generated social image, favicon, sitemap, robots, and Person/WebSite structured data. Resume is a local PDF; contact uses mailto and external social links.
- Responsive breakpoints already provide mobile navigation, stacked layouts, and fixed quick actions. Focus and reduced-motion styles exist.
- The checkout already contains uncommitted changes. The redesign builds on that state without reverting it.

## Findings

- The light theme conflicts with the requested black identity. Hard-coded light surfaces occur throughout the hero, project illustrations, contact, navigation, and mobile bar.
- The hero does not immediately name the degree or practical internship experience. Its decorative type treatment competes with the role statement.
- Large project system diagrams are less useful than the nine supplied product visuals; neither the index nor the case studies currently show project images.
- Project rows are long, technology tags small, and section headings use inconsistent numbering. The project count is hard-coded.
- Header social links are hidden and there is no visible active section state.
- Only three projects exist in the source. TalentFlow and Placement Portal have no existing project records or verified implementation links. Supplied TalentFlow images can be presented as a labeled product showcase; no stack, metrics, deployment, or source link should be invented. Placement Portal requires project details and an image.
- Existing implementation receipts in `docs/portfolio-direction.md` support the three projects' current architecture copy. Sample figures and capabilities in supplied artwork do not establish measured performance or deployed functionality.

## Refactor plan

1. Introduce the requested black, graphite, mint, blue, text, and border tokens; establish consistent typography, spacing, controls, focus states, and responsive layouts.
2. Refine the existing hero and lightweight interactive engineering visual; retain navigation, mobile actions, and presentation modes.
3. Replace project diagrams with full-aspect local product images in a two-column card grid. Reuse project data across the homepage, index, and case studies.
4. Optimize all nine supplied PNGs without cropping or changing their content, document provenance, and add accessible image galleries to supported case studies.
5. Polish internship, skill, education, certification, about, and contact presentation without changing factual source content.
6. Run lint, TypeScript, production build, route/asset checks, and browser QA across mobile, tablet, laptop, and desktop widths. Record limitations and missing project details.
