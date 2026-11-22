import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-data";

/**
 * Crawl policy. Search engines and AI answer engines are explicitly
 * welcome; only internal API routes are excluded.
 */
export default function robots(): MetadataRoute.Robots {
  const agents = [
    "*",
    "Googlebot",
    "Bingbot",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Google-Extended",
    "CCBot",
    "Applebot-Extended",
  ];

  return {
    rules: agents.map((userAgent) => ({
      userAgent,
      allow: ["/", "/api/og"],
      disallow: ["/api/", "/_next/data/"],
    })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).host,
  };
}
