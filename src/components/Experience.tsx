import Link from "next/link";
import Reveal from "./Reveal";
import { EXPERIENCE } from "@/lib/site-data";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-pad relative overflow-hidden border-y border-border bg-background-elevated/40"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />
      <div className="container-site relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">06</span> // Experience
            </p>
            <h2
              id="experience-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Where I&apos;ve worked.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/experience" className="btn btn-secondary">
              Full experience & credentials
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8">
          {EXPERIENCE.map((job, index) => (
            <Reveal key={`${job.company}-${job.role}`} delay={index * 60}>
              <article className="relative pl-8 md:pl-10">
                <div
                  className="timeline-rail absolute inset-y-0 left-0 w-4"
                  aria-hidden="true"
                >
                  <span
                    className={`absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 ${
                      job.current
                        ? "border-accent bg-accent shadow-[0_0_16px_rgba(34,211,238,0.4)]"
                        : "border-accent-2/70 bg-background"
                    }`}
                  />
                </div>

                <div className="card p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {job.role}
                        </h3>
                        <span className="font-normal text-accent">@ {job.company}</span>
                        {job.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-300">
                            <span className="status-dot status-dot--green" aria-hidden="true" />
                            current
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-muted">
                        {job.type} · {job.location}
                      </p>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                      {job.period}
                    </p>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-secondary">
                    {job.description}
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-secondary"
                      >
                        <span
                          className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
