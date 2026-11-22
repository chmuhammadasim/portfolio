import Link from "next/link";
import { PROFILE } from "@/lib/site-data";

const EXPLORE = [
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "GitHub activity", href: "/github" },
  { label: "Resume", href: "/resume" },
];

const RESOURCES = [
  { label: "Blog", href: "/blogs" },
  { label: "RSS feed", href: "/rss.xml" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "llms.txt", href: "/llms.txt" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        aria-hidden="true"
      />
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-foreground"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded border border-accent/40 bg-accent-soft text-[11px] text-accent">
                AC
              </span>
              <span>
                <span className="text-accent">~/</span>asim
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">
              Software developer building secure platforms, backend systems, and
              product-grade web and mobile applications.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="status-dot status-dot--green" aria-hidden="true" />
              Open to conversations
            </p>
          </div>

          <nav aria-label="Explore" className="text-sm">
            <h2 className="hud-label">// explore</h2>
            <ul className="mt-4 grid gap-2.5">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources" className="text-sm">
            <h2 className="hud-label">// resources</h2>
            <ul className="mt-4 grid gap-2.5">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Connect" className="text-sm">
            <h2 className="hud-label">// connect</h2>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-secondary transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-secondary transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="link-underline break-all text-secondary transition-colors hover:text-foreground"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.resumeUrl}
                  download="Muhammad_Asim_Chattha_Resume.pdf"
                  className="link-underline text-secondary transition-colors hover:text-foreground"
                >
                  Resume PDF
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-muted">
            © {year} {PROFILE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            <span>Next.js · TypeScript · Three.js</span>
            <span className="hidden sm:inline" aria-hidden="true">|</span>
            <span>{PROFILE.location}</span>
            <span className="hidden sm:inline" aria-hidden="true">|</span>
            <a href="#top" className="transition-colors hover:text-accent">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
