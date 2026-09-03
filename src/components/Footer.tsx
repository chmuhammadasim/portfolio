import { PROFILE } from "@/lib/site-data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container-site flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">{PROFILE.name}</p>
          <p className="mt-0.5 text-xs text-muted">
            Software Developer · Cybersecurity · Secure Infrastructure
          </p>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-secondary hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-secondary hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="link-underline text-sm text-secondary hover:text-foreground"
          >
            Email
          </a>
        </nav>
        <p className="text-xs text-muted">
          © {year} {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
