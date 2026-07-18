import type { BlogPost } from "@/lib/blog-data";

/**
 * Renders JSON-LD structured data for a Person (homepage).
 */
export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Asim Chattha",
    alternateName: "Asim",
    url: "https://chmuhammadasim.site",
    image: "https://avatars.githubusercontent.com/chmuhammadasim",
    description:
      "Full Stack Developer and Cybersecurity Enthusiast specializing in penetration testing, AI/ML, operating systems, and blockchain development.",
    sameAs: [
      "https://github.com/chmuhammadasim",
      "https://linkedin.com/in/muhammad-asim-chattha",
      "https://twitter.com/chmuhammadasim",
    ],
    jobTitle: "Software Developer & Cybersecurity Researcher",
    knowsAbout: [
      "Cybersecurity",
      "Penetration Testing",
      "Malware Analysis",
      "Artificial Intelligence",
      "Machine Learning",
      "Operating Systems",
      "Kernel Development",
      "Blockchain",
      "Full Stack Development",
      "DevOps",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Renders JSON-LD structured data for a WebSite.
 */
export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProtFolio | Muhammad Asim Chattha",
    url: "https://chmuhammadasim.site",
    description:
      "Personal portfolio and tech blog of Muhammad Asim Chattha — software developer, cybersecurity researcher, and AI/OS enthusiast.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://chmuhammadasim.site/blogs?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Renders JSON-LD structured data for a Blog (listing page).
 */
export function BlogJsonLd({ posts }: { posts: BlogPost[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Tech Blog | Muhammad Asim Chattha",
    description:
      "Deep dives into cybersecurity, AI, and operating systems — by Muhammad Asim Chattha.",
    url: "https://chmuhammadasim.site/blogs",
    author: {
      "@type": "Person",
      name: "Muhammad Asim Chattha",
      url: "https://chmuhammadasim.site",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://chmuhammadasim.site/blogs/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.authorName,
        url: post.authorUrl,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Renders JSON-LD structured data for a single BlogPosting.
 */
export function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://chmuhammadasim.site/blogs/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.authorName,
      url: post.authorUrl,
    },
    publisher: {
      "@type": "Person",
      name: post.authorName,
      url: post.authorUrl,
    },
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://chmuhammadasim.site/blogs/${post.slug}`,
    },
    wordCount: post.content.split(/\s+/).length,
    timeRequired: post.readTime.replace(" min", "M").replace(" ", ""),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Renders JSON-LD structured data for BreadcrumbList.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
