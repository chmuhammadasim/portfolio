import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { getBlogPost, blogPosts } from "@/lib/blog-data";
import { SITE_UPDATED, SITE_URL } from "@/lib/site-data";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import CopyLinkButton from "@/components/CopyLinkButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";
export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

function headingId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Minimal inline markdown: bold, code, and links. */
function renderInline(text: string): ReactNode[] {
  const tokens = text.split(
    /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/
  );
  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return <code key={index}>{token.slice(1, -1)}</code>;
    }
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a
          key={index}
          href={link[2]}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {link[1]}
        </a>
      );
    }
    return token;
  });
}

export async function generateStaticParams() {
  const { blogPosts } = await import("@/lib/blog-data");
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Muhammad Asim Chattha",
      description: "The blog post you're looking for could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const categoryLabel =
    post.category === "cyber"
      ? "Cybersecurity"
      : post.category === "ai"
      ? "AI / Machine Learning"
      : "Operating Systems";

  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(categoryLabel)}&tags=${encodeURIComponent(post.tags.slice(0, 3).join(","))}`;

  return {
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.authorName, url: SITE_URL }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: SITE_UPDATED,
      section: categoryLabel,
      authors: [post.authorName],
      tags: post.tags,
      url: `${SITE_URL}/blogs/${post.slug}`,
      siteName: "Muhammad Asim Chattha",
      locale: "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/blogs/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-6xl font-semibold text-faint">404</p>
          <p className="mt-4 text-sm text-muted">This post doesn&apos;t exist.</p>
          <Link href="/blogs" className="btn btn-secondary mt-6">
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  const cat =
    post.category === "cyber"
      ? "Cybersecurity"
      : post.category === "ai"
      ? "AI / Machine Learning"
      : "Operating Systems";

  // Split content into paragraphs
  const paragraphs = post.content.split("\n\n").filter(Boolean);
  const toc = paragraphs
    .filter((paragraph) => paragraph.startsWith("## "))
    .map((paragraph) => {
      const title = paragraph.replace("## ", "");
      return { title, id: headingId(title) };
    });

  const related = [
    ...blogPosts.filter(
      (item) =>
        item.slug !== post.slug &&
        (item.category === post.category ||
          item.tags.some((tag) => post.tags.includes(tag)))
    ),
    ...blogPosts.filter((item) => item.slug !== post.slug),
  ]
    .filter(
      (item, index, list) =>
        list.findIndex((candidate) => candidate.slug === item.slug) === index
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blogs", url: `${SITE_URL}/blogs` },
          { name: post.title, url: `${SITE_URL}/blogs/${post.slug}` },
        ]}
      />
      <Navbar />

      {/* Article */}
      <main id="main">
      <article className="container-site pt-28 pb-20">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-muted">
              <li>
                <Link href="/" className="link-underline hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blogs" className="link-underline hover:text-foreground">
                  Blogs
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="max-w-[200px] truncate text-secondary">{post.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip">{cat}</span>
              <span className="text-faint" aria-hidden="true">·</span>
              <time dateTime={post.date} className="font-mono text-xs text-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-faint" aria-hidden="true">·</span>
              <span className="font-mono text-xs text-muted">{post.readTime}</span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.authorName}</p>
                <p className="text-xs text-muted">Software Developer · Cybersecurity</p>
              </div>
            </div>
          </header>

          {/* Tags */}
          <div className="mb-10 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          {/* Table of contents */}
          {toc.length > 2 && (
            <nav
              aria-label="Table of contents"
              className="mb-10 border border-border bg-surface/60 p-5"
            >
              <p className="hud-label">// contents</p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                {toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-baseline gap-2 text-[13px] text-secondary transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-[9px] text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Content */}
          <div className="prose-site">
            {paragraphs.map((paragraph, idx) => {
              // Headers
              if (paragraph.startsWith("## ")) {
                const title = paragraph.replace("## ", "");
                return (
                  <h2 key={idx} id={headingId(title)} className="scroll-mt-28">
                    {title}
                  </h2>
                );
              }
              // Sub-headers
              if (paragraph.startsWith("### ")) {
                return <h3 key={idx}>{paragraph.replace("### ", "")}</h3>;
              }
              // Blockquotes
              if (paragraph.startsWith("> ")) {
                return (
                  <blockquote key={idx}>
                    {renderInline(paragraph.replace(/^> /gm, ""))}
                  </blockquote>
                );
              }
              // Bullet lists
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={idx}>
                    {items.map((item, i) => (
                      <li key={i}>{renderInline(item.replace("- ", ""))}</li>
                    ))}
                  </ul>
                );
              }
              // Numbered lists
              if (/^\d+\.\s/.test(paragraph)) {
                const items = paragraph.split("\n").filter((l) => /^\d+\.\s/.test(l));
                return (
                  <ol key={idx}>
                    {items.map((item, i) => (
                      <li key={i}>
                        {renderInline(item.replace(/^\d+\.\s/, ""))}
                      </li>
                    ))}
                  </ol>
                );
              }
              // Regular paragraph
              return <p key={idx}>{renderInline(paragraph)}</p>;
            })}
          </div>

          {/* Author */}
          <aside
            aria-label="About the author"
            className="card mt-12 p-6"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-accent/40 bg-accent-soft font-mono text-sm font-semibold text-accent">
                AC
              </span>
              <div>
                <p className="hud-label">// written by</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {post.authorName}
                </p>
                <p className="text-[11px] text-muted">
                  Software Developer · Security Platforms · Backend
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-secondary">
              I build secure backend systems and product-grade platforms at IotaScales,
              working across DNS security, VPN, IPAM, and privileged access management.
              Case studies for my production work are on this site.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-medium">
              <Link href="/resume" className="text-accent hover:text-accent-strong">
                Resume ↗
              </Link>
              <Link href="/projects" className="text-accent hover:text-accent-strong">
                Projects ↗
              </Link>
              <a
                href="https://github.com/chmuhammadasim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-strong"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/muhammad-asim-chattha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-strong"
              >
                LinkedIn ↗
              </a>
            </div>
          </aside>

          {/* Related posts */}
          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-12">
              <h2
                id="related-heading"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                Related notes
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blogs/${item.slug}`}
                    className="card group flex h-full flex-col p-4 transition-transform hover:-translate-y-0.5"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                      {item.category === "cyber"
                        ? "Cybersecurity"
                        : item.category === "ai"
                        ? "AI / ML"
                        : "Operating Systems"}
                    </p>
                    <h3 className="mt-2 text-[13.5px] font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-muted">
                      {item.excerpt}
                    </p>
                    <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                      {item.readTime} read
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Share / Back */}
          <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:-translate-x-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Back to all posts
            </Link>
            <CopyLinkButton slug={post.slug} />
          </div>
        </div>
      </article>
      </main>

      <Footer />
    </div>
  );
}
