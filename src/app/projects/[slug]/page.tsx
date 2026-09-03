import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy, CASE_STUDY_SLUGS } from "@/lib/projects-data";
import { PROFILE, SITE_URL } from "@/lib/site-data";
import { CaseStudyJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Project Not Found | Muhammad Asim Chattha" };

  const title = `${study.name} — Case Study | Muhammad Asim Chattha`;
  const description = `${study.tagline}. ${study.overview.slice(0, 140)}`;
  const url = `${SITE_URL}/projects/${study.slug}`;
  const ogImage = `/api/og?title=${encodeURIComponent(study.name)}&subtitle=${encodeURIComponent(
    study.tagline
  )}&tags=${encodeURIComponent(study.technologies.slice(0, 3).join(","))}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Muhammad Asim Chattha — Portfolio",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const sections: { title: string; body: string[] | string }[] = [
    { title: "Overview", body: study.overview },
    { title: "Problem", body: study.problem },
    { title: "Solution", body: study.solution },
    { title: "Architecture", body: study.architecture },
    { title: "Features", body: study.features },
    { title: "Challenges", body: study.challenges },
    { title: "My Contribution", body: study.contribution },
    { title: "Results", body: study.results },
  ];

  const related = study.relatedSlugs
    .map((s) => getCaseStudy(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="min-h-screen">
      <CaseStudyJsonLd study={study} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: `${SITE_URL}/#projects` },
          { name: study.name, url: `${SITE_URL}/projects/${study.slug}` },
        ]}
      />
      <Navbar />

      <main className="pt-24">
        <article className="container-site pb-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <li>
                <Link href="/" className="link-underline hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#projects" className="link-underline hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-secondary">{study.name}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="max-w-3xl">
            <p className="eyebrow">
              {study.category} · {study.year}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {study.name}
            </h1>
            <p className="mt-3 text-lg text-accent">{study.tagline}</p>
            <p className="mt-4 font-mono text-sm text-muted">
              Role: {study.role} · {PROFILE.location}
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {study.technologies.map((tech) => (
                <span key={tech} className="chip">{tech}</span>
              ))}
            </div>
            {study.github && (
              <a
                href={study.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary mt-8"
              >
                View on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            )}
          </header>

          {/* Body sections */}
          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[1fr_220px]">
            <div className="max-w-3xl space-y-12">
              {sections.map((section) => (
                <section key={section.title} aria-label={section.title}>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-secondary">
                    {Array.isArray(section.body) ? (
                      <ul className="grid gap-2.5">
                        {section.body.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
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

            {/* Sidebar: facts + related */}
            <aside className="space-y-10 lg:border-l lg:border-border lg:pl-8">
              <section aria-label="Project facts">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Facts
                </h2>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="text-muted">Category</dt>
                    <dd className="mt-0.5 text-foreground">{study.category}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Year</dt>
                    <dd className="mt-0.5 text-foreground">{study.year}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Role</dt>
                    <dd className="mt-0.5 text-foreground">{study.role}</dd>
                  </div>
                </dl>
              </section>

              {related.length > 0 && (
                <section aria-label="Related projects">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                    Related projects
                  </h2>
                  <ul className="mt-4 grid gap-2">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/projects/${r.slug}`}
                          className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-secondary transition-colors hover:border-border-strong hover:text-foreground"
                        >
                          {r.name}
                          <svg className="transition-transform group-hover:translate-x-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section aria-label="Contact">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Work with me
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-secondary">
                  Have a similar problem to solve?{" "}
                  <Link href="/#contact" className="link-underline text-accent">
                    Get in touch
                  </Link>
                  .
                </p>
              </section>
            </aside>
          </div>

          {/* Back */}
          <div className="mt-20 border-t border-border pt-8">
            <Link href="/#projects" className="btn btn-secondary">
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
