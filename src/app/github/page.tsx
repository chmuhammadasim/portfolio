import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AmbientScene from "@/components/three/AmbientSceneLoader";
import GitHubRepos from "@/components/GitHubRepos";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/JsonLd";
import { getGitHubData, LANGUAGE_COLORS } from "@/lib/github";
import { SITE_URL } from "@/lib/site-data";

export const revalidate = 3600;

const PAGE_URL = `${SITE_URL}/github`;
const TITLE = "GitHub Repositories & Activity";
const DESCRIPTION =
  "Live GitHub activity for chmuhammadasim: public repositories, languages, stars, and open-source code across Go, Next.js, Flutter, and Solidity projects.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "chmuhammadasim GitHub",
    "Muhammad Asim Chattha GitHub",
    "Go developer GitHub",
    "Next.js Supabase project GitHub",
    "Flutter authenticator GitHub",
    "Solidity NFT marketplace GitHub",
    "open source security tooling",
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
        url: "/api/og?title=GitHub+Activity&subtitle=Repositories+%C2%B7+Languages+%C2%B7+Open+Source&tags=Go,TypeScript,Flutter,Solidity",
        width: 1200,
        height: 630,
        alt: "GitHub activity of Muhammad Asim Chattha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      "/api/og?title=GitHub+Activity&subtitle=Repositories+%C2%B7+Languages+%C2%B7+Open+Source&tags=Go,TypeScript,Flutter,Solidity",
    ],
  },
};

function memberSince(iso: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return String(date.getUTCFullYear());
}

export default async function GitHubPage() {
  const data = await getGitHubData();
  const profile = data.profile;

  const stats = [
    { label: "Public repositories", value: data.live ? data.totals.repos : "—" },
    { label: "Stars earned", value: data.live ? data.totals.stars : "—" },
    { label: "Followers", value: data.live ? data.totals.followers : "—" },
    { label: "Languages", value: data.live ? data.totals.languages : "—" },
  ];

  return (
    <div className="min-h-screen">
      <CollectionPageJsonLd
        path="/github"
        name={TITLE}
        description={DESCRIPTION}
        items={data.repos.slice(0, 50).map((repo) => ({
          name: repo.name,
          url: repo.htmlUrl,
          description: repo.description,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "GitHub", url: PAGE_URL },
        ]}
      />
      <Navbar />

      <main id="main" className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden pb-12 pt-10">
          <AmbientScene variant="network" className="opacity-30" />
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 25% 0%, rgba(34,211,238,0.1), transparent 60%), radial-gradient(ellipse 45% 45% at 85% 10%, rgba(167,139,250,0.1), transparent 60%)",
            }}
          />
          <div className="container-site relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-accent">github</li>
              </ol>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <Reveal>
                <p className="eyebrow">
                  <span className="idx">Open source</span> // GitHub telemetry
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  Code, commits,{" "}
                  <span className="text-gradient-brand">and languages.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary md:text-base">
                  A live view of my public GitHub: repositories across security tooling,
                  Go services, Next.js platforms, Flutter apps, smart contracts, and
                  networking projects. Data is refreshed hourly.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={profile.blog || SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    github.com/{profile.login}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                  <a
                    href={`https://github.com/${profile.login}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    All repositories
                  </a>
                  <a
                    href={`https://github.com/search?q=author%3A${profile.login}&type=commits`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    Commit search
                  </a>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="holo-card p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={profile.avatarUrl}
                      alt={`${profile.name} GitHub avatar`}
                      width={64}
                      height={64}
                      unoptimized
                      className="rounded border border-accent/30"
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-semibold text-foreground">
                        @{profile.login}
                      </p>
                      <p className="truncate text-[12px] text-muted">
                        {profile.name}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            data.live ? "bg-emerald-400" : "bg-amber-400"
                          }`}
                          aria-hidden="true"
                        />
                        {data.live ? "live data" : "curated fallback"}
                      </p>
                    </div>
                  </div>
                  <dl className="mt-5 grid gap-2.5 border-t border-border pt-4 text-[12px]">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Company</dt>
                      <dd className="text-right text-secondary">
                        {profile.company || "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Location</dt>
                      <dd className="text-right text-secondary">
                        {profile.location || "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Member since</dt>
                      <dd className="text-right text-secondary">
                        {memberSince(profile.createdAt)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Following</dt>
                      <dd className="text-right text-secondary">
                        {data.live ? profile.following : "—"}
                      </dd>
                    </div>
                  </dl>
                  {!data.live && (
                    <p className="mt-4 rounded border border-amber-400/25 bg-amber-400/5 px-3 py-2 text-[10.5px] leading-relaxed text-amber-200/80">
                      The GitHub API is temporarily unavailable. A curated repository
                      snapshot is shown; live numbers will return on the next refresh.
                    </p>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border/60 sm:grid-cols-4">
                {stats.map((stat) => (
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

        {/* Languages + notes */}
        <section className="container-site pb-12">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="card p-6">
                <h2 className="hud-label">// language distribution</h2>
                <ul className="mt-4 grid gap-3">
                  {data.languages.slice(0, 8).map((language) => (
                    <li key={language.name}>
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="inline-flex items-center gap-2 text-secondary">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{
                              backgroundColor:
                                LANGUAGE_COLORS[language.name] ?? "#6c7f99",
                            }}
                            aria-hidden="true"
                          />
                          {language.name}
                        </span>
                        <span className="text-muted">
                          {language.count} {language.count === 1 ? "repo" : "repos"}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border/50">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(
                              4,
                              (language.count / (data.languages[0]?.count || 1)) * 100
                            )}%`,
                            backgroundColor:
                              LANGUAGE_COLORS[language.name] ?? "#22d3ee",
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="card flex h-full flex-col p-6">
                <h2 className="hud-label">// about this data</h2>
                <p className="mt-4 flex-1 text-[12.5px] leading-relaxed text-muted">
                  Counts cover public, non-fork, non-archived repositories owned by{" "}
                  {`@${profile.login}`}. Private work — CyberSentinel, DeWall, goPAM,
                  DragonFly, and the Atrios platform suite — is not visible here and is
                  documented instead as case studies.
                </p>
                <ul className="mt-4 grid gap-2 border-t border-border/60 pt-4 text-[11.5px] text-muted">
                  <li className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">▸</span>
                    Repository metadata refreshes hourly via the GitHub REST API.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">▸</span>
                    Forks and archived repositories are excluded from the counts.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">▸</span>
                    Enterprise and client platforms remain private; their engineering
                    stories live in the project case studies.
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/projects" className="btn btn-secondary btn-sm">
                    Private & enterprise work
                  </Link>
                  <a
                    href={`https://github.com/${profile.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    Profile ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Repos */}
        <section aria-labelledby="repos-heading" className="container-site pb-20">
          <Reveal>
            <h2
              id="repos-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              Repository explorer.
            </h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted">
              Search by name, language, or topic. Repositories link directly to GitHub.
            </p>
          </Reveal>
          <div className="mt-6">
            <GitHubRepos repos={data.repos} />
          </div>
        </section>

        <section className="container-site pb-20">
          <div className="holo-card flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Prefer the engineering story?
              </h2>
              <p className="mt-1 text-[13px] text-muted">
                Each significant repository is documented as a case study with
                architecture and contribution details.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/projects" className="btn btn-primary">
                Browse case studies
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
