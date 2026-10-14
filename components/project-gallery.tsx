"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = Pick<Project, "slug" | "name" | "images">;

export function ProjectGallery({ slug, name, images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  return (
    <section className="project-gallery" aria-label={`${name} product visuals`}>
      <div className="project-gallery-heading">
        <p className="eyebrow">PRODUCT VISUALS</p>
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
      </div>
      <figure className="project-gallery-main" id={`${slug}-selected-visual`}>
        <div className="project-gallery-frame">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={activeImage.width}
            height={activeImage.height}
            sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 1200px) calc(100vw - 48px), 1160px"
            loading={activeIndex === 0 ? "eager" : "lazy"}
          />
        </div>
        <figcaption>
          <p aria-live="polite">{activeImage.caption}</p>
          <a className="text-link" href={activeImage.src} target="_blank" rel="noreferrer">
            Open full-size visual <ArrowUpRight size={15} />
          </a>
        </figcaption>
      </figure>
      {images.length > 1 && (
        <div className="project-gallery-thumbnails" role="group" aria-label={`Choose a ${name} visual`}>
          {images.map((visual, index) => (
            <button
              type="button"
              className="project-gallery-thumbnail"
              key={visual.src}
              aria-label={`Show ${name} visual ${index + 1}: ${visual.caption}`}
              aria-pressed={index === activeIndex}
              aria-controls={`${slug}-selected-visual`}
              onClick={() => setActiveIndex(index)}
            >
              <Image src={visual.src} alt="" width={visual.width} height={visual.height} sizes="(max-width: 600px) 120px, 180px" />
              <span>Visual {String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      )}
      <p className="project-gallery-note">Supplied product visuals. Interface details and figures in the artwork are illustrative; the case study describes the audited implementation.</p>
    </section>
  );
}
