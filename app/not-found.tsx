import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="subpage not-found"><div className="container"><p className="eyebrow">404 / NOT FOUND</p><h1>This page isn’t here<span className="accent">.</span></h1><p>The page you’re looking for could not be found.</p><Link className="button button-primary" href="/">Return to portfolio</Link></div></main>;
}
