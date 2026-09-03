"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { SKILL_GROUPS, SKILL_FILTERS } from "@/lib/site-data";

export default function Skills() {
  const [filter, setFilter] = useState<string>("all");

  const visibleGroups =
    filter === "all"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((group) => group.id === filter);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-pad">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2
            id="skills-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Technologies I work with.
          </h2>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={80}>
          <div
            role="group"
            aria-label="Filter skills by category"
            className="mt-10 flex flex-wrap gap-1.5"
          >
            {SKILL_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                  filter === f.id
                    ? "bg-accent text-white"
                    : "border border-border bg-surface text-secondary hover:border-border-strong hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Skill groups */}
        <div key={filter} className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group) => (
            <div
              key={group.id}
              className="card p-6"
              style={{ animation: "rise-in 0.35s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <span className="chip">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
