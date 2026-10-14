# Project image inventory

Ten user-supplied PNGs are stored as local WebP assets under `public/projects/`. Each conversion preserves the complete original composition and intrinsic dimensions: no crop, resize, compositing, or generated replacement was applied. The installed `sharp` package performed the conversions using WebP quality `90`, effort `6`, and smart chroma subsampling. No dependency was added.

The ten source PNGs were supplied locally and remain untouched at their original locations. Together they total **18,318,432 bytes**; the ten WebP files total **2,159,570 bytes**, an **88.2% reduction**.

## Files and provenance

Paths below are relative to `public/`; use a leading `/` when referencing them from a page.

| Local asset | Original filename | Dimensions | Bytes | KiB |
| --- | --- | --- | ---: | ---: |
| `projects/docai-brain/overview.webp` | `DocAI Brain_ Smarter Answers.png` | 1672 × 941 | 183,470 | 179.2 |
| `projects/docai-brain/architecture.webp` | `DocAI Brain_ From PDFs to Answers.png` | 1536 × 1024 | 162,038 | 158.2 |
| `projects/echoguard/overview.webp` | `EchoGuard AI Audio Detection Dashboard.png` | 1672 × 941 | 244,272 | 238.5 |
| `projects/echoguard/analysis.webp` | `EchoGuard_ AI Audio Detection Dashboard.png` | 1672 × 941 | 256,266 | 250.3 |
| `projects/syncspace/overview.webp` | `SyncSpace_ Build Global Connections.png` | 1672 × 941 | 205,460 | 200.6 |
| `projects/syncspace/experience.webp` | `SyncSpace Language Exchange Platform.png` | 1672 × 941 | 284,684 | 278.0 |
| `projects/talentflow/overview.webp` | `TalentFlow HRMS Product Showcase.png` | 1672 × 941 | 264,142 | 258.0 |
| `projects/talentflow/lifecycle.webp` | `TalentFlow HRMS Product Showcase (1).png` | 1672 × 941 | 216,320 | 211.3 |
| `projects/talentflow/dashboard.webp` | `TalentFlow HRMS Dashboard Showcase.png` | 1536 × 1024 | 171,470 | 167.5 |
| `projects/placement-portal-dashboard.webp` | `College Placement Portal Dashboard.png` | 1672 × 941 | 171,448 | 167.4 |

## Suggested accessible descriptions

These descriptions explain visible image content. Embedded marketing copy and example dashboard statistics do not independently verify implemented functionality, model performance, business outcomes, or production usage.

| Asset | Suggested alt text |
| --- | --- |
| `docai-brain/overview.webp` | DocAI Brain showcase with document upload, a question-and-answer interface, and cited PDF sources. |
| `docai-brain/architecture.webp` | DocAI Brain illustration connecting PDFs through document processing, vector embeddings, and semantic search to a sourced answer. |
| `echoguard/overview.webp` | EchoGuard audio detection showcase with an upload panel, prediction result, spectrograms, and a processing workflow. |
| `echoguard/analysis.webp` | EchoGuard showcase with audio upload, a confidence display, and side-by-side spectrogram examples. |
| `syncspace/overview.webp` | SyncSpace language exchange showcase with language filters and learner profile cards on a laptop. |
| `syncspace/experience.webp` | SyncSpace showcase with language partner matching, messaging, video calling, and a practice progress view. |
| `talentflow/overview.webp` | TalentFlow HRMS showcase with recruitment, employee lifecycle, role permissions, and analytics interface previews. |
| `talentflow/lifecycle.webp` | TalentFlow showcase with an HR dashboard, candidate analysis, and an employee lifecycle workflow. |
| `talentflow/dashboard.webp` | TalentFlow dashboard showcase with recruitment, employee, performance, payroll, attendance, and exit management views. |
| `placement-portal-dashboard.webp` | College Placement Portal dashboard showcase with student, company, placement drive, and application management screens. |

## Rendering guidance

- Use the same local file for cards and detail pages; avoid duplicate image files.
- Use intrinsic width and height metadata with `next/image` and a responsive `sizes` value to prevent layout shifts and oversized downloads.
- Use `object-fit: contain` within consistent dark frames when the full composition is required. The two 1536 × 1024 assets have a 3:2 aspect ratio; the other eight are approximately 16:9.

## Verification

All ten WebP outputs were decoded with `sharp` and checked against their original PNG dimensions. Representative bright, dark, and dense dashboard outputs were visually inspected for retained composition and readable detail. The Placement Portal source image was reduced from 1,670,261 bytes to 171,448 bytes (89.7%).
