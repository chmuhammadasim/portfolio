"use client";
import { useState } from "react";
import Link from "next/link";
import { BlogPost, categoryInfo } from "@/lib/blog-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

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
    <div className="min-h-screen">
      <Navbar />

      <main className="container-site pt-28">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Blog</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Engineering notes.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary">
            Deep dives into cybersecurity, operating systems, and machine learning —
            written from real build experience.
          </p>
        </section>

        {/* Search & filters */}
        <section className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-72">
              <label htmlFor="blog-search" className="sr-only">
                Search posts
              </label>
              <input
                id="blog-search"
                type="search"
                placeholder="Search posts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-faint focus:border-accent focus:outline-none"
              />
            </div>
            <div
              role="group"
              aria-label="Filter posts by category"
              className="flex flex-wrap gap-1.5"
            >
              {[
                { key: "all", label: "All Posts" },
                { key: "cyber", label: "Cybersecurity" },
                { key: "ai", label: "AI / ML" },
                { key: "os", label: "Operating Systems" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  aria-pressed={selectedCategory === cat.key}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                    selectedCategory === cat.key
                      ? "bg-accent text-white"
                      : "border border-border bg-surface text-secondary hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts grid */}
        <section className="mt-10 pb-24">
          {filteredPosts.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface px-6 py-16 text-center">
              <p className="text-lg font-medium text-foreground">No posts found</p>
              <p className="mt-2 text-sm text-muted">
                Try a different search term or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => {
                const cat = categoryInfo[post.category];
                return (
                  <Reveal key={post.id} delay={(index % 3) * 60} as="article">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="card card-hover group flex h-full flex-col p-6"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-accent">
                          {cat.label}
                        </span>
                        <span className="font-mono text-xs text-muted">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h2 className="mt-4 text-base font-semibold leading-snug tracking-tight text-foreground">
                        {post.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="chip">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="chip">+{post.tags.length - 3}</span>
                        )}
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                        <span className="text-muted">{post.readTime} read</span>
                        <span className="inline-flex items-center gap-1 font-medium text-accent transition-transform group-hover:translate-x-0.5">
                          Read
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
