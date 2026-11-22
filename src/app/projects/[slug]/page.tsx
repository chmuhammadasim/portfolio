import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectIcon from "@/components/ProjectIcon";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Reveal from "@/components/Reveal";
import {
  CATEGORY_LABELS,
  PROJECT_SLUGS,
  getProject,
  getRelatedProjects,
  type Project,
} from "@/lib/projects-data";
import { PROFILE, SITE_URL } from "@/lib/site-data";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

const SKILL_ANCHOR: Record<Project["category"], string> = {
  cybersecurity: "security",
  infrastructure: "infrastructure",
  web: "frontend",
  mobile: "frontend",
  blockchain: "languages",
  networking: "networking",
  game: "frontend",
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const url = `${SITE_URL}/projects/${project.slug}`;
  const title = `${project.name} — Case Study`;
  const ogImage = `/api/og?title=${encodeURIComponent(
    project.name
  )}&subtitle=${encodeURIComponent(project.tagline)}&tags=${encodeURIComponent(
    project.technologies.slice(0, 3).join(",")
  )}`;

  return {
    title,
    description: project.seoDescription,
    keywords: [...project.keywords, project.name, ...project.technologies],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Muhammad Asim Chattha`,
      description: project.seoDescription,
      url,
      type: "article",
      siteName: "Muhammad Asim Chattha",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Muhammad Asim Chattha`,
      description: project.seoDescription,
      images: [ogImage],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);
  const url = `${SITE_URL}/projects/${project.slug}`;

  const sections: { id: string; title: string; body: string[] | string }[] = [
    { id: "overview", title: "Overview", body: project.overview },
    ...(project.deepDive
      ? [
          {
            id: "engineering",
            title: "Engineering notes",
            body: project.deepDive,
          },
        ]
      : []),
    { id: "problem", title: "The problem", body: project.problem },
    { id: "solution", title: "The solution", body: project.solution },
    { id: "architecture", title: "Architecture", body: project.architecture },
    { id: "features", title: "Key features", body: project.features },
    { id: "contribution", title: "My contribution", body: project.contribution },
    { id: "challenges", title: "Engineering challenges", body: project.challenges },
    { id: "results", title: "Results", body: project.results },
  ];

  return (
    <div className="min-h-screen">
      <ProjectJsonLd project={project} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: `${SITE_URL}/projects` },
          { name: project.name, url },
        ]}
      />
      <Navbar />

      <main id="main" className="pt-24">
        <article className="container-site pb-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <li>
                <Link href="/" className="hover:text-foreground">
                  home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="hover:text-foreground">
                  projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-accent">{project.slug}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                <span className="chip">{CATEGORY_LABELS[project.category]}</span>
                <span className="chip chip-violet">{project.year}</span>
                <span className="chip chip-pink">{project.status}</span>
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {project.name}
              </h1>
              <p className="mt-3 text-lg text-accent">{project.tagline}</p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
                {project.seoDescription}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="hud-label">Role</dt>
                  <dd className="mt-1 text-[13px] text-foreground">{project.role}</dd>
                </div>
                <div>
                  <dt className="hud-label">Year</dt>
                  <dd className="mt-1 text-[13px] text-foreground">{project.year}</dd>
                </div>
                <div>
                  <dt className="hud-label">Context</dt>
                  <dd className="mt-1 text-[13px] text-foreground">
                    {project.company ?? "Independent"}
                  </dd>
                </div>
                <div>
                  <dt className="hud-label">Location</dt>
                  <dd className="mt-1 text-[13px] text-foreground">
                    {PROFILE.location}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View on GitHub
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                )}
                <Link href="/projects" className="btn btn-secondary">
                  All projects
                </Link>
                <Link href="/#contact" className="btn btn-ghost">
                  Discuss a similar build
                </Link>
              </div>
            </div>

            {/* HUD visual panel */}
            <Reveal>
              <div className="holo-card relative overflow-hidden p-6">
                <div className="scan-line" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <span className="hud-label">// system map</span>
                  <span className="font-mono text-[9px] text-faint">
                    {project.technologies.length.toString().padStart(2, "0")} modules
                  </span>
                </div>

                <div className="system-map relative mt-6 flex h-40 items-center justify-center">
                  <div
                    className="system-ring system-ring-1"
                    aria-hidden="true"
                  />
                  <div
                    className="system-ring system-ring-2"
                    aria-hidden="true"
                  />
                  <div
                    className="system-ring system-ring-3"
                    aria-hidden="true"
                  />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded border border-accent/40 bg-accent-soft text-accent shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                    <ProjectIcon category={project.category} size={28} />
                  </span>
                  <span className="absolute left-2 top-2 font-mono text-[8px] uppercase tracking-[0.2em] text-accent/50">
                    secure
                  </span>
                  <span className="absolute bottom-2 right-2 font-mono text-[8px] uppercase tracking-[0.2em] text-accent-2/50">
                    online
                  </span>
                </div>

                <div className="mt-5">
                  <h2 className="hud-label">// stack</h2>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </header>

          {/* Body */}
          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[1fr_260px]">
            <div className="max-w-3xl space-y-12">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="anchor-target"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2
                      id={`${section.id}-heading`}
                      className="text-xl font-semibold tracking-tight text-foreground"
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-3 border-l border-border pl-5 text-[15px] leading-relaxed text-secondary">
                    {section.id === "architecture" ? (
                      <ArchitectureDiagram
                        steps={project.architecture}
                        label={`${project.name} architecture flow`}
                      />
                    ) : Array.isArray(section.body) ? (
                      <ul className="grid gap-2.5">
                        {section.body.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span
                              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{section.body}</p>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:border-l lg:border-border lg:pl-8">
              <section aria-label="Contents">
                <h2 className="hud-label">// contents</h2>
                <ul className="mt-4 grid gap-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-[13px] text-muted transition-colors hover:text-accent"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              {related.length > 0 && (
                <section aria-label="Related projects">
                  <h2 className="hud-label">// related projects</h2>
                  <ul className="mt-4 grid gap-2">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/projects/${item.slug}`}
                          className="group flex items-center justify-between gap-3 rounded border border-border bg-surface px-3.5 py-2.5 text-[13px] text-secondary transition-colors hover:border-accent/40 hover:text-foreground"
                        >
                          {item.name}
                          <svg
                            className="shrink-0 transition-transform group-hover:translate-x-0.5"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section aria-label="Skills demonstrated">
                <h2 className="hud-label">// skills demonstrated</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Link
                      key={tech}
                      href={`/skills#${SKILL_ANCHOR[project.category]}`}
                      className="chip transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {tech}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px]">
                  <Link
                    href="/skills"
                    className="link-underline text-accent"
                  >
                    Full skill matrix
                  </Link>
                  <Link
                    href="/experience"
                    className="link-underline text-accent"
                  >
                    Role context
                  </Link>
                </div>
              </section>

              <section aria-label="Work with me">
                <h2 className="hud-label">// work with me</h2>
                <p className="mt-4 text-[13px] leading-relaxed text-secondary">
                  Building something in this space?{" "}
                  <Link href="/#contact" className="link-underline text-accent">
                    Get in touch
                  </Link>
                  .
                </p>
                <Link href="/resume" className="btn btn-secondary btn-sm mt-4">
                  View resume
                </Link>
              </section>
            </aside>
          </div>

          {/* Related cards */}
          {related.length > 0 && (
            <section aria-labelledby="more-projects" className="mt-20 border-t border-border pt-10">
              <h2
                id="more-projects"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                More case studies
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/projects/${item.slug}`}
                    className="card group p-5 transition-transform hover:-translate-y-0.5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded border border-accent/25 bg-accent-soft text-accent">
                      <ProjectIcon category={item.category} size={16} />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                      {item.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 border-t border-border pt-8">
            <Link href="/projects" className="btn btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Back to all projects
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
