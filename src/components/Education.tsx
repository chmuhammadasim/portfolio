import Reveal from "./Reveal";
import { EDUCATION, CERTIFICATIONS } from "@/lib/site-data";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-pad border-y border-border bg-surface"
    >
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">Education & Certifications</p>
          <h2
            id="education-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Learning, continuously.
          </h2>
        </Reveal>

        {/* Degree */}
        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-2">
          {EDUCATION.map((edu, index) => (
            <Reveal key={edu.degree} delay={index * 60}>
              <div className="card card-hover h-full p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 9 12 4 2 9l10 5 10-5ZM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9v6" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs text-muted">{edu.period}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">{edu.university}</p>
                <p className="mt-1 text-xs text-muted">{edu.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-secondary">{edu.note}</p>
              </div>
            </Reveal>
          ))}

          {/* Certifications summary card */}
          <Reveal delay={80}>
            <div className="card h-full p-6 md:p-8">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M8.5 13 7 22l5-2.5L17 22l-1.5-9" />
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                Professional Certifications
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                {CERTIFICATIONS.reduce((sum, group) => sum + group.items.length, 0)} Coursera
                credentials across full-stack development, DevOps, project management, and
                security.
              </p>
              <div className="mt-4 grid gap-1.5">
                {CERTIFICATIONS.map((group) => (
                  <p key={group.category} className="text-[13px] leading-relaxed text-muted">
                    <span className="font-medium text-secondary">{group.category}:</span>{" "}
                    {group.items.join(" · ")}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
