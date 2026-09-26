function normalizeOrigin(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  const url = value.trim();
  return new URL(url.includes("://") ? url : `https://${url}`).origin;
}

const siteOrigin = normalizeOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL,
);

export const site = {
  name: "Aditya Raj",
  title: "Aditya Raj | Full-Stack Developer",
  description: "Portfolio of Aditya Raj, a Computer Engineering student and full-stack developer. Explore internship experience, web application projects, and an audio classification system.",
  email: "aadiraj267@gmail.com",
  github: "https://github.com/Adityaraj-r",
  linkedin: "https://linkedin.com/in/aditya-raj-725708325",
  resume: "/resume.pdf",
  origin: siteOrigin,
};
