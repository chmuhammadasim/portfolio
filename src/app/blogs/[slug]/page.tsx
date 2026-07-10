import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPost } from "@/lib/blog-data";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import CopyLinkButton from "@/components/CopyLinkButton";

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
      siteName: "ProtFolio",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
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
      <div className="min-h-screen bg-[#0a0a0f] text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 font-mono text-gray-600">404</div>
          <p className="text-gray-500 font-mono mb-6">
            $ cat /var/log/posts/{slug}.md → File not found
          </p>
          <Link
            href="/blogs"
            className="px-6 py-3 text-sm font-mono text-[#00d4ff] border border-[#00d4ff]/30 rounded-lg hover:bg-[#00d4ff]/10 transition-all"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const cat =
    post.category === "cyber"
      ? { label: "Cybersecurity", color: "text-[#00ff41]", border: "border-emerald-900/40", icon: "🛡️" }
      : post.category === "ai"
      ? { label: "AI / Machine Learning", color: "text-purple-400", border: "border-purple-900/40", icon: "🤖" }
      : { label: "Operating Systems", color: "text-[#00d4ff]", border: "border-cyan-900/40", icon: "⚙️" };

  // Split content into paragraphs
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans antialiased">
      {/* Structured Data */}
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://chmuhammadasim.site" },
          { name: "Blogs", url: "https://chmuhammadasim.site/blogs" },
          { name: post.title, url: `https://chmuhammadasim.site/blogs/${post.slug}` },
        ]}
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-emerald-900/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-lg font-bold font-mono text-[#00ff41] hover:text-[#00d4ff] transition-colors"
            >
              <span className="text-[#00d4ff]">&gt;</span> asim<span className="text-gray-500">@</span>post
              <span className="animate-blink text-[#00ff41]">_</span>
            </Link>
            <div className="flex items-center space-x-4 text-sm font-mono">
              <Link
                href="/blogs"
                className="text-gray-400 hover:text-[#00ff41] transition-colors"
              >
                ← Blogs
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#00d4ff] transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#00ff41] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blogs" className="hover:text-[#00ff41] transition-colors">
                  Blogs
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-400 truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-mono ${cat.color} flex items-center gap-1.5`}>
                {cat.icon} {cat.label}
              </span>
              <span className="text-gray-600" aria-hidden="true">·</span>
              <time dateTime={post.date} className="text-xs text-gray-600 font-mono">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-gray-600" aria-hidden="true">·</span>
              <span className="text-xs text-gray-600 font-mono">{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-mono text-gray-100 leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                A
              </div>
              <div>
                <p className="text-sm font-mono text-gray-300">{post.authorName}</p>
                <p className="text-xs text-gray-600 font-mono">Software Developer & Cybersecurity Researcher</p>
              </div>
            </div>
          </header>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-900/70 border border-gray-700/30 rounded-lg text-xs text-gray-400 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none font-mono text-gray-300 leading-relaxed">
            {paragraphs.map((paragraph, idx) => {
              // Headers
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="text-2xl font-bold text-[#00d4ff] mt-10 mb-4 font-mono"
                    id={paragraph.replace("## ", "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              // Sub-headers
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl font-semibold text-[#00ff41] mt-8 mb-3 font-mono">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              // Blockquotes
              if (paragraph.startsWith("> ")) {
                return (
                  <blockquote
                    key={idx}
                    className="border-l-4 border-[#00ff41]/40 pl-4 my-6 italic text-gray-400 bg-emerald-950/10 py-3 pr-4 rounded-r-lg"
                  >
                    {paragraph.replace(/^> /gm, "")}
                  </blockquote>
                );
              }
              // Bullet lists
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={idx} className="list-disc list-inside space-y-1.5 my-5 text-gray-400">
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
                  <ol key={idx} className="list-decimal list-inside space-y-1.5 my-5 text-gray-400">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s/, "")}</li>
                    ))}
                  </ol>
                );
              }
              // Regular paragraph
              return (
                <p key={idx} className="my-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Share / Back */}
          <div className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              href="/blogs"
              className="text-sm font-mono text-[#00d4ff] hover:text-[#00ff41] transition-colors flex items-center gap-1"
            >
              ← Back to all posts
            </Link>
            <div className="flex gap-3">
              <CopyLinkButton slug={post.slug} />
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 bg-[#0a0a0f] py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-mono text-sm">
            <span className="text-[#00ff41]">©</span> {new Date().getFullYear()}{" "}
            {post.authorName} —{" "}
            <Link href="/" className="text-gray-500 hover:text-[#00ff41] transition-colors">
              Portfolio
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
