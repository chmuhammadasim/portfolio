/**
 * Project catalogue for /projects and /projects/[slug].
 *
 * Content is grounded in the published resume/CV, the public GitHub
 * profile, and repository metadata. No invented metrics, clients, or
 * outcomes. Private repositories are described only at the level their
 * public metadata and the resume support.
 */

export type ProjectCategory =
  | "cybersecurity"
  | "infrastructure"
  | "web"
  | "mobile"
  | "blockchain"
  | "networking"
  | "game";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  tier: "flagship" | "project";
  featured: boolean;
  year: string;
  role: string;
  company?: string;
  status: string;
  tagline: string;
  summary: string;
  seoDescription: string;
  overview: string;
  problem: string;
  solution: string;
  deepDive?: string[];
  features: string[];
  architecture: string[];
  contribution: string[];
  challenges: string[];
  results: string[];
  technologies: string[];
  keywords: string[];
  github?: string;
  related: string[];
};

export type ArchiveProject = {
  name: string;
  description: string;
  stack: string[];
  kind: string;
  repos?: { label: string; url: string }[];
};

export const PROJECT_CATEGORIES: {
  id: ProjectCategory | "all";
  label: string;
  short: string;
}[] = [
  { id: "all", label: "All projects", short: "All" },
  { id: "cybersecurity", label: "Cybersecurity", short: "Security" },
  { id: "infrastructure", label: "Infrastructure", short: "Infra" },
  { id: "web", label: "Web platforms", short: "Web" },
  { id: "mobile", label: "Mobile apps", short: "Mobile" },
  { id: "blockchain", label: "Blockchain", short: "Web3" },
  { id: "networking", label: "Networking", short: "Network" },
];

export const PROJECTS: Project[] = [
  /* ── Flagship ─────────────────────────────────────────────── */
  {
    slug: "atrios-dns-security",
    name: "Atrios DNS Security",
    category: "cybersecurity",
    tier: "flagship",
    featured: true,
    year: "2025",
    role: "Backend Developer",
    company: "IotaScales",
    status: "Production platform",
    tagline: "Enterprise DNS security, filtering, and threat intelligence",
    summary:
      "Enterprise DNS security platform providing DNS filtering, threat intelligence integration, policy enforcement, analytics dashboards, and secure network access management.",
    seoDescription:
      "Enterprise DNS security platform with DNS filtering, threat intelligence, policy enforcement, and analytics for managed networks.",
    overview:
      "Atrios DNS Security is an enterprise DNS security platform built to control what resolves on a network and to make malicious infrastructure visible. It combines DNS filtering, threat intelligence integration, policy enforcement, analytics dashboards, and secure network access management in one operational surface.",
    problem:
      "DNS is a primary attack vector. Malware command-and-control, phishing delivery, and data exfiltration all depend on name resolution, yet many enterprises have little policy control or visibility at the DNS layer.",
    solution:
      "The platform enforces DNS policy across managed networks, integrates threat intelligence feeds to block malicious domains, and exposes analytics dashboards so operators can see what is happening on their network in real time.",
    deepDive: [
      "The hard part of DNS security is not blocking a list of domains; it is making policy decisions predictable at query volume while keeping the enforcement path observable. A policy change should have a clear scope, an owner, and an audit trail, and it should not require a resolver restart to take effect. Threat intelligence adds a second problem: feeds disagree, expire, and produce false positives, so the platform needs a normalization step and a way to explain why a domain was blocked.",
      "Operationally, the useful questions are per network: which policy is active, which feed produced a hit, and what changed in the last hour. The case study focuses on those operator-facing flows rather than on a raw block count, because a block count without context is not an actionable security signal.",
    ],
    features: [
      "DNS filtering with blocking policy",
      "Threat intelligence feed integration",
      "Policy enforcement across managed networks",
      "Analytics dashboards for DNS activity",
      "Secure network access management",
      "Centralized administration for operators",
    ],
    architecture: [
      "DNS filtering and policy enforcement layer",
      "Threat intelligence normalization pipeline",
      "Analytics and reporting services",
      "Secure network access management",
      "Backend APIs for platform administration",
    ],
    contribution: [
      "Developed backend components of the platform as part of the IotaScales team.",
      "Worked on policy enforcement and secure network access features.",
      "Contributed across DNS, security, and platform domains in a production suite.",
    ],
    challenges: [
      "Enforcing DNS policy without adding avoidable latency to legitimate resolution.",
      "Normalizing multiple threat intelligence sources into a single enforcement path.",
    ],
    results: [
      "Delivered as part of the production Atrios security suite.",
      "Gives operators DNS-layer visibility and control across managed networks.",
    ],
    technologies: ["DNS", "Go", "Node.js", "Threat Intelligence", "Policy Enforcement", "Analytics"],
    keywords: [
      "enterprise DNS security platform",
      "DNS filtering",
      "threat intelligence integration",
      "DNS policy enforcement",
      "secure network access",
    ],
    related: ["dewalla", "omnipriv-pam", "atrios-ipam"],
  },
  {
    slug: "omnipriv-pam",
    name: "OmniPriv PAM",
    category: "cybersecurity",
    tier: "flagship",
    featured: true,
    year: "2025",
    role: "Backend Developer",
    company: "IotaScales",
    status: "Production platform",
    tagline: "Privileged access management with vaulting and audit",
    summary:
      "Privileged access management platform providing credential vaulting, role-based access control, session monitoring, and audit logging.",
    seoDescription:
      "Privileged access management platform with credential vaulting, RBAC, session monitoring, and audit logging for enterprise admin access.",
    overview:
      "OmniPriv is a privileged access management platform that controls, monitors, and audits access to privileged credentials and administrative sessions across an organization. It brings vaulting, authorization, session visibility, and audit evidence into a single platform.",
    problem:
      "Privileged credentials are the highest-value target in most intrusion paths. Organizations struggle with shared administrator passwords, unmonitored sessions, and no defensible audit trail for privileged actions.",
    solution:
      "OmniPriv stores privileged credentials in an encrypted vault, enforces role-based access so people receive only the privileges they need, records privileged sessions, and writes a complete audit log of privileged activity.",
    deepDive: [
      "A PAM platform is only as trustworthy as its audit trail. Credential vaulting, role checks, and session recording all produce events, and those events must be attributable to a person, a policy, and a time. The design challenge is to keep that chain complete without making routine admin work so slow that people route around it.",
      "Least privilege is a product problem as much as a cryptography problem. Roles need to map to real responsibilities, approvals need a clear expiry, and break-glass access needs to be visible. The backend work focuses on API contracts, session state, and audit flows that make those guarantees reviewable.",
    ],
    features: [
      "Encrypted credential vaulting",
      "Role-based access control",
      "Privileged session monitoring",
      "Audit logging for privileged actions",
      "Centralized administration",
      "Access policy enforcement",
    ],
    architecture: [
      "Credential vault service with encrypted storage",
      "Role-based authorization engine",
      "Session monitoring and recording pipeline",
      "Audit logging and reporting services",
      "Administration APIs",
    ],
    contribution: [
      "Developed backend services as part of the IotaScales platform team.",
      "Built API endpoints for access control, sessions, and audit flows.",
      "Contributed to a production PAM platform used in enterprise deployments.",
    ],
    challenges: [
      "Keeping the audit trail complete and trustworthy for every privileged action.",
      "Enforcing least privilege without blocking legitimate administrative workflows.",
    ],
    results: [
      "Shipped as part of the Atrios security suite.",
      "Provides a unified, audited path to privileged access.",
    ],
    technologies: ["Node.js", "REST APIs", "RBAC", "Credential Vaulting", "Session Monitoring", "Audit Logging"],
    keywords: [
      "privileged access management platform",
      "credential vaulting",
      "role-based access control",
      "session monitoring",
      "audit logging",
      "PAM developer",
    ],
    related: ["atrios-dns-security", "genesis-vpn", "go-temp"],
  },
  {
    slug: "cyber-sentinel",
    name: "CyberSentinel",
    category: "cybersecurity",
    tier: "flagship",
    featured: true,
    year: "2025",
    role: "Platform Contributor",
    company: "NetraLink Solutions",
    status: "Private platform",
    tagline: "Endpoint security, telemetry, and compliance",
    summary:
      "Enterprise endpoint security and compliance platform for collecting security telemetry, managing policies, detecting incidents, and coordinating response.",
    seoDescription:
      "Enterprise endpoint security and compliance platform built with Go, React, Flutter, Kafka, ClickHouse, and Redis for fleet telemetry.",
    overview:
      "CyberSentinel is an enterprise endpoint security and compliance platform. It collects security telemetry from endpoints, manages policy across fleets, detects incidents, and coordinates response through a web console and mobile app.",
    problem:
      "Endpoint fleets generate enormous volumes of security telemetry, but turning that data into policy enforcement, incident detection, and coordinated response requires a platform that spans agents, streaming data, analytics, and operator tooling.",
    solution:
      "CyberSentinel brings endpoint agents, event streaming, analytics storage, policy management, and a multi-platform console together. Operators see incidents, apply policy, and coordinate response from one system.",
    deepDive: [
      "Endpoint security platforms are data systems before they are dashboards. Agents emit a continuous stream of events, and the platform has to ingest, normalize, store, and query that stream without losing the events that matter. Kafka provides the buffer; ClickHouse provides the analytical store; PostgreSQL holds platform state; Redis absorbs hot reads.",
      "The multi-surface design adds consistency problems. A policy changed in the web console must reach the endpoint agent and be reflected in the mobile view. The case study focuses on the service boundaries and the operator workflows that keep those surfaces aligned.",
    ],
    features: [
      "Endpoint telemetry collection",
      "Security policy management",
      "Incident detection and triage",
      "Response coordination",
      "Web administration console",
      "Companion mobile application",
    ],
    architecture: [
      "Go backend services for platform APIs and orchestration",
      "C-based endpoint agent components",
      "Kafka event streaming between services",
      "ClickHouse analytics store for security telemetry",
      "PostgreSQL for platform state and Redis for caching",
      "React and TypeScript web console plus Flutter mobile app",
    ],
    contribution: [
      "Contributed across backend services, the web console, and cross-service workflows in a multi-surface security product.",
      "Worked across a codebase spanning backend services, endpoint agents, the web console, and a mobile app.",
      "Contributed to telemetry, policy, and incident workflows in a multi-service security product.",
    ],
    challenges: [
      "Handling high-volume endpoint telemetry without losing events or visibility.",
      "Keeping policy and incident state consistent across services and clients.",
    ],
    results: [
      "A multi-surface security platform covering desktop, web, and mobile.",
      "Private production codebase; details are summarized at a high level.",
    ],
    technologies: ["Go", "C", "React", "TypeScript", "Flutter", "Kafka", "ClickHouse", "PostgreSQL", "Redis"],
    keywords: [
      "endpoint security platform",
      "security telemetry",
      "incident response platform",
      "Go security engineering",
      "compliance platform",
      "Kafka ClickHouse",
    ],
    related: ["dewalla", "omnipriv-pam", "atrios-dns-security"],
  },
  {
    slug: "dewalla",
    name: "DeWall",
    category: "cybersecurity",
    tier: "flagship",
    featured: true,
    year: "2025",
    role: "Platform Contributor",
    company: "NetraLink Solutions",
    status: "Private platform",
    tagline: "Self-hosted DNS firewall and management",
    summary:
      "Self-hosted DNS firewall and management platform for operating DNS services, applying domain-blocking policies, and managing multi-site deployments.",
    seoDescription:
      "Self-hosted DNS firewall and management platform built with Go, PowerDNS, PostgreSQL, ClickHouse, Redis, NATS, and React.",
    overview:
      "DeWall is a self-hosted DNS firewall and management platform. It lets teams operate their own DNS services, apply domain-blocking policy, and manage deployments across multiple sites from a central console.",
    problem:
      "Organizations that want DNS-level control often face a choice between cloud filtering services and hand-built DNS infrastructure. Self-hosting requires policy management, authoritative DNS integration, analytics, and multi-site administration.",
    solution:
      "DeWall packages DNS service operation, domain-blocking policy, and multi-site management into one platform, using PowerDNS for resolution, Go for backend services, and an analytics store for DNS activity.",
    deepDive: [
      "Self-hosted DNS filtering trades a vendor dependency for operational responsibility. The platform has to manage PowerDNS instances, distribute blocking policy, and keep query analytics queryable without turning the resolver into a bottleneck. NATS carries service messages; ClickHouse stores the query history; PostgreSQL holds configuration.",
      "Multi-site deployments make policy distribution the central design problem. An operator needs to know which sites received a policy, which are stale, and how to roll back safely. The case study focuses on those control-plane concerns rather than on a single-site demo.",
    ],
    features: [
      "Self-hosted DNS service management",
      "Domain-blocking policy enforcement",
      "Multi-site deployment administration",
      "DNS activity analytics",
      "Central web management console",
      "Service-to-service messaging",
    ],
    architecture: [
      "Go backend services and management APIs",
      "PowerDNS integration for DNS resolution",
      "PostgreSQL for platform configuration and state",
      "ClickHouse for DNS query analytics",
      "Redis for caching and fast state",
      "NATS for service messaging",
      "React and TypeScript management console",
    ],
    contribution: [
      "Contributed to backend services and DNS platform workflows in a Go and PowerDNS stack.",
      "Worked across DNS service management, policy, and deployment administration.",
      "Contributed within a Go, PowerDNS, and analytics-oriented stack.",
    ],
    challenges: [
      "Coordinating policy changes across DNS instances and sites without stale state.",
      "Making high-volume DNS query data queryable without slowing resolution.",
    ],
    results: [
      "A self-hosted alternative to cloud-only DNS filtering.",
      "Private production codebase; details are summarized at a high level.",
    ],
    technologies: ["Go", "PowerDNS", "React", "TypeScript", "PostgreSQL", "ClickHouse", "Redis", "NATS"],
    keywords: [
      "self-hosted DNS firewall",
      "DNS filtering platform",
      "PowerDNS management",
      "domain blocking policy",
      "multi-site DNS",
      "Go DNS backend",
    ],
    related: ["atrios-dns-security", "cyber-sentinel", "atrios-ipam"],
  },
  {
    slug: "civilex",
    name: "Civilex",
    category: "web",
    tier: "flagship",
    featured: true,
    year: "2025",
    role: "Full Stack Developer",
    status: "Open source",
    tagline: "Judiciary case management for Pakistan",
    summary:
      "Judiciary case-management system for civil, criminal, and family court workflows in Pakistan, covering cases, hearings, documents, payments, notifications, and role-based workflows.",
    seoDescription:
      "Judiciary case-management platform for Pakistani courts, built with Next.js and Supabase: cases, hearings, documents, payments, and notifications.",
    overview:
      "Civilex is a judiciary case-management system designed around how courts actually work: cases move through stages, hearings are scheduled, documents accumulate, payments are recorded, and notifications keep parties informed. It is built with Next.js, TypeScript, Supabase, PostgreSQL, and Tailwind CSS.",
    problem:
      "Court workflows are document-heavy and status-driven. Without a shared system, case status, hearing schedules, and filings become fragmented across registers, files, and informal communication.",
    solution:
      "Civilex gives each role a scoped view of the same case record — with structured case stages, hearing scheduling, document management, payments, notifications, and role-based access.",
    deepDive: [
      "Court workflows are state machines with documents attached. A case moves through stages, hearings are scheduled, filings are recorded, and payments and notifications follow. The data model has to preserve history while letting each role see only the part of the case it needs.",
      "The interesting engineering is in the permission model and the workflow transitions, not the CRUD screens. Supabase provides authentication and PostgreSQL; the application enforces role-scoped access and keeps case events auditable. The case study describes the workflow boundaries and the decisions that keep civil, criminal, and family proceedings distinct.",
    ],
    features: [
      "Case management for civil, criminal, and family courts",
      "Hearing scheduling and tracking",
      "Document management",
      "Payments workflows",
      "Notifications for parties and staff",
      "Role-based access and workflows",
    ],
    architecture: [
      "Next.js App Router application with TypeScript",
      "Supabase auth and PostgreSQL data layer",
      "Role-based route and action authorization",
      "Document and case record workflows",
      "Tailwind CSS design system",
    ],
    contribution: [
      "Designed and built the application end to end.",
      "Implemented case, hearing, document, payment, and notification workflows.",
      "Modeled role-based access for court staff, parties, and administrators.",
    ],
    challenges: [
      "Modeling legal case stages that differ across civil, criminal, and family proceedings.",
      "Keeping role-scoped visibility correct across a shared case record.",
    ],
    results: [
      "A working, open-source case-management platform tailored to Pakistani court workflows.",
      "Public repository available on GitHub.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    keywords: [
      "judiciary case management system",
      "court management platform Pakistan",
      "Next.js Supabase application",
      "legal case management software",
      "hearing scheduling",
    ],
    github: "https://github.com/chmuhammadasim/Civilex-next",
    related: ["theralearn", "lapshop", "social-media-graph-api"],
  },
  {
    slug: "genesis-vpn",
    name: "GenesisVPN",
    category: "infrastructure",
    tier: "flagship",
    featured: true,
    year: "2025",
    role: "Backend Developer",
    company: "IotaScales",
    status: "Production platform",
    tagline: "Secure VPN management and administration",
    summary:
      "Secure VPN management platform supporting user provisioning, subscription management, traffic monitoring, and centralized administration.",
    seoDescription:
      "Secure VPN management platform covering user provisioning, subscriptions, traffic monitoring, and centralized administration at IotaScales.",
    overview:
      "GenesisVPN is a VPN management platform that centralizes the operational lifecycle of a VPN service: provisioning users, managing subscriptions, monitoring traffic, and administering the deployment. A Flutter client accompanies the backend platform.",
    problem:
      "Running VPN infrastructure at scale is an operational problem as much as a networking one. User provisioning, subscription state, and traffic visibility are often handled with scattered scripts and manual processes.",
    solution:
      "GenesisVPN centralizes the entire VPN lifecycle — users, subscriptions, traffic accounting, and administration — so operators manage the service from one place instead of a collection of scripts.",
    deepDive: [
      "VPN management is a provisioning system with a billing edge. Users need accounts, subscriptions need a lifecycle, and traffic needs to be measured per user and per plan. The backend has to keep those states consistent when a payment fails, a plan changes, or a device reconnects.",
      "The Flutter client is the visible surface, but the hard work is in the control plane: idempotent provisioning, clear subscription states, and traffic accounting that operators can reconcile. The case study focuses on those lifecycle guarantees.",
    ],
    features: [
      "User provisioning and lifecycle management",
      "Subscription management",
      "Traffic monitoring and accounting",
      "Centralized administration",
      "Flutter client application",
      "Backend management APIs",
    ],
    architecture: [
      "VPN provisioning services",
      "Subscription lifecycle services",
      "Traffic monitoring and accounting",
      "Centralized administration layer",
      "Flutter client for end users",
    ],
    contribution: [
      "Built backend services for provisioning, subscriptions, and monitoring at IotaScales.",
      "Contributed to a production VPN platform in the Atrios infrastructure suite.",
      "Worked across API, data, and client integration concerns.",
    ],
    challenges: [
      "Keeping subscription state consistent across providers and the platform.",
      "Accounting traffic accurately for many concurrent users.",
    ],
    results: [
      "Shipped within the Atrios infrastructure suite.",
      "Replaced manual VPN administration with centralized management.",
    ],
    technologies: ["VPN", "Flutter", "Backend APIs", "Subscription Management", "Traffic Monitoring"],
    keywords: [
      "VPN management platform",
      "VPN user provisioning",
      "subscription management",
      "traffic monitoring",
      "secure remote access",
      "Flutter VPN app",
    ],
    related: ["atrios-ipam", "astro-dome", "omnipriv-pam"],
  },
  {
    slug: "atrios-ipam",
    name: "Atrios IPAM",
    category: "infrastructure",
    tier: "flagship",
    featured: false,
    year: "2025",
    role: "Backend Developer",
    company: "IotaScales",
    status: "Production platform",
    tagline: "IP address management and network inventory",
    summary:
      "IP address management solution enabling subnet planning, IP tracking, allocation management, and network inventory monitoring.",
    seoDescription:
      "IP address management platform for subnet planning, IP tracking, allocation management, and network inventory monitoring at IotaScales.",
    overview:
      "Atrios IPAM is an IP address management solution for network teams. It provides subnet planning, IP tracking, allocation management, and network inventory monitoring so address space stays accurate as networks grow.",
    problem:
      "Growing networks lose track of IP allocations. Conflicts, forgotten assignments, and poor inventory visibility lead to outages, onboarding delays, and audit failures.",
    solution:
      "Atrios IPAM maintains a structured, queryable source of truth for subnets and addresses — supporting planning, allocation, and inventory monitoring from one platform.",
    deepDive: [
      "IP address management looks like a CRUD problem until the network grows. Subnets nest, allocations overlap, and stale records create conflicts that surface as outages. A useful IPAM model has to represent hierarchy, ownership, and time, not just a flat list of addresses.",
      "The engineering focus is on allocation integrity: preventing double allocation, explaining why an address is unavailable, and keeping inventory queries fast as the address space grows. The case study describes the data model and the operator workflows around it.",
    ],
    features: [
      "Subnet planning",
      "IP address tracking",
      "Allocation management",
      "Network inventory monitoring",
      "Management APIs for integrations",
      "Centralized network visibility",
    ],
    architecture: [
      "Subnet and address data model",
      "Allocation tracking services",
      "Network inventory monitoring",
      "Management APIs",
    ],
    contribution: [
      "Developed backend allocation and inventory services at IotaScales.",
      "Contributed to a production IPAM platform in the Atrios suite.",
    ],
    challenges: [
      "Modeling hierarchical networks cleanly while keeping allocation queries fast.",
      "Detecting conflicts and stale allocations as address space changes.",
    ],
    results: [
      "Part of the production Atrios infrastructure suite.",
      "Provides structured, queryable IP inventory for network teams.",
    ],
    technologies: ["IPAM", "Networking", "REST APIs", "Network Automation"],
    keywords: [
      "IP address management",
      "IPAM platform",
      "subnet planning",
      "IP allocation management",
      "network inventory",
    ],
    related: ["atrios-dns-security", "genesis-vpn", "astro-dome"],
  },
  {
    slug: "astro-dome",
    name: "Astro Dome",
    category: "infrastructure",
    tier: "flagship",
    featured: false,
    year: "2025",
    role: "Backend Developer",
    company: "IotaScales",
    status: "Production platform",
    tagline: "Infrastructure administration, monitoring, and orchestration",
    summary:
      "Infrastructure management platform designed for centralized administration, monitoring, automation, and secure service orchestration.",
    seoDescription:
      "Infrastructure management platform for centralized administration, monitoring, automation, and secure service orchestration at IotaScales.",
    overview:
      "Astro Dome is an infrastructure management platform built around centralized administration, monitoring, automation, and secure service orchestration. It gives operators one place to see and act on infrastructure instead of managing hosts and services piecemeal.",
    problem:
      "Infrastructure sprawl makes centralized administration, monitoring, and automation difficult. Manual operations across heterogeneous systems introduce risk and slow down routine work.",
    solution:
      "Astro Dome centralizes infrastructure administration, provides monitoring visibility, and automates routine operations through secure service orchestration.",
    deepDive: [
      "Infrastructure automation is a trust problem. An operator wants routine work to happen without a human, but risky changes still need a checkpoint. The platform has to separate observation, automation, and approval while keeping an audit trail across all three.",
      "The backend work centers on orchestration APIs, monitoring hooks, and operation state. The case study focuses on how the platform represents an operation, how it reports progress, and how it fails safely when a target is unreachable.",
    ],
    features: [
      "Centralized administration",
      "Infrastructure monitoring",
      "Automation workflows",
      "Secure service orchestration",
      "Operational visibility",
    ],
    architecture: [
      "Centralized administration layer",
      "Monitoring and alerting services",
      "Automation workflows",
      "Secure orchestration APIs",
    ],
    contribution: [
      "Built backend orchestration and monitoring components at IotaScales.",
      "Contributed to a production infrastructure platform in the Atrios suite.",
    ],
    challenges: [
      "Orchestrating operations securely across heterogeneous infrastructure.",
      "Balancing automation with human approval for risky changes.",
    ],
    results: [
      "Shipped within the Atrios infrastructure suite.",
      "Automates routine infrastructure operations with centralized control.",
    ],
    technologies: ["Infrastructure", "Automation", "Monitoring", "Orchestration", "REST APIs"],
    keywords: [
      "infrastructure management platform",
      "service orchestration",
      "infrastructure automation",
      "monitoring platform",
      "centralized administration",
    ],
    related: ["atrios-ipam", "genesis-vpn", "cyber-sentinel"],
  },

  /* ── Products & open source ───────────────────────────────── */
  {
    slug: "theralearn",
    name: "TheraLearn",
    category: "web",
    tier: "project",
    featured: false,
    year: "2024",
    role: "Full Stack Developer",
    status: "Open source",
    tagline: "Learning platform for children with Down syndrome",
    summary:
      "MERN-based educational platform with gamified therapy modules, psychologist dashboards, progress tracking, blogs, and role-based management.",
    seoDescription:
      "MERN learning platform for children with Down syndrome: gamified therapy modules, psychologist dashboards, progress tracking, and role management.",
    overview:
      "TheraLearn is a comprehensive educational platform for children with Down syndrome. It combines gamified therapy modules — including memory games and interactive exercises — with psychologist dashboards, progress tracking, educational content, and role-based management. The stack is React, Node.js, Express, and MongoDB.",
    problem:
      "Children with Down syndrome benefit from structured, repetitive, engaging cognitive therapy, but families and therapists often lack a shared platform to deliver exercises and track progress.",
    solution:
      "TheraLearn pairs engaging therapy modules with professional tooling: psychologists monitor progress, children work through gamified exercises, and administrators manage content and roles.",
    features: [
      "Gamified therapy and memory-game modules",
      "Psychologist dashboards",
      "Progress tracking",
      "Blogs and educational content",
      "Role-based management",
      "Gesture and voice interaction experiments",
    ],
    architecture: [
      "React frontend with game-like therapy modules",
      "Node.js and Express REST API",
      "MongoDB for progress and content data",
      "Role-based access for children, psychologists, and administrators",
    ],
    contribution: [
      "Designed and built the full-stack application end to end.",
      "Implemented role-based access, dashboards, and progress tracking.",
      "Open-sourced the codebase on GitHub.",
    ],
    challenges: [
      "Designing therapy flows that stay engaging across repeated sessions.",
      "Modeling progress data so clinicians can act on it.",
    ],
    results: [
      "A complete platform for Down syndrome cognitive development.",
      "Public repository available on GitHub.",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    keywords: [
      "Down syndrome learning platform",
      "TheraLearn",
      "MERN educational platform",
      "gamified therapy modules",
      "psychologist dashboard",
    ],
    github: "https://github.com/chmuhammadasim/TheraLearn",
    related: ["civilex", "lapshop", "dappcord"],
  },
  {
    slug: "social-media-graph-api",
    name: "Social Media Graph API Integration",
    category: "web",
    tier: "project",
    featured: false,
    year: "2024",
    role: "Backend Developer",
    status: "Professional project",
    tagline: "One backend for five social platforms",
    summary:
      "Unified backend integration for Facebook, Instagram, X (Twitter), Pinterest, and YouTube APIs supporting analytics, content management, and automation workflows.",
    seoDescription:
      "Unified backend integration for Facebook, Instagram, X, Pinterest, and YouTube Graph APIs, supporting analytics, content management, and automation workflows.",
    overview:
      "A unified backend integration that connects five major social platforms — Facebook, Instagram, X, Pinterest, and YouTube — behind one internal API. It supports analytics collection, content management, and automation workflows without forcing every consumer to understand five different API contracts.",
    problem:
      "Integrating several social platforms multiplies auth flows, rate limits, pagination rules, and data shapes. Each additional platform makes analytics and content automation harder to maintain.",
    solution:
      "A normalized backend layer wraps each platform API behind consistent internal endpoints for account data, content, and analytics, so product features can work across platforms uniformly.",
    features: [
      "OAuth connection for five platforms",
      "Normalized analytics data",
      "Content management workflows",
      "Automation support",
      "Unified backend endpoints",
    ],
    architecture: [
      "Node.js integration services",
      "Per-platform API adapters",
      "OAuth token handling",
      "Normalized data models for analytics and content",
    ],
    contribution: [
      "Built the backend integration layer for all five platform APIs.",
      "Normalized platform responses for analytics and content workflows.",
    ],
    challenges: [
      "Reconciling different rate limits and pagination models across platforms.",
      "Keeping token refresh and permissions consistent across providers.",
    ],
    results: [
      "A single backend surface for multi-platform social workflows.",
      "Analytics, content management, and automation supported from one integration layer.",
    ],
    technologies: ["Node.js", "REST APIs", "OAuth", "Graph APIs"],
    keywords: [
      "social media API integration",
      "Graph API backend",
      "Facebook Instagram API integration",
      "YouTube Pinterest API",
      "social analytics backend",
    ],
    related: ["civilex", "weathery", "lapshop"],
  },
  {
    slug: "atrios-authenticator",
    name: "Atrios Authenticator",
    category: "mobile",
    tier: "project",
    featured: false,
    year: "2024",
    role: "Mobile Developer",
    status: "Open source",
    tagline: "Cross-platform TOTP authenticator",
    summary:
      "Cross-platform authenticator app for generating TOTP two-factor codes, scanning QR codes, and managing accounts.",
    seoDescription:
      "Flutter TOTP authenticator app with QR code scanning, multi-account management, and cross-platform support.",
    overview:
      "Atrios Authenticator is a Flutter application for two-factor authentication. It generates time-based one-time passwords (TOTP), scans QR codes to enroll accounts, and keeps multiple accounts organized on a phone or desktop.",
    problem:
      "Second-factor codes are essential, but users need a straightforward, cross-platform way to enroll accounts and retrieve codes without depending on a single ecosystem.",
    solution:
      "A Flutter authenticator that supports TOTP generation, QR enrollment, and account management with a consistent interface across platforms.",
    features: [
      "TOTP code generation",
      "QR code scanning for enrollment",
      "Account management",
      "Cross-platform Flutter client",
    ],
    architecture: [
      "Flutter application with Dart",
      "TOTP generation logic",
      "QR scanning and enrollment flow",
      "Local account storage",
    ],
    contribution: [
      "Built the Flutter application and its authentication flows.",
      "Implemented TOTP generation, QR scanning, and account management.",
    ],
    challenges: [
      "Keeping code generation reliable while handling clock and enrollment edge cases.",
      "Maintaining a clear multi-account experience across screen sizes.",
    ],
    results: [
      "A working open-source authenticator for TOTP-based two-factor authentication.",
      "Public repository available on GitHub.",
    ],
    technologies: ["Flutter", "Dart", "TOTP", "QR Scanning"],
    keywords: [
      "Flutter authenticator app",
      "TOTP two-factor authentication",
      "QR code authenticator",
      "cross-platform 2FA app",
    ],
    github: "https://github.com/chmuhammadasim/Atrios-Authenticator",
    related: ["omnipriv-pam", "moca-test", "genesis-vpn"],
  },
  {
    slug: "go-temp",
    name: "Go_Temp",
    category: "web",
    tier: "project",
    featured: false,
    year: "2024",
    role: "Backend Developer",
    status: "Open source",
    tagline: "Reusable Go backend template",
    summary:
      "Reusable Go backend template with authentication, authorization, file management, audit logging, Redis, SQLite/PostgreSQL, and Docker.",
    seoDescription:
      "Go_Temp is a reusable Go backend template with Gin, GORM, JWT auth, authorization, file management, audit logging, Redis, PostgreSQL/SQLite, and Docker.",
    overview:
      "Go_Temp is a backend template for new Go services. It packages the concerns every service needs — authentication, authorization, file management, audit logging, configuration, and containerized delivery — into a clean starting point built with Gin, GORM, Redis, SQLite/PostgreSQL, and Docker.",
    problem:
      "Starting a Go service from scratch repeatedly re-implements auth, permissions, file handling, logging, and deployment scaffolding. That duplication is slow and inconsistent.",
    solution:
      "Go_Temp provides a structured, security-minded foundation so new services start with proven auth, authorization, audit logging, storage, and container setup instead of ad-hoc copies.",
    features: [
      "JWT authentication",
      "Authorization and access control",
      "File management",
      "Audit logging",
      "Redis-backed state",
      "SQLite and PostgreSQL support",
      "Dockerized delivery",
    ],
    architecture: [
      "Gin HTTP layer",
      "GORM persistence layer",
      "JWT authentication middleware",
      "Audit logging pipeline",
      "Redis cache and session support",
      "Docker-based local and deployment setup",
    ],
    contribution: [
      "Designed and built the template end to end.",
      "Implemented auth, authorization, file management, and audit logging.",
      "Packaged the service for repeatable Docker-based delivery.",
    ],
    challenges: [
      "Keeping the template opinionated enough to be useful without locking teams in.",
      "Making audit logging and authorization consistent across handlers.",
    ],
    results: [
      "A reusable starting point for secure Go services.",
      "Public repository available on GitHub.",
    ],
    technologies: ["Go", "Gin", "GORM", "JWT", "Redis", "PostgreSQL", "SQLite", "Docker"],
    keywords: [
      "Go backend template",
      "Gin GORM template",
      "JWT authentication Go",
      "Go REST API starter",
      "audit logging Go",
    ],
    github: "https://github.com/chmuhammadasim/Go_Temp",
    related: ["omnipriv-pam", "cyber-sentinel", "mern-s3-bucket"],
  },
  {
    slug: "packet-tracer-network",
    name: "Enterprise Network Simulation",
    category: "networking",
    tier: "project",
    featured: false,
    year: "2023",
    role: "Network Engineer (Coursework)",
    status: "Academic project",
    tagline: "Routed, switched, and firewalled network topology",
    summary:
      "Cisco Packet Tracer network simulation demonstrating routers, switches, VLANs, DHCP, servers, firewalling, and wireless networking.",
    seoDescription:
      "A Cisco Packet Tracer enterprise network simulation demonstrating routers, switches, VLANs, DHCP, servers, firewalling, and wireless configuration.",
    overview:
      "A computer-networking project built in Cisco Packet Tracer 8.2.1. The simulation models an enterprise topology with routers, switches, VLAN segmentation, DHCP, servers, firewalling, and wireless access.",
    problem:
      "Networking concepts are difficult to learn from diagrams alone. A realistic topology requires configuring devices, segmenting traffic, and validating that services actually work end to end.",
    solution:
      "The project builds and validates an enterprise-style network in Packet Tracer, covering routing, switching, VLANs, DHCP, servers, firewall rules, and wireless configuration.",
    features: [
      "Router and switch configuration",
      "VLAN segmentation",
      "DHCP address services",
      "Server services",
      "Firewall policy",
      "Wireless networking",
    ],
    architecture: [
      "Cisco Packet Tracer 8.2.1 simulation",
      "Routed and switched enterprise topology",
      "VLAN-based segmentation",
      "DHCP and server services",
      "Firewall and wireless configuration",
    ],
    contribution: [
      "Designed and configured the full simulated topology.",
      "Validated connectivity, segmentation, and service configuration.",
    ],
    challenges: [
      "Making routing and VLAN boundaries behave correctly across the topology.",
      "Configuring firewall policy without breaking required services.",
    ],
    results: [
      "A documented, working enterprise network simulation.",
      "Public repository available on GitHub.",
    ],
    technologies: ["Cisco Packet Tracer", "VLANs", "DHCP", "Routing", "Switching", "Firewall"],
    keywords: [
      "Cisco Packet Tracer project",
      "enterprise network simulation",
      "VLAN configuration project",
      "DHCP firewall networking lab",
    ],
    github:
      "https://github.com/chmuhammadasim/Computer-Networking-Project-Packet-Tracer",
    related: ["atrios-ipam", "atrios-dns-security", "genesis-vpn"],
  },
  {
    slug: "moca-test",
    name: "MOCA Test",
    category: "mobile",
    tier: "project",
    featured: false,
    year: "2023",
    role: "Flutter Developer",
    company: "Fazaia Medical College",
    status: "Professional project",
    tagline: "Clinical cognitive assessment on Flutter",
    summary:
      "Flutter application implementing the Montreal Cognitive Assessment, with GetX state management and Firebase-backed storage and analytics.",
    seoDescription:
      "Flutter app implementing the Montreal Cognitive Assessment for clinical use, with GetX state management and Firebase storage and analytics.",
    overview:
      "MOCA Test is a Flutter application that implements the Montreal Cognitive Assessment (MOCA) workflow for clinical use. It uses GetX for state management and Firebase for cloud data storage and analytics.",
    problem:
      "Cognitive assessments need to be administered consistently and recorded reliably. Paper workflows make both harder, especially when results need to be reviewed later.",
    solution:
      "A Flutter app guides the assessment workflow, captures results, and stores them in Firebase so clinicians have a durable, queryable record.",
    features: [
      "MOCA assessment workflow",
      "GetX state management",
      "Firebase cloud storage",
      "Firebase analytics",
      "Clinical-use mobile interface",
    ],
    architecture: [
      "Flutter and Dart application",
      "GetX state and navigation",
      "Firebase data storage",
      "Firebase analytics",
    ],
    contribution: [
      "Built the MOCA assessment app with Flutter and GetX.",
      "Integrated Firebase for cloud storage and analytics.",
    ],
    challenges: [
      "Keeping the assessment flow consistent and easy to administer.",
      "Structuring results for later clinical review.",
    ],
    results: [
      "Delivered a clinical cognitive-assessment app for Fazaia Medical College.",
      "Used in a healthcare setting.",
    ],
    technologies: ["Flutter", "Dart", "GetX", "Firebase"],
    keywords: [
      "MOCA cognitive assessment app",
      "Flutter healthcare app",
      "Montreal Cognitive Assessment software",
      "GetX Firebase app",
    ],
    related: ["atrios-authenticator", "theralearn", "genesis-vpn"],
  },
  {
    slug: "weathery",
    name: "Weathery",
    category: "web",
    tier: "project",
    featured: false,
    year: "2023",
    role: "Full Stack Developer",
    company: "Iotascale",
    status: "Professional project",
    tagline: "MEAN-stack weather forecast SPA",
    summary:
      "MEAN-stack weather application with external weather API integration, Angular + RxJS frontend, and deployment on Google Cloud Platform.",
    seoDescription:
      "Weathery is a MEAN-stack weather forecast single-page application with Angular, RxJS, Node.js, Express, MongoDB Atlas, and Google Cloud Platform deployment.",
    overview:
      "Weathery is a weather-forecast single-page application built during the Iotascale internship. It uses Angular and RxJS on the frontend, Node.js and Express for REST APIs, MongoDB Atlas for storage, and runs on Google Cloud Platform.",
    problem:
      "A weather product needs fast, responsive updates, clean async state handling, and a backend that can integrate third-party data reliably.",
    solution:
      "Weathery fetches forecast data from external weather APIs through REST endpoints and presents it in a responsive Angular SPA with reactive state management.",
    features: [
      "Weather forecast single-page app",
      "External weather API integration",
      "REST API backend",
      "MongoDB Atlas storage",
      "GCP deployment",
    ],
    architecture: [
      "Angular SPA with RxJS state",
      "Node.js and Express REST APIs",
      "MongoDB Atlas persistence",
      "Google Cloud Platform deployment",
    ],
    contribution: [
      "Developed the Weathery SPA with Angular and RxJS.",
      "Created REST APIs and integrated external weather data.",
      "Deployed and operated the application on GCP.",
    ],
    challenges: [
      "Handling async weather data cleanly in reactive UI state.",
      "Keeping API and deployment configuration production-ready.",
    ],
    results: [
      "A deployed weather application built during the Iotascale internship.",
      "End-to-end ownership from UI to cloud deployment.",
    ],
    technologies: ["Angular", "RxJS", "Node.js", "Express", "MongoDB", "GCP"],
    keywords: [
      "MEAN stack weather app",
      "Angular weather application",
      "RxJS weather SPA",
      "GCP deployed Angular app",
    ],
    related: ["social-media-graph-api", "lapshop", "civilex"],
  },
  {
    slug: "lapshop",
    name: "LapShop Ecommerce",
    category: "web",
    tier: "project",
    featured: false,
    year: "2024",
    role: "Full Stack Developer",
    status: "Personal project",
    tagline: "Full-featured MERN e-commerce application",
    summary:
      "E-commerce application with product and user management, JWT auth, an admin dashboard, and cloud image hosting.",
    seoDescription:
      "LapShop is a full-featured MERN e-commerce application with product and user management, JWT authentication, an admin dashboard, and cloud image hosting.",
    overview:
      "LapShop is a MERN e-commerce application covering the core storefront and administration loop: product catalog, user accounts, authentication, an admin dashboard, and cloud-hosted product imagery.",
    problem:
      "A usable storefront needs more than a product grid — it needs accounts, protected routes, catalog management, and a way to handle images and orders.",
    solution:
      "LapShop implements a complete MERN storefront with JWT-based authentication, role-aware admin tooling, product and user management, and cloud image hosting.",
    features: [
      "Product and user management",
      "JWT authentication",
      "Admin dashboard",
      "Cloud image hosting",
      "Responsive storefront",
    ],
    architecture: [
      "React storefront",
      "Node.js and Express REST API",
      "MongoDB data layer",
      "JWT authentication and protected routes",
      "Cloud image hosting",
    ],
    contribution: [
      "Built the full-stack e-commerce application.",
      "Implemented authentication, administration, and product workflows.",
    ],
    challenges: [
      "Separating customer and administrator capabilities cleanly.",
      "Keeping product media and catalog data consistent.",
    ],
    results: [
      "A complete MERN e-commerce implementation.",
      "Covers storefront, admin, auth, and media handling.",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    keywords: [
      "MERN ecommerce app",
      "React Node MongoDB store",
      "JWT admin dashboard",
      "full stack ecommerce project",
    ],
    related: ["theralearn", "mern-s3-bucket", "civilex"],
  },
  {
    slug: "mern-s3-bucket",
    name: "MERN S3 Bucket MiniApp",
    category: "web",
    tier: "project",
    featured: false,
    year: "2023",
    role: "Full Stack Developer",
    status: "Open source",
    tagline: "Image uploads to S3 with a Mongo-backed gallery",
    summary:
      "Image-upload application that stores files in AWS S3, saves image URLs in MongoDB, and displays them in a gallery.",
    seoDescription:
      "A MERN and AWS S3 image-upload mini app that stores files in S3, saves image URLs in MongoDB, and displays them in a gallery.",
    overview:
      "A focused full-stack application demonstrating the S3 upload pattern: the React client uploads images, a Node.js and Express backend stores files in AWS S3, and MongoDB keeps the resulting image URLs for a gallery view.",
    problem:
      "Applications frequently need object storage for user media without putting binary data in the primary database. The upload, storage, and retrieval flow has to be wired correctly.",
    solution:
      "The app separates concerns: S3 handles file bytes, MongoDB stores metadata and URLs, and the frontend renders a gallery from the API.",
    features: [
      "Image upload workflow",
      "AWS S3 object storage",
      "MongoDB image metadata",
      "Gallery display",
      "Express upload API",
    ],
    architecture: [
      "React upload interface",
      "Node.js and Express API",
      "AWS S3 bucket storage",
      "MongoDB URL and metadata storage",
    ],
    contribution: [
      "Built the full upload and gallery flow.",
      "Integrated S3 storage with a MERN backend.",
    ],
    challenges: [
      "Handling upload configuration and object URLs cleanly.",
      "Keeping database metadata in sync with stored objects.",
    ],
    results: [
      "A working reference implementation of the MERN + S3 upload pattern.",
      "Public repository available on GitHub.",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "AWS S3"],
    keywords: [
      "MERN AWS S3 upload",
      "S3 image gallery app",
      "Node.js S3 file upload",
      "MongoDB image URLs",
    ],
    github: "https://github.com/chmuhammadasim/MERN-S3Bucket-MiniApp",
    related: ["lapshop", "go-temp", "theralearn"],
  },
  {
    slug: "dappcord",
    name: "Dappcord",
    category: "blockchain",
    tier: "project",
    featured: false,
    year: "2023",
    role: "Blockchain Developer",
    status: "Open source",
    tagline: "Decentralized communication with smart contracts",
    summary:
      "Blockchain-based decentralized communication app with Solidity smart contracts, real-time messaging, and MetaMask wallet login.",
    seoDescription:
      "Dappcord is an Ethereum-based decentralized communication DApp built with Solidity, Hardhat, Ethers.js, React, Socket.IO, and MetaMask.",
    overview:
      "Dappcord is a blockchain-based Discord-style application. Solidity smart contracts define chat rooms and membership, the React frontend connects through Ethers.js, MetaMask handles wallet login, and Socket.IO supports real-time messaging.",
    problem:
      "Centralized chat platforms control identity, membership, and data. A decentralized alternative needs on-chain ownership and access with a usable real-time experience.",
    solution:
      "Smart contracts manage rooms and access on Ethereum, while a React frontend and Socket.IO layer provide the responsive chat experience users expect.",
    features: [
      "Solidity smart contracts for rooms and access",
      "MetaMask wallet login",
      "Real-time messaging with Socket.IO",
      "Ethereum PoS deployment",
      "React frontend",
    ],
    architecture: [
      "Solidity contracts deployed with Hardhat",
      "Ethereum PoS network",
      "React client with Ethers.js",
      "Socket.IO real-time messaging",
      "MetaMask wallet integration",
    ],
    contribution: [
      "Built the smart contracts and React client.",
      "Implemented wallet authentication and real-time chat flows.",
    ],
    challenges: [
      "Bridging on-chain access control with real-time off-chain messaging.",
      "Keeping wallet and room state consistent in the UI.",
    ],
    results: [
      "A working decentralized communication DApp.",
      "Public repository available on GitHub.",
    ],
    technologies: ["Solidity", "Ethereum", "React", "Hardhat", "Ethers.js", "Socket.IO", "MetaMask"],
    keywords: [
      "decentralized chat DApp",
      "Solidity Discord clone",
      "Ethereum Socket.IO chat",
      "MetaMask wallet login",
    ],
    github: "https://github.com/chmuhammadasim/Discord-App-Block-Chain",
    related: ["nft-marketplace", "blockchain-domain-market", "theralearn"],
  },
  {
    slug: "nft-marketplace",
    name: "NFT Marketplace",
    category: "blockchain",
    tier: "project",
    featured: false,
    year: "2023",
    role: "Blockchain Developer",
    status: "Open source",
    tagline: "Peer-to-peer NFT trading with on-chain royalties",
    summary:
      "Decentralized NFT marketplace facilitating secure, transparent, peer-to-peer trading with Solidity contracts and MetaMask integration.",
    seoDescription:
      "A decentralized NFT marketplace DApp with Solidity ownership and royalty contracts, React and Web3.js frontend, Hardhat testing, and MetaMask integration.",
    overview:
      "A decentralized NFT marketplace for minting and trading tokens peer to peer. Solidity contracts handle ownership and royalties, Hardhat covers testing and deployment, and the React frontend connects through Web3.js and MetaMask.",
    problem:
      "Trading NFTs on centralized platforms weakens the ownership and royalty guarantees that make NFTs useful in the first place.",
    solution:
      "The marketplace keeps ownership and royalty logic in smart contracts, with wallet-based trading and decentralized transfer history.",
    features: [
      "NFT minting and trading",
      "Owner and royalty contracts",
      "MetaMask wallet integration",
      "Hardhat tests and deployment",
      "React marketplace frontend",
    ],
    architecture: [
      "Solidity NFT and marketplace contracts",
      "Hardhat development and testing",
      "React frontend with Web3.js",
      "MetaMask wallet connection",
    ],
    contribution: [
      "Built the smart contracts and marketplace frontend.",
      "Implemented ownership, royalty, and trading flows.",
    ],
    challenges: [
      "Getting royalty accounting right across secondary sales.",
      "Keeping contract interactions predictable in the UI.",
    ],
    results: [
      "A working decentralized NFT marketplace.",
      "Public repository available on GitHub.",
    ],
    technologies: ["Solidity", "React", "Web3.js", "Hardhat", "MetaMask"],
    keywords: [
      "NFT marketplace DApp",
      "Solidity NFT marketplace",
      "on-chain royalties",
      "Web3.js React NFT",
    ],
    github: "https://github.com/chmuhammadasim/Block-Chain-NFT-Market",
    related: ["dappcord", "blockchain-domain-market", "mern-s3-bucket"],
  },
  {
    slug: "blockchain-domain-market",
    name: "Blockchain Domain Marketplace",
    category: "blockchain",
    tier: "project",
    featured: false,
    year: "2023",
    role: "Blockchain Developer",
    status: "Personal project",
    tagline: "Buy, sell, and auction domains on-chain",
    summary:
      "Domain marketplace DApp built with Solidity, React, and Web3.js, supporting secure transfer, auctions, and wallet integration.",
    seoDescription:
      "A blockchain domain buy/sell marketplace DApp with Solidity contracts, React and Web3.js, secure transfer, auctions, and MetaMask wallet integration.",
    overview:
      "A blockchain domain marketplace where domains can be listed, bought, sold, and auctioned. The Solidity contracts handle ownership transfer, auction state, and history; the React frontend connects through Web3.js and MetaMask.",
    problem:
      "Domain trading relies on centralized intermediaries for escrow and transfer. An on-chain marketplace can make ownership and transfer history transparent.",
    solution:
      "The DApp records listings, ownership, and auction state in smart contracts, with wallet login and decentralized ownership history.",
    features: [
      "Domain listings and purchases",
      "Auction support",
      "Secure ownership transfer",
      "MetaMask wallet login",
      "Decentralized ownership history",
    ],
    architecture: [
      "Solidity marketplace and auction contracts",
      "React frontend with Web3.js",
      "MetaMask wallet integration",
      "On-chain ownership and history records",
    ],
    contribution: [
      "Built the smart contracts and marketplace frontend.",
      "Implemented auction, transfer, and wallet flows.",
    ],
    challenges: [
      "Modeling auction state and settlement safely on-chain.",
      "Keeping ownership transfer atomic and transparent.",
    ],
    results: [
      "A working domain marketplace DApp.",
      "Covers listing, purchase, auction, and transfer flows.",
    ],
    technologies: ["Solidity", "React", "Web3.js", "MetaMask"],
    keywords: [
      "blockchain domain marketplace",
      "domain trading DApp",
      "Solidity auction contract",
      "Web3 domain marketplace",
    ],
    related: ["nft-marketplace", "dappcord", "civilex"],
  },
];

/** Smaller repositories and projects listed for completeness, without dedicated pages. */
export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    name: "DragonFly",
    description:
      "Internal IotaScales platform. Backend contributions as part of the Atrios engineering team; implementation details are confidential.",
    stack: ["Backend", "Security"],
    kind: "Private platform",
  },
  {
    name: "goPAM",
    description:
      "Go project in the NetraLink Solutions organization. The repository is private and its product purpose is not publicly documented.",
    stack: ["Go"],
    kind: "Private repository",
  },
  {
    name: "BeeCamper2Go",
    description:
      "Multi-client application repository containing Flutter and React app directories alongside a JavaScript backend.",
    stack: ["Flutter", "React", "JavaScript"],
    kind: "Application",
    repos: [{ label: "BeeCamper2Go", url: "https://github.com/chmuhammadasim/BeeCamper2Go" }],
  },
  {
    name: "BetterAim",
    description:
      "Browser game featuring multiple power-ups, increasing difficulty levels, and sound effects.",
    stack: ["JavaScript", "Game Development"],
    kind: "Game",
  },
  {
    name: "MERN-CRUD",
    description:
      "Full-stack reference app for creating, viewing, updating, and deleting records through a REST API.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    kind: "Reference app",
    repos: [{ label: "MERN-CRUD", url: "https://github.com/chmuhammadasim/MERN-CRUD" }],
  },
  {
    name: "QA WebApp — GoLang APIs",
    description:
      "Go API project exploring web application endpoints and backend structure.",
    stack: ["Go", "REST APIs"],
    kind: "Backend project",
    repos: [
      {
        label: "QA-WebApp-GoLang-APIs",
        url: "https://github.com/chmuhammadasim/QA-WebApp-GoLang-APIs",
      },
    ],
  },
  {
    name: "Counting Game — Speech Recognition",
    description:
      "React game that uses the Web Speech API to practise counting, pronunciation, and numerical cognition.",
    stack: ["React", "Web Speech API"],
    kind: "Interactive app",
    repos: [
      {
        label: "Counting-game-speech-recognition-React",
        url: "https://github.com/chmuhammadasim/Counting-game-speech-recognition-React",
      },
    ],
  },
  {
    name: "Alphabet Game",
    description: "Alphabet-themed MERN learning game.",
    stack: ["MERN", "React"],
    kind: "Interactive app",
  },
  {
    name: "WebAir — Parts 1–3",
    description:
      "Three-part web coursework repository series. The repositories do not document a public product purpose.",
    stack: ["Web"],
    kind: "Coursework series",
    repos: [
      { label: "Part 1", url: "https://github.com/chmuhammadasim/WebAirPart_1_1" },
      { label: "Part 2", url: "https://github.com/chmuhammadasim/WebAirPart_2_1" },
      { label: "Part 3", url: "https://github.com/chmuhammadasim/WebAirPart_3_2" },
    ],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

export const PROJECT_SLUGS = PROJECTS.map((project) => project.slug);

export const PROJECT_STATS = {
  caseStudies: PROJECTS.length,
  total: PROJECTS.length + ARCHIVE_PROJECTS.length,
  flagship: PROJECTS.filter((project) => project.tier === "flagship").length,
  production: PROJECTS.filter((project) => project.status === "Production platform").length,
  categories: new Set(PROJECTS.map((project) => project.category)).size,
  technologies: new Set(PROJECTS.flatMap((project) => project.technologies)).size,
};

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project): Project[] {
  return project.related
    .map((slug) => getProject(slug))
    .filter((item): item is Project => Boolean(item));
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((project) => project.category === category);
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  cybersecurity: "Cybersecurity",
  infrastructure: "Infrastructure",
  web: "Web Platform",
  mobile: "Mobile App",
  blockchain: "Blockchain",
  networking: "Networking",
  game: "Game",
};
