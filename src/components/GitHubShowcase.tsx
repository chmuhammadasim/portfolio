import Link from "next/link";
import Reveal from "./Reveal";
import { LANGUAGE_COLORS, type GitHubData } from "@/lib/github";

function formatMonth(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

export default function GitHubShowcase({ data }: { data: GitHubData }) {
  const topRepos = data.repos.slice(0, 4);
  const topLanguages = data.languages.slice(0, 5);

  const stats = [
    { label: "Public repositories", value: data.live ? data.totals.repos : "—" },
    { label: "Stars earned", value: data.live ? data.totals.stars : "—" },
    { label: "Followers", value: data.live ? data.totals.followers : "—" },
    { label: "Languages", value: data.live ? data.totals.languages : "—" },
  ];

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="section-pad relative overflow-hidden"
    >
      <div className="container-site relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">05</span> // GitHub telemetry
            </p>
            <h2
              id="github-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Built in public.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
              Live repository data from{" "}
              <a
                href="https://github.com/chmuhammadasim"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-accent"
              >
                github.com/chmuhammadasim
              </a>{" "}
              — refreshed hourly, with a curated fallback when the API is unavailable.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-wrap gap-2">
              <Link href="/github" className="btn btn-secondary">
                Repository explorer
              </Link>
              <a
                href="https://github.com/chmuhammadasim?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
          {/* Stats + languages */}
          <Reveal className="min-w-0">
            <div className="holo-card h-full p-6 md:p-8">
              <div className="flex items-center justify-between">
                <h3 className="hud-label">// account signal</h3>
                <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      data.live ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                    aria-hidden="true"
                  />
                  {data.live ? "live · revalidate 1h" : "curated fallback"}
                </span>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="border border-border/70 bg-surface/50 p-4">
                    <dd className="stat-value">{stat.value}</dd>
                    <dt className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <h4 className="hud-label">// language distribution</h4>
                <ul className="mt-3 grid gap-2.5">
                  {topLanguages.map((language) => (
                    <li key={language.name}>
                      <div className="flex items-center justify-between font-mono text-[10px] text-muted">
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
                        <span>{language.count} repos</span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border/50">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(4, (language.count / (topLanguages[0]?.count || 1)) * 100)}%`,
                            backgroundColor:
                              LANGUAGE_COLORS[language.name] ?? "#22d3ee",
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Repo cards */}
          <div className="grid min-w-0 gap-3">
            {topRepos.map((repo, index) => (
              <Reveal key={repo.name} delay={index * 50} className="min-w-0">
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex h-full min-w-0 items-start gap-4 p-5"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-surface-raised font-mono text-[10px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="min-w-0 truncate font-mono text-sm font-semibold text-foreground">
                        {repo.name}
                      </h3>
                      <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-muted">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="m12 2 2.9 6.3 6.9.9-5 4.8 1.3 6.8L12 17.6 5.9 20.8 7.2 14l-5-4.8 6.9-.9L12 2Z" />
                        </svg>
                        {repo.stars}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-muted">
                      {repo.description || "Repository details available on GitHub."}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                      {repo.language && (
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              backgroundColor:
                                LANGUAGE_COLORS[repo.language] ?? "#6c7f99",
                            }}
                            aria-hidden="true"
                          />
                          {repo.language}
                        </span>
                      )}
                      <span>updated {formatMonth(repo.updatedAt)}</span>
                    </div>
                  </div>
                  <svg
                    className="mt-1 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
