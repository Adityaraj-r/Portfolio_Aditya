import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { PresentationModeProvider } from "@/components/presentation-mode";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin ?? "http://localhost:3000"),
  title: site.title,
  description: site.description,
  keywords: ["Aditya Raj", "Full-Stack Developer", "Software Engineer", "React", "Node.js", "REST APIs", "Audio Classification"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "Aditya Raj — Full-Stack Developer", description: site.description, url: site.origin ?? "http://localhost:3000", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Aditya Raj — Full-Stack Developer" }], siteName: "Aditya Raj Portfolio" },
  twitter: { card: "summary_large_image", title: "Aditya Raj — Full-Stack Developer", description: site.description, images: ["/opengraph-image"] },
};

export const viewport: Viewport = { themeColor: "#08090B", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schemaOrigin = site.origin ?? "http://localhost:3000";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${schemaOrigin}/#person`,
        name: site.name,
        jobTitle: "Full-Stack Developer",
        url: schemaOrigin,
        email: `mailto:${site.email}`,
        sameAs: [site.github, site.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${schemaOrigin}/#website`,
        name: "Aditya Raj Portfolio",
        url: schemaOrigin,
        author: { "@id": `${schemaOrigin}/#person` },
      },
    ],
  };

  return <html lang="en" data-scroll-behavior="smooth"><body><JsonLd data={structuredData} /><a className="skip-link" href="#main-content">Skip to content</a><PresentationModeProvider><Navbar />{children}<Footer /><MobileActionBar /></PresentationModeProvider></body></html>;
}
