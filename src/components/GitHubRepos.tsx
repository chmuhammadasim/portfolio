"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { LANGUAGE_COLORS, type GitHubRepo } from "@/lib/github";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatMonth(iso: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

type SortMode = "stars" | "updated" | "name";

export default function GitHubRepos({ repos }: { repos: GitHubRepo[] }) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState<SortMode>("updated");

  const languages = useMemo(() => {
    const set = new Set(repos.map((repo) => repo.language).filter(Boolean));
    return Array.from(set).sort();
  }, [repos]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return repos
      .filter((repo) => {
        const matchesLanguage =
          language === "all" || repo.language === language;
        if (!matchesLanguage) return false;
        if (!term) return true;
        return (
          repo.name.toLowerCase().includes(term) ||
          repo.description.toLowerCase().includes(term) ||
          repo.language.toLowerCase().includes(term) ||
          repo.topics.some((topic) => topic.toLowerCase().includes(term))
        );
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "stars") {
          if (b.stars !== a.stars) return b.stars - a.stars;
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        }
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
  }, [repos, query, language, sort]);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-1 border-y border-border bg-background/85 px-1 py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="repo-search" className="sr-only">
              Search repositories
            </label>
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="repo-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search repositories…"
              className="search-input !pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor="repo-language"
              className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint"
            >
              language
            </label>
            <select
              id="repo-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] text-secondary focus:border-accent focus:outline-none"
            >
              <option value="all">All</option>
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label
              htmlFor="repo-sort"
              className="ml-2 font-mono text-[9px] uppercase tracking-[0.14em] text-faint"
            >
              sort
            </label>
            <select
              id="repo-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="rounded border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] text-secondary focus:border-accent focus:outline-none"
            >
              <option value="updated">Updated</option>
              <option value="stars">Stars</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          aria-live="polite"
        >
          {results.length.toString().padStart(2, "0")} repositories
        </p>
        {(query || language !== "all") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLanguage("all");
            }}
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent hover:text-accent-strong"
          >
            reset filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 rounded border border-border bg-surface px-6 py-16 text-center">
          <p className="text-lg font-medium text-foreground">No repositories found</p>
          <p className="mt-2 text-sm text-muted">
            Try a different language or search term.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((repo, index) => (
            <Reveal key={repo.name} delay={(index % 3) * 40}>
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="break-words font-mono text-[13.5px] font-semibold leading-snug text-foreground">
                    {repo.name}
                  </h2>
                  <svg
                    className="mt-0.5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
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
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </div>
                <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-muted">
                  {repo.description || "No description provided."}
                </p>

                {repo.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-sm border border-border bg-surface-raised px-1.5 py-0.5 font-mono text-[8px] text-faint"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
                  <div className="flex items-center gap-3">
                    {repo.language ? (
                      <span className="inline-flex items-center gap-1.5 text-secondary">
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
                    ) : (
                      <span>—</span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="m12 2 2.9 6.3 6.9.9-5 4.8 1.3 6.8L12 17.6 5.9 20.8 7.2 14l-5-4.8 6.9-.9L12 2Z" />
                      </svg>
                      {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="6" cy="5" r="2.5" />
                        <circle cx="18" cy="5" r="2.5" />
                        <circle cx="12" cy="19" r="2.5" />
                        <path d="M6 7.5v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-2M12 12.5v4" />
                      </svg>
                      {repo.forks}
                    </span>
                  </div>
                  <span>updated {formatMonth(repo.updatedAt)}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
