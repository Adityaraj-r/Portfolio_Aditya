# Portfolio redesign report

14 October 2026

## Delivered

The existing Next.js portfolio now uses the requested deep-black, graphite, mint, blue, white, gray, and charcoal palette. The hero identifies Aditya and his Computer Engineering background and internship experience immediately. The original lightweight engineering interaction is retained as a clearer interface → service → data diagram, with its three focus modes.

Five featured projects share image-led cards, readable descriptions, verified technology badges, source links, and consistent case-study routes. The desktop layout uses two columns; mobile uses one. Project details have accessible galleries, fixed image frames, full-size image links, factual architecture and decision content, and project-specific social previews.

TalentFlow and Placement Portal were audited before adding them. The original DocAI Brain, EchoGuard, and SyncSpace content and routes remain. No new dependency or application backend was introduced.

## Files changed for this request

| File or location | Change |
| --- | --- |
| `app/globals.css` | Shared dark design tokens, type, spacing, responsive layouts, card framing, focus, and reduced-motion styles |
| `app/layout.tsx` | Dark viewport theme and color scheme; existing SEO and structured data preserved |
| `app/icon.svg`, `app/opengraph-image.tsx` | Social identity aligned to the requested palette |
| `components/navbar.tsx` | Refined wordmark, profile actions, active section state, preserved mobile menu and Escape focus return |
| `components/hero-visual.tsx` | Purposeful lightweight engineering flow; existing focus-mode interaction retained |
| `components/sections.tsx` | Clearer hero, contact CTA, dynamic featured count, reusable project grid |
| `components/project-card.tsx` | New shared image-led card with engineer notes and explicit missing-image treatment |
| `components/project-gallery.tsx` | New accessible image selector, captions, alt text, and full-size links |
| `data/projects.ts` | Image metadata, categories, engineering challenges, verified TalentFlow and Placement Portal records |
| `app/projects/page.tsx` | Image-led five-project index |
| `app/projects/[slug]/page.tsx` | Galleries, project social images, challenge context; static generation and case-study navigation preserved |
| `public/projects/` | Nine optimized project images |
| `README.md`, `docs/` | Current setup/content documentation, pre-refactor audit, asset provenance, pinned repository receipts, and this report |

Pre-existing edits in the checkout were retained, including the supplied resume. No commit, push, or deployment was made.

## Image integration

| Project | Images |
| --- | --- |
| TalentFlow HRMS | Overview, lifecycle, dashboard — 3 supplied visuals |
| DocAI Brain | Overview, architecture — 2 supplied visuals |
| EchoGuard | Overview, analysis — 2 supplied visuals |
| SyncSpace | Overview, experience — 2 supplied visuals |
| Placement Portal | No matching image supplied; a labeled system preview is used |

All nine originals remain unchanged in the source folder. Their WebP copies preserve full intrinsic dimensions and composition, totaling 1,988,122 bytes instead of 16,648,171 bytes: an 88.1% reduction. Cards and galleries reuse the same files. See [the asset inventory](project-assets.md).

## Preserved functionality

- All original homepage sections and anchors, profile/contact links, internship details, skills, education, and certifications.
- Resume view/download and mobile resume/contact actions.
- Recruiter/engineer presentation modes, expandable engineering notes, hero focus modes, mobile navigation, and Escape key focus return.
- Existing case-study slugs, repository links, DocAI and SyncSpace demo links, project index, 404 behavior, and next-project navigation.
- Canonical configuration, page metadata, favicon/social image, JSON-LD, robots, and sitemap behavior.
- Reduced-motion handling, semantic page structure, image alt text, and visible keyboard focus. Image preview links use an inset outline so rounded card clipping does not hide it.

## Validation

- `npm run lint` — passed.
- `npm run typecheck` — passed after the final build.
- `npm run build` — passed; all five case studies statically generated. On this Windows host the compiler required the approved access outside the filesystem sandbox.
- Served the built output with `npm start -- --hostname 127.0.0.1` for production QA.
- HTTP 200: homepage, project index, all five case studies, resume PDF, favicon, social image, robots, sitemap, and all nine local WebP URLs. An unknown project returned the expected HTTP 404.
- Browser checks at widths 320, 390, 768, 1024, and 1440 pixels: no horizontal overflow; one-column phone and two-column larger project layouts.
- Production interactions checked: hero mode change, recruiter/engineer switch, expanded notes, mobile menu open/close, Escape with restored focus, mobile anchor navigation, alternate gallery selection, all-five index, Placement Portal source link, and next-project navigation.
- No broken loaded images or browser console errors were observed in final production QA.
- Existing GitHub profile, LinkedIn profile, three original repositories, DocAI demo, and SyncSpace demo returned HTTP 200. SyncSpace required a longer GET after an initial timeout. The two newly supplied repositories were confirmed public during the source audit. Reachability does not assert full remote application correctness.

Saved visual QA previews:

- [Desktop](C:/Users/aadir/.codex/visualizations/2026/10/14/01a13b5f-cb9a-7412-848c-72248191c2e7/portfolio-desktop.png)
- [Project cards](C:/Users/aadir/.codex/visualizations/2026/10/14/01a13b5f-cb9a-7412-848c-72248191c2e7/portfolio-projects.png)
- [Mobile](C:/Users/aadir/.codex/visualizations/2026/10/14/01a13b5f-cb9a-7412-848c-72248191c2e7/portfolio-mobile.png)

## Remaining source/content limitations

- Placement Portal has no supplied screenshot. Its preview explicitly says the screenshot is pending; no other project's image is assigned to it.
- No live-demo URL was confirmed for TalentFlow or Placement Portal, so only their verified source links appear.
- Placement Portal's inspected repository imports an absent `lib/placement/lifecycle-rules.mjs`. Its portfolio copy qualifies lifecycle workflows as source-inspected and runtime-unverified. Fixing the separate application is outside this refactor. See [the pinned source audit](new-project-source-audit.md).
- Numbers and capabilities embedded in supplied artwork are illustrative; they were not promoted into performance, production usage, or AI-screening claims.
- Canonical origin configuration remains unchanged. The existing `NEXT_PUBLIC_SITE_URL` / Vercel environment logic determines the deployed origin.

To run the finished portfolio locally, use `npm run dev` from this checkout. The temporary QA server is stopped after verification.
