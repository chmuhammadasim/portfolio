import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import { blogPosts } from "@/lib/blog-data";
import { BlogJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Tech Blog | Muhammad Asim Chattha — Software Dev & Cybersecurity",
  description:
    "Deep dives into cybersecurity research, artificial intelligence, operating system internals, and low-level systems programming. No fluff — just technical content.",
  openGraph: {
    title: "Tech Blog | Muhammad Asim Chattha",
    description:
      "Deep dives into cybersecurity research, artificial intelligence, operating system internals, and low-level systems programming.",
    url: "https://chmuhammadasim.site/blogs",
    siteName: "ProtFolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og?title=Tech+Blog&subtitle=Cybersecurity%2C+AI%2C+OS+Development",
        width: 1200,
        height: 630,
        alt: "Tech Blog | Muhammad Asim Chattha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog | Muhammad Asim Chattha",
    description:
      "Deep dives into cybersecurity research, artificial intelligence, operating system internals, and low-level systems programming.",
    images: ["/api/og?title=Tech+Blog&subtitle=Cybersecurity%2C+AI%2C+OS+Development"],
  },
  alternates: {
    canonical: "https://chmuhammadasim.site/blogs",
  },
};

export default function BlogsPage() {
  return (
    <>
      <BlogJsonLd posts={blogPosts} />
      <BlogsClient posts={blogPosts} />
    </>
  );
}