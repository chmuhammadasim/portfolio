import PortfolioClient, { Repo, GitHubUser, Language } from "./PortfolioClient";

export const revalidate = 3600; // Cache and revalidate every hour (ISR)

type CommitActivity = {
  total: number;
  week: number;
  days: number[];
};

async function getGitHubData(): Promise<{
  repos: Repo[];
  user: GitHubUser | null;
  totalCommits: number;
  languages: Language;
  contributionData: number[];
}> {
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_API_GITHUB_TOKEN;
  const username = "chmuhammadasim";

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Nextjs-Portfolio-Server",
  };
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    // 1. Fetch user data (authenticated profile, or public fallback)
    const userUrl = token ? "https://api.github.com/user" : `https://api.github.com/users/${username}`;
    const userRes = await fetch(userUrl, { headers, next: { revalidate: 3600 } });
    const user: GitHubUser | null = userRes.ok ? await userRes.json() : null;
    if (!user) throw new Error("Failed to fetch user");

    // 2. Fetch repos data (authenticated list, or public fallback)
    const reposUrl = token
      ? "https://api.github.com/user/repos?per_page=100&sort=updated"
      : `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    const reposRes = await fetch(reposUrl, { headers, next: { revalidate: 3600 } });
    const repos: Repo[] = reposRes.ok ? await reposRes.json() : [];

    // Filter to repositories associated with this user
    const ownRepos = repos.filter(
      (repo) => repo.html_url.includes(`/${username}/`) || !repo.fork
    );

    // 3. Fetch languages for top 15 repositories to avoid rate limits
    const languages: Language = {};
    const languagePromises = ownRepos.slice(0, 15).map(async (repo: Repo) => {
      try {
        const langRes = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/languages`,
          { headers, next: { revalidate: 3600 } }
        );
        if (langRes.ok) {
          const repoLanguages = await langRes.json();
          Object.keys(repoLanguages).forEach((lang) => {
            languages[lang] = (languages[lang] || 0) + repoLanguages[lang];
          });
        }
      } catch {
        // Ignore single failures
      }
    });
    await Promise.allSettled(languagePromises);

    // 4. Calculate total commits (limit to first 10 repositories to stay safe under rate limits)
    let totalCommits = 0;
    const commitPromises = ownRepos.slice(0, 10).map(async (repo: Repo) => {
      try {
        const statsUrl = `https://api.github.com/repos/${username}/${repo.name}/stats/commit_activity`;
        const res = await fetch(statsUrl, { headers, next: { revalidate: 3600 } });
        if (res.status === 202) return 0;
        if (!res.ok) return 0;
        const stats: CommitActivity[] = await res.json();
        return Array.isArray(stats) ? stats.reduce((sum, week) => sum + week.total, 0) : 0;
      } catch {
        return 0;
      }
    });
    
    const commitCounts = await Promise.allSettled(commitPromises);
    commitCounts.forEach((res) => {
      if (res.status === "fulfilled") {
        totalCommits += res.value;
      }
    });

    // 5. Generate contribution heatmap dummy data
    const contributionData = Array.from({ length: 365 }, () =>
      Math.floor(Math.random() * 10)
    );

    return { repos: ownRepos, user, totalCommits, languages, contributionData };
  } catch (error) {
    console.error("Error fetching GitHub data on server:", error);
    return {
      repos: [],
      user: {
        login: username,
        name: "Muhammad Asim Chattha",
        bio: "Building secure, scalable digital infrastructure. Passionate about cybersecurity, AI, and low-level systems.",
        public_repos: 0,
        followers: 0,
        following: 0,
        avatar_url: "https://avatars.githubusercontent.com/chmuhammadasim",
        html_url: `https://github.com/chmuhammadasim`,
        location: "Pakistan",
        email: "muhammadasimchattha@gmail.com",
        company: null,
        blog: null,
        created_at: "",
      },
      totalCommits: 0,
      languages: {},
      contributionData: [],
    };
  }
}

export default async function Home() {
  const data = await getGitHubData();
  return (
    <PortfolioClient
      initialRepos={data.repos}
      initialUser={data.user}
      initialTotalCommits={data.totalCommits}
      initialLanguages={data.languages}
      initialContributionData={data.contributionData}
    />
  );
}
