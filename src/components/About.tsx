import Link from "next/link";
import Reveal from "./Reveal";
import AmbientScene from "./three/AmbientSceneLoader";
import Tilt3D from "./three/Tilt3D";
import { CAPABILITIES, PROFILE } from "@/lib/site-data";

function CapabilityIcon({ icon }: { icon: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "server":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="7" rx="1.5" />
          <rect x="3" y="14" width="18" height="7" rx="1.5" />
          <path d="M7 6.5h.01M7 17.5h.01M11 6.5h4M11 17.5h4" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 2 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="19" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <path d="M12 7.5v4M12 11.5 5 16.5M12 11.5l7 5" />
        </svg>
      );
  }
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-pad relative overflow-hidden"
    >
      <AmbientScene variant="core" className="opacity-20" />
      <div className="container-site relative z-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="idx">01</span> // About
              </p>
              <h2
                id="about-heading"
                className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
              >
                Security-minded engineering,{" "}
                <span className="text-gradient-cyber">end to end.</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-secondary">
                <p>
                  I&apos;m a software developer from {PROFILE.location}, working at the
                  intersection of backend engineering and security. My path started with a
                  BS in Computer Science at Air University, Islamabad, and grew through
                  full-stack products, blockchain experiments, Flutter apps, and eventually
                  the backend of enterprise security platforms.
                </p>
                <p>
                  Today I build systems in the Atrios security suite at{" "}
                  <span className="font-medium text-foreground">IotaScales</span> — DNS
                  security, VPN management, privileged access management, IP address
                  management, and infrastructure orchestration. I care about systems that
                  are secure by design: access control, auditing, monitoring, and clean
                  backend architecture.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="terminal mt-8 max-w-xl">
                <div className="terminal-bar">
                  <span className="terminal-dot" />
                  <span className="terminal-dot" />
                  <span className="terminal-dot" />
                  <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-faint">
                    asim@nexus ~ zsh
                  </span>
                </div>
                <div className="terminal-body" aria-label="Profile summary">
                  <p>
                    <span className="prompt">$</span> whoami
                  </p>
                  <p className="text-foreground">muhammad-asim-chattha</p>
                  <p className="mt-2">
                    <span className="prompt">$</span> current
                  </p>
                  <p>
                    software developer <span className="dim">@</span>{" "}
                    <span className="ok">iotascales</span>
                  </p>
                  <p className="mt-2">
                    <span className="prompt">$</span> focus --list
                  </p>
                  <p>
                    <span className="key">security-platforms</span>{" "}
                    <span className="dim">/</span> backend{" "}
                    <span className="dim">/</span> full-stack
                  </p>
                  <p className="mt-2">
                    <span className="prompt">$</span> status
                  </p>
                  <p>
                    <span className="ok">●</span> building, shipping, learning
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CAPABILITIES.map((capability, index) => (
              <Reveal key={capability.id} delay={index * 70}>
                <Tilt3D className="h-full">
                  <article className="holo-card group flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded border border-accent/25 bg-accent-soft text-accent transition-shadow group-hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]">
                        <CapabilityIcon icon={capability.icon} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                      {capability.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent/80">
                      {capability.tagline}
                    </p>
                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-secondary">
                      {capability.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {capability.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={capability.href}
                      className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-transform group-hover:translate-x-0.5"
                    >
                      Explore
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </article>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
