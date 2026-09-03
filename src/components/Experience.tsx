import Reveal from "./Reveal";
import { EXPERIENCE } from "@/lib/site-data";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-pad border-y border-border bg-surface"
    >
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">Experience</p>
          <h2
            id="experience-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Where I&apos;ve worked.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:mt-16">
          {EXPERIENCE.map((job, index) => (
            <Reveal key={job.company} delay={index * 60}>
              <article className="relative pl-8 md:pl-10">
                {/* Rail + dot */}
                <div
                  className="timeline-rail absolute inset-y-0 left-0 w-4"
                  aria-hidden="true"
                >
                  <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />
                </div>

                <div className="card card-hover p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {job.role}
                      <span className="ml-2 font-normal text-accent">@ {job.company}</span>
                    </h3>
                    <p className="font-mono text-xs text-muted">{job.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.location}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                    {job.description}
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-relaxed text-secondary"
                      >
                        <span
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent"
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
