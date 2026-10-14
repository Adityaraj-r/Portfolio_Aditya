import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ProjectGallery } from "@/components/project-gallery";
import { Tags } from "@/components/ui";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const socialImage = project?.images[0];
  return project
    ? { title: `${project.name} | Aditya Raj`, description: project.description, alternates: { canonical: `/projects/${slug}` }, openGraph: { type: "website", title: `${project.name} | Aditya Raj`, description: project.description, images: [{ url: socialImage?.src ?? "/opengraph-image", width: socialImage?.width ?? 1200, height: socialImage?.height ?? 630, alt: socialImage?.alt ?? `${project.name} — Aditya Raj` }] }, twitter: { card: "summary_large_image", title: `${project.name} | Aditya Raj`, description: project.description, images: [socialImage?.src ?? "/opengraph-image"] } }
    : { title: "Project not found | Aditya Raj" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  if (!project) notFound();
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const schemaOrigin = site.origin ?? "http://localhost:3000";
  const projectSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${schemaOrigin}/projects/${slug}#software`,
    name: project.name,
    description: project.summary,
    creator: { "@id": `${schemaOrigin}/#person` },
  };

  return (
    <main id="main-content" className="subpage case-study">
      <JsonLd data={projectSchema} />
      <div className="container">
        <Link className="back-link" href="/#projects"><ArrowLeft size={15} /> All projects</Link>
        <header className="case-hero">
          <p className="eyebrow">{project.category} · 0{projectIndex + 1}</p>
          <h1>{project.name}<span className="accent">.</span></h1>
          <p className="case-subtitle">{project.subtitle}</p>
          <p className="case-lede">{project.description}</p>
          <Tags items={project.technologies} /><div className="project-actions">{project.github && <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer"><Github size={16} /> Source code</a>}{project.demo && <a className="button button-primary" href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={16} /></a>}</div>
        </header>
        <ProjectGallery slug={project.slug} name={project.name} images={project.images} />
        <div className="case-layout">
          <aside className="case-aside" aria-label="On this page">
            <a href="#overview">OVERVIEW</a><a href="#architecture">ARCHITECTURE</a><a href="#features">FEATURES</a><a href="#decisions">DECISIONS</a>
          </aside>
          <div className="case-content">
            <section id="overview"><p className="eyebrow">OVERVIEW</p><h2>Project summary</h2><p>{project.summary}</p><h3>Problem</h3><p>{project.problem}</p><h3>Solution</h3><p>{project.solution}</p></section>
            <section id="architecture"><p className="eyebrow">SYSTEM</p><h2>Architecture</h2><p className="case-note">High-level overview of the project’s components and responsibilities.</p><div className="architecture-flow">{project.architecture.map((step, index) => <div className="architecture-step" key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div></section>
            <section id="features"><p className="eyebrow">CAPABILITIES</p><h2>Key features</h2><ul className="case-bullets">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
            <section id="decisions"><p className="eyebrow">ENGINEERING</p><h2>Technical decisions</h2>{project.engineeringChallenge && <><h3>Challenge addressed</h3><p>{project.engineeringChallenge}</p></>}<ul className="case-bullets">{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul><h3>Technology stack</h3><Tags items={project.technologies} /></section>
          </div>
        </div>
        <Link className="next-project" href={`/projects/${nextProject.slug}`}><span><small>NEXT PROJECT</small><strong>{nextProject.name}</strong></span><ArrowRight size={18} /></Link>
      </div>
    </main>
  );
}
