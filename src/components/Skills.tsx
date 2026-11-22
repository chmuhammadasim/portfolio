"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import {
  SKILL_GROUPS,
  SKILL_LEVELS,
  TOTAL_SKILLS,
  type SkillLevel,
} from "@/lib/site-data";

const LEVEL_DOT: Record<SkillLevel, string> = {
  production: "bg-accent",
  working: "bg-accent-2",
  familiar: "bg-faint",
};

const TABS = [{ id: "all", label: "All domains" }, ...SKILL_GROUPS.map((g) => ({ id: g.id, label: g.short }))];

export default function Skills() {
  const [active, setActive] = useState("all");
  const selected = SKILL_GROUPS.find((group) => group.id === active);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-accent-2/10 blur-[100px]"
        aria-hidden="true"
      />
      <div className="container-site relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">03</span> // Skill matrix
            </p>
            <h2
              id="skills-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              The stack behind the systems.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
              {TOTAL_SKILLS} technologies across security, backend, frontend, data,
              DevOps, and networking — each mapped to the projects where it was used.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/skills" className="btn btn-secondary">
              Full skill matrix
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-3">
            <div
              role="group"
              aria-label="Filter skills by domain"
              className="flex flex-wrap gap-1.5"
            >
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
            <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              {(Object.keys(SKILL_LEVELS) as SkillLevel[]).map((level) => (
                <span key={level} className="inline-flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${LEVEL_DOT[level]}`} />
                  {SKILL_LEVELS[level].label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {selected ? (
          <Reveal delay={40}>
            <div className="holo-card mt-6 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {selected.label}
                  </h3>
                  <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-muted">
                    {selected.description}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {selected.skills.length} skills
                </span>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {selected.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-start gap-2.5 rounded border border-border/60 bg-surface/60 px-3 py-2.5"
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${LEVEL_DOT[skill.level]}`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[13px] font-medium text-foreground">
                        {skill.name}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                        {skill.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group, index) => (
              <Reveal key={group.id} delay={index * 50}>
                <button
                  type="button"
                  onClick={() => setActive(group.id)}
                  className="holo-card group flex h-full w-full flex-col p-5 text-left transition-transform hover:-translate-y-0.5"
                  aria-label={`Show ${group.label} skills`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] text-faint">
                      {group.skills.length}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {group.label}
                  </h3>
                  <p className="mt-2 flex-1 text-[12px] leading-relaxed text-muted">
                    {group.skills
                      .slice(0, 5)
                      .map((skill) => skill.name)
                      .join(" · ")}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-accent">
                    Inspect
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </Reveal>
            ))}
            <Reveal delay={SKILL_GROUPS.length * 50} className="sm:col-span-1 lg:col-span-2">
              <Link
                href="/skills"
                className="holo-card group flex h-full min-h-[180px] flex-col justify-between p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-2">
                    full matrix
                  </span>
                  <span className="font-mono text-[10px] text-faint">
                    {TOTAL_SKILLS}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Every skill, with evidence.
                  </h3>
                  <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-muted">
                    Proficiency levels, notes, and links to the projects where each
                    technology was used — searchable and filterable.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-accent transition-transform group-hover:translate-x-0.5">
                    Open the skill matrix
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
