# Portfolio direction

14 October 2026

**Try the product. Inspect the build.**

Make the portfolio an entrance to working software. A recruiter should understand Aditya's focus, perform a meaningful project action, and inspect the engineering behind it. Premium minimal design gives this evidence room to stand out. Connect an attractive interface, a real outcome, and an understandable implementation.

The current Next.js portfolio presents three projects through structured content and static case studies. It has no application backend of its own. The experiences below are proposed additions, not claims about existing functionality. Keep the effective data files; a CMS can wait until publishing needs justify one.

## The first 30 seconds

| Time | Visitor experience | Useful evidence |
| --- | --- | --- |
| 0–5 seconds | Read a clear role statement and see a compelling project visual beside “Try DocAI” and “View projects.” | Immediate identity, focus, and a clear next action. |
| 5–15 seconds | Open DocAI with a small supplied document and a suggested question. Receive an actual answer with selectable source citations. | A complete path from interface to retrieval, generation, and supporting evidence. |
| 15–30 seconds | Open “Inspect the build” beside the answer: architecture, repository, relevant implementation, and one explained decision. | Enough substance for an engineer to continue evaluating the work. |

Offer “Read the case study” for visitors who prefer scanning or encounter an unavailable demo. Avoid registration before the first useful result.

## Appearance and project actions

Use a warm neutral background, near-black type, restrained accent color, generous spacing, and strong typography. The hero can contain a large document canvas: a question, an answer, and a highlighted supporting passage. Before a real request runs, clearly identify this as an example or preview. Use authentic project screenshots where available. Keep navigation compact and project titles prominent. Motion should explain transitions, respect reduced-motion preferences, and leave controls immediately usable.

**DocAI Brain: ask and verify.** Begin with a controlled sample PDF; arbitrary uploads can follow once limits and cleanup work. A question must reach the actual project backend. The answer should reveal the retrieved passage and page reference when that information genuinely exists in the response. Include loading, unsupported-question, empty-result, and service-error states. Do not animate a prerecorded answer as if fresh inference produced it. Validate citation support against the project implementation before promising it publicly.

**SyncSpace: send and receive.** Let a visitor create an isolated demonstration session, open a second browser window, and watch a real message arrive. Explain the two-window interaction briefly. Use actual authentication, authorization, persistence, and the project's messaging transport. Demonstrate refresh and reconnection honestly. Public demo sessions need practical expiry and isolation. The audited implementation uses MongoDB for user and friendship records and Stream for chat and video. The portfolio's older Supabase description has been corrected. A guest demonstration still needs to be built; the existing app requires its normal authentication flow.

**EchoGuard: inspect the inference workflow.** Show real preprocessing and model architecture through a concise case study. Add audio inference only when a deployed endpoint and permitted sample clips are available. Report a model score with its meaning and limitations; avoid presenting it as certainty or inventing accuracy figures. A well-explained implementation remains valuable when a public inference service is unavailable.

## What the experience proves

Connect each visible action to inspectable evidence: validation, API contract, authorization, persistence or retrieval, response handling, and deployment configuration. Explain one consequential tradeoff per project. Use actual source links and observations; distinguish implementation from future work. If displaying duration, measure the visitor's request and label what it covers. Date benchmarks and explain their conditions. Never add invented live counters, users, uptime, or production-scale claims.

## References worth adapting

| Reference | Verified lesson and useful adaptation |
| --- | --- |
| [Kent C. Dodds: hybrid search, 16 March 2026](https://kentcdodds.com/blog/implementing-hybrid-semantic-lexical-search) | A useful public feature becomes stronger evidence when its indexing, service boundary, caching, and production failures are explained. Borrow that transparency. His [current source](https://github.com/kentcdodds/kentcdodds.com) supersedes the stack in the historical 2021 rewrite article. |
| [Simon Willison: integrated activity, 20 February 2026](https://simonwillison.net/2026/feb/20/beats/) | Real imports combine releases, notes, and tools into a coherent timeline. Borrow a small evidence feed when real activity warrants it; his [faceted search](https://simonwillison.net/search/) serves a much larger corpus than three projects. |
| [Yuta Asakura's portfolio](https://asakurayuta.dev/) and [documented source](https://github.com/yutaasakura96/portfolio-v2) | The portfolio itself has documented CMS, authentication, database, upload-processing, and email workflows. Borrow the connection between visible output and backend implementation. Its full cloud setup and CMS are optional here. |
| [Rauno Freiberg's Craft](https://rauno.me/craft) and [interaction essay, July 2023](https://rauno.me/craft/interaction-design) | Borrow immediate response, interruptible transitions, and spatial consistency. The gallery distinguishes prototypes and production work; it supplies interface inspiration, not verified backend evidence. |

## Practical delivery and acceptance

1. **Establish truth and presentation.** Finish the current portfolio QA, audit project repositories, correct architecture copy, and capture authentic visuals. Preserve static rendering for the public introduction and case studies.
2. **Ship one complete vertical slice.** Integrate DocAI's sample-document question flow with real citations, bounded input, useful errors, and a case-study inspection panel. Keep provider credentials server-side. Avoid a new search platform for only three projects.
3. **Add the collaboration demonstration.** Implement SyncSpace's two-browser session, isolation, expiry, persistence checks, and documented service constraints. Keep project services separate where their current architecture requires it.
4. **Expand from observed need.** Consider uploads, release imports, or a CMS after the core demonstrations work and maintenance demands are clear.

Accept the result when a new visitor can identify the role and open a project immediately; DocAI returns actual backend output with citations that open the correct supporting material; and a SyncSpace message reaches the second browser and survives the supported refresh flow. Verify failures without fabricated success, unauthorized session access, keyboard operation, mobile layouts, reduced motion, and secret handling. Run the portfolio's lint, typecheck, and production build, plus meaningful integration checks for each new backend boundary. Publish only capabilities demonstrated by these checks.

## Source audit receipts

Project copy was aligned with the inspected public implementation on 14 October 2026. These pinned references let a reviewer verify the specific version inspected:

- **DocAI:** [retriever implementation](https://github.com/Adityaraj-r/DocAi/blob/cb9ae93c734b314a0f626f0533af284931043a60/apps/ai-service/app/services/retriever_service.py#L39-L55) adds a keyword-overlap bonus to vector scores. The portfolio now says keyword-aware reranking rather than BM25. [LangGraph execution](https://github.com/Adityaraj-r/DocAi/blob/cb9ae93c734b314a0f626f0533af284931043a60/apps/ai-service/app/services/rag_pipeline.py#L33-L34) supports the orchestration claim.
- **EchoGuard:** [audio preprocessing](https://github.com/Adityaraj-r/echoguard/blob/f44d98e43d56037a98031785c499a350f8c92c3b/audio_processor.py#L16-L32) creates Mel spectrograms. [The model](https://github.com/Adityaraj-r/echoguard/blob/f44d98e43d56037a98031785c499a350f8c92c3b/model_definition.py#L8-L13) uses ResNet18, and [inference](https://github.com/Adityaraj-r/echoguard/blob/f44d98e43d56037a98031785c499a350f8c92c3b/model_inference.py#L12-L20) loads trained weights. The project description reflects this path. MFCC remains in the resume-supported general skills; this inspection does not establish historical training work or accuracy.
- **SyncSpace:** [MongoDB connection](https://github.com/Adityaraj-r/SyncSpace/blob/7174a3896b85f240524b4fb59a5b19c0a8b3fa97/backend/src/lib/db.js#L1-L6), [Stream integration](https://github.com/Adityaraj-r/SyncSpace/blob/7174a3896b85f240524b4fb59a5b19c0a8b3fa97/backend/src/lib/stream.js), and [frontend workflows](https://github.com/Adityaraj-r/SyncSpace/tree/7174a3896b85f240524b4fb59a5b19c0a8b3fa97/frontend/src/pages) support the revised language-exchange, chat, and video description.

The supplied resume PDF is preserved. These implementation details differ from some resume wording and should be reconciled in a future resume edit. Repository inspection verifies code structure, not deployed service availability or runtime correctness.
