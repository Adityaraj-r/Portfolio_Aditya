import { ArrowRight, ArrowDownRight, ArrowUpRight, CalendarDays, Download, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/animations";
import { HeroVisual } from "@/components/hero-visual";
import { PresentationModeSwitch } from "@/components/presentation-mode";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { site } from "@/lib/site";
import { ProjectCard } from "@/components/project-card";
import { ProjectExpansion } from "@/components/project-expansion";
import { ContactForm } from "@/components/contact-form";

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>;
}

function Tags({ items }: { items: readonly string[] }) {
  return <ul className="tag-list">{items.map((item) => <li className="tag" key={item}>{item}</li>)}</ul>;
}

export function Hero() {
  return <section id="home" className="hero section-anchor"><div className="container">
    <div className="hero-topline"><span><i /> OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES</span></div>
    <div className="hero-inner">
      <Reveal className="hero-content"><p className="eyebrow hero-eyebrow">FULL-STACK DEVELOPER / COMPUTER ENGINEERING</p>
        <h1>Aditya Raj</h1>
        <p className="hero-lede">Building Real-World <span>Software</span></p>
        <p className="hero-subheadline">From Full-Stack Systems to Applied AI</p>
        <p className="hero-copy">Computer Engineering undergraduate with full-stack internship experience, building web applications, backend systems, and AI-powered projects.</p>
        <ul className="hero-focus" aria-label="Technical focus areas"><li>Full Stack</li><li>Backend Engineering</li><li>Applied AI</li></ul>
        <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <ArrowDownRight /></a><a className="button button-secondary" href={site.resume} download><Download size={16} /> Download resume</a></div>
        <div className="hero-links"><a href={site.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a><a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a><a href={`mailto:${site.email}`}><Mail size={16} /> Let’s talk <ArrowUpRight size={13} /></a></div>
      </Reveal>
      <Reveal className="hero-recent-experience" delay={.08}><HeroVisual /></Reveal>
    </div>
    <div className="hero-footnote"><span>INTERFACES. SYSTEMS. A LITTLE INTELLIGENCE.</span><a href="#projects">SCROLL TO EXPLORE <ArrowRight size={14} /></a></div>
    <ul className="hero-credentials"><li><strong>2</strong><span>Full-stack internships</span></li><li><strong>8.79<span>/10</span></strong><span>Computer Engineering CGPA</span></li><li><strong>Top 1<span>%</span></strong><span>NPTEL · Machine Learning · IIT Madras</span></li><li><strong>2027</strong><span>B.E. · Expected graduation</span></li></ul>
  </div></section>;
}

export function ExperienceSection() {
  return <section id="experience" className="section section-alt section-anchor"><div className="container"><SectionHeading eyebrow="02 / EXPERIENCE" title="Experience." intro="Professional experience building full-stack applications, backend services, and API-driven systems." />
    <div className="experience-list">{experience.map((job, index) => <Reveal key={job.company} delay={index * 0.08} className="experience-reveal"><article className="experience-card">
      <div className="experience-meta"><span className="experience-number">0{index + 1}</span><time>{job.duration}</time></div>
      <div className="experience-main"><p className="experience-company">{job.company}</p><h3>{job.role}</h3><p className="experience-summary">{job.summary}</p><ul className="achievement-list">{job.highlights.map((item) => <li key={item}>{item}</li>)}</ul><Tags items={job.technologies} /></div>
    </article></Reveal>)}</div>
  </div></section>;
}

export function ProjectsSection() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER));
  const additionalProjects = projects.filter((project) => !project.featured);
  return (
    <section id="projects" className="section section-anchor">
      <div className="container">
        <SectionHeading eyebrow="01 / SELECTED WORK" title="Built to solve something." intro="Three featured projects across HR technology, real-time connections, and document intelligence. Expand the collection to explore all five." />
        <div className="work-toolbar">
          <span>{String(featuredProjects.length).padStart(2, "0")} SELECTED PROJECTS / FULL-STACK + AI</span>
          <PresentationModeSwitch />
        </div>
        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.06}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
          {additionalProjects.length > 0 && (
            <ProjectExpansion additionalCount={additionalProjects.length} featuredCount={featuredProjects.length}>
              {additionalProjects.map((project, index) => (
                <Reveal key={project.slug} delay={(index % 2) * 0.06}>
                  <ProjectCard project={project} index={featuredProjects.length + index} />
                </Reveal>
              ))}
            </ProjectExpansion>
          )}
        </div>
      </div>
    </section>
  );
}
export function SkillsSection() {
  return <section id="skills" className="section section-alt section-anchor"><div className="container"><SectionHeading eyebrow="04 / TOOLKIT" title="Technical skills." intro="Tools and concepts used across my internships, projects, and computer engineering studies." /><div className="skills-grid">{skillGroups.map((group) => <Reveal key={group.name}><article className="skill-group"><h3>{group.name}</h3><Tags items={group.skills} /></article></Reveal>)}</div></div></section>;
}

export function CertificationsSection() {
  return <section id="certifications" className="section section-anchor"><div className="container"><SectionHeading eyebrow="05 / ACHIEVEMENTS & CERTIFICATIONS" title="Always a student." /><div className="cert-list">{certifications.map((cert, index) => <Reveal key={cert.name} delay={index * 0.06}><article className="cert-item"><span className="cert-number">0{index + 1}</span><div className="cert-main"><h3>{cert.name}</h3><p>{cert.issuer}{cert.date ? ` · ${cert.date}` : ""}</p></div>{"distinction" in cert && <span className="cert-distinction">{cert.distinction}</span>}</article></Reveal>)}</div>
    <div className="participation-section"><p className="eyebrow participation-heading">HACKATHON PARTICIPATION</p><Reveal delay={certifications.length * 0.06}><article className="participation-item"><span className="participation-icon" aria-hidden="true"><CalendarDays size={17} /></span><div className="participation-copy"><h3>National Level Project Competition 2026</h3><p>Participated as part of a team at VIT Pune, in association with IEEE Pune Section.</p></div></article></Reveal></div>
  </div></section>;
}

export function EducationSection() {
  return <section id="education" className="section section-alt section-anchor"><div className="container"><SectionHeading eyebrow="06 / EDUCATION" title="Academic foundation." /><div className="education-grid"><Reveal><article className="education-card education-primary"><p className="eyebrow">2023 — 2027</p><h3>RMD Sinhgad Technical Institute</h3><p className="education-place">Pune, Maharashtra</p><div className="education-bottom"><span>B.E. in Computer Engineering</span><strong>8.79<span> / 10 CGPA</span></strong></div></article></Reveal><Reveal delay={0.08}><article className="education-card"><p className="eyebrow">HIGHER SECONDARY</p><h3>Shakti Shanti Academy</h3><div className="education-bottom"><span>12th</span><strong>82.6<span>%</span></strong></div></article></Reveal></div></div></section>;
}

export function AboutSection() {
  const aboutProjects = projects.filter((project) => ["syncspace", "docai-brain", "echoguard"].includes(project.slug));

  return <section id="about" className="section section-anchor"><div className="container about-layout">
    <SectionHeading eyebrow="03 / ABOUT" title="From Learning to Building Real-World Software" intro="I’m Aditya Raj, a Computer Engineering undergraduate turning technical concepts into practical software." />
    <Reveal className="about-reveal"><div className="about-overview">
      <div className="about-copy"><p>Across two full-stack internships at Coding Savvy and Indux Technology, I’ve built reusable React components, integrated REST APIs, and worked with database-backed application workflows.</p><p>My projects explore real-time communication, document intelligence with retrieval-augmented generation, and deep-learning-based audio classification.</p></div>
      <div className="about-journey" aria-label="Education and internship experience">
        <article className="about-journey-item"><span className="about-period">2023 — 2027 <i>EDUCATION</i></span><div><h3>Computer Engineering</h3><p>RMD Sinhgad Technical Institute</p></div></article>
        <article className="about-journey-item"><span className="about-period">2026 <i>INTERNSHIPS</i></span><div><h3>Full-Stack Development</h3><p>Coding Savvy · Jan–Feb<br />Indux Technology · May–Sep</p></div></article>
      </div>
    </div>
    <div className="about-evidence-grid">
      <div className="about-projects"><p className="eyebrow">PROJECT WORK</p><ul>{aboutProjects.map((project) => <li key={project.slug}><a href={project.github ?? project.demo} target="_blank" rel="noreferrer">{project.name}<ArrowUpRight size={13} aria-hidden="true" /></a><span>{project.category}</span></li>)}</ul></div>
      <div className="about-focus"><p className="eyebrow">TECHNICAL FOCUS</p><ul><li>Full-Stack Development</li><li>Backend Engineering</li><li>Applied AI</li></ul></div>
    </div>
    <p className="about-credentials"><strong>8.79/10 CGPA</strong><span>B.E. Computer Engineering</span><i aria-hidden="true">·</i><strong>NPTEL Elite</strong><span>Introduction to Machine Learning · IIT Madras · Top 1%</span></p>
    </Reveal>
  </div></section>;
}

export function ContactSection() {
  return <section id="contact" className="section contact-section section-anchor"><div className="container"><div className="contact-layout">
    <Reveal className="contact-reveal"><aside className="contact-info-card"><p className="eyebrow">07 / CONTACT</p><h2>Contact Information</h2><p className="contact-intro">I’m open to discussing software engineering opportunities, full-stack development, and thoughtful technical collaborations. If you’re a recruiter or have a project in mind, I’d be glad to hear from you.</p>
      <a className="contact-email" href={`mailto:${site.email}`}><span className="contact-method-icon"><Mail size={19} aria-hidden="true" /></span><span><small>EMAIL</small><strong>{site.email}</strong></span><ArrowUpRight size={16} aria-hidden="true" /></a>
      <div className="contact-social-block"><p className="eyebrow">CONNECT</p><div className="contact-socials"><a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub profile"><Github size={19} aria-hidden="true" /></a><a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn profile"><Linkedin size={19} aria-hidden="true" /></a><a className="contact-resume" href={site.resume} target="_blank" rel="noreferrer">View resume <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
    </aside></Reveal>
    <Reveal className="contact-reveal" delay={0.06}><div className="contact-form-card"><h2>Send a Message</h2><p className="contact-form-intro">I’ll get back to you as soon as I can.</p><ContactForm /></div></Reveal>
  </div></div></section>;
}
