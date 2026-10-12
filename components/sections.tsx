import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations";
import { HeroVisual } from "@/components/hero-visual";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { site } from "@/lib/site";

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>;
}

function Tags({ items }: { items: readonly string[] }) {
  return <ul className="tag-list">{items.map((item) => <li className="tag" key={item}>{item}</li>)}</ul>;
}

export function Hero() {
  return <section id="home" className="hero section-anchor"><div className="container hero-inner">
    <Reveal className="hero-content"><p className="eyebrow hero-eyebrow"><span className="eyebrow-mark" />FULL-STACK DEVELOPER <span className="eyebrow-divider">·</span> SOFTWARE ENGINEERING INTERN</p>
      <h1>Aditya Raj<span className="accent">.</span></h1>
      <p className="hero-lede">Building scalable web applications and AI-powered systems.</p>
      <p className="hero-copy">I’m a Computer Engineering student with hands-on Full-Stack Development experience. I recently completed a Full-Stack Developer internship at Indux Technology. I build React applications, backend services, REST APIs, and database-driven workflows, with additional experience in deep-learning-based audio classification.</p>
      <div className="hero-actions"><a className="button button-primary" href="#projects">View Projects <ArrowRight size={16} /></a><a className="button button-secondary" href={site.resume} download><Download size={15} /> Download Resume</a></div>
      <div className="hero-links"><a href={site.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={12} /></a><a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} /></a><a href={site.resume} target="_blank" rel="noreferrer"><Download size={15} /> View Resume</a></div>
    </Reveal>
    <Reveal className="hero-recent-experience" delay={0.08}>
      <HeroVisual />
      <article className="recent-experience-card" aria-label="Recent experience">
        <p className="recent-experience-label"><span className="eyebrow-mark" />RECENT EXPERIENCE</p>
        <h2>Full-Stack Developer Intern</h2>
        <p className="recent-experience-company">Indux Technology</p>
        <p className="recent-experience-date">May 2026 — Sep 2026</p>
        <p className="recent-experience-stack">Node.js <span>·</span> Express.js<br />MongoDB <span>·</span> React<br />REST APIs</p>
      </article>
    </Reveal>
  </div></section>;
}

export function ExperienceSection() {
  return <section id="experience" className="section section-alt section-anchor"><div className="container"><SectionHeading eyebrow="01 / EXPERIENCE" title="Experience." intro="Professional experience building full-stack applications, backend services, and API-driven systems." />
    <div className="experience-list">{experience.map((job, index) => <Reveal key={job.company} delay={index * 0.08} className="experience-reveal"><article className="experience-card">
      <div className="experience-meta"><span className="experience-number">0{index + 1}</span><time>{job.duration}</time></div>
      <div className="experience-main"><p className="experience-company">{job.company}</p><h3>{job.role}</h3><p className="experience-summary">{job.summary}</p><ul className="achievement-list">{job.highlights.map((item) => <li key={item}>{item}</li>)}</ul><Tags items={job.technologies} /></div>
    </article></Reveal>)}</div>
  </div></section>;
}

export function ProjectsSection() {
  return <section id="projects" className="section section-anchor"><div className="container"><SectionHeading eyebrow="02 / SELECTED WORK" title="Projects with a purpose." intro="Two projects exploring full-stack application development and deep-learning-based audio classification." />
    <div className="project-list">{projects.map((project, index) => <Reveal key={project.slug} delay={index * 0.08}><article className={`project-card project-${project.slug}`}><div className="project-visual" aria-label={`${project.name} high-level system flow`}><div className="visual-topline"><span className="visual-dot" /><span className="visual-dot" /><span className="visual-dot" /><span className="visual-label">{project.slug.toUpperCase()} / SYSTEM FLOW</span></div><div className="visual-content"><span className="visual-kicker">{index === 0 ? "AUDIO CLASSIFICATION" : "REAL-TIME MESSAGING"}</span><div className="visual-diagram">{project.architecture.map((step, stepIndex) => <div className="diagram-step" key={step}><span>0{stepIndex + 1}</span><b>{step}</b></div>)}</div></div><span className="visual-note">HIGH-LEVEL SYSTEM FLOW</span></div>
        <div className="project-info"><p className="eyebrow">FEATURED PROJECT · 0{index + 1}</p><h3>{project.name}<span className="accent">.</span></h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><Tags items={project.technologies} /><div className="project-actions"><a className="text-link" href={`/projects/${project.slug}`}>Explore case study <ArrowRight size={15} /></a>{project.github && <a className="icon-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub repository`}><Github size={18} /></a>}</div></div>
      </article></Reveal>)}</div><div className="projects-more"><Link className="text-link" href="/projects">View all projects <ArrowRight size={15} /></Link></div>
  </div></section>;
}

export function SkillsSection() {
  return <section id="skills" className="section section-alt section-anchor"><div className="container"><SectionHeading eyebrow="03 / TOOLKIT" title="Technical skills." intro="Tools and concepts used across my internships, projects, and computer engineering studies." /><div className="skills-grid">{skillGroups.map((group) => <Reveal key={group.name}><article className="skill-group"><h3>{group.name}</h3><Tags items={group.skills} /></article></Reveal>)}</div></div></section>;
}

export function CertificationsSection() {
  return <section id="certifications" className="section section-anchor"><div className="container"><SectionHeading eyebrow="04 / CERTIFICATIONS" title="Credentials." /><div className="cert-list">{certifications.map((cert, index) => <Reveal key={cert.name} delay={index * 0.06}><article className="cert-item"><span className="cert-number">0{index + 1}</span><div className="cert-main"><h3>{cert.name}</h3><p>{cert.issuer}{cert.date ? ` · ${cert.date}` : ""}</p></div>{"distinction" in cert && <span className="cert-distinction">{cert.distinction}</span>}</article></Reveal>)}</div></div></section>;
}

export function EducationSection() {
  return <section id="education" className="section section-alt section-anchor"><div className="container"><SectionHeading eyebrow="05 / EDUCATION" title="Academic foundation." /><div className="education-grid"><Reveal><article className="education-card education-primary"><p className="eyebrow">2023 — 2027</p><h3>RMD Sinhgad Technical Institute</h3><p className="education-place">Pune, Maharashtra</p><div className="education-bottom"><span>B.E. in Computer Engineering</span><strong>8.7<span> / 10 CGPA</span></strong></div></article></Reveal><Reveal delay={0.08}><article className="education-card"><p className="eyebrow">HIGHER SECONDARY</p><h3>Shakti Shanti Academy</h3><div className="education-bottom"><span>12th</span><strong>82.6<span>%</span></strong></div></article></Reveal></div></div></section>;
}

export function AboutSection() {
  return <section id="about" className="section section-anchor"><div className="container about-layout"><div><SectionHeading eyebrow="06 / ABOUT" title="A little about me." /></div><Reveal><div className="about-copy"><p>I’m pursuing a B.E. in Computer Engineering at RMD Sinhgad Technical Institute in Pune. My internship work has involved backend services, REST APIs, database operations, and reusable React components.</p><p>My projects include a real-time messaging application and a deep-learning-based audio classification system. I’m focused on software engineering and full-stack development.</p><span className="about-signoff">ADITYA RAJ <span>·</span> PUNE, INDIA</span></div></Reveal></div></section>;
}

export function ContactSection() {
  return <section id="contact" className="section contact-section section-anchor"><div className="container"><Reveal><div className="contact-panel"><div><p className="eyebrow">07 / CONTACT</p><h2>Let’s connect<span className="accent">.</span></h2><p>I’m interested in software engineering and full-stack development opportunities. You can reach me by email or connect with me on LinkedIn.</p></div><div className="contact-actions"><a className="button button-primary" href={`mailto:${site.email}`}><Mail size={16} /> Get in touch <ArrowUpRight size={15} /></a><a className="contact-link" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a><a className="contact-link" href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a><a className="contact-link" href={site.resume} download>Download Resume <Download size={14} /></a></div></div></Reveal></div></section>;
}
