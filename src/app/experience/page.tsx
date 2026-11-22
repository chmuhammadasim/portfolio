import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AmbientScene from "@/components/three/AmbientSceneLoader";
import { BreadcrumbJsonLd, JsonLd } from "@/components/JsonLd";
import {
  CERTIFICATION_COUNT,
  CERTIFICATION_GROUPS,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SITE_URL,
} from "@/lib/site-data";

const PAGE_URL = `${SITE_URL}/experience`;
const TITLE = "Experience & Credentials";
const DESCRIPTION =
  "Software Developer at IotaScales building DNS security, VPN, IPAM, PAM, and infrastructure platforms — plus internships, freelance delivery, and credentials.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Muhammad Asim Chattha experience",
    "IotaScales software developer",
    "Atrios DNS Security developer",
    "OmniPriv PAM developer",
    "GenesisVPN developer",
    "Astro Dome developer",
    "backend developer Islamabad",
    "software engineer experience Pakistan",
    "Air University computer science",
    "Coursera certifications developer",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Muhammad Asim Chattha",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/api/og?title=Experience&subtitle=Software+Developer+%40+IotaScales&tags=DNS+Security,PAM,VPN,IPAM",
        width: 1200,
        height: 630,
        alt: "Professional experience of Muhammad Asim Chattha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      "/api/og?title=Experience&subtitle=Software+Developer+%40+IotaScales&tags=DNS+Security,PAM,VPN,IPAM",
    ],
  },
};

const STATS = [
  { label: "Building since", value: "2022" },
  { label: "Production platforms", value: "05" },
  { label: "Roles", value: String(EXPERIENCE.length).padStart(2, "0") },
  { label: "Credentials", value: String(CERTIFICATION_COUNT) },
];

const ORGANIZATIONS = Array.from(
  new Set(
    EXPERIENCE.map((job) => job.company).filter(
      (company) => company !== "Freelance"
    )
  )
);

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${PAGE_URL}#page`,
          url: PAGE_URL,
          name: TITLE,
          description: DESCRIPTION,
          image: `${SITE_URL}/api/og?title=Experience&subtitle=Software+Developer+%40+IotaScales`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#person` },
          mainEntity: { "@id": `${SITE_URL}/#person` },
          inLanguage: "en",
          mentions: ORGANIZATIONS.map((name) => ({
            "@type": "Organization",
            name,
          })),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Experience", url: PAGE_URL },
        ]}
      />
      <Navbar />

      <main id="main" className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden pb-12 pt-10">
          <AmbientScene variant="grid" className="opacity-25" />
          <div className="container-site relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-accent">experience</li>
              </ol>
            </nav>

            <Reveal>
              <p className="eyebrow">
                <span className="idx">Career</span> // {PROFILE.location}
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Experience &{" "}
                <span className="text-gradient-brand">credentials.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary md:text-base">
                Four years of building — from freelance delivery and full-stack
                internships to production security platforms at IotaScales. The through
                line: secure backend systems and products that ship.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border/60 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="bg-background/80 px-5 py-4 backdrop-blur">
                    <dd className="stat-value !text-2xl">{stat.value}</dd>
                    <dt className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Timeline */}
        <section aria-labelledby="timeline-heading" className="container-site pb-20">
          <Reveal>
            <h2
              id="timeline-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              Professional timeline.
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-8">
            {EXPERIENCE.map((job, index) => (
              <Reveal key={`${job.company}-${job.role}`} delay={index * 50}>
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

                  <div className="card p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold tracking-tight text-foreground">
                            {job.role}
                          </h3>
                          <span className="text-accent">@ {job.company}</span>
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
                          className="flex gap-2.5 text-[13.5px] leading-relaxed text-secondary"
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
        </section>

        {/* Education */}
        <section
          aria-labelledby="education-heading"
          className="border-y border-border bg-surface/40 py-16"
        >
          <div className="container-site">
            <Reveal>
              <p className="eyebrow">
                <span className="idx">Education</span> // Foundation
              </p>
              <h2
                id="education-heading"
                className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                Academic background.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {EDUCATION.map((edu) => (
                <Reveal key={edu.degree}>
                  <article className="holo-card h-full p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {edu.degree}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {edu.university}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      {edu.location}
                    </p>
                    <p className="mt-4 text-[14px] leading-relaxed text-secondary">
                      {edu.note}
                    </p>
                  </article>
                </Reveal>
              ))}
              <Reveal delay={60}>
                <div className="card h-full p-6 md:p-8">
                  <h3 className="text-sm font-semibold text-foreground">
                    Coursework & focus areas
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {[
                      "Software Engineering",
                      "Computer Networks",
                      "Operating Systems",
                      "Data Structures",
                      "Algorithms",
                      "Databases",
                      "Security Fundamentals",
                      "Distributed Systems",
                    ].map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
                    Coursework was paired with production projects throughout the degree —
                    the case studies on this site are the outcome.
                  </p>
                  <Link
                    href="/projects"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent"
                  >
                    See the applied work
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="container-site anchor-target py-20">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">Credentials</span> // Coursera
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {CERTIFICATION_COUNT} certifications.
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-secondary">
              Structured learning across full-stack development, DevOps, cloud,
              project management, smart contracts, .NET, and networking. Each card links
              to the Coursera verification record.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8">
            {CERTIFICATION_GROUPS.map((group) => {
              const items = CERTIFICATIONS.filter(
                (cert) => cert.category === group.category
              );
              return (
                <div key={group.category}>
                  <h3 className="hud-label flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                    {group.category}
                    <span className="text-faint">({group.count})</span>
                  </h3>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((cert) => (
                      <li key={cert.credentialId}>
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card group flex h-full flex-col p-4 transition-transform hover:-translate-y-0.5"
                        >
                          <h4 className="text-[13px] font-medium leading-snug text-foreground">
                            {cert.name}
                          </h4>
                          <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/60 pt-2">
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                              {cert.issuer} · {cert.credentialId}
                            </span>
                            <svg
                              className="shrink-0 text-faint transition-colors group-hover:text-accent"
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M7 17 17 7M8 7h9v9" />
                            </svg>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/resume#certifications" className="btn btn-primary">
              Credentials on the resume
            </Link>
            <a
              href={PROFILE.resumeUrl}
              download="Muhammad_Asim_Chattha_Resume.pdf"
              className="btn btn-secondary"
            >
              Download PDF
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="container-site pb-20">
          <div className="holo-card flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Looking for this kind of engineer?
              </h2>
              <p className="mt-1 text-[13px] text-muted">
                Security platforms, backend systems, and full-stack product delivery.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/#contact" className="btn btn-primary">
                Get in touch
              </Link>
              <Link href="/skills" className="btn btn-secondary">
                Skill matrix
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
