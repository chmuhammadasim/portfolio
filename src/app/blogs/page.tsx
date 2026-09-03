import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import { blogPosts } from "@/lib/blog-data";
import { BlogJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Tech Blog | Muhammad Asim Chattha — Cybersecurity, Systems & AI",
  description:
    "Engineering notes on cybersecurity, operating systems, machine learning, and secure infrastructure — written by Muhammad Asim Chattha.",
  openGraph: {
    title: "Tech Blog | Muhammad Asim Chattha",
    description:
      "Engineering notes on cybersecurity, operating systems, machine learning, and secure infrastructure.",
    url: "https://chmuhammadasim.site/blogs",
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