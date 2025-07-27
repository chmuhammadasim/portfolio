"use client";
import { useState } from "react";
type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  created_at: string;
  size: number;
  default_branch: string;
};

type GitHubUser = {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  location: string;
  email: string | null;
};

type CommitActivity = {
  total: number;
  week: number;
  days: number[];
};

async function getGitHubData(): Promise<{
  repos: Repo[];
  user: GitHubUser | null;
  totalCommits: number;
}> {
  const token = process.env.NEXT_PUBLIC_API_GITHUB_TOKEN;

  try {
    // Fetch user info
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json",
      },
    });
    const user: GitHubUser | null = userRes.ok ? await userRes.json() : null;
    if (!user) throw new Error("Failed to fetch user");

    // Fetch repos
    const reposRes = await fetch(
      `https://api.github.com/user/repos?per_page=50&sort=updated`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const repos: Repo[] = reposRes.ok ? await reposRes.json() : [];

    // Fetch commit stats
    let totalCommits = 0;
    const commitPromises = repos.map(async (repo: Repo) => {
      const statsUrl = `https://api.github.com/repos/${user.login}/${repo.name}/stats/commit_activity`;
      const res = await fetch(statsUrl, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (res.status === 202) return 0;
      if (!res.ok) return 0;

      const stats: CommitActivity[] = await res.json();
      return stats.reduce((sum, week) => sum + week.total, 0);
    });

    const commitCounts = await Promise.all(commitPromises);
    totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);

    // Generate mock contribution data (52 weeks)

    return { repos, user, totalCommits };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return { repos: [], user: null, totalCommits: 0 };
  }
}
const ITEMS_PER_PAGE = 6;

import { useEffect } from "react";

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const { repos, user, totalCommits } = await getGitHubData();
      setRepos(repos);
      setUser(user);
      setTotalCommits(totalCommits);
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE);
  const paginatedRepos = repos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white font-inter antialiased">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user?.name || "Muhammad Asim Chattha"}
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              {["About", "Projects", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-blue-400 transition-all duration-300 relative group font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="text-slate-300 hover:text-blue-400 transition-colors"
                title="Open mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 relative border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-xl shadow-inner">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-slate-900/40 to-slate-800/30" />

        <div className="relative max-w-6xl mx-auto z-10">
          <div className="text-center mb-16">
            {/* Name and Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                {user?.name || "Muhammad Asim Chattha"}
              </span>
            </h1>

            <div className="text-xl sm:text-2xl text-slate-300 font-medium mb-6">
              <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                Full Stack Developer • Blockchain Enthusiast • Backend
                Specialist
              </span>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
              {user?.bio ||
                "Passionate about creating innovative digital solutions that push the boundaries of technology and deliver exceptional user experiences."}
            </p>

            {/* Location + Email */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400 mb-12 text-sm sm:text-base">
              {user?.location && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {user.location}
                </div>
              )}
              {user?.email && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {user.email}
                </div>
              )}
            </div>
          </div>

          {/* GitHub Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 max-w-4xl mx-auto">
            {[
              {
                label: "Repositories",
                value: user?.public_repos || 0,
                color: "blue",
              },
              {
                label: "Followers",
                value: user?.followers || 0,
                color: "purple",
              },
              { label: "Total Commits", value: totalCommits, color: "cyan" },
              {
                label: "Following",
                value: user?.following || 0,
                color: "emerald",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-5 sm:p-6 hover:border-blue-500/50 hover:scale-105 transition-all duration-300 shadow-md"
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold text-${stat.color}-400 mb-1`}
                >
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <a
              href="/Asim_SE_CV.pdf"
              download
              className="w-full sm:w-auto group px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </span>
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 border-2 border-blue-500/50 text-blue-400 rounded-xl font-semibold hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300"
            >
              View Projects
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center items-center gap-6">
            {[
              {
                href: user?.html_url || "https://github.com/chmuhammadasim",
                icon: "github",
                label: "GitHub",
              },
              {
                href: "https://linkedin.com/in/muhammad-asim-chattha",
                icon: "linkedin",
                label: "LinkedIn",
              },
              {
                href: "https://twitter.com/_car6on_",
                icon: "twitter",
                label: "Twitter",
              },
              {
                href: `mailto:${
                  user?.email || "muhammadasimchattha@gmail.com"
                }`,
                icon: "email",
                label: "Email",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-3 bg-slate-900/50 border border-slate-800/50 rounded-xl text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {social.icon === "github" && (
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  )}
                  {social.icon === "linkedin" && (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  )}
                  {social.icon === "twitter" && (
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  )}
                  {social.icon === "email" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative py-20 sm:py-28 bg-slate-900/40 backdrop-blur-md border-y border-slate-800 shadow-inner"
      >
        {/* Optional section frame (adds glowing border) */}
        <div className="absolute inset-0 border border-slate-700/40 rounded-[2rem] pointer-events-none z-0" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 rounded-3xl bg-slate-900/30 border border-slate-800/60 shadow-xl backdrop-blur-lg p-10 sm:p-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-16 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column */}
            <div className="space-y-7 text-lg leading-relaxed text-slate-300">
              <p>
                I am a visionary software engineer focused on building
                tomorrow’s digital infrastructure today. From smart contract
                systems to real-time applications, I create scalable and
                intelligent solutions.
              </p>
              <p>
                Passionate about pushing tech boundaries, I actively contribute
                to open-source innovation and mentor aspiring developers
                worldwide.
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Node.js",
                  "Express",
                  "Solidity",
                  "Angular",
                  "Dart",
                  "Flutter",
                  "Firebase",
                  "MongoDB",
                  "MySQL",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/60 rounded-full text-sm text-slate-300 hover:border-blue-500/50 hover:text-blue-400 hover:shadow-[0_0_8px_#3b82f6] transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Skill Bars */}
            <div className="space-y-6">
              {[
                { skill: "Frontend Development", percentage: 85 },
                { skill: "Backend Architecture", percentage: 90 },
                { skill: "Blockchain Development", percentage: 80 },
                { skill: "Mobile Development", percentage: 75 },
              ].map(({ skill, percentage }) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">{skill}</span>
                    <span className="text-blue-400 font-semibold">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden shadow-inner border border-slate-700/50">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
 <section id="projects" className="py-16 sm:py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-white">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        {repos.length === 0 ? (
          <div className="col-span-full text-center text-slate-400 py-20">
            <div className="text-6xl mb-4 animate-pulse">🔍</div>
            <div className="text-xl">No repositories found or API error.</div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.03] shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-400 group-hover:text-blue-300 transition-colors truncate">
                      {repo.name}
                    </h3>
                    <svg
                      className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>

                  <p className="text-slate-400 mb-4 line-clamp-3">
                    {repo.description || "No description available"}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {repo.language && (
                        <span className="px-2 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-xs text-blue-300">
                          {repo.language}
                        </span>
                      )}
                      <span className="text-xs text-slate-500">
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        ⭐ {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        🍴 {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10 gap-4 items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium bg-slate-800 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 transition"
              >
                Prev
              </button>

              <div className="text-white text-sm">
                Page <strong>{currentPage}</strong> of {totalPages}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium bg-slate-800 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-24 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Expertise
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚛️",
                title: "Frontend",
                skills: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Material UI",
                  "Bootstrap",
                  "HTML/CSS"
                ],
                color: "blue",
              },
              {
                icon: "⚡",
                title: "Backend",
                skills: ["Node.js", "Express", "MongoDB", "Firebase", "MySQL"],
                color: "purple",
              },
              {
                icon: "📱",
                title: "Mobile",
                skills: ["Flutter", "Dart"],
                color: "cyan",
              },
              {
                icon: "🔗",
                title: "Blockchain",
                skills: [
                  "Solidity",
                  "Ethereum",
                  "Web3.js",
                  "Smart Contracts",
                  "DeFi",
                  "NFTs",
                  "Blockchain",
                ],
                color: "green",
              },
              {
                icon: "☁️",
                title: "Cloud & DevOps",
                skills: ["Render", "Vercel", "PM2", "CI/CD", "Nginx", "Docker"],
                color: "indigo",
              },
              {
                icon: "🛠️",
                title: "Tools",
                skills: ["Git", "VS Code", "Postman", "GitHub Desktop"],
                color: "pink",
              },
            ].map((category) => (
              <div
                key={category.title}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-3xl mb-4 text-center">{category.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-4 text-blue-400">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let&apos;s Build Something Amazing
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to collaborate on groundbreaking projects? Let&apos;s connect
            and create the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${user?.email || "muhammadasimchattha@gmail.com"}`}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </a>
            <a
              href={user?.html_url || "https://github.com/chmuhammadasim"}
              className="px-8 py-4 border border-blue-500/50 rounded-xl font-semibold hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800/50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            &copy; 2024 {user?.name || "Muhammad Asim Chattha"}. Built with
            passion and precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
