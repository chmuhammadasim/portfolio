import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AmbientScene from "@/components/three/AmbientSceneLoader";
import PrintButton from "@/components/PrintButton";
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  ResumePageJsonLd,
} from "@/components/JsonLd";
import {
  CAPABILITIES,
  CERTIFICATION_COUNT,
  CERTIFICATION_GROUPS,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  FAQS,
  PROFILE,
  SITE_UPDATED,
  SITE_URL,
  SKILL_GROUPS,
  TOTAL_SKILLS,
} from "@/lib/site-data";
import { FEATURED_PROJECTS } from "@/lib/projects-data";

const PAGE_URL = `${SITE_URL}/resume`;
const TITLE = "Resume & Credentials";
const DESCRIPTION =
  "Software Developer at IotaScales working on DNS security, VPN, IPAM, PAM, and infrastructure platforms. Skills, projects, education, and 15 credentials.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Muhammad Asim Chattha resume",
    "Muhammad Asim Chattha CV",
    "software developer resume Pakistan",
    "cybersecurity engineer resume",
    "backend developer resume Go Node.js",
    "IotaScales software developer",
    "PAM engineer resume",
    "DNS security engineer",
    "Air University computer science graduate",
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
        url: "/api/og?title=Resume&subtitle=Software+Developer+%26+Cybersecurity+Engineer&tags=Go,Node.js,DNS+Security,PAM",
        width: 1200,
        height: 630,
        alt: "Resume of Muhammad Asim Chattha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      "/api/og?title=Resume&subtitle=Software+Developer+%26+Cybersecurity+Engineer&tags=Go,Node.js,DNS+Security,PAM",
    ],
  },
};

const CONTACT_LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/[^+\d]/g, "")}` },
  { label: "Website", value: new URL(SITE_URL).host, href: SITE_URL },
  { label: "GitHub", value: "github.com/chmuhammadasim", href: PROFILE.socials.github },
  { label: "LinkedIn", value: "linkedin.com/in/muhammad-asim-chattha", href: PROFILE.socials.linkedin },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      <ResumePageJsonLd />
      <FAQJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Resume", url: PAGE_URL },
        ]}
      />
      <Navbar />

      <main id="main" className="pt-24">
        {/* Header */}
        <section className="relative overflow-hidden pb-10 pt-10">
          <AmbientScene variant="particles" className="opacity-20" />
          <div className="container-site relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8 no-print">
              <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-accent">resume</li>
              </ol>
            </nav>

            <Reveal>
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div>
                  <p className="eyebrow">
                    <span className="idx">Curriculum vitae</span> // {SITE_UPDATED}
                  </p>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    {PROFILE.name}
                  </h1>
                  <p className="mt-3 text-lg text-accent">
                    Software Developer · Cybersecurity · Secure Infrastructure
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {PROFILE.location} · open to conversations
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 no-print lg:shrink-0">
                  <a
                    href={PROFILE.resumeUrl}
                    download="Muhammad_Asim_Chattha_Resume.pdf"
                    className="btn btn-primary"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
                    </svg>
                    Download PDF
                  </a>
                  <PrintButton className="btn btn-secondary btn-sm" />
                  <Link href="/#contact" className="btn btn-ghost btn-sm">
                    Contact
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4 text-[12px]">
                {CONTACT_LINKS.map((item) => (
                  <li key={item.label} className="inline-flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-secondary transition-colors hover:text-accent"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <article className="container-site pb-20">
          <div className="mx-auto max-w-4xl space-y-10">
            {/* Summary */}
            <Reveal>
              <section
                aria-labelledby="summary-heading"
                className="print-card print-section card p-6 md:p-8"
              >
                <h2
                  id="summary-heading"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
                >
                  // Professional summary
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                  {PROFILE.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {CAPABILITIES.map((item) => (
                    <span key={item.id} className="chip">
                      {item.title}
                    </span>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Experience */}
            <Reveal>
              <section
                aria-labelledby="experience-heading"
                className="print-card print-section card p-6 md:p-8"
              >
                <div className="flex items-end justify-between gap-4">
                  <h2
                    id="experience-heading"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
                  >
                    // Experience
                  </h2>
                  <Link
                    href="/experience"
                    className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint hover:text-accent no-print"
                  >
                    detailed view ↗
                  </Link>
                </div>

                <div className="mt-6 grid gap-7">
                  {EXPERIENCE.map((job) => (
                    <div key={`${job.company}-${job.role}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-[15px] font-semibold text-foreground">
                          {job.role}{" "}
                          <span className="font-normal text-accent">
                            — {job.company}
                          </span>
                        </h3>
                        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                          {job.period}
                        </p>
                      </div>
                      <p className="mt-0.5 font-mono text-[10px] text-faint">
                        {job.type} · {job.location}
                      </p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-secondary">
                        {job.description}
                      </p>
                      <ul className="mt-2.5 grid gap-1.5">
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
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.technologies.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Selected projects */}
            <Reveal>
              <section
                aria-labelledby="projects-heading"
                className="print-card print-section card p-6 md:p-8"
              >
                <div className="flex items-end justify-between gap-4">
                  <h2
                    id="projects-heading"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
                  >
                    // Selected projects
                  </h2>
                  <Link
                    href="/projects"
                    className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint hover:text-accent no-print"
                  >
                    all case studies ↗
                  </Link>
                </div>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {FEATURED_PROJECTS.map((project) => (
                    <li key={project.slug}>
                      <h3 className="text-[13.5px] font-semibold text-foreground">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:text-accent"
                        >
                          {project.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                        {project.summary}
                      </p>
                      <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
                        {project.technologies.slice(0, 4).join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Skills */}
            <Reveal>
              <section
                aria-labelledby="skills-heading"
                className="print-card print-section card p-6 md:p-8"
              >
                <div className="flex items-end justify-between gap-4">
                  <h2
                    id="skills-heading"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
                  >
                    // Technical skills
                  </h2>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                    {TOTAL_SKILLS} listed
                  </span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {SKILL_GROUPS.map((group) => (
                    <div key={group.id}>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-secondary">
                        {group.label}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                        {group.skills.map((skill) => skill.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/skills"
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-accent no-print"
                >
                  Full skill matrix with evidence
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </section>
            </Reveal>

            {/* Education */}
            <Reveal>
              <section
                aria-labelledby="education-heading"
                className="print-card print-section card p-6 md:p-8"
              >
                <h2
                  id="education-heading"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
                >
                  // Education
                </h2>
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="mt-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[15px] font-semibold text-foreground">
                        {edu.degree} <span className="font-normal text-accent">— {edu.university}</span>
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                        {edu.period}
                      </p>
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-faint">{edu.location}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-secondary">
                      {edu.note}
                    </p>
                  </div>
                ))}
              </section>
            </Reveal>

            {/* Certifications */}
            <Reveal>
              <section
                id="certifications"
                aria-labelledby="certifications-heading"
                className="print-card print-section card anchor-target p-6 md:p-8"
              >
                <div className="flex items-end justify-between gap-4">
                  <h2
                    id="certifications-heading"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
                  >
                    // Certifications
                  </h2>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                    {CERTIFICATION_COUNT} Coursera credentials
                  </span>
                </div>
                <div className="mt-5 grid gap-5">
                  {CERTIFICATION_GROUPS.map((group) => (
                    <div key={group.category}>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-secondary">
                        {group.category}
                      </h3>
                      <ul className="mt-2 grid gap-1.5">
                        {CERTIFICATIONS.filter(
                          (cert) => cert.category === group.category
                        ).map((cert) => (
                          <li
                            key={cert.credentialId}
                            className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-border/40 pb-1.5 text-[12.5px] last:border-0"
                          >
                            <span className="text-secondary">{cert.name}</span>
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[9px] uppercase tracking-[0.08em] text-faint transition-colors hover:text-accent"
                            >
                              {cert.credentialId} ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* FAQ */}
            <Reveal>
              <section
                aria-labelledby="faq-heading"
                className="print-card print-section card p-6 md:p-8"
              >
                <h2
                  id="faq-heading"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
                >
                  // Frequently asked
                </h2>
                <div className="mt-4 grid gap-3">
                  {FAQS.map((faq) => (
                    <details
                      key={faq.question}
                      className="group border-b border-border/60 pb-3 last:border-0"
                    >
                      <summary className="cursor-pointer list-none text-[13.5px] font-medium text-foreground marker:hidden">
                        <span className="mr-2 font-mono text-accent">+</span>
                        {faq.question}
                      </summary>
                      <p className="mt-2 pl-5 text-[13px] leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="holo-card flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center no-print">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Want the PDF or a conversation?
                  </h2>
                  <p className="mt-1 text-[13px] text-muted">
                    Download the resume or reach out directly.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={PROFILE.resumeUrl}
                    download="Muhammad_Asim_Chattha_Resume.pdf"
                    className="btn btn-primary"
                  >
                    Download PDF
                  </a>
                  <Link href="/#contact" className="btn btn-secondary">
                    Contact
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
