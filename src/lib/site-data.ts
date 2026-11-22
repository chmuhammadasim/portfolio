/**
 * Single source of truth for the portfolio's static content.
 *
 * Facts are grounded in the published resume/CV, Coursera credentials,
 * and public GitHub activity. Nothing here invents metrics or clients.
 */

export const SITE_URL = "https://chmuhammadasim.site";
export const SITE_NAME = "Muhammad Asim Chattha";
export const SITE_UPDATED = "2026-11-21";

export const PROFILE = {
  name: "Muhammad Asim Chattha",
  shortName: "Asim",
  role: "Software Developer",
  headline: "Software Developer · Cybersecurity · Secure Infrastructure",
  location: "Islamabad, Pakistan",
  email: "muhammadasimchattha@gmail.com",
  phone: "+92-333-5629299",
  githubUser: "chmuhammadasim",
  resumeUrl: "/Muhammad_Asim_Chattha_Resume.pdf",
  tagline:
    "I build secure backend systems and product-grade platforms. My work spans enterprise DNS security and privileged access management through to Next.js, Go, and Flutter applications.",
  summary:
    "Software developer specializing in security platforms and backend engineering. At IotaScales I work on the Atrios security suite: DNS security, VPN management, IP address management, privileged access management, and infrastructure orchestration. Outside production work I ship full-stack products, blockchain experiments, Flutter apps, and open-source infrastructure tooling.",
  focus: [
    "Security platform engineering",
    "Backend systems in Go and Node.js",
    "Secure infrastructure & networking",
    "Full-stack product development",
    "Flutter mobile applications",
    "Blockchain & smart contracts",
  ],
  socials: {
    github: "https://github.com/chmuhammadasim",
    linkedin: "https://linkedin.com/in/muhammad-asim-chattha",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "GitHub", href: "/github" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/#contact" },
] as const;

/* ─────────────────────────────────────────────────────────────
   Experience
   ───────────────────────────────────────────────────────────── */

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  start: string;
  end: string;
  location: string;
  type: "Full-time" | "Internship" | "Freelance";
  description: string;
  points: string[];
  technologies: string[];
  current?: boolean;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "IotaScales",
    role: "Software Developer",
    period: "Jun 2025 — Present",
    start: "2025-06",
    end: "present",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    current: true,
    description:
      "Backend developer on the Atrios security suite — enterprise platforms for DNS security, VPN management, IP address management, privileged access, and infrastructure orchestration.",
    points: [
      "Develop backend systems for Atrios DNS Security, GenesisVPN, DragonFly, OmniPriv PAM, and Astro Dome.",
      "Build secure, multi-tenant platform features spanning DNS filtering, policy enforcement, access control, and audit logging.",
      "Work across networking, security, and infrastructure domains within a production platform suite.",
    ],
    technologies: ["Go", "Node.js", "DNS", "VPN", "PAM", "REST APIs", "Security"],
  },
  {
    company: "IotaScales",
    role: "Full Stack Developer Intern",
    period: "Jul 2023 — Sep 2023",
    start: "2023-07",
    end: "2023-09",
    location: "Islamabad, Pakistan",
    type: "Internship",
    description:
      "Built Weathery, a weather-forecast single-page application on the MEAN stack, deployed on Google Cloud Platform.",
    points: [
      "Developed the Weathery SPA using Angular + RxJS with MongoDB Atlas for storage.",
      "Created REST APIs and integrated external weather data services.",
      "Deployed and operated the application on GCP.",
    ],
    technologies: ["Angular", "RxJS", "Node.js", "Express", "MongoDB", "GCP"],
  },
  {
    company: "Fazaia Medical College",
    role: "Flutter Developer",
    period: "Jun 2023 — Sep 2023",
    start: "2023-06",
    end: "2023-09",
    location: "Islamabad, Pakistan",
    type: "Internship",
    description:
      "Built the MOCA Test application for cognitive assessment, used in a clinical healthcare setting.",
    points: [
      "Developed the MOCA cognitive assessment app with Flutter and GetX state management.",
      "Integrated Firebase for cloud data storage and analytics.",
    ],
    technologies: ["Flutter", "Dart", "GetX", "Firebase"],
  },
  {
    company: "Freelance",
    role: "Software Developer",
    period: "2022 — Present",
    start: "2022-01",
    end: "present",
    location: "Remote",
    type: "Freelance",
    current: true,
    description:
      "Independent software development for healthcare, e-commerce, and education clients.",
    points: [
      "Delivered web apps, admin panels, and mobile apps using MERN and Flutter.",
      "Integrated JWT auth, Google Maps, payment gateways, and email/SMS APIs.",
      "Handled full lifecycle delivery: requirements, build, deployment, and handover.",
    ],
    technologies: ["React", "Node.js", "Flutter", "MongoDB", "JWT", "Stripe"],
  },
];

/* ─────────────────────────────────────────────────────────────
   Capability domains (homepage + skills page)
   ───────────────────────────────────────────────────────────── */

export type Capability = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  href: string;
  icon: "shield" | "server" | "layers" | "network";
};

export const CAPABILITIES: Capability[] = [
  {
    id: "security",
    title: "Security Platform Engineering",
    tagline: "Defense built into the product",
    description:
      "Privileged access management, DNS security, endpoint security, VPN infrastructure, role-based access control, and audit logging — engineered into production platforms.",
    technologies: ["PAM", "DNS Security", "RBAC", "Threat Intelligence", "Audit Logging"],
    href: "/skills#security",
    icon: "shield",
  },
  {
    id: "backend",
    title: "Backend & API Systems",
    tagline: "Services that hold under load",
    description:
      "Go and Node.js services, REST APIs, authentication, data pipelines, and multi-tenant platform logic — with security and observability as first-class concerns.",
    technologies: ["Go", "Node.js", "REST", "JWT", "PostgreSQL", "Redis"],
    href: "/skills#backend",
    icon: "server",
  },
  {
    id: "product",
    title: "Full-Stack Product Engineering",
    tagline: "From schema to shipped UI",
    description:
      "Next.js, React, MERN, and Flutter applications delivered end to end — case-management platforms, learning products, dashboards, and mobile apps.",
    technologies: ["Next.js", "React", "TypeScript", "MongoDB", "Flutter", "Supabase"],
    href: "/skills#frontend",
    icon: "layers",
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Networking",
    tagline: "Systems, networks, and delivery",
    description:
      "IP address management, DNS, VPN, VLAN and routing fundamentals, Linux, Docker, and cloud deployment across GCP, Cloudflare, and Vercel.",
    technologies: ["IPAM", "DNS", "VPN", "Linux", "Docker", "Cloud"],
    href: "/skills#infrastructure",
    icon: "network",
  },
];

/* ─────────────────────────────────────────────────────────────
   Skills matrix
   ───────────────────────────────────────────────────────────── */

export type SkillLevel = "production" | "working" | "familiar";

export type Skill = {
  name: string;
  level: SkillLevel;
  note: string;
  projects?: string[];
};

export type SkillGroup = {
  id: string;
  label: string;
  short: string;
  description: string;
  skills: Skill[];
};

export const SKILL_LEVELS: Record<
  SkillLevel,
  { label: string; description: string; weight: number }
> = {
  production: {
    label: "Production",
    description: "Used to build and ship production systems.",
    weight: 3,
  },
  working: {
    label: "Working",
    description: "Used across delivered projects and prototypes.",
    weight: 2,
  },
  familiar: {
    label: "Familiar",
    description: "Coursework, tooling, or focused experiments.",
    weight: 1,
  },
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    short: "Languages",
    description:
      "The languages I use to build services, interfaces, mobile apps, and smart contracts.",
    skills: [
      {
        name: "TypeScript",
        level: "production",
        note: "Typed frontends and full-stack applications with Next.js and React.",
        projects: ["civilex", "cyber-sentinel"],
      },
      {
        name: "JavaScript",
        level: "production",
        note: "MERN services, React apps, and Node.js backends.",
        projects: ["theralearn", "lapshop"],
      },
      {
        name: "Go",
        level: "production",
        note: "Security platform services, DNS tooling, and backend templates.",
        projects: ["cyber-sentinel", "dewalla", "go-temp"],
      },
      {
        name: "Dart",
        level: "production",
        note: "Cross-platform Flutter applications for mobile and desktop.",
        projects: ["atrios-authenticator", "moca-test", "genesis-vpn"],
      },
      {
        name: "SQL",
        level: "production",
        note: "Relational modeling and queries across PostgreSQL, SQL Server, and ClickHouse.",
        projects: ["cyber-sentinel", "dewalla", "civilex"],
      },
      {
        name: "Python",
        level: "working",
        note: "Scripting, automation, and tooling.",
      },
      {
        name: "C++",
        level: "working",
        note: "Systems and algorithms coursework; performance-oriented problem solving.",
      },
      {
        name: "Solidity",
        level: "working",
        note: "Smart contracts for NFT, chat, and domain-marketplace DApps.",
        projects: ["dappcord", "nft-marketplace", "blockchain-domain-market"],
      },
      {
        name: "Bash",
        level: "working",
        note: "Linux operations, deployment, and developer automation.",
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & Mobile",
    short: "Frontend",
    description:
      "Interfaces shipped for the web and mobile — from dashboards to gamified learning modules.",
    skills: [
      {
        name: "React",
        level: "production",
        note: "Component architecture for platforms, dashboards, and games.",
        projects: ["theralearn", "civilex", "cyber-sentinel"],
      },
      {
        name: "Next.js",
        level: "production",
        note: "App Router, server components, SEO, and production web platforms.",
        projects: ["civilex"],
      },
      {
        name: "Flutter",
        level: "production",
        note: "Clinical, authenticator, VPN, and mobile product apps.",
        projects: ["atrios-authenticator", "moca-test", "genesis-vpn"],
      },
      {
        name: "Angular",
        level: "working",
        note: "Reactive SPA development with RxJS for Weathery.",
        projects: ["weathery"],
      },
      {
        name: "Tailwind CSS",
        level: "production",
        note: "Design systems and responsive interfaces across web projects.",
        projects: ["civilex", "dewalla"],
      },
      {
        name: "HTML5 & CSS3",
        level: "production",
        note: "Semantic, responsive, accessible interface foundations.",
        projects: ["civilex", "lapshop"],
      },
      {
        name: "RxJS",
        level: "working",
        note: "Reactive state and async data flows in Angular.",
        projects: ["weathery"],
      },
      {
        name: "Bootstrap",
        level: "working",
        note: "Rapid responsive layouts for client web apps.",
      },
      {
        name: "Material UI",
        level: "working",
        note: "Dashboard and admin interface components.",
      },
      {
        name: "GetX",
        level: "working",
        note: "Flutter state management for the MOCA assessment app.",
        projects: ["moca-test"],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    short: "Backend",
    description:
      "Services, APIs, and platform logic designed for security, clarity, and scale.",
    skills: [
      {
        name: "Node.js",
        level: "production",
        note: "Backend services for enterprise security platforms and MERN products.",
        projects: ["omnipriv-pam", "atrios-dns-security", "theralearn"],
      },
      {
        name: "Express",
        level: "production",
        note: "REST API design, middleware, authentication, and service structure.",
        projects: ["theralearn", "weathery"],
      },
      {
        name: "REST APIs",
        level: "production",
        note: "API contracts, versioning, integration, and documentation.",
        projects: ["social-media-graph-api", "omnipriv-pam"],
      },
      {
        name: "JWT & Auth",
        level: "production",
        note: "Token-based authentication and least-privilege authorization.",
        projects: ["theralearn", "lapshop", "go-temp"],
      },
      {
        name: "OAuth",
        level: "working",
        note: "Third-party authorization flows for social platform integrations.",
        projects: ["social-media-graph-api"],
      },
      {
        name: "Socket.IO / WebSockets",
        level: "working",
        note: "Real-time messaging and room state in Dappcord.",
        projects: ["dappcord"],
      },
      {
        name: "Gin & GORM",
        level: "working",
        note: "Go HTTP services and ORM-backed persistence.",
        projects: ["go-temp"],
      },
      {
        name: "Firebase",
        level: "production",
        note: "Auth, cloud storage, and analytics for Flutter applications.",
        projects: ["moca-test"],
      },
      {
        name: "Supabase",
        level: "working",
        note: "Postgres-backed auth and data for judiciary case management.",
        projects: ["civilex"],
      },
      {
        name: "AWS S3",
        level: "working",
        note: "Object storage and cloud image hosting.",
        projects: ["mern-s3-bucket"],
      },
    ],
  },
  {
    id: "data",
    label: "Data & Messaging",
    short: "Data",
    description:
      "Databases, caches, and event streams used across security and product platforms.",
    skills: [
      {
        name: "PostgreSQL",
        level: "production",
        note: "Relational data for security platforms and case management.",
        projects: ["cyber-sentinel", "dewalla", "civilex"],
      },
      {
        name: "MongoDB",
        level: "production",
        note: "Document modeling for MERN products and learning platforms.",
        projects: ["theralearn", "weathery", "lapshop"],
      },
      {
        name: "Microsoft SQL Server",
        level: "production",
        note: "Relational schemas, queries, and integration with .NET systems.",
      },
      {
        name: "Redis",
        level: "production",
        note: "Caching, sessions, and high-throughput state in security services.",
        projects: ["cyber-sentinel", "dewalla", "go-temp"],
      },
      {
        name: "ClickHouse",
        level: "working",
        note: "Columnar analytics for telemetry, DNS logs, and security events.",
        projects: ["cyber-sentinel", "dewalla"],
      },
      {
        name: "Kafka",
        level: "working",
        note: "Event streaming for endpoint telemetry pipelines.",
        projects: ["cyber-sentinel"],
      },
      {
        name: "NATS",
        level: "working",
        note: "Lightweight messaging between DNS platform services.",
        projects: ["dewalla"],
      },
      {
        name: "SQLite",
        level: "working",
        note: "Embedded storage for Go services and local tooling.",
        projects: ["go-temp"],
      },
    ],
  },
  {
    id: "infrastructure",
    label: "DevOps & Cloud",
    short: "DevOps",
    description:
      "Build, ship, and operate software with reproducible environments and sane delivery pipelines.",
    skills: [
      {
        name: "Docker",
        level: "production",
        note: "Containerized services, builds, and application deployment.",
        projects: ["go-temp", "cyber-sentinel"],
      },
      {
        name: "Linux",
        level: "production",
        note: "Server operations, shell tooling, and production environments.",
        projects: ["go-temp", "cyber-sentinel"],
      },
      {
        name: "Git & GitHub Actions",
        level: "production",
        note: "Version control, review workflows, and CI automation.",
        projects: ["go-temp", "civilex"],
      },
      {
        name: "Nginx",
        level: "working",
        note: "Reverse proxying, static delivery, and TLS termination.",
      },
      {
        name: "PM2",
        level: "working",
        note: "Node.js process management in production.",
      },
      {
        name: "Cloudflare",
        level: "working",
        note: "DNS, edge delivery, and site security.",
      },
      {
        name: "Google Cloud Platform",
        level: "working",
        note: "Application deployment and managed services.",
        projects: ["weathery"],
      },
      {
        name: "Vercel & Netlify",
        level: "working",
        note: "Frontend deployment and preview workflows.",
      },
      {
        name: "Heroku",
        level: "working",
        note: "Application hosting for earlier projects.",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    short: "Security",
    description:
      "The security domains I build in every day: access, DNS, VPN, monitoring, and audit.",
    skills: [
      {
        name: "Privileged Access Management",
        level: "production",
        note: "Credential vaulting, least privilege, and privileged session control.",
        projects: ["omnipriv-pam", "go-temp"],
      },
      {
        name: "DNS Security",
        level: "production",
        note: "DNS filtering, blocking policy, and threat intelligence enforcement.",
        projects: ["atrios-dns-security", "dewalla"],
      },
      {
        name: "VPN Infrastructure",
        level: "production",
        note: "Provisioning, subscriptions, and traffic monitoring for VPN services.",
        projects: ["genesis-vpn"],
      },
      {
        name: "Role-Based Access Control",
        level: "production",
        note: "Policy models that map real organizational roles to permissions.",
        projects: ["omnipriv-pam", "theralearn"],
      },
      {
        name: "Session Monitoring",
        level: "production",
        note: "Visibility and recording for privileged and user sessions.",
        projects: ["omnipriv-pam"],
      },
      {
        name: "Audit Logging",
        level: "production",
        note: "Tamper-aware audit trails for privileged actions and compliance.",
        projects: ["omnipriv-pam", "go-temp"],
      },
      {
        name: "Threat Intelligence",
        level: "production",
        note: "Normalizing and enforcing intelligence feeds at the DNS layer.",
        projects: ["atrios-dns-security"],
      },
      {
        name: "Endpoint Security",
        level: "production",
        note: "Telemetry collection, policy management, and incident response.",
        projects: ["cyber-sentinel"],
      },
      {
        name: "Network Security",
        level: "working",
        note: "VLANs, firewalling, DHCP, and secure network design fundamentals.",
        projects: ["packet-tracer-network"],
      },
      {
        name: "Authentication & Authorization",
        level: "production",
        note: "JWT, OAuth, Firebase Auth, and least-privilege access patterns.",
        projects: ["lapshop", "social-media-graph-api"],
      },
    ],
  },
  {
    id: "networking",
    label: "Networking & Infrastructure",
    short: "Networking",
    description:
      "Network fundamentals and infrastructure products — from IP planning to DNS and VPN services.",
    skills: [
      {
        name: "DNS",
        level: "production",
        note: "Recursive resolution, filtering policy, and PowerDNS-backed platforms.",
        projects: ["atrios-dns-security", "dewalla"],
      },
      {
        name: "PowerDNS",
        level: "working",
        note: "Authoritative DNS backends for managed DNS deployments.",
        projects: ["dewalla"],
      },
      {
        name: "IP Address Management",
        level: "production",
        note: "Subnet planning, allocation, and network inventory.",
        projects: ["atrios-ipam"],
      },
      {
        name: "TCP/IP",
        level: "production",
        note: "Protocol fundamentals applied to security and network products.",
        projects: ["packet-tracer-network"],
      },
      {
        name: "VLANs & DHCP",
        level: "working",
        note: "Segmentation and address services in simulated enterprise networks.",
        projects: ["packet-tracer-network"],
      },
      {
        name: "Routing & Switching",
        level: "working",
        note: "Cisco device configuration and network topology design.",
        projects: ["packet-tracer-network"],
      },
      {
        name: "Cisco Packet Tracer",
        level: "working",
        note: "Enterprise network simulation and validation.",
        projects: ["packet-tracer-network"],
      },
      {
        name: "Infrastructure Automation",
        level: "production",
        note: "Monitoring, automation, and secure service orchestration.",
        projects: ["astro-dome"],
      },
    ],
  },
];

export const SKILL_FILTERS = [
  { id: "all", label: "All skills" },
  ...SKILL_GROUPS.map((group) => ({ id: group.id, label: group.short })),
];

export const TOTAL_SKILLS = SKILL_GROUPS.reduce(
  (sum, group) => sum + group.skills.length,
  0
);

/** Security domains used by the homepage security section. */
export const SECURITY_AREAS = [
  "Privileged Access Management",
  "DNS Filtering & Security",
  "VPN Infrastructure",
  "Endpoint Security & Compliance",
  "Network Security",
  "Authentication & Access Control",
  "Session Monitoring",
  "Audit Logging & Compliance",
  "Threat Intelligence",
] as const;

/* ─────────────────────────────────────────────────────────────
   Education & certifications
   ───────────────────────────────────────────────────────────── */

export type EducationItem = {
  degree: string;
  university: string;
  period: string;
  location: string;
  note: string;
};

export const EDUCATION: EducationItem[] = [
  {
    degree: "BS in Computer Science",
    university: "Air University, Islamabad",
    period: "Sept 2021 — June 2025",
    location: "Islamabad, Pakistan",
    note:
      "Focused on software engineering, networking, and systems coursework while building production projects throughout the degree.",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  credentialId: string;
  category: string;
  url: string;
};

const COURSERA: { category: string; items: [string, string][] }[] = [
  {
    category: "Full-Stack Development",
    items: [
      ["MERN Stack Front To Back: Full Stack React, Redux & Node.js Specialization", "5ZDHBPRW4LAT"],
      ["Introduction to Front-End Development", "FGADEBFXR2MZ"],
      ["Advanced React", "N8FGBHFVJTDW"],
      ["React Basics", "7DLTE79XT7BN"],
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      ["Introduction to DevOps", "B4EQGXU426T4"],
      ["Introduction to Cloud Computing", "7VYKMAFDFVFG"],
      ["Containerization Using Docker", "FUG87A96W3KK"],
      ["Containerize a Full-Stack NodeJS Application in Docker", "W9V5FED5LEZ7"],
      ["Manage Your Versions with Git", "CTU0JINE2RWH"],
      ["Version Control", "39FZ6A9M6BBB"],
    ],
  },
  {
    category: "Project Management",
    items: [
      ["Foundations of Project Management", "CVBNBY3J5YSL"],
      ["Introduction to Agile Development and Scrum", "F4ZKALU39M43"],
    ],
  },
  {
    category: "Security & Systems",
    items: [
      ["Solidity for Beginners: Write and Test Smart Contracts", "EXPP4DK2BQ1C"],
      ["C for .NET Developers", "4M5JC92ZWQNN"],
      ["Introduction to Networks and Cisco Devices", "U6K5CZDSEG63"],
    ],
  },
];

export const CERTIFICATIONS: Certification[] = COURSERA.flatMap((group) =>
  group.items.map(([name, credentialId]) => ({
    name,
    issuer: "Coursera",
    credentialId,
    category: group.category,
    url: `https://coursera.org/verify/${credentialId}`,
  }))
);

export const CERTIFICATION_GROUPS = COURSERA.map((group) => ({
  category: group.category,
  count: group.items.length,
}));

export const CERTIFICATION_COUNT = CERTIFICATIONS.length;

/* ─────────────────────────────────────────────────────────────
   FAQ — used on the resume page and in FAQPage structured data
   ───────────────────────────────────────────────────────────── */

export const FAQS = [
  {
    question: "Who is Muhammad Asim Chattha?",
    answer:
      "Muhammad Asim Chattha is a software developer based in Islamabad, Pakistan. He works on enterprise security platforms at IotaScales — including Atrios DNS Security, GenesisVPN, Atrios IPAM, OmniPriv PAM, and Astro Dome — and builds full-stack web, mobile, and blockchain applications.",
  },
  {
    question: "What technologies does Muhammad Asim Chattha work with?",
    answer:
      "His core stack spans Go, Node.js, TypeScript, React, Next.js, Flutter, MongoDB, PostgreSQL, Redis, ClickHouse, Docker, and Linux. In security he works with privileged access management, DNS security, VPN infrastructure, role-based access control, session monitoring, and audit logging.",
  },
  {
    question: "What is his experience with privileged access management?",
    answer:
      "At IotaScales he is a backend developer on OmniPriv PAM, a privileged access management platform providing credential vaulting, role-based access control, session monitoring, and audit logging. He has also contributed to goPAM, a Go project in the NetraLink Solutions organization.",
  },
  {
    question: "What security platforms has he worked on?",
    answer:
      "He has contributed to Atrios DNS Security, OmniPriv PAM, GenesisVPN, Atrios IPAM, Astro Dome, CyberSentinel (endpoint security and compliance), and DeWall (self-hosted DNS firewall) — spanning DNS filtering, VPN management, endpoint telemetry, access control, and infrastructure orchestration.",
  },
  {
    question: "Is Muhammad Asim Chattha available for work?",
    answer:
      "He is open to conversations about backend engineering, security platform development, and full-stack product work. The fastest way to reach him is email at muhammadasimchattha@gmail.com or LinkedIn.",
  },
] as const;
