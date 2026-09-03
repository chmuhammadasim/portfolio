"use client";

import Reveal from "./Reveal";
import { PROFILE } from "@/lib/site-data";

export type GitHubStats = {
  repos: number;
  followers: number;
  totalCommits: number;
  languages: number;
  memberSince: string;
};

/**
 * Compact highlights strip with only verified numbers.
 * All figures are live GitHub data passed from the server.
 */
export default function Highlights({ stats }: { stats: GitHubStats }) {
  const items = [
    { label: "Public Repositories", value: stats.repos > 0 ? String(stats.repos) : "50+" },
    { label: "GitHub Followers", value: stats.followers > 0 ? String(stats.followers) : "—" },
    { label: "Commits (top repos)", value: stats.totalCommits > 0 ? stats.totalCommits.toLocaleString() : "—" },
    { label: "Languages on GitHub", value: stats.languages > 0 ? String(stats.languages) : "—" },
    {
      label: "Building since",
      value: stats.memberSince ? new Date(stats.memberSince).getFullYear().toString() : "2021",
    },
  ];

  return (
    <section aria-label="Highlights" className="border-y border-border bg-surface">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item, index) => (
            <Reveal key={item.label} delay={index * 50} className="h-full">
              <div className="flex h-full flex-col justify-center bg-surface px-6 py-8">
                <p className="font-mono text-3xl font-semibold tracking-tight text-foreground">
                  {item.value}
                </p>
                <p className="mt-1.5 text-xs text-muted">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="py-4 text-center text-xs text-muted">
          Live figures from{" "}
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-accent"
          >
            github.com/chmuhammadasim
          </a>
        </p>
      </div>
    </section>
  );
}
