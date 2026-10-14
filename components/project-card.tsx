import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { Tags } from "@/components/ui";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cover = project.images[0];
  return (
    <article className={`project-card project-${project.slug}`}>
      <Link className={`project-visual${cover ? "" : " project-placeholder"}`} href={`/projects/${project.slug}`} aria-label={`Explore ${project.name}${cover ? "" : "; screenshot pending"}`}>
        {cover ? <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1240px) 48vw, 570px" /> : <>
          <span className="eyebrow">Project preview · screenshot pending</span>
          <strong>{project.name}</strong>
          <ol>{project.architecture.slice(0, 3).map((step) => <li key={step}>{step}</li>)}</ol>
        </>}
      </Link>
      <div className="project-info">
        <p className="eyebrow"><span>{project.category}</span><span>{String(index + 1).padStart(2, "0")}</span></p>
        <h3><Link href={`/projects/${project.slug}`}>{project.name}<span className="accent">.</span></Link></h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <Tags items={project.technologies} />
        {!project.showcaseOnly && <details className="project-engineer-details">
          <summary>Engineering notes</summary>
          <p><strong>Problem:</strong> {project.problem}</p>
          <p><strong>Approach:</strong> {project.solution}</p>
          <ul>{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
        </details>}
        <div className="project-actions">
          <Link className="text-link" href={`/projects/${project.slug}`}>{project.showcaseOnly ? "View showcase" : "Case study"} <ArrowRight size={15} /></Link>
          {project.demo && <a className="text-link project-demo" href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}
          {project.github && <a className="icon-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub repository`}><Github size={17} /></a>}
        </div>
      </div>
    </article>
  );
}
