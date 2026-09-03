import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only block API endpoints; never block CSS/JS/images/static assets.
        disallow: ["/api/", "/_next/data/"],
      },
    ],
    sitemap: "https://chmuhammadasim.site/sitemap.xml",
    host: "https://chmuhammadasim.site",
  };
}
