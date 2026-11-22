import Link from "next/link";
import Reveal from "./Reveal";
import { blogPosts } from "@/lib/blog-data";

const CATEGORY_LABEL: Record<string, string> = {
  cyber: "Cybersecurity",
  ai: "AI / ML",
  os: "Operating Systems",
};

export default function BlogPreview() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section
      aria-labelledby="writing-heading"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40"
    >
      <div className="container-site relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">08</span> // Writing
            </p>
            <h2
              id="writing-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Engineering notes.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
              Technical notes on cybersecurity, operating systems, and machine learning —
              practical guidance grounded in production and systems work.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/blogs" className="btn btn-secondary">
              All {blogPosts.length} articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {latest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 60} as="article">
              <Link
                href={`/blogs/${post.slug}`}
                className="holo-card group flex h-full flex-col p-6"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
                  <span className="text-accent">{CATEGORY_LABEL[post.category]}</span>
                  <span className="text-faint">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-secondary">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.12em]">
                  <span className="text-muted">{post.readTime} read</span>
                  <span className="inline-flex items-center gap-1 text-accent transition-transform group-hover:translate-x-0.5">
                    Read
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
