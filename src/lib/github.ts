/**
 * Server-side GitHub data access.
 *
 * Uses the public REST API with a one-hour revalidation window and an
 * optional GITHUB_TOKEN for higher rate limits. Every failure path falls
 * back to curated repository metadata so pages always render — including
 * during builds without network access.
 */

import { SITE_URL } from "./site-data";

export type GitHubProfile = {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
};

export type GitHubRepo = {
  name: string;
  description: string;
  htmlUrl: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
  homepage: string;
  fork: boolean;
};

export type LanguageCount = {
  name: string;
  count: number;
  percent: number;
};

export type GitHubData = {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  languages: LanguageCount[];
  totals: {
    stars: number;
    forks: number;
    repos: number;
    followers: number;
    languages: number;
  };
  live: boolean;
  fetchedAt: string;
};

const USERNAME = "chmuhammadasim";

const FALLBACK_PROFILE: GitHubProfile = {
  login: USERNAME,
  name: "Muhammad Asim Chattha",
  avatarUrl: "https://github.com/chmuhammadasim.png",
  bio: "Software Developer · Cybersecurity · Secure Infrastructure",
  company: "IotaScales",
  location: "Islamabad, Pakistan",
  blog: SITE_URL,
  followers: 0,
  following: 0,
  publicRepos: 0,
  createdAt: "",
};

/** Curated public repositories used when the API is unavailable. */
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    name: "Civilex-next",
    description:
      "Judiciary case-management system for civil, criminal, and family court workflows in Pakistan.",
    htmlUrl: "https://github.com/chmuhammadasim/Civilex-next",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["nextjs", "supabase", "case-management"],
    homepage: "",
    fork: false,
  },
  {
    name: "Go_Temp",
    description:
      "Reusable Go backend template with auth, authorization, file management, audit logging, Redis, and Docker.",
    htmlUrl: "https://github.com/chmuhammadasim/Go_Temp",
    language: "Go",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["go", "gin", "gorm", "jwt"],
    homepage: "",
    fork: false,
  },
  {
    name: "Atrios-Authenticator",
    description:
      "Cross-platform TOTP authenticator app with QR code scanning and account management.",
    htmlUrl: "https://github.com/chmuhammadasim/Atrios-Authenticator",
    language: "Dart",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["flutter", "totp", "authenticator"],
    homepage: "",
    fork: false,
  },
  {
    name: "Computer-Networking-Project-Packet-Tracer",
    description:
      "Cisco Packet Tracer enterprise network simulation with VLANs, DHCP, routing, firewalling, and wireless.",
    htmlUrl:
      "https://github.com/chmuhammadasim/Computer-Networking-Project-Packet-Tracer",
    language: "",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["networking", "packet-tracer", "cisco"],
    homepage: "",
    fork: false,
  },
  {
    name: "portfolio",
    description:
      "Personal portfolio and technical showcase built with Next.js and TypeScript.",
    htmlUrl: "https://github.com/chmuhammadasim/portfolio",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["nextjs", "portfolio"],
    homepage: SITE_URL,
    fork: false,
  },
  {
    name: "MERN-S3Bucket-MiniApp",
    description:
      "Image upload mini app storing files in AWS S3 with a MongoDB-backed gallery.",
    htmlUrl: "https://github.com/chmuhammadasim/MERN-S3Bucket-MiniApp",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["mern", "aws-s3", "react"],
    homepage: "",
    fork: false,
  },
  {
    name: "Discord-App-Block-Chain",
    description:
      "Blockchain-based communication DApp with Solidity contracts, Ethers.js, and real-time messaging.",
    htmlUrl: "https://github.com/chmuhammadasim/Discord-App-Block-Chain",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["solidity", "ethereum", "react"],
    homepage: "",
    fork: false,
  },
  {
    name: "Block-Chain-NFT-Market",
    description:
      "Decentralized NFT marketplace with Solidity ownership and royalty contracts.",
    htmlUrl: "https://github.com/chmuhammadasim/Block-Chain-NFT-Market",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["solidity", "nft", "web3"],
    homepage: "",
    fork: false,
  },
  {
    name: "MERN-CRUD",
    description: "Full-stack MERN example for create, read, update, and delete flows.",
    htmlUrl: "https://github.com/chmuhammadasim/MERN-CRUD",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: "",
    topics: ["mern", "crud"],
    homepage: "",
    fork: false,
  },
];

type ApiUser = {
  login?: string;
  name?: string | null;
  avatar_url?: string;
  bio?: string | null;
  company?: string | null;
  location?: string | null;
  blog?: string | null;
  followers?: number;
  following?: number;
  public_repos?: number;
  created_at?: string;
};

type ApiRepo = {
  name?: string;
  description?: string | null;
  html_url?: string;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
  topics?: string[];
  homepage?: string | null;
  fork?: boolean;
  archived?: boolean;
};

function headers(): Record<string, string> {
  const token =
    process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_API_GITHUB_TOKEN;
  const base: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "muhammadasim-portfolio",
  };
  if (token) base.Authorization = `token ${token}`;
  return base;
}

function toRepo(repo: ApiRepo): GitHubRepo {
  return {
    name: repo.name ?? "repository",
    description: repo.description ?? "",
    htmlUrl: repo.html_url ?? `https://github.com/${USERNAME}`,
    language: repo.language ?? "",
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    updatedAt: repo.updated_at ?? "",
    topics: repo.topics ?? [],
    homepage: repo.homepage ?? "",
    fork: Boolean(repo.fork),
  };
}

function buildLanguages(repos: GitHubRepo[]): LanguageCount[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0) || 1;
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export async function getGitHubData(): Promise<GitHubData> {
  const fallback: GitHubData = {
    profile: FALLBACK_PROFILE,
    repos: FALLBACK_REPOS,
    languages: buildLanguages(FALLBACK_REPOS),
    totals: {
      stars: 0,
      forks: 0,
      repos: 0,
      followers: 0,
      languages: buildLanguages(FALLBACK_REPOS).length,
    },
    live: false,
    fetchedAt: "",
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: headers(),
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
        { headers: headers(), next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return fallback;

    const user = (await userRes.json()) as ApiUser;
    const rawRepos = (await reposRes.json()) as ApiRepo[];

    if (!Array.isArray(rawRepos)) return fallback;

    const repos = rawRepos
      .filter((repo) => !repo.fork && !repo.archived)
      .map(toRepo)
      .sort((a, b) => {
        if (b.stars !== a.stars) return b.stars - a.stars;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });

    const profile: GitHubProfile = {
      login: user.login ?? USERNAME,
      name: user.name ?? FALLBACK_PROFILE.name,
      avatarUrl: user.avatar_url ?? FALLBACK_PROFILE.avatarUrl,
      bio: user.bio ?? FALLBACK_PROFILE.bio,
      company: user.company ?? FALLBACK_PROFILE.company,
      location: user.location ?? FALLBACK_PROFILE.location,
      blog: user.blog ?? FALLBACK_PROFILE.blog,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      publicRepos: user.public_repos ?? repos.length,
      createdAt: user.created_at ?? "",
    };

    const languages = buildLanguages(repos);

    return {
      profile,
      repos,
      languages,
      totals: {
        stars: repos.reduce((sum, repo) => sum + repo.stars, 0),
        forks: repos.reduce((sum, repo) => sum + repo.forks, 0),
        repos: repos.length,
        followers: profile.followers,
        languages: languages.length,
      },
      live: true,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return fallback;
  }
}

/** Lightweight totals for the homepage hero and stats strip. */
export type GitHubStats = GitHubData["totals"] & {
  live: boolean;
  memberSince: string;
};

export async function getGitHubStats(): Promise<GitHubStats> {
  const data = await getGitHubData();
  return {
    ...data.totals,
    live: data.live,
    memberSince: data.profile.createdAt,
  };
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Dart: "#00b4ab",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  Solidity: "#AA6746",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Astro: "#ff5a03",
};
