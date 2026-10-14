# New project source audit

Inspected 14 October 2026. Both repositories were publicly accessible through unauthenticated GitHub REST and raw content requests. Browser retrieval returned cache misses, so the audit used those primary-source endpoints. This is implementation inspection; the project applications were not built, deployed, or exercised as part of the portfolio redesign.

## TalentFlow HRMS

- Repository: [Adityaraj-r/talentflow-hrms](https://github.com/Adityaraj-r/talentflow-hrms), default branch `Main`.
- Inspected commit: `4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd`.
- [README](https://github.com/Adityaraj-r/talentflow-hrms/blob/4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd/README.md) documents employee records and documents; recruitment, interviews, offers, onboarding and referrals; attendance and leave; performance and goals; payroll; transfers, promotions and offboarding; administration and reporting.
- [Frontend manifest](https://github.com/Adityaraj-r/talentflow-hrms/blob/4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd/frontend/package.json) establishes React, Vite, React Router, TanStack Query and Tailwind. [Backend manifest](https://github.com/Adityaraj-r/talentflow-hrms/blob/4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd/backend/package.json) establishes Node.js, Express, TypeScript, Mongoose and JWT dependencies.
- [Authentication middleware](https://github.com/Adityaraj-r/talentflow-hrms/blob/4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd/backend/middleware/auth.middleware.ts) verifies JWTs, loads user records and checks active accounts. [Role middleware](https://github.com/Adityaraj-r/talentflow-hrms/blob/4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd/backend/middleware/role.middleware.ts) implements module/action permissions and strict performance access checks. These observations support describing access controls, not a security certification.
- [Job routes](https://github.com/Adityaraj-r/talentflow-hrms/blob/4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd/backend/routes/job.routes.ts) expose job creation, updates, publishing, closing and workflow retrieval, with authentication and recruitment permissions.
- [Offboarding routes](https://github.com/Adityaraj-r/talentflow-hrms/blob/4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd/backend/routes/offboarding.routes.ts) and [controller](https://github.com/Adityaraj-r/talentflow-hrms/blob/4b6e4cfb8bdfb377cb5285afe2841bcd2318ecbd/backend/controllers/offboardingRequest.controller.ts) cover resignation and termination requests, staged approvals, notice periods, withdrawal, clearance, knowledge transfer and audit history. The controller and route role lists are not identical; no claim of complete runtime correctness is made.

The three supplied TalentFlow visuals are integrated as product showcase assets. Their sample employee counts, hiring percentages, fit scores, and AI screening text are not treated as verified production metrics or implemented AI functionality. No public demo URL was established: repository metadata has no homepage, and the README describes local setup.

## Placement Portal

- Repository: [Adityaraj-r/placement-portal](https://github.com/Adityaraj-r/placement-portal), default branch `main`.
- Inspected commit: `e447fbf40f5b57ea19947154743fa727c61d994c`.
- [Manifest](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/package.json) establishes Next.js, React, Supabase, JavaScript, Tailwind and Google GenAI dependencies. The [README](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/Readme.md) documents Supabase setup and distinguishes credential-free rule tests from unimplemented live integration checks.
- [Authentication rules](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/lib/auth/rules.mjs) define student, coordinator, TPO and admin roles, route decisions, profile access and application ownership checks.
- [Opportunity actions](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/app/actions/opportunities.actions.js) manage company-linked placement drives, draft/published state, eligibility requirements and registration deadlines.
- [Application actions](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/app/actions/applications.actions.js) check the current student, eligibility, resume presence, deadline and duplicate applications before insertion, and include staff review and application status logic.
- [Resume actions](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/app/actions/resume.actions.js) validate PDF files, use Supabase Storage and signed URLs, and check applicant access.
- [Lifecycle actions](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/app/actions/lifecycle.actions.js) include interview scheduling/evaluation, offers and student offer responses. [Placement actions](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/app/actions/placement.actions.js) read and update placement records. The [lifecycle migration](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/supabase/migrations/202609300005_phase3c_interviews_offers_placements.sql) defines interview/evaluation tables, access policies and placement creation after accepted offers.
- [Resume feedback action](https://github.com/Adityaraj-r/placement-portal/blob/e447fbf40f5b57ea19947154743fa727c61d994c/app/profile/resume-feedback/actions.js) checks student access and PDF input, calls Gemini server-side and validates score, missing skills and formatting suggestions in the response. This verifies an integration in source, not the availability or quality of live model output.

### Known source limitation

`app/actions/applications.actions.js` and `app/actions/lifecycle.actions.js` import `@/lib/placement/lifecycle-rules.mjs`, but that file is absent from the inspected recursive repository tree. A direct raw request at the inspected commit returned HTTP 404. Consequently, interview/offer/application workflow code cannot be described as runtime verified, and the portfolio makes no claim of a functioning public deployment. Fixing that separate repository is outside this redesign.

A College Placement Portal dashboard visual was supplied after this source audit and is now included in the case-study gallery. It is illustrative artwork, not evidence of runtime behavior or metrics. No deployment URL, usage metrics or performance benchmark was inferred.

## Existing content preserved

DocAI Brain, EchoGuard and SyncSpace retain their existing slugs, repository links and available demo links. Their source audit receipts are in [portfolio-direction.md](./portfolio-direction.md). The existing internship, education, certification, contact and resume data were preserved. Supplied showcase graphics are used as visuals; embedded sample numbers are not evidence for public claims.
