import Link from "next/link";
import Reveal from "./Reveal";
import Tilt3D from "./three/Tilt3D";
import {
  CERTIFICATION_COUNT,
  CERTIFICATION_GROUPS,
  EDUCATION,
} from "@/lib/site-data";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-pad relative overflow-hidden"
    >
      <div className="container-site relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">07</span> // Education & credentials
            </p>
            <h2
              id="education-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Learning, continuously.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/resume" className="btn btn-secondary">
              Resume & credentials
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          {EDUCATION.map((edu) => (
            <Reveal key={edu.degree}>
              <Tilt3D max={5} className="h-full">
                <article className="holo-card h-full p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded border border-accent/25 bg-accent-soft text-accent">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 9 12 4 2 9l10 5 10-5ZM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9v6" />
                      </svg>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {edu.period}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{edu.university}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {edu.location}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-secondary">
                    {edu.note}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {["Software Engineering", "Networking", "Systems", "Security"].map(
                      (tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </article>
              </Tilt3D>
            </Reveal>
          ))}

          <Reveal delay={80}>
            <div className="card h-full p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {CERTIFICATION_COUNT} Coursera credentials
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">
                    Full-stack, DevOps, project management, and security.
                  </p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded border border-accent-2/30 bg-violet-soft text-accent-2">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M8.5 13 7 22l5-2.5L17 22l-1.5-9" />
                  </svg>
                </span>
              </div>
              <ul className="mt-5 grid gap-3">
                {CERTIFICATION_GROUPS.map((group) => (
                  <li
                    key={group.category}
                    className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-[13px] text-secondary">{group.category}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      {group.count.toString().padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[11px] leading-relaxed text-muted">
                Every credential includes a verifiable Coursera ID on the resume page.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
