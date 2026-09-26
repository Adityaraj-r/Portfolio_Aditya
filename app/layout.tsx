import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin ?? "http://localhost:3000"),
  title: site.title,
  description: site.description,
  keywords: ["Aditya Raj", "Full-Stack Developer", "Software Engineer", "React", "Node.js", "REST APIs", "Audio Classification"],
  ...(site.origin ? { alternates: { canonical: "/" } } : {}),
  openGraph: { type: "website", title: "Aditya Raj — Full-Stack Developer", description: "Explore Aditya Raj’s experience and projects in full-stack development and audio classification.", ...(site.origin ? { url: site.origin, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aditya Raj — Full-Stack Developer" }] } : {}), siteName: "Aditya Raj Portfolio" },
  twitter: { card: "summary_large_image", title: "Aditya Raj — Full-Stack Developer", description: "Explore Aditya Raj’s experience and projects in full-stack development and audio classification." },
};

export const viewport: Viewport = { themeColor: "#0B0F14", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main-content">Skip to content</a><Navbar />{children}<Footer /></body></html>;
}
