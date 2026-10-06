import { PROFILE } from "@/lib/site-data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container-site flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">{PROFILE.name}</p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Software / Security / AI / Systems
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            <span className="status-dot" aria-hidden="true" />
            System status — online
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
