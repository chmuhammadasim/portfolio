import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { PROJECTS } from "@/lib/projects-data";
import { SITE_UPDATED, SITE_URL } from "@/lib/site-data";

/**
 * Complete XML sitemap. Uses stable content dates instead of
 * `new Date()` so lastModified reflects real content changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(`${SITE_UPDATED}T00:00:00.000Z`);

  const corePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/github`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: updated,
    changeFrequency: "monthly",
    priority: project.tier === "flagship" ? 0.85 : 0.75,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...corePages, ...projectPages, ...blogPages];
}
