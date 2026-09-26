import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return <footer className="footer"><div className="container footer-inner"><div><Link className="footer-name" href="/#home">Aditya Raj<span className="accent">.</span></Link><p>Full-Stack Developer · Computer Engineering Student</p></div><div className="footer-links"><a href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href={`mailto:${site.email}`}>Email</a><a href={site.resume} target="_blank" rel="noreferrer">Resume</a></div><span className="copyright">© {new Date().getFullYear()} Aditya Raj</span></div></footer>;
}
