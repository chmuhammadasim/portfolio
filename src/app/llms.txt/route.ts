import { PROJECTS } from "@/lib/projects-data";
import {
  CERTIFICATION_COUNT,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SITE_URL,
  SKILL_GROUPS,
  TOTAL_SKILLS,
} from "@/lib/site-data";
import { blogPosts } from "@/lib/blog-data";

export const dynamic = "force-static";

/**
 * llms.txt — a curated, machine-readable map of this site for AI agents
 * and answer engines. Complements robots.txt and the XML sitemap.
 */
export function GET() {
  const lines: string[] = [];

  lines.push(`# ${PROFILE.name} — Software Developer & Cybersecurity Engineer`);
  lines.push("");
  lines.push(
    `> ${PROFILE.summary} Based in ${PROFILE.location}. Portfolio: ${SITE_URL}`
  );
  lines.push("");

  lines.push("## Profile");
  lines.push("");
  lines.push(`- Name: ${PROFILE.name}`);
  lines.push(`- Role: ${PROFILE.role} at IotaScales`);
  lines.push(`- Location: ${PROFILE.location}`);
  lines.push(`- Email: ${PROFILE.email}`);
  lines.push(`- GitHub: ${PROFILE.socials.github}`);
  lines.push(`- LinkedIn: ${PROFILE.socials.linkedin}`);
  lines.push(`- Resume: ${SITE_URL}/resume`);
  lines.push("");

  lines.push("## Key pages");
  lines.push("");
  lines.push(`- [Home](${SITE_URL}/): overview, capabilities, featured work`);
  lines.push(`- [Projects](${SITE_URL}/projects): ${PROJECTS.length} engineering case studies`);
  lines.push(`- [Skills](${SITE_URL}/skills): ${TOTAL_SKILLS} technologies mapped to projects`);
  lines.push(`- [Experience](${SITE_URL}/experience): roles, education, certifications`);
  lines.push(`- [Resume](${SITE_URL}/resume): full HTML resume with credentials`);
  lines.push(`- [GitHub](${SITE_URL}/github): live repository and language data`);
  lines.push(`- [Blog](${SITE_URL}/blogs): ${blogPosts.length} technical articles`);
  lines.push("");

  lines.push("## Experience");
  lines.push("");
  for (const job of EXPERIENCE) {
    lines.push(`- ${job.role} at ${job.company} (${job.period}): ${job.description}`);
  }
  lines.push("");

  lines.push("## Selected projects");
  lines.push("");
  for (const project of PROJECTS) {
    lines.push(
      `- [${project.name}](${SITE_URL}/projects/${project.slug}): ${project.summary}`
    );
  }
  lines.push("");
  lines.push(`Full index: ${SITE_URL}/projects`);
  lines.push("");

  lines.push("## Technical skills");
  lines.push("");
  for (const group of SKILL_GROUPS) {
    lines.push(
      `- ${group.label}: ${group.skills.map((skill) => skill.name).join(", ")}`
    );
  }
  lines.push("");

  lines.push("## Education & credentials");
  lines.push("");
  for (const edu of EDUCATION) {
    lines.push(`- ${edu.degree}, ${edu.university} (${edu.period})`);
  }
  lines.push(`- ${CERTIFICATION_COUNT} Coursera certifications — ${SITE_URL}/resume#certifications`);
  lines.push("");

  lines.push("## Writing");
  lines.push("");
  for (const post of blogPosts) {
    lines.push(`- [${post.title}](${SITE_URL}/blogs/${post.slug}) — ${post.date}`);
  }
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push(`- Email: ${PROFILE.email}`);
  lines.push(`- LinkedIn: ${PROFILE.socials.linkedin}`);
  lines.push(`- GitHub: ${PROFILE.socials.github}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
