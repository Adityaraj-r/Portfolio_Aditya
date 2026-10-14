"use client";

import Link from "next/link";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ reset }: ErrorBoundaryProps) {
  return (
    <main id="main-content" className="subpage not-found">
      <div className="container">
        <p className="eyebrow">UNEXPECTED ERROR</p>
        <h1>We hit a snag<span className="accent">.</span></h1>
        <p>Something went wrong while loading this page.</p>
        <button className="button button-primary" type="button" onClick={reset}>Try again</button>
        <Link className="button button-secondary" href="/">Return to portfolio</Link>
      </div>
    </main>
  );
}
