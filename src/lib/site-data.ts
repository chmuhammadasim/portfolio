/**
 * Single source of truth for the portfolio's static content.
 * All facts come from the published resume/CV and public GitHub profile.
 */

export const SITE_URL = "https://chmuhammadasim.site";

export const PROFILE = {
  name: "Muhammad Asim Chattha",
  shortName: "Asim",
  role: "Software Developer",
  headline: "Software Developer · Cybersecurity · Secure Infrastructure",
  location: "Islamabad, Pakistan",
  email: "muhammadasimchattha@gmail.com",
  phone: "+92-333-5629299",
  resumeUrl: "/Muhammad_Asim_Chattha_Resume.pdf",
  tagline:
    "Software developer building secure, scalable systems across cybersecurity, infrastructure, networking, and modern web technologies.",
  summary:
    "I specialize in backend systems with a security-first mindset — privileged access management, DNS and VPN infrastructure, and platform development for enterprise security products.",
  socials: {
    github: "https://github.com/chmuhammadasim",
    linkedin: "https://linkedin.com/in/muhammad-asim-chattha",
  },
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  points: string[];
  technologies: string[];
};

/** Verified from resume + CV. */
export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "IotaScales",
    role: "Software Developer",
    period: "Jun 2025 — Present",
    location: "Pakistan",
    description:
      "Backend developer on the Atrios security suite — enterprise platforms for DNS security, VPN management, IPAM, privileged access, and infrastructure orchestration.",
    points: [
      "Developed backend systems for Atrios DNS Security, GenesisVPN, DragonFly, OmniPriv PAM, and Astro Dome.",
      "Built secure, multi-tenant platform features spanning DNS filtering, policy enforcement, and access control.",
      "Worked across networking, security, and infrastructure domains within a production platform suite.",
    ],
    technologies: ["Node.js", "DNS", "VPN", "PAM", "REST APIs", "Security"],
  },
  {
    company: "Iotascale",
    role: "Full Stack Developer Intern",
    period: "Jul 2023 — Sep 2023",
    location: "Islamabad, Pakistan",
    description:
      "Built Weathery, a weather-forecast single-page application with the MEAN stack, deployed on Google Cloud Platform.",
    points: [
      "Developed the Weathery SPA using Angular + RxJS with MongoDB Atlas for storage.",
      "Created REST APIs and integrated external weather data services.",
      "Deployed and operated the application on GCP.",
    ],
    technologies: ["Angular", "Node.js", "Express", "MongoDB", "RxJS", "GCP"],
  },
  {
    company: "Fazaia Medical College",
    role: "Flutter Developer",
    period: "Jun 2023 — Sep 2023",
    location: "Islamabad, Pakistan",
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
    location: "Remote",
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

export type Project = {
  slug: string;
  name: string;
  category: "cybersecurity" | "infrastructure" | "web" | "blockchain" | "mobile";
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  github?: string;
  featured: boolean;
  hasCaseStudy: boolean;
  year: string;
};

/** Verified from resume + CV + GitHub. */
export const PROJECTS: Project[] = [
  {
    slug: "omnipriv-pam",
    name: "OmniPriv PAM",
    category: "cybersecurity",
    tagline: "Privileged Access Management platform",
    description:
      "Enterprise PAM platform for credential vaulting, role-based access control, session monitoring, and audit logging.",
    problem:
      "Organizations need controlled, audited access to privileged credentials and administrative sessions without handing out standing privileges.",
    solution:
      "A PAM platform that vaults credentials, enforces role-based access, monitors privileged sessions, and keeps a full audit trail.",
    features: [
      "Credential vaulting",
      "Role-based access control",
      "Session monitoring",
      "Audit logging",
    ],
    technologies: ["Node.js", "REST APIs", "Access Control", "Audit Logging"],
    featured: true,
    hasCaseStudy: true,
    year: "2025",
  },
  {
    slug: "atrios-dns-security",
    name: "Atrios DNS Security",
    category: "cybersecurity",
    tagline: "Enterprise DNS security platform",
    description:
      "DNS filtering, threat intelligence integration, policy enforcement, analytics dashboards, and secure network access management.",
    problem:
      "DNS is a primary attack vector — enterprises need filtering, threat intelligence, and policy control at the DNS layer.",
    solution:
      "An enterprise DNS security platform combining filtering, threat intel feeds, policy enforcement, and analytics.",
    features: [
      "DNS filtering",
      "Threat intelligence integration",
      "Policy enforcement",
      "Analytics dashboards",
      "Secure network access management",
    ],
    technologies: ["DNS", "Node.js", "Threat Intelligence", "Analytics"],
    featured: true,
    hasCaseStudy: true,
    year: "2025",
  },
  {
    slug: "genesis-vpn",
    name: "GenesisVPN",
    category: "infrastructure",
    tagline: "Secure VPN management platform",
    description:
      "VPN platform with user provisioning, subscription management, traffic monitoring, and centralized administration.",
    problem:
      "Running VPN infrastructure at scale requires centralized user provisioning, subscription control, and traffic visibility.",
    solution:
      "A VPN management platform covering provisioning, subscriptions, monitoring, and centralized administration.",
    features: [
      "User provisioning",
      "Subscription management",
      "Traffic monitoring",
      "Centralized administration",
    ],
    technologies: ["VPN", "Networking", "Node.js", "Monitoring"],
    featured: true,
    hasCaseStudy: true,
    year: "2025",
  },
  {
    slug: "atrios-ipam",
    name: "Atrios IPAM",
    category: "infrastructure",
    tagline: "IP Address Management solution",
    description:
      "Subnet planning, IP tracking, allocation management, and network inventory monitoring.",
    problem:
      "Growing networks lose track of IP allocation, leading to conflicts and poor inventory visibility.",
    solution:
      "An IPAM solution for subnet planning, IP tracking, allocation management, and network inventory monitoring.",
    features: [
      "Subnet planning",
      "IP tracking",
      "Allocation management",
      "Network inventory monitoring",
    ],
    technologies: ["Networking", "Node.js", "REST APIs", "IPAM"],
    featured: true,
    hasCaseStudy: true,
    year: "2025",
  },
  {
    slug: "astro-dome",
    name: "Astro Dome",
    category: "infrastructure",
    tagline: "Infrastructure management platform",
    description:
      "Centralized administration, monitoring, automation, and secure service orchestration for infrastructure.",
    problem:
      "Infrastructure sprawl makes centralized administration, monitoring, and automation hard to achieve safely.",
    solution:
      "An infrastructure management platform for centralized administration, monitoring, automation, and secure service orchestration.",
    features: [
      "Centralized administration",
      "Monitoring",
      "Automation",
      "Secure service orchestration",
    ],
    technologies: ["Infrastructure", "Node.js", "Automation", "Monitoring"],
    featured: true,
    hasCaseStudy: true,
    year: "2025",
  },
  {
    slug: "theralearn",
    name: "TheraLearn",
    category: "web",
    tagline: "Learning platform for children with Down syndrome",
    description:
      "MERN-based educational platform with gamified therapy modules, psychologist dashboards, progress tracking, blogs, and role-based management.",
    problem:
      "Children with Down syndrome need structured, engaging cognitive development support that therapists can track.",
    solution:
      "A comprehensive MERN platform with gamified therapy modules, professional dashboards, and progress tracking.",
    features: [
      "Gamified therapy modules",
      "Psychologist dashboards",
      "Progress tracking",
      "Blogs and role-based management",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/chmuhammadasim/TheraLearn",
    featured: true,
    hasCaseStudy: true,
    year: "2024",
  },
  {
    slug: "dappcord",
    name: "Dappcord",
    category: "blockchain",
    tagline: "Ethereum-based communication DApp",
    description:
      "Decentralized communication platform using Solidity smart contracts, PoS consensus, and MetaMask wallet integration.",
    problem:
      "Centralized chat platforms control data — a decentralized alternative needs on-chain integrity with usable UX.",
    solution:
      "An Ethereum DApp with smart contracts for data integrity and MetaMask integration for seamless wallet access.",
    features: ["Solidity smart contracts", "PoS consensus", "MetaMask integration", "Secure chat rooms"],
    technologies: ["Solidity", "React", "Web3.js", "Ethereum"],
    github: "https://github.com/chmuhammadasim/Discord-App-Block-Chain",
    featured: false,
    hasCaseStudy: false,
    year: "2023",
  },
  {
    slug: "nft-marketplace",
    name: "NFT Marketplace",
    category: "blockchain",
    tagline: "Decentralized NFT trading platform",
    description:
      "Peer-to-peer NFT trading marketplace with Solidity contracts for ownership and royalties, and MetaMask integration.",
    problem: "NFT trading on centralized platforms undermines ownership guarantees.",
    solution:
      "A decentralized marketplace with on-chain ownership, royalty contracts, and wallet-based trading.",
    features: ["NFT minting and trading", "Ownership royalties", "MetaMask integration", "Hardhat testing"],
    technologies: ["Solidity", "Web3.js", "Hardhat", "React"],
    github: "https://github.com/chmuhammadasim/Block-Chain-NFT-Market",
    featured: false,
    hasCaseStudy: false,
    year: "2023",
  },
  {
    slug: "social-media-graph-api",
    name: "Social Media Graph API Integration",
    category: "web",
    tagline: "Unified backend for major social platforms",
    description:
      "Backend integration for Facebook, Instagram, X, Pinterest, and YouTube APIs supporting analytics, content management, and automation.",
    problem:
      "Working with five separate social APIs multiplies auth, rate-limit, and data-normalization complexity.",
    solution:
      "A unified backend integration normalizing multiple platform APIs for analytics and automation workflows.",
    features: ["Multi-platform API integration", "Analytics", "Content management", "Automation workflows"],
    technologies: ["Node.js", "REST APIs", "OAuth", "Graph APIs"],
    featured: false,
    hasCaseStudy: false,
    year: "2024",
  },
  {
    slug: "weathery",
    name: "Weathery",
    category: "web",
    tagline: "Weather forecast SPA",
    description:
      "MEAN-stack weather application with external weather API integration, deployed on Google Cloud Platform.",
    problem: "A responsive, API-driven weather experience with clean state management.",
    solution:
      "An Angular SPA with RxJS state, REST APIs, and MongoDB Atlas persistence on GCP.",
    features: ["External weather API integration", "RxJS state management", "REST APIs", "GCP deployment"],
    technologies: ["Angular", "Node.js", "Express", "MongoDB"],
    featured: false,
    hasCaseStudy: false,
    year: "2023",
  },
  {
    slug: "lapshop",
    name: "LapShop Ecommerce",
    category: "web",
    tagline: "Full-featured MERN e-commerce app",
    description:
      "E-commerce application with product/user management, JWT auth, admin dashboard, and cloud image hosting.",
    problem: "A complete storefront needs catalog management, auth, and admin tooling.",
    solution:
      "A MERN e-commerce app with JWT auth, an admin dashboard, and cloud-hosted product images.",
    features: ["Product & user management", "JWT auth", "Admin dashboard", "Cloud image hosting"],
    technologies: ["React", "Node.js", "MongoDB", "JWT"],
    featured: false,
    hasCaseStudy: false,
    year: "2024",
  },
  {
    slug: "moca-test",
    name: "MOCA Test App",
    category: "mobile",
    tagline: "Cognitive assessment for clinical use",
    description:
      "Flutter application implementing the Montreal Cognitive Assessment, with Firebase-backed data and analytics.",
    problem:
      "Clinicians need a portable, reliable way to administer cognitive assessments and store results.",
    solution:
      "A Flutter app with GetX state management and Firebase cloud storage for the MOCA assessment.",
    features: ["MOCA assessment workflow", "GetX state management", "Firebase storage", "Analytics"],
    technologies: ["Flutter", "Dart", "GetX", "Firebase"],
    featured: false,
    hasCaseStudy: false,
    year: "2023",
  },
];

export type SkillGroup = {
  id: string;
  label: string;
  skills: string[];
};

/** Verified from resume + CV. */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C++", "Dart", "Solidity", "Bash", "SQL", "Go"],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React", "Next.js", "Angular", "Flutter", "Tailwind CSS", "Bootstrap", "Material UI", "HTML5/CSS3"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "SQL Server", "Firebase", "REST APIs", "JWT", "Swagger"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    skills: ["Docker", "Git", "GitHub Actions", "Nginx", "PM2", "Cloudflare", "Linux", "GCP", "Vercel", "Netlify", "Heroku"],
  },
  {
    id: "security",
    label: "Security",
    skills: ["Privileged Access Management", "DNS Security", "VPN Infrastructure", "Network Security", "Session Monitoring", "Audit Logging", "Role-Based Access Control", "Threat Intelligence"],
  },
];

export const SKILL_FILTERS = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "security", label: "Security" },
  { id: "infrastructure", label: "Infrastructure" },
] as const;

export const SECURITY_AREAS = [
  "Privileged Access Management",
  "DNS Filtering & Security",
  "VPN Infrastructure",
  "Network Security",
  "Authentication & Access Control",
  "Session Monitoring",
  "Audit Logging & Compliance",
  "Threat Intelligence",
] as const;

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

export type CertificationGroup = {
  category: string;
  items: string[];
};

/** Verified from resume (Coursera credentials). */
export const CERTIFICATIONS: CertificationGroup[] = [
  {
    category: "Full-Stack Development",
    items: [
      "MERN Stack Front To Back: Full Stack React, Redux & Node.js Specialization",
      "Introduction to Front-End Development",
      "Advanced React",
      "React Basics",
    ],
  },
  {
    category: "DevOps",
    items: [
      "Introduction to DevOps",
      "Introduction to Cloud Computing",
      "Containerization Using Docker",
      "Containerize a Full-Stack NodeJS Application in Docker",
      "Manage Your Versions with Git",
      "Version Control",
    ],
  },
  {
    category: "Project Management",
    items: [
      "Foundations of Project Management",
      "Introduction to Agile Development and Scrum",
    ],
  },
  {
    category: "Security & Systems",
    items: [
      "Solidity for Beginners: Write and Test Smart Contracts",
      "C for .NET Developers",
      "Introduction to Networks and Cisco Devices",
    ],
  },
];
