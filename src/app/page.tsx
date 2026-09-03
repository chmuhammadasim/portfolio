import HomeClient, { GitHubStats } from "./HomeClient";

export const revalidate = 3600; // ISR: refresh GitHub stats hourly

type GitHubUserData = {
  public_repos?: number;
  followers?: number;
  created_at?: string;
};

type RepoData = {
  name: string;
  language?: string | null;
  fork?: boolean;
  html_url?: string;
};

type CommitWeek = { total?: number };

const USERNAME = "chmuhammadasim";

/**
 * Lightweight GitHub stats fetch. Every call is isolated so the
 * page always renders even if the API is unavailable.
 */
async function getGitHubStats(): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_API_GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Nextjs-Portfolio-Server",
  };
  if (token) headers.Authorization = `token ${token}`;

  const stats: GitHubStats = {
    repos: 0,
    followers: 0,
    totalCommits: 0,
    languages: 0,
    memberSince: "",
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    if (userRes.ok) {
      const user: GitHubUserData = await userRes.json();
      stats.repos = user.public_repos ?? 0;
      stats.followers = user.followers ?? 0;
      stats.memberSince = user.created_at ?? "";
    }

    if (reposRes.ok) {
      const repos: RepoData[] = await reposRes.json();
      const own = repos.filter((r) => !r.fork);
      const languages = new Set(
        own.filter((r) => r.language).map((r) => r.language as string)
      );
      stats.languages = languages.size;
    }

    // Best-effort commit totals across the top 5 repos.
    if (reposRes.ok) {
      const repos: RepoData[] = await reposRes.json();
      const own = repos.filter((r) => !r.fork).slice(0, 5);
      const results = await Promise.allSettled(
        own.map(async (repo) => {
          const res = await fetch(
            `https://api.github.com/repos/${USERNAME}/${repo.name}/stats/commit_activity`,
            { headers, next: { revalidate: 3600 } }
          );
          if (!res.ok) return 0;
          const weeks: CommitWeek[] = await res.json();
          return weeks.reduce((sum, w) => sum + (w.total ?? 0), 0);
        })
      );
      stats.totalCommits = results.reduce(
        (sum, r) => (r.status === "fulfilled" ? sum + r.value : sum),
        0
      );
    }
  } catch {
    // Keep defaults — stats are non-critical.
  }

  return stats;
}

export default async function Home() {
  const stats = await getGitHubStats();
  return <HomeClient stats={stats} />;
}
