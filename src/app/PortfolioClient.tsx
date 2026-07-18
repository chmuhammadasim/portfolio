"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export type Repo = {
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
  fork: boolean;
};

export type GitHubUser = {
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

export type Language = {
  [key: string]: number;
};

const backendSkills = [
  { name: "Node.js / Express", icon: "🟢", level: 92, color: "from-green-400 to-emerald-500" },
  { name: "Python / Flask / FastAPI", icon: "🐍", level: 88, color: "from-yellow-400 to-amber-500" },
  { name: "Go (Golang)", icon: "🔵", level: 78, color: "from-cyan-400 to-blue-500" },
  { name: "Linux / Shell Scripting", icon: "🐧", level: 90, color: "from-gray-400 to-slate-500" },
  { name: "REST / GraphQL APIs", icon: "🔗", level: 91, color: "from-purple-400 to-pink-500" },
];

const frontendSkills = [
  { name: "React / Next.js", icon: "⚛️", level: 94, color: "from-cyan-400 to-blue-500" },
  { name: "Angular (MEAN Stack)", icon: "🅰️", level: 80, color: "from-red-400 to-rose-500" },
  { name: "TypeScript", icon: "💎", level: 90, color: "from-blue-400 to-indigo-500" },
  { name: "Tailwind CSS / SCSS", icon: "🎨", level: 88, color: "from-teal-400 to-cyan-500" },
  { name: "Vue.js / Nuxt", icon: "💚", level: 75, color: "from-emerald-400 to-green-500" },
  { name: "HTML5 / CSS3 / JS", icon: "🌐", level: 96, color: "from-orange-400 to-amber-500" },
];

const toolsDevOpsSkills = [
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MySQL", icon: "🐬" },
  { name: "Redis", icon: "🔴" },
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "Git / GitHub", icon: "📦" },
  { name: "AWS / Azure", icon: "☁️" },
  { name: "CI/CD Pipelines", icon: "🔄" },
  { name: "Nginx / Apache", icon: "🌩️" },
  { name: "WebSockets", icon: "📡" },
  { name: "Microservices", icon: "🔧" },
];

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

/* ── Matrix Rain Effect ── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｵｸ10";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="matrix-bg" />;
}

/* ── Terminal Typing Effect ── */
function useTypingEffect(texts: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setDisplayText(currentText.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentText.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

type PortfolioClientProps = {
  initialRepos: Repo[];
  initialUser: GitHubUser | null;
  initialTotalCommits: number;
  initialLanguages: Language;
  initialContributionData: number[];
};

export default function PortfolioClient({
  initialRepos,
  initialUser,
  initialTotalCommits,
  initialLanguages,
  initialContributionData,
}: PortfolioClientProps) {
  const [repos] = useState<Repo[]>(initialRepos);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>(initialRepos);
  const [user] = useState<GitHubUser | null>(initialUser);
  const [totalCommits] = useState<number>(initialTotalCommits);
  const [languages] = useState<Language>(initialLanguages);
  const [contributionData] = useState<number[]>(initialContributionData);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const typedRole = useTypingEffect([
    "Full Stack Developer",
    "Cybersecurity Enthusiast",
    "Open Source Contributor",
    "AI / ML Explorer",
    "OS & Kernel Hacker",
    "Blockchain Builder",
  ]);

  useEffect(() => {
    const filtered = repos.filter(
      (repo) =>
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

  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans antialiased relative">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Scanline overlay */}
      <div className="scanlines" />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full animate-pulse" />
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full animate-pulse" />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-emerald-900/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {user?.avatar_url && (
                <Image
                  src={user.avatar_url}
                  alt="Muhammad Asim Chattha — Profile"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full border border-emerald-500/40 neon-glow-green"
                />
              )}
              <span className="text-lg font-bold font-mono text-[#00ff41]">
                <span className="text-[#00d4ff]">&gt;</span> asim<span className="text-gray-500">@</span>portfolio
                <span className="animate-blink text-[#00ff41]">_</span>
              </span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { label: "Home", href: "#" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Activity", href: "#activity" },
                { label: "Blogs", href: "/blogs" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-mono rounded-lg transition-all duration-300 ${
                    item.label === "Blogs"
                      ? "text-[#00d4ff] hover:text-[#00ff41] hover:bg-emerald-950/30 border border-[#00d4ff]/30 hover:border-[#00ff41]/50"
                      : "text-gray-400 hover:text-[#00ff41] hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#00ff41] p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-800/50 mt-2 pt-3">
              {["Home", "Skills", "Projects", "Activity", "Blogs", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Blogs" ? "/blogs" : `#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-mono text-gray-400 hover:text-[#00ff41] hover:bg-gray-800/30 rounded-lg transition-colors"
                >
                  <span className="text-[#00d4ff]">&gt;</span> {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero / Terminal Section ── */}
      <section className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Avatar */}
            <div className="flex justify-center mb-8">
              {user?.avatar_url && (
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#00d4ff]/20 blur-xl animate-pulse" />
                  <Image
                    src={user.avatar_url}
                    alt="Muhammad Asim Chattha — Profile"
                    width={112}
                    height={112}
                    className="relative w-28 h-28 rounded-full border-2 border-[#00d4ff]/50 neon-glow-blue"
                  />
                </div>
              )}
            </div>

            {/* Terminal window */}
            <div className="max-w-2xl mx-auto mb-10 bg-[#0d1117] border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl neon-glow-green">
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/80 border-b border-gray-700/50">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs font-mono text-gray-500">terminal — asim@root:~</span>
              </div>
              {/* Terminal body */}
              <div className="p-5 text-left font-mono text-sm sm:text-base space-y-1.5">
                <p>
                  <span className="text-[#00ff41]">$</span>{" "}
                  <span className="text-gray-300">whoami</span>
                </p>
                <h1 className="text-[#00d4ff] ml-4 text-sm sm:text-base font-mono font-bold">
                  {user?.name || "Muhammad Asim Chattha"}
                </h1>
                <p className="mt-3">
                  <span className="text-[#00ff41]">$</span>{" "}
                  <span className="text-gray-300">cat /etc/role.txt</span>
                </p>
                <p className="text-emerald-400 ml-4">
                  {typedRole}
                  <span className="animate-blink text-[#00ff41]">█</span>
                </p>
                <p className="mt-3">
                  <span className="text-[#00ff41]">$</span>{" "}
                  <span className="text-gray-300">cat /etc/bio</span>
                </p>
                <p className="text-gray-400 ml-4 leading-relaxed">
                  {user?.bio ||
                    "Building secure, scalable digital infrastructure. Passionate about cybersecurity, AI, and low-level systems."}
                </p>
                <p className="mt-3">
                  <span className="text-[#00ff41]">$</span>{" "}
                  <span className="animate-blink text-[#00ff41]">█</span>
                </p>
              </div>
            </div>

            {/* Stats in terminal style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {[
                { label: "Repos", value: user?.public_repos || 0, color: "text-[#00d4ff]", border: "border-[#00d4ff]/30" },
                { label: "Followers", value: user?.followers || 0, color: "text-purple-400", border: "border-purple-500/30" },
                { label: "Following", value: user?.following || 0, color: "text-emerald-400", border: "border-emerald-500/30" },
                { label: "Commits", value: totalCommits, color: "text-cyan-400", border: "border-cyan-500/30" },
                { label: "Languages", value: Object.keys(languages).length, color: "text-pink-400", border: "border-pink-500/30" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`bg-[#0d1117]/80 backdrop-blur border ${stat.border} rounded-lg p-3 hover:scale-105 transition-all duration-300`}
                >
                  <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-mono mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section id="skills" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-[#0d1117]/50 border-y border-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-[#00ff41]">&gt;</span>{" "}
            <span className="bg-gradient-to-r from-[#00d4ff] via-purple-400 to-[#00ff41] bg-clip-text text-transparent animate-gradient-x">
              Skills &amp; Expertise
            </span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Backend & Systems */}
            <div className="bg-[#0a0a0f] border border-green-900/40 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
              <h3 className="text-lg font-bold font-mono text-green-400 mb-6 flex items-center gap-2">
                <span>🖥️</span> Backend &amp; Systems
              </h3>
              <div className="space-y-4">
                {backendSkills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{skill.icon} {skill.name}</span>
                      <span className="font-mono text-green-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend & Frameworks */}
            <div className="bg-[#0a0a0f] border border-cyan-900/40 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <h3 className="text-lg font-bold font-mono text-[#00d4ff] mb-6 flex items-center gap-2">
                <span>🎯</span> Frontend &amp; Frameworks
              </h3>
              <div className="space-y-4">
                {frontendSkills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{skill.icon} {skill.name}</span>
                      <span className="font-mono text-[#00d4ff]">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools, Databases & DevOps */}
            <div className="bg-[#0a0a0f] border border-purple-900/40 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-lg font-bold font-mono text-purple-400 mb-6 flex items-center gap-2">
                <span>🛠️</span> Tools, Databases &amp; DevOps
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {toolsDevOpsSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 bg-gray-900/50 border border-gray-700/30 rounded-lg p-3 hover:border-purple-500/40 hover:bg-purple-950/20 transition-all duration-300 cursor-default"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-xs text-gray-300 font-mono leading-tight">{skill.name}</span>
                  </div>
                ))}
              </div>
              {/* Language tags */}
              <div className="mt-6 pt-4 border-t border-gray-800/50">
                <p className="text-xs text-gray-500 font-mono mb-2">Additional Languages &amp; Tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(languages).slice(0, 12).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-900/70 border border-gray-700/50 rounded text-xs text-gray-300 font-mono hover:border-purple-500/40 hover:text-purple-400 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects Section ── */}
      <section id="projects" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-[#00ff41]">&gt;</span>{" "}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#00ff41] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-8 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">$</span>
                <input
                  type="text"
                  placeholder="grep repo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-56 pl-8 pr-4 py-2.5 bg-[#0d1117] border border-gray-700/50 rounded-lg text-gray-300 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/30 transition-all"
                />
              </div>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2.5 bg-[#0d1117] border border-gray-700/50 rounded-lg text-gray-300 font-mono text-sm focus:outline-none focus:border-[#00d4ff]/50"
                aria-label="Filter by language"
              >
                <option value="All">All Languages</option>
                {Object.keys(languages).map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "updated" | "stars" | "name")}
              className="px-4 py-2.5 bg-[#0d1117] border border-gray-700/50 rounded-lg text-gray-300 font-mono text-sm focus:outline-none focus:border-[#00d4ff]/50"
              aria-label="Sort by"
            >
              <option value="updated">sort: updated</option>
              <option value="stars">sort: stars</option>
              <option value="name">sort: name</option>
            </select>
          </div>

          {filteredRepos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 font-mono text-gray-600">404</div>
              <div className="text-gray-500 font-mono">$ No repositories found.</div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="group bg-[#0d1117] border border-gray-800/60 rounded-xl p-5 hover:border-[#00ff41]/40 hover:shadow-[0_0_20px_rgba(0,255,65,0.05)] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-base font-semibold font-mono text-[#00d4ff] group-hover:text-[#00ff41] transition-colors truncate max-w-[70%]">
                        {repo.name}
                      </h3>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#00ff41] transition-colors shrink-0"
                        aria-label={`Open ${repo.name} on GitHub`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 min-h-[60px]">
                      {repo.description || "No description available"}
                    </p>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 bg-emerald-950/30 border border-emerald-800/30 rounded text-xs text-emerald-400 font-mono"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: languageColors[repo.language] || "#64748b" }}
                            />
                            <span className="text-xs text-gray-400 font-mono">{repo.language}</span>
                          </div>
                        )}
                        <span className="text-xs text-gray-600 font-mono">
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                        <div className="flex gap-4">
                          <span>⭐ {repo.stargazers_count}</span>
                          <span>⑂ {repo.forks_count}</span>
                        </div>
                        <span>{(repo.size / 1024).toFixed(1)} KB</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-mono bg-[#0d1117] border border-gray-700/50 rounded-lg text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    &lt; prev
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 text-sm font-mono rounded-lg transition-all ${
                          currentPage === pageNum
                            ? "bg-[#00ff41]/20 border border-[#00ff41]/50 text-[#00ff41]"
                            : "bg-[#0d1117] border border-gray-700/50 text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41]/50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-mono bg-[#0d1117] border border-gray-700/50 rounded-lg text-gray-400 hover:text-[#00ff41] hover:border-[#00ff41]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    next &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Activity Section ── */}
      <section id="activity" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-[#0d1117]/40 border-y border-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-mono">
            <span className="text-[#00ff41]">&gt;</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-[#00d4ff] bg-clip-text text-transparent">
              GitHub Activity
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0f] border border-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-bold font-mono text-[#00d4ff] mb-4 flex items-center gap-2">
                <span>📋</span> Account Info
              </h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>member_since:</span>
                  <span className="text-gray-300">{user?.created_at ? new Date(user.created_at).getFullYear() : "N/A"}</span>
                </div>
                {user?.company && (
                  <div className="flex justify-between text-gray-400">
                    <span>company:</span>
                    <span className="text-gray-300">{user.company}</span>
                  </div>
                )}
                {user?.blog && (
                  <div className="flex justify-between text-gray-400">
                    <span>website:</span>
                    <a href={user.blog} className="text-[#00d4ff] hover:underline" target="_blank" rel="noopener noreferrer">
                      {user.blog}
                    </a>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>location:</span>
                  <span className="text-gray-300">{user?.location || "Earth"}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0f] border border-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-bold font-mono text-purple-400 mb-4 flex items-center gap-2">
                <span>📊</span> Quick Stats
              </h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>top_language:</span>
                  <span className="text-[#00ff41]">{topLanguages[0]?.[0] || "N/A"}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>avg_stars:</span>
                  <span className="text-[#00d4ff]">
                    {repos.length > 0
                      ? (repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) / repos.length).toFixed(1)
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>total_size:</span>
                  <span className="text-purple-400">
                    {(repos.reduce((sum, repo) => sum + repo.size, 0) / 1024).toFixed(1)} MB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contribution heatmap */}
          {contributionData.length > 0 && (
            <div className="mt-6 bg-[#0a0a0f] border border-gray-800/50 rounded-xl p-6 overflow-x-auto">
              <h3 className="text-lg font-bold font-mono text-[#00ff41] mb-4">
                <span>🗓️</span> Contribution Heatmap
              </h3>
              <div className="flex gap-1 min-w-max">
                {Array.from({ length: Math.ceil(contributionData.length / 7) }, (_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const dataIndex = weekIndex * 7 + dayIndex;
                      const value = contributionData[dataIndex] || 0;
                      const intensity = value === 0 ? 0 : Math.ceil((value / 10) * 4);

                      return (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm ${
                            intensity === 0
                              ? "bg-gray-800"
                              : intensity === 1
                              ? "bg-green-900"
                              : intensity === 2
                              ? "bg-green-700"
                              : intensity === 3
                              ? "bg-green-500"
                              : "bg-green-400"
                          }`}
                          title={`${value} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end mt-3 gap-2 text-xs text-gray-600 font-mono">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${
                      level === 0
                        ? "bg-gray-800"
                        : level === 1
                        ? "bg-green-900"
                        : level === 2
                        ? "bg-green-700"
                        : level === 3
                        ? "bg-green-500"
                        : "bg-green-400"
                    }`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA / Contact Section ── */}
      <section id="contact" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 font-mono">
            <span className="text-[#00ff41]">&gt;</span>{" "}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#00ff41] bg-clip-text text-transparent">
              Let&apos;s Build Something Secure
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Ready to collaborate on secure software, explore AI frontiers, or hack on operating systems? Let&apos;s connect.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
            <a
              href={`mailto:${user?.email || "muhammadasimchattha@gmail.com"}`}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-mono font-semibold text-white hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] transition-all duration-300 border border-emerald-400/30 text-center w-full sm:w-auto"
            >
              $ ssh connect
            </a>
            <a
              href={user?.html_url || "https://github.com/chmuhammadasim"}
              className="px-6 py-3.5 border border-[#00d4ff]/40 rounded-xl font-mono font-semibold text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300 text-center w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              $ git clone profile
            </a>
            <a
              href="https://linkedin.com/in/muhammad-asim-chattha"
              className="px-6 py-3.5 border border-blue-500/40 rounded-xl font-mono font-semibold text-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 text-center w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              $ link linkedin
            </a>
            <a
              href="/Muhammad_Asim_Chattha_Resume.pdf"
              className="px-6 py-3.5 border border-purple-500/40 rounded-xl font-mono font-semibold text-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 text-center w-full sm:w-auto"
              download="Muhammad_Asim_Chattha_Resume.pdf"
            >
              $ cat resume.pdf
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-gray-800/50 bg-[#0a0a0f] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 font-mono text-sm">
              <span className="text-[#00ff41]">©</span> {new Date().getFullYear()} {user?.name || "Muhammad Asim Chattha"} —{" "}
              <span className="text-gray-500">Built with Neovim &amp; ☕</span>
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-mono justify-center">
              <a href={user?.html_url || "#"} className="text-gray-500 hover:text-[#00ff41] transition-colors" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/muhammad-asim-chattha" className="text-gray-500 hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <Link href="/blogs" className="text-gray-500 hover:text-[#00d4ff] transition-colors">
                Blogs
              </Link>
              <a href="/Muhammad_Asim_Chattha_Resume.pdf" className="text-gray-500 hover:text-purple-400 transition-colors" download="Muhammad_Asim_Chattha_Resume.pdf">
                Resume
              </a>
              <a href={`mailto:${user?.email || ""}`} className="text-gray-500 hover:text-rose-400 transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
