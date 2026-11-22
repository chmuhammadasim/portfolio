import type { ProjectCategory } from "@/lib/projects-data";

const COMMON = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function ProjectIcon({
  category,
  size = 18,
  className = "",
}: {
  category: ProjectCategory;
  size?: number;
  className?: string;
}) {
  const props = { ...COMMON, width: size, height: size, className };
  switch (category) {
    case "cybersecurity":
      return (
        <svg {...props}>
          <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "infrastructure":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="6" rx="1.5" />
          <rect x="3" y="15" width="18" height="6" rx="1.5" />
          <path d="M7 6h.01M7 18h.01M11 6h4M11 18h4" />
        </svg>
      );
    case "web":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3Z" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...props}>
          <rect x="7" y="2" width="10" height="20" rx="2.5" />
          <path d="M11 18h2" />
        </svg>
      );
    case "blockchain":
      return (
        <svg {...props}>
          <rect x="8" y="3" width="8" height="4" rx="1" />
          <rect x="3" y="10" width="8" height="4" rx="1" />
          <rect x="13" y="10" width="8" height="4" rx="1" />
          <path d="M12 7v3M7 14v3M17 14v3M7 20h10" />
        </svg>
      );
    case "networking":
      return (
        <svg {...props}>
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="19" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <path d="M12 7.5v4M12 11.5 5 16.5M12 11.5l7 5" />
        </svg>
      );
    case "game":
      return (
        <svg {...props}>
          <path d="M6 8h12a4 4 0 0 1 3.9 4.9l-.9 4A3 3 0 0 1 15 18l-1-1.5h-4L9 18a3 3 0 0 1-6-1.1l-.9-4A4 4 0 0 1 6 8Z" />
          <path d="M8 11v3M6.5 12.5h3M15 12h.01M18 13.5h.01" />
        </svg>
      );
  }
}
