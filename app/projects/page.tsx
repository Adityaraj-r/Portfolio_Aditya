import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects | Aditya Raj", description: "Selected full-stack and audio classification projects by Aditya Raj.", alternates: { canonical: "/projects" }, openGraph: { type: "website", title: "Projects | Aditya Raj", description: "Selected full-stack and audio classification projects by Aditya Raj.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aditya Raj — Full-Stack Developer" }] }, twitter: { card: "summary_large_image", title: "Projects | Aditya Raj", description: "Selected full-stack and audio classification projects by Aditya Raj.", images: ["/opengraph-image"] } };

export default function ProjectsPage() {
  return <main id="main-content" className="subpage"><div className="container"><Link className="back-link" href="/#projects"><ArrowLeft size={15} /> Back to portfolio</Link><p className="eyebrow">SELECTED WORK</p><h1>Projects<span className="accent">.</span></h1><p className="subpage-intro">A closer look at projects exploring full-stack development and audio classification.</p><div className="project-index">{projects.map((project) => <Link className="project-index-item" href={`/projects/${project.slug}`} key={project.slug}><div><p className="eyebrow">PROJECT CASE STUDY</p><h2>{project.name}</h2><p>{project.description}</p></div><ArrowRight size={19} /></Link>)}</div></div></main>;
}
