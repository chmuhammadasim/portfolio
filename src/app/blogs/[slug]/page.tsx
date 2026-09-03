import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPost } from "@/lib/blog-data";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import CopyLinkButton from "@/components/CopyLinkButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-static";
export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

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
    title: `${post.title} | Muhammad Asim Chattha`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.authorName }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.authorName],
      tags: post.tags,
      url: `https://chmuhammadasim.site/blogs/${post.slug}`,
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
      canonical: `https://chmuhammadasim.site/blogs/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
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

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://chmuhammadasim.site" },
          { name: "Blogs", url: "https://chmuhammadasim.site/blogs" },
          { name: post.title, url: `https://chmuhammadasim.site/blogs/${post.slug}` },
        ]}
      />
      <Navbar />

      {/* Article */}
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

          {/* Content */}
          <div className="prose-site">
            {paragraphs.map((paragraph, idx) => {
              // Headers
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    id={paragraph.replace("## ", "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  >
                    {paragraph.replace("## ", "")}
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
                    {paragraph.replace(/^> /gm, "")}
                  </blockquote>
                );
              }
              // Bullet lists
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={idx}>
                    {items.map((item, i) => (
                      <li key={i}>{item.replace("- ", "")}</li>
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
                      <li key={i}>{item.replace(/^\d+\.\s/, "")}</li>
                    ))}
                  </ol>
                );
              }
              // Regular paragraph
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

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

      <Footer />
    </div>
  );
}
