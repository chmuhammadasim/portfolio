import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientScene from "@/components/three/AmbientSceneLoader";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import Reveal from "@/components/Reveal";
import {
  ARCHIVE_PROJECTS,
  PROJECTS,
  PROJECT_STATS,
  CATEGORY_LABELS,
} from "@/lib/projects-data";
import { SITE_URL } from "@/lib/site-data";
import {
  BreadcrumbJsonLd,
  CollectionPageJsonLd,
} from "@/components/JsonLd";

const PAGE_URL = `${SITE_URL}/projects`;
const TITLE = "Projects & Case Studies";
const DESCRIPTION =
  "20 case studies by Muhammad Asim Chattha: DNS security, PAM, VPN and IPAM platforms, endpoint security, Go backends, Next.js products, and Flutter apps.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Muhammad Asim Chattha projects",
    "security platform projects",
    "DNS security platform case study",
    "privileged access management project",
    "VPN management platform",
    "IPAM platform",
    "endpoint security platform",
    "Go backend projects",
    "Next.js Supabase case management",
    "MERN stack projects",
    "Flutter app projects",
    "Solidity DApp projects",
    "software developer portfolio",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Muhammad Asim Chattha",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og?title=Projects+%26+Case+Studies&subtitle=Security+Platforms+%C2%B7+Backend+%C2%B7+Full-Stack&tags=DNS+Security,PAM,Go,Next.js",
        width: 1200,
        height: 630,
        alt: "Projects and case studies by Muhammad Asim Chattha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      "/api/og?title=Projects+%26+Case+Studies&subtitle=Security+Platforms+%C2%B7+Backend+%C2%B7+Full-Stack&tags=DNS+Security,PAM,Go,Next.js",
    ],
  },
};

const STATS = [
  { label: "Case studies", value: PROJECT_STATS.caseStudies },
  { label: "Flagship builds", value: PROJECT_STATS.flagship },
  { label: "Production platforms", value: PROJECT_STATS.production },
  { label: "Technologies mapped", value: PROJECT_STATS.technologies },
];

const COVERAGE = [
  {
    title: "Problem & context",
    body: "What the system had to solve and why the domain is hard.",
  },
  {
    title: "Architecture",
    body: "The services, data stores, and boundaries that make it work.",
  },
  {
    title: "My contribution",
    body: "The specific backend and platform work I owned.",
  },
  {
    title: "Stack & outcomes",
    body: "Technologies used and the result delivered, without inflated metrics.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <CollectionPageJsonLd
        path="/projects"
        name={TITLE}
        description={DESCRIPTION}
        items={PROJECTS.map((project) => ({
          name: project.name,
          url: `${SITE_URL}/projects/${project.slug}`,
          description: project.summary,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: PAGE_URL },
        ]}
      />
      <Navbar />

      <main id="main" className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden pb-12 pt-10 md:pb-16">
          <AmbientScene variant="constellation" className="opacity-60" />
          <div className="container-site relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-accent">projects</li>
              </ol>
            </nav>

            <Reveal>
              <p className="eyebrow">
                <span className="idx">Index</span> // {PROJECT_STATS.caseStudies}{" "}
                case studies
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Systems, platforms,{" "}
                <span className="text-gradient-brand">and experiments.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary md:text-base">
                A complete engineering showcase across cybersecurity, infrastructure,
                web, mobile, networking, and blockchain. Every flagship project has a
                detailed case study; smaller repositories are listed in the archive.
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

        {/* Explorer */}
        <section aria-labelledby="explorer-heading" className="container-site pb-20">
          <h2 id="explorer-heading" className="sr-only">
            Project explorer
          </h2>
          <ProjectsExplorer />
        </section>

        {/* Coverage */}
        <section
          aria-labelledby="coverage-heading"
          className="border-y border-border bg-surface/40 py-16"
        >
          <div className="container-site">
            <Reveal>
              <p className="eyebrow">
                <span className="idx">Docs</span> // Case study anatomy
              </p>
              <h2
                id="coverage-heading"
                className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                What every case study covers.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COVERAGE.map((item, index) => (
                <Reveal key={item.title} delay={index * 50}>
                  <div className="card h-full p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Archive */}
        <section aria-labelledby="archive-heading" className="container-site py-20">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">Archive</span> // GitHub repositories
            </p>
            <h2
              id="archive-heading"
              className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              More repositories & experiments.
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-secondary">
              Smaller projects and focused repositories, listed for completeness. Some
              are private or coursework and are described only at the level their public
              metadata supports.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {ARCHIVE_PROJECTS.map((project, index) => (
              <Reveal key={project.name} delay={(index % 4) * 40} as="li">
                <article className="card flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                      {project.kind}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.repos && project.repos.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3 border-t border-border pt-3">
                      {project.repos.map((repo) => (
                        <a
                          key={repo.url}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent hover:text-accent-strong"
                        >
                          {repo.label}
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17 17 7M8 7h9v9" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Index by category */}
        <section
          aria-labelledby="index-heading"
          className="border-t border-border bg-surface/30 py-16"
        >
          <div className="container-site">
            <Reveal>
              <h2
                id="index-heading"
                className="text-2xl font-semibold tracking-tight text-foreground"
              >
                Full project index.
              </h2>
              <p className="mt-2 text-sm text-muted">
                Every case study, grouped by discipline.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {(
                Object.keys(CATEGORY_LABELS) as (keyof typeof CATEGORY_LABELS)[]
              ).map((category) => {
                const items = PROJECTS.filter((p) => p.category === category);
                if (items.length === 0) return null;
                return (
                  <div key={category}>
                    <h3 className="hud-label flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                      {CATEGORY_LABELS[category]}
                    </h3>
                    <ul className="mt-3 grid gap-1.5">
                      {items.map((project) => (
                        <li key={project.slug}>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="group flex items-baseline justify-between gap-2 border-b border-border/50 py-1.5 text-[13px] text-secondary transition-colors hover:text-foreground"
                          >
                            <span>{project.name}</span>
                            <span className="font-mono text-[9px] text-faint">
                              {project.year}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container-site py-16">
          <div className="holo-card flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Want the code and commit history?
              </h2>
              <p className="mt-1 text-[13px] text-muted">
                Public repositories, languages, and live activity on GitHub.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/skills" className="btn btn-ghost">
                Skill matrix
              </Link>
              <Link href="/experience" className="btn btn-ghost">
                Experience
              </Link>
              <Link href="/github" className="btn btn-secondary">
                GitHub activity
              </Link>
              <a
                href="https://github.com/chmuhammadasim?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
