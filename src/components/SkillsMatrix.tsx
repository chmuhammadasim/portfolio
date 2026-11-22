"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  SKILL_GROUPS,
  SKILL_LEVELS,
  TOTAL_SKILLS,
  type SkillLevel,
} from "@/lib/site-data";
import { getProject } from "@/lib/projects-data";

const LEVEL_STYLE: Record<SkillLevel, { dot: string; badge: string }> = {
  production: {
    dot: "bg-accent",
    badge: "border-accent/30 bg-accent-soft text-accent",
  },
  working: {
    dot: "bg-accent-2",
    badge: "border-accent-2/30 bg-violet-soft text-accent-2",
  },
  familiar: {
    dot: "bg-faint",
    badge: "border-border bg-surface-raised text-muted",
  },
};

const TABS = [{ id: "all", label: "All domains" }, ...SKILL_GROUPS.map((group) => ({ id: group.id, label: group.short }))];

export default function SkillsMatrix() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const term = query.trim().toLowerCase();
    return SKILL_GROUPS.filter(
      (group) => active === "all" || group.id === active
    )
      .map((group) => ({
        ...group,
        skills: group.skills.filter((skill) => {
          if (!term) return true;
          return (
            skill.name.toLowerCase().includes(term) ||
            skill.note.toLowerCase().includes(term)
          );
        }),
      }))
      .filter((group) => group.skills.length > 0);
  }, [active, query]);

  const resultCount = groups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-1 border-y border-border bg-background/85 px-1 py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="skill-search" className="sr-only">
              Search skills
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
              id="skill-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search skills, tools, domains…"
              className="search-input !pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-pressed={active === tab.id}
                className="filter-pill"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          aria-live="polite"
        >
          {resultCount} of {TOTAL_SKILLS} skills
        </p>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          {(Object.keys(SKILL_LEVELS) as SkillLevel[]).map((level) => (
            <span key={level} className="inline-flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${LEVEL_STYLE[level].dot}`} />
              {SKILL_LEVELS[level].label}
            </span>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="mt-6 rounded border border-border bg-surface px-6 py-16 text-center">
          <p className="text-lg font-medium text-foreground">No matching skills</p>
          <p className="mt-2 text-sm text-muted">
            Try a different technology or clear the search.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-10">
          {groups.map((group, groupIndex) => {
            const production = group.skills.filter(
              (skill) => skill.level === "production"
            ).length;
            return (
              <Reveal key={group.id} delay={(groupIndex % 3) * 40}>
                <section
                  id={group.id}
                  aria-labelledby={`${group.id}-heading`}
                  className="anchor-target scroll-mt-36"
                >
                  <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-3">
                    <div>
                      <h2
                        id={`${group.id}-heading`}
                        className="text-xl font-semibold tracking-tight text-foreground"
                      >
                        {group.label}
                      </h2>
                      <p className="mt-1 max-w-2xl text-[13px] text-muted">
                        {group.description}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      {group.skills.length} skills · {production} in production
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.skills.map((skill) => {
                      const projects = (skill.projects ?? [])
                        .map((slug) => getProject(slug))
                        .filter((project): project is NonNullable<typeof project> =>
                          Boolean(project)
                        );
                      return (
                        <article
                          key={skill.name}
                          className="card flex h-full flex-col p-4"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-[13.5px] font-semibold text-foreground">
                              {skill.name}
                            </h3>
                            <span
                              className={`shrink-0 rounded-sm border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] ${LEVEL_STYLE[skill.level].badge}`}
                            >
                              {SKILL_LEVELS[skill.level].label}
                            </span>
                          </div>
                          <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-muted">
                            {skill.note}
                          </p>
                          <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-border/60">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                              style={{
                                width: `${
                                  (SKILL_LEVELS[skill.level].weight / 3) * 100
                                }%`,
                              }}
                            />
                          </div>
                          {projects.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1 border-t border-border/60 pt-2.5">
                              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
                                used in
                              </span>
                              {projects.slice(0, 3).map((project) => (
                                <Link
                                  key={project.slug}
                                  href={`/projects/${project.slug}`}
                                  className="font-mono text-[9px] text-accent hover:text-accent-strong"
                                >
                                  {project.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
