"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Tilt3D from "@/components/three/Tilt3D";
import ProjectIcon from "@/components/ProjectIcon";
import {
  CATEGORY_LABELS,
  PROJECT_CATEGORIES,
  PROJECTS,
  type ProjectCategory,
} from "@/lib/projects-data";
import { trackEvent } from "@/lib/analytics";

type SortMode = "featured" | "year" | "name";

export default function ProjectsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [sort, setSort] = useState<SortMode>("featured");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = PROJECTS.filter((project) => {
      const matchesCategory =
        category === "all" || project.category === category;
      if (!matchesCategory) return false;
      if (!term) return true;
      const haystack = [
        project.name,
        project.tagline,
        project.summary,
        project.overview,
        project.status,
        project.company ?? "",
        ...project.technologies,
        ...project.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });

    return filtered.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "year") return Number(b.year) - Number(a.year);
      // featured: flagship first, then featured, then year
      const score = (p: typeof a) =>
        (p.tier === "flagship" ? 2 : 0) + (p.featured ? 1 : 0);
      if (score(b) !== score(a)) return score(b) - score(a);
      return Number(b.year) - Number(a.year);
    });
  }, [query, category, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-1 border-y border-border bg-background/85 px-1 py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, stack, domain…"
              className="search-input !pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {PROJECT_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className="filter-pill"
              >
                {item.short}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="project-sort"
              className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint"
            >
              sort
            </label>
            <select
              id="project-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="rounded border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] text-secondary focus:border-accent focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="year">Newest</option>
              <option value="name">A → Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          aria-live="polite"
        >
          {results.length.toString().padStart(2, "0")} projects
          {category !== "all" ? ` · ${CATEGORY_LABELS[category as ProjectCategory]}` : ""}
        </p>
        {(query || category !== "all") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent hover:text-accent-strong"
          >
            reset filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 rounded border border-border bg-surface px-6 py-16 text-center">
          <p className="text-lg font-medium text-foreground">No matching projects</p>
          <p className="mt-2 text-sm text-muted">
            Try a different stack, domain, or project name.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 50}>
              <Tilt3D max={5} className="h-full">
                <article className="holo-card group flex h-full flex-col p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded border border-accent/25 bg-accent-soft text-accent">
                      <ProjectIcon category={project.category} size={17} />
                    </span>
                    <div className="text-right font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      <p>{CATEGORY_LABELS[project.category]}</p>
                      <p className="mt-0.5 text-faint">{project.year}</p>
                    </div>
                  </div>

                  <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {project.name}
                  </h2>
                  <p className="mt-1 text-[12px] font-medium text-accent">
                    {project.tagline}
                  </p>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-secondary">
                    {project.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="chip chip-violet">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                      {project.status}
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() =>
                        trackEvent("case_study_open", { project: project.slug })
                      }
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-accent transition-transform group-hover:translate-x-0.5"
                    >
                      Case study
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
