import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.origin) return [];
  return [
    { url: site.origin, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.origin}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({ url: `${site.origin}/projects/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
