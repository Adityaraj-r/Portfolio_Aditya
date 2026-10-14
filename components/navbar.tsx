"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  ["Projects", "#projects"], ["Experience", "#experience"], ["About", "#about"], ["Skills", "#skills"],
  ["Certifications", "#certifications"], ["Education", "#education"], ["Contact", "#contact"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = document.querySelectorAll<HTMLElement>("main > section[id]");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation" onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
        <Link className="wordmark" href="/#home" onClick={() => setOpen(false)} aria-label="Aditya Raj, home"><span className="wordmark-icon">ar.</span>aditya raj<span className="wordmark-role"> / developer</span></Link>
        <div className="nav-links desktop-nav">
          {links.map(([label, href]) => <a key={href} href={`/${href}`} aria-current={(pathname === "/" && active === href.slice(1)) || (pathname.startsWith("/projects") && href === "#projects") ? "location" : undefined}>{label}</a>)}
        </div>
        <div className="nav-actions desktop-nav">
          <a className="nav-social" href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a>
          <a className="nav-social" href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a>
          <a className="button button-small button-outline" href={site.resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a>
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
