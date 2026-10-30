import { Activity, ArrowDown, ArrowLeftRight, CircleDollarSign, Database, Gauge, GitBranch, Layers3, RotateCcw, ShieldCheck, Workflow } from "lucide-react";

const lifecycle = [
  { from: "Risk rules", to: "Blocked", note: "A blocked decision stops checkout." },
  { from: "Created", to: "Processing · Authorized · Captured · Failed · Expired", note: "A provider may report a later state directly." },
  { from: "Processing", to: "Authorized · Captured · Failed", note: "Provider outcomes move the payment forward." },
  { from: "Authorized", to: "Captured · Failed · Expired", note: "Captured is the successful financial completion." },
  { from: "Captured", to: "Partially Refunded · Refunded", note: "Refund completion updates the payment and journal." },
  { from: "Partially Refunded", to: "Partially Refunded · Refunded", note: "Further refunds can remain partial or complete the total." },
];

function ArchitectureNode({ label, detail, icon: Icon }: { label: string; detail: string; icon: typeof Activity }) {
  return <div className="payops-architecture-node"><Icon size={18} aria-hidden="true" /><div><strong>{label}</strong><small>{detail}</small></div></div>;
}

const engineeringChallenges = [
  ["Duplicate payment requests", "A unique MongoDB idempotency record claims the merchant/key pair before handler work; completed responses are replayed and a different body is rejected."],
  ["Concurrent refunds", "A conditional update reserves refundable value in a MongoDB transaction, accounting for captured, already-refunded, and pending amounts."],
  ["Duplicate provider events", "A unique provider/event ID constraint records duplicates and prevents applying the same event twice."],
  ["Out-of-order events", "An explicit payment state machine rejects backward transitions, such as authorization arriving after capture, and records the event outcome."],
  ["Worker or queue loss", "MongoDB outbox and delivery records remain durable; a recovery scan re-enqueues pending deliveries with stable job IDs. Delivery remains at least once."],
  ["Ledger consistency", "Balanced journal lines, unique posting keys, transactions, and recomputed balances detect duplicate postings and stored-balance drift."],
  ["Monetary precision", "Amounts are integer paise end to end, avoiding binary floating-point calculations for financial values."],
] as const;

function ScreenshotPlaceholder({ title, description }: { title: string; description: string }) {
  return <div className="payops-screenshot-placeholder" role="note">
    <span className="payops-placeholder-icon"><CircleDollarSign size={21} aria-hidden="true" /></span>
    <p className="eyebrow">SCREENSHOT PENDING</p>
    <h3>{title}</h3>
    <p>{description}</p>
    <small>Awaiting a fresh PayOps-branded capture in test mode.</small>
  </div>;
}

export function PayOpsCaseStudy() {
  return <div className="payops-case">
    <nav className="payops-toc" aria-label="PayOps case study sections">{[["overview", "Overview"], ["principles", "Principles"], ["lifecycle", "Lifecycle"], ["ledger", "Ledger"], ["idempotency", "Idempotency"], ["webhooks", "Webhooks"], ["operations", "Risk & settlement"], ["architecture", "Architecture"], ["challenges", "Challenges"], ["limits", "Limitations"]].map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
    <section id="overview" className="payops-section payops-overview">
      <div className="payops-section-heading"><p className="eyebrow">01 / OVERVIEW</p><h2>Reliability around the payment</h2></div>
      <div className="payops-overview-grid">
        <div><p className="payops-recruiter-only">PayOps demonstrates how payment software can protect transaction records when requests are repeated, provider updates arrive late, or a refund competes with another. It connects payment activity to balanced accounts and recoverable operations, with financial activity simulated for learning.</p><p className="payops-engineer-only">The API, state machine, idempotency middleware, MongoDB transaction boundaries, double-entry journal, outbox relay, and Redis-backed workers expose the consistency points behind retries, provider events, refunds, and delivery recovery.</p><p>Its default provider is a deliberately unreliable mock bank. Razorpay is an optional adapter for <strong>test mode</strong>. The repository describes simulated workflows; it is not a live payment processor.</p></div>
        <aside className="payops-contribution"><p className="eyebrow">DOCUMENTED CONTRIBUTIONS</p><ul><li>Checkout capability handling and request-log redaction</li><li>Webhook delivery recovery with stable jobs and leases</li><li>Application-level guards for posted ledger entries</li><li>Operations dashboard clarity and responsive workflow feedback</li></ul><p>These are supported by the repository’s provenance audit and commit-level changelog; they describe specific contributions, not sole authorship of the whole platform.</p></aside>
      </div>
      <div className="payops-screenshot-grid">
        <ScreenshotPlaceholder title="Payment detail" description="Payment timeline, provider-event handling, risk result, and journal view." />
        <ScreenshotPlaceholder title="Operations overview" description="Dashboard summary and payment operations in the current PayOps branding." />
        <ScreenshotPlaceholder title="Ledger view" description="A real application capture of journal lines and balance verification." />
        <ScreenshotPlaceholder title="Webhook operations" description="Delivery attempts, retry state, dead-letter recovery, and replay controls." />
        <ScreenshotPlaceholder title="Risk + settlement" description="Risk decisions and simulated settlement with its allocation limitation visible." />
      </div>
      <p className="payops-asset-note">The repository currently includes payment, overview, and checkout screenshots, but these show legacy Onyx branding and a demo merchant identity. No webhook or risk/settlement dashboard captures were present. They are intentionally not displayed or altered; the placeholders will remain until clean test-mode captures are supplied.</p>
    </section>

    <section id="principles" className="payops-section payops-principles">
      <div className="payops-section-heading"><p className="eyebrow">ENGINEERING TAKEAWAYS</p><h2>Financial Engineering Principles Demonstrated</h2></div>
      <div className="payops-principles-grid">
        <article><span>01</span><h3>Transaction integrity</h3><p>Commit payment state, journal postings, and the outbox event together in a MongoDB transaction.</p></article>
        <article><span>02</span><h3>Double-entry accounting</h3><p>Balance each debit and credit journal entry, then recompute balances from the ledger to check for drift.</p></article>
        <article><span>03</span><h3>Idempotent financial operations</h3><p>Claim request keys atomically and replay stored responses so retries do not repeat payment work.</p></article>
        <article><span>04</span><h3>Concurrency control</h3><p>Reserve refundable amounts conditionally and use versioned updates to protect concurrent state changes.</p></article>
        <article><span>05</span><h3>Asynchronous event reliability</h3><p>Use a transactional outbox, durable delivery records, worker retries, and recovery scans; webhook delivery remains at least once.</p></article>
      </div>
    </section>

    <section id="lifecycle" className="payops-section">
      <div className="payops-section-heading"><p className="eyebrow">02 / PAYMENT LIFECYCLE</p><h2>State changes have rules</h2></div>
      <p>Payment status advances through an explicit transition table. Provider events can arrive more than once or out of order; event identifiers are unique, and a transition that would move a payment backward is rejected and explained.</p>
      <div className="payops-lifecycle" aria-label="Implemented payment state transitions">
        {lifecycle.map(({ from, to, note }) => <div className="payops-transition" key={from}><strong>{from}</strong><ArrowLeftRight size={15} aria-hidden="true" /><span>{to}</span><small>{note}</small></div>)}
      </div>
      <p className="payops-caveat">The mock provider can duplicate, reorder, fail, or omit callbacks. A poller checks stuck payments when a provider callback never arrives.</p>
    </section>

    <section id="ledger" className="payops-section">
      <div className="payops-section-heading"><p className="eyebrow">03 / DOUBLE-ENTRY LEDGER</p><h2>Every posting must balance</h2></div>
      <p>PayOps keeps a per-merchant sub-ledger with provider receivable, platform cash, merchant payable, and fee revenue accounts. A journal entry is accepted only when each amount is a positive integer and total debits equal total credits. Balances can be recomputed from journal lines and compared with stored account totals.</p>
      <div className="payops-ledger-example"><div className="payops-ledger-heading"><span>Verified accounting example</span><small>Illustrative amounts from the repository ledger model</small></div>
        <div className="payops-ledger-row"><strong>Capture · ₹1,000 gross · ₹20 fee</strong><span>Debit · Due from provider</span><b>₹1,000</b></div>
        <div className="payops-ledger-row"><strong></strong><span>Credit · Owed to merchant</span><b>₹980</b></div>
        <div className="payops-ledger-row"><strong></strong><span>Credit · Fee revenue</span><b>₹20</b></div>
        <div className="payops-ledger-check"><ShieldCheck size={16} aria-hidden="true" /> Debits ₹1,000 = credits ₹1,000</div>
        <div className="payops-ledger-row payops-refund-row"><strong>Refund · ₹300</strong><span>Debit · Owed to merchant</span><b>₹300</b></div>
        <div className="payops-ledger-row"><strong></strong><span>Credit · Due from provider</span><b>₹300</b></div>
      </div>
      <p className="payops-caveat">Monetary values are stored and calculated in integer paise. The example is a code-derived ledger posting, not a screenshot or a claim about real transactions.</p>
    </section>

    <section id="idempotency" className="payops-section">
      <div className="payops-section-heading"><p className="eyebrow">04 / REQUESTS & REFUNDS</p><h2>Retries should not repeat money movement</h2></div>
      <div className="payops-two-cards">
        <article><span className="payops-card-icon"><RotateCcw size={17} aria-hidden="true" /></span><h3>Idempotency</h3><p>A timed-out client cannot know whether the first request committed. A unique index atomically claims the merchant’s idempotency key before work begins. The request fingerprint binds the key to method, route, and body; matching retries replay the stored response, a changed payload is rejected, and an in-progress duplicate receives a conflict.</p><small>Trade-off: MongoDB holds the authoritative record; Redis is a response-cache fast path, not the source of truth.</small></article>
        <article><span className="payops-card-icon"><Gauge size={17} aria-hidden="true" /></span><h3>Refund concurrency</h3><p>Refundable value is reserved with a conditional update inside a transaction before provider work is queued. Concurrent requests include pending amounts in the check, so accepted reservations cannot exceed the captured total.</p><small>Ambiguous provider outcomes keep the reservation for review instead of releasing value that might already have been refunded.</small></article>
      </div>
    </section>

    <section id="webhooks" className="payops-section">
      <div className="payops-section-heading"><p className="eyebrow">05 / WEBHOOKS & RECOVERY</p><h2>Persist the event before queueing it</h2></div>
      <p>Payment state, journal postings, and outbox events are committed together in MongoDB. A relay creates delivery records and stable BullMQ jobs in Redis. Workers sign merchant webhooks, retry failures with exponential backoff, and move exhausted deliveries to a dead-letter state that operators can replay. A recovery scan checks durable pending records and re-enqueues jobs missing from Redis.</p>
      <div className="payops-recovery-strip"><span>MongoDB outbox</span><ArrowDown size={15} aria-hidden="true" /><span>Relay + stable job ID</span><ArrowDown size={15} aria-hidden="true" /><span>Redis / BullMQ worker</span><ArrowDown size={15} aria-hidden="true" /><span>Signed delivery · retry · replay</span></div>
      <p className="payops-caveat">Delivery is at least once, not exactly once: a worker can fail after the receiver accepts a request but before local success is persisted. Receivers should verify the signature and deduplicate event IDs. Queue continuity also depends on Redis retaining its data.</p>
    </section>

    <section id="operations" className="payops-section">
      <div className="payops-section-heading"><p className="eyebrow">06 / RISK & SETTLEMENT</p><h2>Operational controls, with clear limits</h2></div>
      <div className="payops-two-cards">
        <article><span className="payops-card-icon"><ShieldCheck size={17} aria-hidden="true" /></span><h3>Rule-based risk evaluation</h3><p>Rules score disposable email domains, customer payment velocity, repeated failures, large first-time payments, and merchant amount limits. Results can allow, send a transaction for review, or block it; this is a project rule set, not a claim of regulatory screening.</p></article>
        <article><span className="payops-card-icon"><CircleDollarSign size={17} aria-hidden="true" /></span><h3>Simulated settlement and reconciliation</h3><p>Settlement creates ledger balance-sweep entries and does not transfer funds to a bank. Reconciliation compares provider observations with application payment records and checks ledger integrity; it is not bank-statement reconciliation.</p><small>The repository documents a known allocation limitation: settlement sweeps balances while linked payment records may not explain all swept value.</small></article>
      </div>
    </section>

    <section id="architecture" className="payops-section">
      <div className="payops-section-heading"><p className="eyebrow">07 / SYSTEM ARCHITECTURE</p><h2>Durable records, asynchronous work</h2></div>
      <p>Relationships below follow the repository architecture: API transactions persist payment, journal, and outbox records; workers use Redis-backed queues and write outcomes to MongoDB.</p>
      <div className="payops-architecture" role="img" aria-label="Merchant API and customer checkout connect to the Express API. The API commits payment, journal, and outbox records to MongoDB. An outbox relay publishes stable jobs to Redis and BullMQ workers. Workers update MongoDB, call the mock bank or optional Razorpay test adapter, and deliver signed webhooks to merchants.">
        <div className="payops-architecture-clients"><ArchitectureNode label="Merchant API / SDK" detail="Bearer API key · Idempotency-Key" icon={Activity} /><ArchitectureNode label="Customer checkout + dashboard" detail="React app calls checkout and dashboard routes" icon={Layers3} /></div>
        <div className="payops-architecture-link">Both clients call the Express API <ArrowDown size={15} aria-hidden="true" /></div>
        <ArchitectureNode label="Express API" detail="Validation · idempotency · state machine · provider events" icon={Workflow} />
        <div className="payops-architecture-link">One MongoDB transaction commits payment + journal + outbox <ArrowDown size={15} aria-hidden="true" /></div>
        <div className="payops-architecture-records"><ArchitectureNode label="MongoDB replica set" detail="Durable source for payment and operational records" icon={Database} /><ArchitectureNode label="Double-entry ledger" detail="Journal lines and account balances written with payment state" icon={CircleDollarSign} /><ArchitectureNode label="Transactional outbox" detail="Event record committed with payment and ledger changes" icon={Layers3} /></div>
        <div className="payops-architecture-link">Outbox relay publishes stable queue jobs <ArrowDown size={15} aria-hidden="true" /></div>
        <ArchitectureNode label="Redis + BullMQ workers" detail="Queue state, retries, provider operations, and delivery work" icon={RotateCcw} />
        <div className="payops-architecture-link">Workers persist outcomes and call external targets <ArrowDown size={15} aria-hidden="true" /></div>
        <div className="payops-architecture-clients"><ArchitectureNode label="Mock bank" detail="Default simulated provider; duplicate and reordered events" icon={GitBranch} /><ArchitectureNode label="Razorpay test adapter" detail="Optional provider test mode" icon={CircleDollarSign} /><ArchitectureNode label="Merchant webhook" detail="Signed delivery, retry, dead-letter, replay" icon={ArrowLeftRight} /></div>
      </div>
      <p className="payops-caveat">The database transaction requires a MongoDB replica set. Redis holds queue state and supports fast paths; durable outbox and delivery records live in MongoDB.</p>
    </section>

    <section id="challenges" className="payops-section">
      <div className="payops-section-heading"><p className="eyebrow">08 / ENGINEERING CHALLENGES</p><h2>Problem → implementation → outcome</h2></div>
      <div className="payops-challenge-list">{engineeringChallenges.map(([problem, implementation]) => <article key={problem}><h3>{problem}</h3><p><strong>Implementation:</strong> {implementation}</p></article>)}</div>
    </section>

    <section id="limits" className="payops-section payops-limits">
      <div className="payops-section-heading"><p className="eyebrow">09 / LIMITATIONS & NEXT STEPS</p><h2>Educational simulation, not a payment service</h2></div>
      <ul><li>Payment-provider workflows use a mock bank by default; optional Razorpay integration should be evaluated only with test credentials.</li><li>Settlement and payout records are simulated ledger entries. The platform does not make bank payouts or move merchant funds.</li><li>Settlement is a balance sweep with a documented allocation limitation, not a complete per-payment settlement workflow.</li><li>Reconciliation compares application/provider observations and ledger integrity; there is no bank statement feed.</li><li>Webhook delivery is at least once, and journal safeguards in the application do not prevent direct database administrator writes.</li><li>The PayOps repository acknowledges studying patterns from other projects; its notices and acknowledgements remain part of the project context.</li></ul>
      <p className="payops-license-note">Project source and implementation details: <a href="https://github.com/Adityaraj-r/PayOps" target="_blank" rel="noreferrer">PayOps repository <ArrowLeftRight size={13} aria-hidden="true" /></a>.</p>
    </section>
  </div>;
}
