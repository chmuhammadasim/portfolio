import { blogPosts } from "@/lib/blog-data";

export const runtime = "edge";

export async function GET() {
  const baseUrl = "https://chmuhammadasim.site";

  const rssItems = blogPosts
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blogs/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
      <author>${post.authorName}</author>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Muhammad Asim Chattha — Tech Blog</title>
    <description>Deep dives into cybersecurity, AI, and operating systems — by Muhammad Asim Chattha.</description>
    <link>${baseUrl}/blogs</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${baseUrl}/favicon.ico</url>
      <title>Muhammad Asim Chattha — Tech Blog</title>
      <link>${baseUrl}/blogs</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
