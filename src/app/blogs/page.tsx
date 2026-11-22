import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import { blogPosts } from "@/lib/blog-data";
import { BlogJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Tech Blog — Cybersecurity, Systems & AI",
  description:
    "Technical notes on cybersecurity, operating systems, machine learning, and secure infrastructure — practical guidance from Muhammad Asim Chattha.",
  keywords: [
    "cybersecurity blog",
    "operating systems blog",
    "machine learning engineering blog",
    "secure infrastructure",
    "Linux kernel exploitation",
    "malware analysis",
    "LLM engineering",
    "Muhammad Asim Chattha blog",
  ],
  openGraph: {
    title: "Tech Blog | Muhammad Asim Chattha",
    description:
      "Engineering notes on cybersecurity, operating systems, machine learning, and secure infrastructure.",
    url: `${SITE_URL}/blogs`,
    siteName: "Muhammad Asim Chattha",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og?title=Tech+Blog&subtitle=Cybersecurity%2C+Systems%2C+AI",
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
      "Engineering notes on cybersecurity, operating systems, machine learning, and secure infrastructure.",
    images: ["/api/og?title=Tech+Blog&subtitle=Cybersecurity%2C+Systems%2C+AI"],
  },
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
};

export default function BlogsPage() {
  return (
    <>
      <BlogJsonLd posts={blogPosts} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blogs", url: `${SITE_URL}/blogs` },
        ]}
      />
      <BlogsClient posts={blogPosts} />
    </>
  );
}