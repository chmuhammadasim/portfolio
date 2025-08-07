"use client";
import { useState, useEffect } from "react";

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
  topics: string[];
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
  company: string | null;
  blog: string | null;
  created_at: string;
};

type CommitActivity = {
  total: number;
  week: number;
  days: number[];
};

type Language = {
  [key: string]: number;
};

async function getGitHubData(): Promise<{
  repos: Repo[];
  user: GitHubUser | null;
  totalCommits: number;
  languages: Language;
  contributionData: number[];
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
      `https://api.github.com/user/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const repos: Repo[] = reposRes.ok ? await reposRes.json() : [];

    // Fetch languages data
    const languages: Language = {};
    const languagePromises = repos.map(async (repo: Repo) => {
      const langRes = await fetch(
        `https://api.github.com/repos/${user.login}/${repo.name}/languages`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
      
      if (langRes.ok) {
        const repoLanguages = await langRes.json();
        Object.keys(repoLanguages).forEach(lang => {
          languages[lang] = (languages[lang] || 0) + repoLanguages[lang];
        });
      }
    });

    await Promise.allSettled(languagePromises);

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

    // Generate contribution heatmap data (52 weeks of mock data)
    const contributionData = Array.from({ length: 365 }, () => 
      Math.floor(Math.random() * 10)
    );

    return { repos, user, totalCommits, languages, contributionData };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return { repos: [], user: null, totalCommits: 0, languages: {}, contributionData: [] };
  }
}

const ITEMS_PER_PAGE = 9;

const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Solidity: "#AA6746",
  Dart: "#00B4AB",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
};

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [languages, setLanguages] = useState<Language>({});
  const [contributionData, setContributionData] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");

  useEffect(() => {
    async function fetchData() {
      const { repos, user, totalCommits, languages, contributionData } = await getGitHubData();
      setRepos(repos);
      setFilteredRepos(repos);
      setUser(user);
      setTotalCommits(totalCommits);
      setLanguages(languages);
      setContributionData(contributionData);
    }
    fetchData();
  }, []);

  // Filter and sort repos
  useEffect(() => {
    const filtered = repos.filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLanguage === "All" || repo.language === selectedLanguage)
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "name":
          return a.name.localeCompare(b.name);
        case "updated":
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    setFilteredRepos(filtered);
    setCurrentPage(1);
  }, [repos, searchTerm, selectedLanguage, sortBy]);

  const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE);
  const paginatedRepos = filteredRepos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  // Get top languages
  const topLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6);

  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  // Contribution heatmap component
  const ContributionHeatmap = () => {
    const weeks = Math.ceil(contributionData.length / 7);
    
    return (
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Contribution Activity</h3>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {Array.from({ length: weeks }, (_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dataIndex = weekIndex * 7 + dayIndex;
                const value = contributionData[dataIndex] || 0;
                const intensity = value === 0 ? 0 : Math.ceil((value / 10) * 4);
                
                return (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${
                      intensity === 0 ? 'bg-slate-800' :
                      intensity === 1 ? 'bg-green-900' :
                      intensity === 2 ? 'bg-green-700' :
                      intensity === 3 ? 'bg-green-500' : 'bg-green-400'
                    }`}
                    title={`${value} contributions`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${
                  level === 0 ? 'bg-slate-800' :
                  level === 1 ? 'bg-green-900' :
                  level === 2 ? 'bg-green-700' :
                  level === 3 ? 'bg-green-500' : 'bg-green-400'
                }`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white font-inter antialiased">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Navigation - Enhanced */}
      <nav className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {user?.avatar_url && (
                <img 
                  src={user.avatar_url} 
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500/50"
                />
              )}
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user?.name || "Muhammad Asim Chattha"}
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              {["About", "Projects", "Activity", "Contact"].map((item) => (
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
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              {user?.avatar_url && (
                <img 
                  src={user.avatar_url} 
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-500/50 shadow-2xl"
                />
              )}
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                {user?.name || "Muhammad Asim Chattha"}
              </span>
            </h1>

            <div className="text-xl sm:text-2xl text-slate-300 font-medium mb-6">
              <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                @{user?.login || "chmuhammadasim"} • Full Stack Developer
              </span>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
              {user?.bio || "Passionate about creating innovative digital solutions that push the boundaries of technology."}
            </p>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-16 max-w-5xl mx-auto">
              {[
                { label: "Repositories", value: user?.public_repos || 0, icon: "📚", color: "blue" },
                { label: "Followers", value: user?.followers || 0, icon: "👥", color: "purple" },
                { label: "Following", value: user?.following || 0, icon: "👤", color: "emerald" },
                { label: "Total Commits", value: totalCommits, icon: "💻", color: "cyan" },
                { label: "Languages", value: Object.keys(languages).length, icon: "🔧", color: "pink" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 hover:border-blue-500/50 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-2xl sm:text-3xl font-bold text-${stat.color}-400 mb-1`}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-20 sm:py-28 bg-slate-900/40 backdrop-blur-md border-y border-slate-800 shadow-inner">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 rounded-3xl bg-slate-900/30 border border-slate-800/60 shadow-xl backdrop-blur-lg p-10 sm:p-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-16 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-7 text-lg leading-relaxed text-slate-300">
              <p>
                I am a visionary software engineer focused on building tomorrows digital infrastructure today. 
                From smart contract systems to real-time applications, I create scalable and intelligent solutions.
              </p>
              <p>
                Passionate about pushing tech boundaries, I actively contribute to open-source innovation 
                and mentor aspiring developers worldwide.
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {Object.keys(languages).slice(0, 10).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/60 rounded-full text-sm text-slate-300 hover:border-blue-500/50 hover:text-blue-400 hover:shadow-[0_0_8px_#3b82f6] transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

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
                    <span className="text-blue-400 font-semibold">{percentage}%</span>
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


      {/* Enhanced Projects Section */}
      <section id="projects" className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                aria-label="Filter repositories by programming language"
              >
                <option value="All">All Languages</option>
                {Object.keys(languages).map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "updated" | "stars" | "name")}
              className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              aria-label="Sort repositories by criteria"
            >
            
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="name">Name</option>
            </select>
          </div>

          {filteredRepos.length === 0 ? (
            <div className="text-center text-slate-400 py-20">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-xl">No repositories found.</div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="group bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                        {repo.name}
                      </h3>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-blue-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                    <p className="text-slate-400 mb-4 text-sm line-clamp-3 min-h-[60px]">
                      {repo.description || "No description available"}
                    </p>

                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-xs text-blue-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        {repo.language && (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: languageColors[repo.language] || "#64748b" }}
                            />
                            <span className="text-xs text-slate-300">{repo.language}</span>
                          </div>
                        )}
                        <span className="text-xs text-slate-500">
                          Updated {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {repo.forks_count}
                          </span>
                          {repo.open_issues_count > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              {repo.open_issues_count}
                            </span>
                          )}
                        </div>
                        <span className="text-slate-500">
                          {(repo.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-center mt-12 gap-3 sm:gap-2 items-center">
                  {/* Mobile: Show compact navigation */}
                  <div className="flex sm:hidden items-center gap-2 text-sm text-slate-400">
                  <span>Page {currentPage} of {totalPages}</span>
                  </div>
                  
                  {/* Mobile: Previous/Next buttons */}
                  <div className="flex sm:hidden gap-2 w-full max-w-xs"></div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium bg-slate-800 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Prev
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                            currentPage === pageNum
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-800 text-white hover:bg-blue-500'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium bg-slate-800 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                  
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium bg-slate-800 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Last
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Activity Section */}
      <section id="activity" className="py-16 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GitHub Activity
            </span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Account Info</h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex justify-between">
                  <span>Member since:</span>
                  <span>{user?.created_at ? new Date(user.created_at).getFullYear() : 'N/A'}</span>
                </div>
                {user?.company && (
                  <div className="flex justify-between">
                    <span>Company:</span>
                    <span>{user.company}</span>
                  </div>
                )}
                {user?.blog && (
                  <div className="flex justify-between">
                    <span>Website:</span>
                    <a href={user.blog} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                      {user.blog}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Most Used Language:</span>
                  <span className="text-blue-400 font-medium">
                    {topLanguages[0]?.[0] || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Average Stars per Repo:</span>
                  <span className="text-purple-400 font-medium">
                    {repos.length > 0 ? (repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) / repos.length).toFixed(1) : '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Repository Size:</span>
                  <span className="text-cyan-400 font-medium">
                    {(repos.reduce((sum, repo) => sum + repo.size, 0) / 1024).toFixed(1)} MB
                  </span>
                </div>
              </div>
            </div>
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
            Ready to collaborate on groundbreaking projects? Let&apos;s connect and create the future together.
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
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800/50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            &copy; 2024 {user?.name || "Muhammad Asim Chattha"}. Built with passion and precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
