"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { PROJECTS, type Project } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const CATEGORY_LABELS: Record<Project["category"], string> = {
  cybersecurity: "Cybersecurity",
  infrastructure: "Infrastructure",
  web: "Web Development",
  blockchain: "Blockchain",
  mobile: "Mobile",
};

function ProjectIcon({ category }: { category: Project["category"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (category) {
    case "cybersecurity":
      return (
        <svg {...common}>
          <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "infrastructure":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3Z" />
        </svg>
      );
    case "blockchain":
      return (
        <svg {...common}>
          <rect x="8" y="3" width="8" height="4" rx="1" />
          <rect x="3" y="10" width="8" height="4" rx="1" />
          <rect x="13" y="10" width="8" height="4" rx="1" />
          <path d="M12 7v3M7 14v3M17 14v3M7 20h10" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common}>
          <rect x="7" y="2" width="10" height="20" rx="2.5" />
          <path d="M11 18h2" />
        </svg>
      );
  }
}

/** Cursor-following spotlight wrapper for cards (desktop only). */
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };
  return (
    <div className={`spotlight ${className}`} onMouseMove={handleMove}>
      {children}
    </div>
  );
}

function FeaturedProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <SpotlightCard
      className={`card card-hover group flex h-full flex-col p-6 md:p-8 ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <ProjectIcon category={project.category} />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {CATEGORY_LABELS[project.category]} · {project.year}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {project.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-secondary">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, large ? 6 : 4).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      {project.hasCaseStudy ? (
        <a
          href={`/projects/${project.slug}`}
          onClick={() => trackEvent("case_study_open", { project: project.slug })}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
        >
          View Case Study
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      ) : project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("project_open", { project: project.slug })}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
        >
          View on GitHub
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      ) : null}
    </SpotlightCard>
  );
}

function CompactProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="card card-hover flex h-full flex-col p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent">
          <ProjectIcon category={project.category} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {CATEGORY_LABELS[project.category]}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {project.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 3).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on GitHub`}
          onClick={() => trackEvent("project_open", { project: project.slug })}
          className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
        </a>
      )}
    </SpotlightCard>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);
  const visibleOthers =
    filter === "all" ? others : others.filter((p) => p.category === filter);

  const categories = Array.from(
    new Set(PROJECTS.filter((p) => !p.featured).map((p) => p.category))
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-pad">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">Projects</p>
          <h2
            id="projects-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Selected work.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
            Security platforms, infrastructure tooling, and products — with detailed case
            studies for the most significant builds.
          </p>
        </Reveal>

        {/* Featured projects */}
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 70}>
              <FeaturedProjectCard project={project} large={index < 2} />
            </Reveal>
          ))}
        </div>

        {/* More projects with category filter */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              More projects
            </h3>
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-1.5"
            >
              {[{ id: "all", label: "All" }, ...categories.map((c) => ({ id: c, label: CATEGORY_LABELS[c] }))].map(
                (cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilter(cat.id)}
                    aria-pressed={filter === cat.id}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                      filter === cat.id
                        ? "bg-accent text-white"
                        : "border border-border bg-surface text-secondary hover:border-border-strong hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleOthers.map((project, index) => (
              <Reveal key={project.slug} delay={index * 50}>
                <CompactProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Explore many more experiments and open-source repositories on{" "}
            <a
              href="https://github.com/chmuhammadasim?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-medium text-accent"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
