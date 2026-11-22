import type { BlogPost } from "@/lib/blog-data";
import type { Project } from "@/lib/projects-data";
import {
  CERTIFICATIONS,
  FAQS,
  PROFILE,
  SITE_NAME,
  SITE_UPDATED,
  SITE_URL,
  SKILL_GROUPS,
} from "@/lib/site-data";

/**
 * JSON-LD structured data for the portfolio.
 * Only verified public information is included. All nodes are linked
 * by stable @id values so search engines can build one entity graph.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Map project technologies to actual programming languages for schema. */
const PROGRAMMING_LANGUAGE_MAP: Record<string, string> = {
  Go: "Go",
  "Node.js": "JavaScript",
  React: "JavaScript",
  "Next.js": "TypeScript",
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  Flutter: "Dart",
  Dart: "Dart",
  Python: "Python",
  "C++": "C++",
  C: "C",
  Solidity: "Solidity",
  SQL: "SQL",
  Bash: "Bash",
};

const ALL_SKILLS = Array.from(
  new Set(SKILL_GROUPS.flatMap((group) => group.skills.map((skill) => skill.name)))
);

function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    alternateName: PROFILE.shortName,
    url: SITE_URL,
    image: "https://github.com/chmuhammadasim.png",
    description: PROFILE.summary,
    jobTitle: PROFILE.role,
    email: `mailto:${PROFILE.email}`,
    telephone: PROFILE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    sameAs: [PROFILE.socials.github, PROFILE.socials.linkedin],
    worksFor: {
      "@type": "Organization",
      name: "IotaScales",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Air University, Islamabad",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      occupationLocation: {
        "@type": "City",
        name: "Islamabad",
      },
      skills: ALL_SKILLS.join(", "),
    },
    knowsAbout: [
      "Cybersecurity",
      "Privileged Access Management",
      "DNS Security",
      "VPN Infrastructure",
      "Endpoint Security",
      "Network Security",
      "Secure Infrastructure",
      "Backend Engineering",
      "Go",
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "Flutter",
      "Full Stack Development",
      "Blockchain",
      "DevOps",
    ],
    hasCredential: CERTIFICATIONS.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: "certificate",
      identifier: cert.credentialId,
      url: cert.url,
      recognizedBy: {
        "@type": "Organization",
        name: cert.issuer,
      },
    })),
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: `${SITE_NAME} — Software Developer Portfolio`,
    description:
      "Portfolio, project case studies, and technical blog of Muhammad Asim Chattha — software developer specializing in cybersecurity, secure infrastructure, backend engineering, and networking.",
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
    copyrightHolder: { "@id": PERSON_ID },
  };
}

/** Renders a JSON-LD script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Person + WebSite graph — included once in the root layout. */
export function GlobalJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          personNode(),
          websiteNode(),
        ],
      }}
    />
  );
}

export function PersonJsonLd() {
  return (
    <JsonLd data={{ "@context": "https://schema.org", ...personNode() }} />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd data={{ "@context": "https://schema.org", ...websiteNode() }} />
  );
}

/** ProfilePage wrapper for the homepage. */
export function ProfilePageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: `${SITE_NAME} — Software Developer & Cybersecurity Engineer`,
        description: PROFILE.summary,
        image: "https://github.com/chmuhammadasim.png",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage: "en",
        dateModified: SITE_UPDATED,
      }}
    />
  );
}

export function CollectionPageJsonLd({
  path,
  name,
  description,
  items,
}: {
  path: string;
  name: string;
  description: string;
  items: { name: string; url: string; description?: string }[];
}) {
  const url = `${SITE_URL}${path}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name,
        description,
        image: `${SITE_URL}/api/og?title=${encodeURIComponent(name)}`,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        inLanguage: "en",
        dateModified: SITE_UPDATED,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.url,
            ...(item.description ? { description: item.description } : {}),
          })),
        },
      }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const url = `${SITE_URL}/projects/${project.slug}`;
  const languages = Array.from(
    new Set(
      project.technologies
        .map((tech) => PROGRAMMING_LANGUAGE_MAP[tech])
        .filter((language): language is string => Boolean(language))
    )
  );

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "@id": `${url}#software`,
        name: project.name,
        description: project.seoDescription,
        url,
        ...(project.github ? { codeRepository: project.github } : {}),
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        ...(languages.length > 0
          ? { programmingLanguage: languages }
          : {}),
        keywords: project.keywords.join(", "),
        dateModified: SITE_UPDATED,
        image: `${SITE_URL}/api/og?title=${encodeURIComponent(
          project.name
        )}&subtitle=${encodeURIComponent(
          project.tagline
        )}&tags=${encodeURIComponent(project.technologies.slice(0, 3).join(","))}`,
        isAccessibleForFree: true,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntityOfPage: url,
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function FAQJsonLd({
  items = FAQS,
}: {
  items?: readonly { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

/** Resume page: ProfilePage + full Person details. */
export function ResumePageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/resume#page`,
        url: `${SITE_URL}/resume`,
        name: `Resume — ${SITE_NAME}, Software Developer`,
        description:
          "Resume of Muhammad Asim Chattha: software developer at IotaScales working on DNS security, VPN, IPAM, privileged access management, and infrastructure platforms.",
        image: "https://github.com/chmuhammadasim.png",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage: "en",
        dateModified: SITE_UPDATED,
      }}
    />
  );
}

export function BlogJsonLd({ posts }: { posts: BlogPost[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${SITE_URL}/blogs#blog`,
        name: "Tech Blog | Muhammad Asim Chattha",
        description:
          "Technical notes on cybersecurity, AI, and operating systems — by Muhammad Asim Chattha.",
        image: `${SITE_URL}/api/og?title=Tech+Blog&subtitle=Cybersecurity%2C+Systems%2C+AI`,
        url: `${SITE_URL}/blogs`,
        inLanguage: "en",
        dateModified: SITE_UPDATED,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/blogs/${post.slug}#article`,
          headline: post.title,
          description: post.excerpt,
          url: `${SITE_URL}/blogs/${post.slug}`,
          datePublished: post.date,
          dateModified: SITE_UPDATED,
          author: { "@id": PERSON_ID },
        })),
      }}
    />
  );
}

export function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const categoryLabel =
    post.category === "cyber"
      ? "Cybersecurity"
      : post.category === "ai"
      ? "AI / Machine Learning"
      : "Operating Systems";
  const image = `${SITE_URL}/api/og?title=${encodeURIComponent(
    post.title
  )}&subtitle=${encodeURIComponent(categoryLabel)}&tags=${encodeURIComponent(
    post.tags.slice(0, 3).join(",")
  )}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blogs/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image,
        url: `${SITE_URL}/blogs/${post.slug}`,
        datePublished: post.date,
        dateModified: SITE_UPDATED,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        keywords: post.tags.join(", "),
        articleSection: categoryLabel,
        inLanguage: "en",
        isAccessibleForFree: true,
        about: post.tags.map((tag) => ({ "@type": "Thing", name: tag })),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/blogs/${post.slug}`,
        },
        wordCount: post.content.split(/\s+/).length,
        timeRequired: `PT${post.readTime.replace(/[^\d]/g, "")}M`,
        isPartOf: { "@id": WEBSITE_ID },
      }}
    />
  );
}

/** Retained for compatibility with older imports. */
export type CaseStudyJsonLdProject = Project;
