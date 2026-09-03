/**
 * Project case studies for /projects/[slug] routes.
 * Content is grounded in the published resume/CV — no invented metrics.
 */

import { PROJECTS } from "./site-data";

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  year: string;
  role: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  challenges: string[];
  contribution: string[];
  results: string[];
  technologies: string[];
  github?: string;
  relatedSlugs: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "omnipriv-pam",
    name: "OmniPriv PAM",
    category: "Cybersecurity",
    tagline: "Privileged Access Management platform",
    year: "2025",
    role: "Backend Developer",
    overview:
      "OmniPriv is a Privileged Access Management (PAM) platform built to control, monitor, and audit access to privileged credentials and administrative sessions across an organization.",
    problem:
      "Privileged credentials are the highest-value target for attackers. Organizations struggle with shared admin passwords, unmonitored sessions, and no audit trail for privileged actions — making both security and compliance difficult.",
    solution:
      "OmniPriv centralizes privileged credentials in an encrypted vault, enforces role-based access control so users only receive the privileges they need, records privileged sessions, and writes a complete audit log of every privileged action.",
    architecture: [
      "Credential vaulting service with encrypted storage",
      "Role-based access control engine",
      "Session monitoring and recording pipeline",
      "Audit logging and compliance reporting",
    ],
    features: [
      "Credential vaulting",
      "Role-based access control",
      "Session monitoring",
      "Audit logging",
    ],
    challenges: [
      "Keeping the audit trail tamper-evident and complete",
      "Enforcing least privilege without blocking legitimate admin workflows",
    ],
    contribution: [
      "Developed backend services as part of the IotaScales platform team",
      "Built API endpoints for access control, sessions, and audit flows",
    ],
    results: [
      "Shipped as part of the Atrios security suite serving enterprise deployments",
      "Provided a unified, audited path to privileged access",
    ],
    technologies: ["Node.js", "REST APIs", "Access Control", "Audit Logging"],
    relatedSlugs: ["atrios-dns-security", "genesis-vpn", "atrios-ipam"],
  },
  {
    slug: "atrios-dns-security",
    name: "Atrios DNS Security",
    category: "Cybersecurity",
    tagline: "Enterprise DNS security platform",
    year: "2025",
    role: "Backend Developer",
    overview:
      "Atrios DNS Security is an enterprise DNS security platform providing DNS filtering, threat intelligence integration, policy enforcement, analytics dashboards, and secure network access management.",
    problem:
      "DNS is a primary attack vector — malware command-and-control, phishing, and data exfiltration all rely on DNS. Enterprises need filtering and threat intelligence at the DNS layer without slowing legitimate traffic.",
    solution:
      "The platform enforces DNS policy across the network, integrates threat intelligence feeds to block malicious domains, and exposes analytics dashboards so operators can see exactly what is happening on their network.",
    architecture: [
      "DNS filtering engine with policy enforcement",
      "Threat intelligence integration pipeline",
      "Analytics dashboards for network visibility",
      "Secure network access management",
    ],
    features: [
      "DNS filtering",
      "Threat intelligence integration",
      "Policy enforcement",
      "Analytics dashboards",
      "Secure network access management",
    ],
    challenges: [
      "Enforcing policy at DNS scale without latency regression",
      "Normalizing multiple threat intelligence sources into one enforcement pipeline",
    ],
    contribution: [
      "Developed backend components of the platform at IotaScales",
      "Worked on policy enforcement and secure network access features",
    ],
    results: [
      "Delivered as part of the production Atrios security suite",
      "Gave operators DNS-layer visibility and control across managed networks",
    ],
    technologies: ["DNS", "Node.js", "Threat Intelligence", "Analytics"],
    relatedSlugs: ["omnipriv-pam", "genesis-vpn", "astro-dome"],
  },
  {
    slug: "genesis-vpn",
    name: "GenesisVPN",
    category: "Infrastructure",
    tagline: "Secure VPN management platform",
    year: "2025",
    role: "Backend Developer",
    overview:
      "GenesisVPN is a VPN management platform supporting user provisioning, subscription management, traffic monitoring, and centralized administration.",
    problem:
      "VPN infrastructure at scale requires user provisioning, subscription lifecycle management, and traffic visibility — traditionally handled with scattered scripts and manual processes.",
    solution:
      "GenesisVPN centralizes the entire VPN lifecycle: provisioning users, managing subscriptions, monitoring traffic, and administering the deployment from one place.",
    architecture: [
      "User provisioning service",
      "Subscription and billing integration",
      "Traffic monitoring and accounting",
      "Centralized administration layer",
    ],
    features: [
      "User provisioning",
      "Subscription management",
      "Traffic monitoring",
      "Centralized administration",
    ],
    challenges: [
      "Accurately accounting traffic across many concurrent users",
      "Keeping subscription state consistent with upstream providers",
    ],
    contribution: [
      "Built backend services for provisioning, subscriptions, and monitoring at IotaScales",
    ],
    results: [
      "Shipped within the Atrios infrastructure suite",
      "Replaced manual VPN administration with centralized management",
    ],
    technologies: ["VPN", "Networking", "Node.js", "Monitoring"],
    relatedSlugs: ["atrios-dns-security", "atrios-ipam", "astro-dome"],
  },
  {
    slug: "atrios-ipam",
    name: "Atrios IPAM",
    category: "Infrastructure",
    tagline: "IP Address Management solution",
    year: "2025",
    role: "Backend Developer",
    overview:
      "Atrios IPAM is an IP Address Management solution enabling subnet planning, IP tracking, allocation management, and network inventory monitoring.",
    problem:
      "As networks grow, IP allocation becomes error-prone: conflicts, forgotten assignments, and poor inventory visibility lead to outages and audit failures.",
    solution:
      "Atrios IPAM gives network teams a single source of truth for subnets and IPs — planning subnets, tracking allocations, and monitoring the network inventory from one dashboard.",
    architecture: [
      "Subnet planning and modeling",
      "IP allocation tracking",
      "Network inventory monitoring",
      "Management APIs for integrations",
    ],
    features: [
      "Subnet planning",
      "IP tracking",
      "Allocation management",
      "Network inventory monitoring",
    ],
    challenges: [
      "Modeling hierarchical networks cleanly for both IPv4 and planned IPv6",
      "Detecting conflicts and stale allocations automatically",
    ],
    contribution: [
      "Developed backend allocation and inventory services at IotaScales",
    ],
    results: [
      "Part of the production Atrios infrastructure suite",
      "Provided structured, queryable IP inventory for network teams",
    ],
    technologies: ["Networking", "Node.js", "REST APIs", "IPAM"],
    relatedSlugs: ["genesis-vpn", "astro-dome", "atrios-dns-security"],
  },
  {
    slug: "astro-dome",
    name: "Astro Dome",
    category: "Infrastructure",
    tagline: "Infrastructure management platform",
    year: "2025",
    role: "Backend Developer",
    overview:
      "Astro Dome is an infrastructure management platform for centralized administration, monitoring, automation, and secure service orchestration.",
    problem:
      "Infrastructure sprawl across servers and services makes centralized administration, monitoring, and automation difficult — and manual operations introduce risk.",
    solution:
      "Astro Dome centralizes infrastructure administration, provides monitoring visibility, and automates routine operations through secure service orchestration.",
    architecture: [
      "Centralized administration layer",
      "Monitoring and alerting",
      "Automation workflows",
      "Secure service orchestration",
    ],
    features: [
      "Centralized administration",
      "Monitoring",
      "Automation",
      "Secure service orchestration",
    ],
    challenges: [
      "Orchestrating operations securely across heterogeneous infrastructure",
      "Balancing automation with human approval for risky changes",
    ],
    contribution: [
      "Built backend orchestration and monitoring components at IotaScales",
    ],
    results: [
      "Shipped within the Atrios infrastructure suite",
      "Automated routine infrastructure operations with centralized control",
    ],
    technologies: ["Infrastructure", "Node.js", "Automation", "Monitoring"],
    relatedSlugs: ["atrios-ipam", "genesis-vpn", "omnipriv-pam"],
  },
  {
    slug: "theralearn",
    name: "TheraLearn",
    category: "Web Development",
    tagline: "Learning platform for children with Down syndrome",
    year: "2024",
    role: "Full Stack Developer",
    overview:
      "TheraLearn is a comprehensive MERN-based educational platform for children with Down syndrome, featuring gamified therapy modules, psychologist dashboards, progress tracking, blogs, and role-based management.",
    problem:
      "Children with Down syndrome benefit from structured, repetitive, engaging cognitive therapy — but families and therapists lack a shared platform to deliver and track it.",
    solution:
      "TheraLearn combines gamified therapy exercises with professional tooling: psychologists get dashboards to monitor progress, children get engaging learning modules, and parents get visibility into development.",
    architecture: [
      "React frontend with gamified therapy modules",
      "Node.js/Express backend with REST APIs",
      "MongoDB for progress and content storage",
      "Role-based access: children, parents, psychologists, admins",
    ],
    features: [
      "Gamified therapy modules",
      "Psychologist dashboards",
      "Progress tracking",
      "Blogs and educational content",
      "Role-based management",
    ],
    challenges: [
      "Designing therapy flows that stay engaging across repeated sessions",
      "Modeling progress data so clinicians can act on it",
    ],
    contribution: [
      "Designed and built the full-stack application end to end",
      "Implemented role-based access and progress tracking",
    ],
    results: [
      "Delivered a complete platform used for Down syndrome cognitive development",
      "Open-sourced the codebase on GitHub",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/chmuhammadasim/TheraLearn",
    relatedSlugs: ["omnipriv-pam", "dappcord"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

/** All project slugs that have case studies (used by sitemap + static params). */
export const CASE_STUDY_SLUGS = CASE_STUDIES.map((study) => study.slug);

/** Featured project data enriched for the projects overview (if needed later). */
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
