import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { Tags } from "@/components/ui";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects | Aditya Raj", description: "Selected full-stack and audio classification projects by Aditya Raj.", alternates: { canonical: "/projects" }, openGraph: { type: "website", title: "Projects | Aditya Raj", description: "Selected full-stack and audio classification projects by Aditya Raj.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aditya Raj — Full-Stack Developer" }] }, twitter: { card: "summary_large_image", title: "Projects | Aditya Raj", description: "Selected full-stack and audio classification projects by Aditya Raj.", images: ["/opengraph-image"] } };

export default function ProjectsPage() {
  return (
    <main id="main-content" className="subpage">
      <div className="container">
        <Link className="back-link" href="/#projects"><ArrowLeft size={15} /> Back to portfolio</Link>
        <p className="eyebrow">SELECTED WORK</p>
        <h1>Projects<span className="accent">.</span></h1>
        <p className="subpage-intro">A closer look at full-stack applications, AI workflows, and the engineering behind them.</p>
        <div className="project-index">
          {projects.map((project, index) => {
            const image = project.images[0];
            return (
              <article className={`project-index-item project-${project.slug}`} key={project.slug}>
                {image ? (
                  <Link className="project-index-image" href={`/projects/${project.slug}`} aria-label={`Explore ${project.name}`}>
                    <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) calc(100vw - 36px), (max-width: 1200px) 48vw, 558px" preload={index === 0} />
                  </Link>
                ) : (
                  <Link className="project-index-image project-index-placeholder" href={`/projects/${project.slug}`} aria-label={`Explore ${project.name}; project screenshot pending`}>
                    <span className="eyebrow">Project preview · screenshot pending</span>
                    <strong>{project.name}</strong>
                    <ol className="project-index-architecture">{project.architecture.slice(0, 3).map((step) => <li key={step}>{step}</li>)}</ol>
                  </Link>
                )}
                <div className="project-index-copy">
                  <p className="eyebrow">{project.category}</p>
                  <h2><Link href={`/projects/${project.slug}`}>{project.name}</Link></h2>
                  <p>{project.description}</p>
                  <Tags items={project.technologies} />
                  <div className="project-index-footer">
                    <Link className="text-link" href={`/projects/${project.slug}`}>Read case study <ArrowRight size={16} /></Link>
                    {project.demo && <a className="text-link" href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}
                    {project.github && <a className="icon-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} source code on GitHub`}><Github size={17} /></a>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
