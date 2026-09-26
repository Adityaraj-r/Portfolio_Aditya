"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  ["Experience", "#experience"], ["Projects", "#projects"], ["Skills", "#skills"],
  ["Certifications", "#certifications"], ["Education", "#education"], ["About", "#about"], ["Contact", "#contact"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation" onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
        <Link className="wordmark" href="/#home" onClick={() => setOpen(false)} aria-label="Aditya Raj, home">AR<span>.</span></Link>
        <div className="nav-links desktop-nav">
          {links.map(([label, href]) => <a key={href} href={`/${href}`}>{label}</a>)}
        </div>
        <div className="nav-actions desktop-nav">
          <a className="nav-social" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="nav-social" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="button button-small button-outline" href={site.resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
        <button ref={menuButton} className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
          {links.map(([label, href]) => <a key={href} href={`/${href}`} onClick={() => setOpen(false)}>{label}</a>)}
          <div className="mobile-menu-bottom">
            <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="button button-outline" href={site.resume} target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
