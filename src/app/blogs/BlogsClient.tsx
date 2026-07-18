"use client";
import { useState } from "react";
import Link from "next/link";
import { BlogPost, categoryInfo } from "@/lib/blog-data";

export default function BlogsClient({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans antialiased">
      {/* Ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full" />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-emerald-900/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-lg font-bold font-mono text-[#00ff41] hover:text-[#00d4ff] transition-colors">
              <span className="text-[#00d4ff]">&gt;</span> asim<span className="text-gray-500">@</span>blogs
              <span className="animate-blink text-[#00ff41]">_</span>
            </Link>

            <div className="flex items-center space-x-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-mono text-gray-400 hover:text-[#00ff41] hover:bg-gray-800/50 rounded-lg transition-all duration-300"
              >
                ← Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
            <span className="text-[#00ff41]">&gt;</span>{" "}
            <span className="bg-gradient-to-r from-[#00d4ff] via-purple-400 to-[#00ff41] bg-clip-text text-transparent animate-gradient-x">
              Tech Blog
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-4 max-w-2xl mx-auto font-mono">
            <span className="text-gray-600">$ cat /var/log/thoughts.log</span>
          </p>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Deep dives into cybersecurity research, artificial intelligence, operating system internals, 
            and low-level systems programming. No fluff — just technical content.
          </p>
        </div>
      </section>

      {/* ── Search & Filters ── */}
      <section className="relative z-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">$</span>
              <input
                type="text"
                placeholder="grep blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 bg-[#0d1117] border border-gray-700/50 rounded-lg text-gray-300 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/30 transition-all"
              />
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              {[
                { key: "all", label: "All Posts", color: "text-gray-400", border: "border-gray-700/50" },
                { key: "cyber", label: "🛡️ Cyber", color: "text-[#00ff41]", border: "border-emerald-900/40" },
                { key: "ai", label: "🤖 AI/ML", color: "text-purple-400", border: "border-purple-900/40" },
                { key: "os", label: "⚙️ OS", color: "text-[#00d4ff]", border: "border-cyan-900/40" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-300 ${
                    selectedCategory === cat.key
                      ? `${cat.color} ${cat.border} bg-[#0d1117]`
                      : "text-gray-500 border-gray-700/50 hover:text-[#00ff41] hover:border-[#00ff41]/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog Posts Grid ── */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 font-mono text-gray-600">404</div>
              <div className="text-gray-500 font-mono">$ No posts found matching your query.</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => {
                const cat = categoryInfo[post.category];
                return (
                  <article
                    key={post.id}
                    className={`group bg-[#0d1117] border ${cat.border} rounded-xl p-5 hover:shadow-[0_0_20px_rgba(0,255,65,0.05)] hover:border-[#00ff41]/30 transition-all duration-300 flex flex-col`}
                  >
                    {/* Category badge & date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-mono ${cat.color} flex items-center gap-1`}>
                        {cat.icon} {cat.label}
                      </span>
                      <span className="text-xs text-gray-600 font-mono">
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold font-mono text-gray-200 group-hover:text-[#00ff41] transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-900/70 border border-gray-700/30 rounded text-xs text-gray-500 font-mono group-hover:border-gray-600/40 transition-all"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-gray-600 font-mono">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Read time & link */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
                      <span className="text-xs text-gray-600 font-mono">
                        ⏱️ {post.readTime}
                      </span>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="text-xs font-mono text-[#00d4ff] hover:text-[#00ff41] transition-colors flex items-center gap-1"
                      >
                        Read more <span className="text-[#00ff41]">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-gray-800/50 bg-[#0a0a0f] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-mono text-sm">
            <span className="text-[#00ff41]">©</span> {new Date().getFullYear()} Muhammad Asim Chattha —{" "}
            <Link href="/" className="text-gray-500 hover:text-[#00ff41] transition-colors">
              ← Back to Portfolio
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
