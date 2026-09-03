import type { BlogPost } from "@/lib/blog-data";
import type { CaseStudy } from "@/lib/projects-data";

/**
 * Renders JSON-LD structured data for a Person (homepage).
 * Only verified public information is included.
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
      "Software developer focused on cybersecurity, secure infrastructure, backend engineering, networking, and modern web technologies.",
    sameAs: [
      "https://github.com/chmuhammadasim",
      "https://linkedin.com/in/muhammad-asim-chattha",
    ],
    jobTitle: "Software Developer",
    email: "mailto:muhammadasimchattha@gmail.com",
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Air University, Islamabad",
    },
    knowsAbout: [
      "Cybersecurity",
      "Privileged Access Management",
      "DNS Security",
      "VPN Infrastructure",
      "Network Security",
      "Backend Development",
      "Web Development",
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
    name: "Muhammad Asim Chattha — Software Developer",
    url: "https://chmuhammadasim.site",
    description:
      "Portfolio and technical blog of Muhammad Asim Chattha — software developer specializing in cybersecurity, secure infrastructure, backend engineering, and networking.",
    publisher: {
      "@type": "Person",
      name: "Muhammad Asim Chattha",
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
 * Renders JSON-LD structured data for a project case study.
 */
export function CaseStudyJsonLd({ study }: { study: CaseStudy }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: study.name,
    description: study.overview,
    url: `https://chmuhammadasim.site/projects/${study.slug}`,
    ...(study.github ? { codeRepository: study.github } : {}),
    author: {
      "@type": "Person",
      name: "Muhammad Asim Chattha",
      url: "https://chmuhammadasim.site",
    },
    programmingLanguage: study.technologies,
    dateCreated: study.year,
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
