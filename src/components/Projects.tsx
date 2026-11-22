"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import Tilt3D from "./three/Tilt3D";
import ProjectIcon from "./ProjectIcon";
import { FEATURED_PROJECTS, CATEGORY_LABELS, PROJECTS, PROJECT_STATS } from "@/lib/projects-data";
import { trackEvent } from "@/lib/analytics";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-pad relative overflow-hidden border-y border-border bg-background-elevated/40"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
        aria-hidden="true"
      />
      <div className="container-site relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">02</span> // Projects
            </p>
            <h2
              id="projects-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Systems I&apos;ve shipped.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
              Enterprise security platforms, infrastructure tooling, and product-grade
              applications — each with a detailed case study covering the problem,
              architecture, features, and my contribution.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Link
              href="/projects"
              onClick={() => trackEvent("view_work")}
              className="btn btn-secondary"
            >
              All {PROJECTS.length} case studies
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 60}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <Tilt3D max={5} className="h-full">
                <article className="holo-card group flex h-full flex-col p-6 md:p-7">
                  {/* card header */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded border border-accent/25 bg-accent-soft text-accent">
                      <ProjectIcon category={project.category} size={19} />
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      <span>{CATEGORY_LABELS[project.category]}</span>
                      <span className="text-faint">/</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                    {project.status}
                  </div>

                  <h3
                    className={`mt-2 font-semibold tracking-tight text-foreground ${
                      index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                    }`}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-accent">
                    {project.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-secondary">
                    {index === 0 ? project.overview : project.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, index === 0 ? 6 : 4).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() =>
                        trackEvent("case_study_open", { project: project.slug })
                      }
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-transform group-hover:translate-x-0.5"
                    >
                      Read case study
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                    <span className="font-mono text-[10px] text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              </Tilt3D>
            </Reveal>
          ))}
          <Reveal delay={FEATURED_PROJECTS.length * 60} className="md:col-span-1 lg:col-span-2">
            <Link
              href="/projects"
              onClick={() => trackEvent("view_work")}
              className="holo-card group flex h-full min-h-[220px] flex-col justify-between p-6 md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded border border-accent-2/30 bg-violet-soft text-accent-2">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h10" />
                  </svg>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  index / {PROJECTS.length}
                </span>
              </div>
              <dl className="my-6 flex gap-px overflow-hidden border border-border bg-border/60">
                {[
                  { label: "case studies", value: PROJECT_STATS.caseStudies },
                  { label: "flagship", value: PROJECT_STATS.flagship },
                  { label: "total builds", value: PROJECT_STATS.total },
                ].map((stat) => (
                  <div key={stat.label} className="flex-1 bg-background/50 px-3 py-3">
                    <dd className="font-mono text-lg font-semibold text-foreground">
                      {String(stat.value).padStart(2, "0")}
                    </dd>
                    <dt className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  Explore every build.
                </h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-secondary">
                  Search and filter 20 full case studies — plus a GitHub archive of
                  smaller experiments and coursework repositories.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-transform group-hover:translate-x-0.5">
                  Open the project index
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <p className="mt-10 text-center text-[13px] text-muted">
            Plus {PROJECTS.length - FEATURED_PROJECTS.length} more case studies and a GitHub
            archive of smaller experiments in the{" "}
            <Link href="/projects" className="link-underline font-medium text-accent">
              full project index
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
