import { Download, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Quick actions">
      <a href={site.resume} target="_blank" rel="noreferrer" aria-label="Open resume PDF">
        <Download size={17} aria-hidden="true" />
        <span>Resume</span>
      </a>
      <a href={`mailto:${site.email}`} aria-label="Contact Aditya by email">
        <Mail size={17} aria-hidden="true" />
        <span>Contact</span>
      </a>
    </nav>
  );
}
