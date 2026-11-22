import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SkillSphereLoader from "@/components/three/SkillSphereLoader";
import SkillsMatrix from "@/components/SkillsMatrix";
import { JsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  CAPABILITIES,
  CERTIFICATION_COUNT,
  SECURITY_AREAS,
  SKILL_GROUPS,
  SKILL_LEVELS,
  SITE_URL,
  TOTAL_SKILLS,
} from "@/lib/site-data";

const PAGE_URL = `${SITE_URL}/skills`;
const TITLE = "Skill Matrix & Technologies";
const DESCRIPTION =
  "64 technologies across Go, Node.js, React, Next.js, Flutter, PostgreSQL, Docker, DNS security, PAM, VPN, and networking — with evidence links.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Muhammad Asim Chattha skills",
    "software developer skill matrix",
    "Go developer skills",
    "Node.js backend developer",
    "TypeScript React Next.js developer",
    "Flutter developer",
    "cybersecurity skills",
    "privileged access management skills",
    "DNS security expertise",
    "VPN infrastructure",
    "PostgreSQL MongoDB Redis ClickHouse",
    "Docker Linux DevOps",
    "network engineering skills",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Muhammad Asim Chattha",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og?title=Skill+Matrix&subtitle=Security+%C2%B7+Backend+%C2%B7+Frontend+%C2%B7+Data+%C2%B7+Infra&tags=Go,Node.js,Cyber+Security,PostgreSQL",
        width: 1200,
        height: 630,
        alt: "Technical skill matrix of Muhammad Asim Chattha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      "/api/og?title=Skill+Matrix&subtitle=Security+%C2%B7+Backend+%C2%B7+Frontend+%C2%B7+Data+%C2%B7+Infra&tags=Go,Node.js,Cyber+Security,PostgreSQL",
    ],
  },
};

const PRODUCTION_COUNT = SKILL_GROUPS.reduce(
  (sum, group) =>
    sum + group.skills.filter((skill) => skill.level === "production").length,
  0
);

const STATS = [
  { label: "Skills mapped", value: TOTAL_SKILLS },
  { label: "Production-grade", value: PRODUCTION_COUNT },
  { label: "Domains", value: SKILL_GROUPS.length },
  { label: "Credentials", value: CERTIFICATION_COUNT },
];

const DEFINED_TERMS = SKILL_GROUPS.flatMap((group) =>
  group.skills.map((skill) => ({
    "@type": "DefinedTerm",
    name: skill.name,
    description: skill.note,
    inDefinedTermSet: `${PAGE_URL}#skills`,
    termCode: `${group.id}:${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  }))
);

export default function SkillsPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "DefinedTermSet",
              "@id": `${PAGE_URL}#skills`,
              name: "Technical skills — Muhammad Asim Chattha",
              description:
                "A structured set of engineering skills across security, backend, frontend, data, DevOps, and networking.",
              url: PAGE_URL,
              hasDefinedTerm: DEFINED_TERMS,
            },
            {
              "@type": "CollectionPage",
              "@id": `${PAGE_URL}#page`,
              url: PAGE_URL,
              name: TITLE,
              description: DESCRIPTION,
              isPartOf: { "@id": `${SITE_URL}/#website` },
              about: { "@id": `${SITE_URL}/#person` },
              inLanguage: "en",
              mainEntity: { "@id": `${PAGE_URL}#skills` },
            },
          ],
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Skills", url: PAGE_URL },
        ]}
      />
      <Navbar />

      <main id="main" className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden pb-12 pt-10 md:pb-16">
          <div className="sphere-panel pointer-events-none absolute right-2 top-10 hidden h-[300px] w-[40%] md:block">
            <SkillSphereLoader className="opacity-80" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 0%, rgba(34,211,238,0.12), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 10%, rgba(167,139,250,0.12), transparent 60%)",
            }}
          />
          <div className="container-site relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-accent">skills</li>
              </ol>
            </nav>

            <Reveal>
              <p className="eyebrow">
                <span className="idx">Matrix</span> // {TOTAL_SKILLS} technologies
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                The full{" "}
                <span className="text-gradient-brand">skill matrix.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary md:text-base">
                Every technology I work with, rated by how I have used it — production,
                working, or familiar — and linked to the projects where it was applied.
                No keyword padding: most entries link to the project where the skill was
                used.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border/60 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="bg-background/80 px-5 py-4 backdrop-blur">
                    <dd className="stat-value !text-2xl">{stat.value}</dd>
                    <dt className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/projects" className="btn btn-primary">
                  See the work behind the skills
                </Link>
                <Link href="/resume" className="btn btn-secondary">
                  Resume & credentials
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Matrix */}
        <section aria-labelledby="matrix-heading" className="container-site pb-20">
          <h2 id="matrix-heading" className="sr-only">
            Skill matrix
          </h2>
          <SkillsMatrix />
        </section>

        {/* Proficiency model */}
        <section
          aria-labelledby="levels-heading"
          className="border-y border-border bg-surface/40 py-16"
        >
          <div className="container-site">
            <Reveal>
              <p className="eyebrow">
                <span className="idx">Method</span> // Proficiency model
              </p>
              <h2
                id="levels-heading"
                className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                How these ratings work.
              </h2>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-secondary">
                Ratings describe depth of real use, not self-assessed mastery.
                Production ratings reflect shipped work; many link to a case study.
                Skills without a project link were used in private, client, or
                coursework environments that cannot be linked publicly.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {(Object.keys(SKILL_LEVELS) as (keyof typeof SKILL_LEVELS)[]).map(
                (level, index) => (
                  <Reveal key={level} delay={index * 60}>
                    <div className="card h-full p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                          0{index + 1}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                          {SKILL_LEVELS[level].weight}/3
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-foreground">
                        {SKILL_LEVELS[level].label}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        {SKILL_LEVELS[level].description}
                      </p>
                      <div className="meter mt-4">
                        <span
                          style={{
                            width: `${(SKILL_LEVELS[level].weight / 3) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>

        {/* Specialization */}
        <section aria-labelledby="specialization-heading" className="container-site py-20">
          <Reveal>
            <p className="eyebrow">
              <span className="idx">Focus</span> // Specialization
            </p>
            <h2
              id="specialization-heading"
              className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              Where the depth is.
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-secondary">
              Four capability areas define my day-to-day engineering: security platforms,
              backend systems, full-stack product work, and infrastructure/networking.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CAPABILITIES.map((capability, index) => (
              <Reveal key={capability.id} delay={index * 50}>
                <article id={`cap-${capability.id}`} className="card h-full p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground">
                      {capability.title}
                    </h3>
                    <span className="font-mono text-[10px] text-faint">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent/80">
                    {capability.tagline}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-secondary">
                    {capability.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {capability.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="mt-10 border border-border bg-background/50 p-6">
              <h3 className="hud-label">// security domains in production</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {SECURITY_AREAS.map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-2.5 text-[13px] text-secondary"
                  >
                    <span
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {area}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/projects/atrios-dns-security" className="btn btn-secondary btn-sm">
                  DNS security case study
                </Link>
                <Link href="/projects/omnipriv-pam" className="btn btn-secondary btn-sm">
                  PAM case study
                </Link>
                <Link href="/projects/cyber-sentinel" className="btn btn-secondary btn-sm">
                  Endpoint security case study
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Certifications CTA */}
        <section
          aria-labelledby="credentials-heading"
          className="border-t border-border bg-surface/30 py-16"
        >
          <div className="container-site">
            <Reveal>
              <div className="holo-card flex flex-col items-start justify-between gap-6 p-7 md:flex-row md:items-center">
                <div>
                  <p className="eyebrow">
                    <span className="idx">Proof</span> // Certifications
                  </p>
                  <h2
                    id="credentials-heading"
                    className="mt-3 text-xl font-semibold text-foreground md:text-2xl"
                  >
                    {CERTIFICATION_COUNT} verified Coursera credentials.
                  </h2>
                  <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-secondary">
                    Full-stack development, DevOps and cloud, project management, Solidity,
                    .NET, and networking — each with a verification ID on the resume page.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/resume#certifications" className="btn btn-primary">
                    View credentials
                  </Link>
                  <Link href="/experience" className="btn btn-secondary">
                    Experience
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
