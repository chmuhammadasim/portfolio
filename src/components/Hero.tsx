"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CERTIFICATION_COUNT,
  PROFILE,
  TOTAL_SKILLS,
} from "@/lib/site-data";
import { PROJECT_STATS } from "@/lib/projects-data";
import { trackEvent } from "@/lib/analytics";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const TELEMETRY = [
  { label: "Flagship builds", value: String(PROJECT_STATS.flagship).padStart(2, "0") },
  { label: "Production platforms", value: String(PROJECT_STATS.production).padStart(2, "0") },
  { label: "Technologies", value: `${TOTAL_SKILLS}` },
  { label: "Certifications", value: `${CERTIFICATION_COUNT}` },
];

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const section = sectionRef.current;
    if (!glow || !section) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top = `${e.clientY - rect.top}px`;
      glow.classList.add("is-active");

      const text = textRef.current;
      if (text) {
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        text.style.setProperty("--hero-ry", `${(px * 2.2).toFixed(2)}deg`);
        text.style.setProperty("--hero-rx", `${(-py * 1.6).toFixed(2)}deg`);
      }
    };
    const onLeave = () => {
      glow.classList.remove("is-active");
      const text = textRef.current;
      if (text) {
        text.style.setProperty("--hero-ry", "0deg");
        text.style.setProperty("--hero-rx", "0deg");
      }
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-beams hidden md:block" aria-hidden="true" />
      <div ref={glowRef} className="hero-glow" aria-hidden="true" />

      {/* 3D core */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20 md:left-[40%] md:opacity-100"
        aria-hidden="true"
      >
        <HeroScene />
      </div>

      {/* HUD frame around the core (desktop) */}
      <div
        className="pointer-events-none absolute right-[4%] top-1/2 hidden h-[440px] w-[440px] -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full border border-accent/10" />
        <div className="absolute inset-8 rounded-full border border-dashed border-accent/15" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[9px] uppercase tracking-[0.3em] text-accent/50">
          neural core
        </span>
        <span className="absolute -right-1 top-6 font-mono text-[9px] uppercase tracking-[0.24em] text-accent/50">
          online
        </span>
        <span className="absolute bottom-8 right-0 font-mono text-[9px] uppercase tracking-[0.24em] text-muted/60">
          render 60hz
        </span>
      </div>

      <div className="container-site relative z-10">
        <div ref={textRef} className="hero-depth max-w-2xl">
          {/* Status row */}
          <div
            className="hero-enter flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ "--enter-delay": "0ms" } as React.CSSProperties}
          >
            <span className="inline-flex items-center gap-2 rounded-sm border border-accent/30 bg-accent-soft px-2.5 py-1 text-accent">
              <span className="status-dot" aria-hidden="true" />
              System online
            </span>
            <span className="text-muted">Software Developer @ IotaScales</span>
            <span className="hidden text-faint sm:inline">//</span>
            <span className="hidden text-muted sm:inline">Islamabad, PK</span>
          </div>

          {/* Name */}
          <h1
            className="hero-enter mt-7 font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-foreground"
            style={
              {
                "--enter-delay": "70ms",
                fontSize: "clamp(2.65rem, 8.2vw, 5.9rem)",
              } as React.CSSProperties
            }
          >
            <span className="block">Muhammad</span>
            <span className="block text-gradient-brand">Asim Chattha</span>
          </h1>

          {/* Role telemetry */}
          <div
            className="hero-enter mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
            style={{ "--enter-delay": "140ms" } as React.CSSProperties}
          >
            <span className="text-secondary">Security Platforms</span>
            <span className="text-accent/50">/</span>
            <span className="text-secondary">Backend Systems</span>
            <span className="text-accent/50">/</span>
            <span className="text-secondary">Full-Stack Products</span>
            <span className="text-accent/50">/</span>
            <span className="text-secondary">Flutter</span>
          </div>

          {/* Value proposition */}
          <p
            className="hero-enter mt-6 max-w-xl text-[17px] leading-relaxed text-secondary md:text-lg"
            style={{ "--enter-delay": "210ms" } as React.CSSProperties}
          >
            {PROFILE.tagline}
          </p>

          {/* CTAs */}
          <div
            className="hero-enter mt-8 flex flex-wrap items-center gap-3"
            style={{ "--enter-delay": "280ms" } as React.CSSProperties}
          >
            <Link
              href="/projects"
              onClick={() => trackEvent("view_work")}
              className="btn btn-primary"
            >
              Explore projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href="/skills" className="btn btn-secondary">
              Skill matrix
            </Link>
            <Link
              href="/resume"
              className="btn btn-ghost"
              aria-label="View and download resume"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
              </svg>
              Resume
            </Link>
          </div>

          {/* Secondary links */}
          <div
            className="hero-enter mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]"
            style={{ "--enter-delay": "340ms" } as React.CSSProperties}
          >
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("github_click")}
              className="link-underline inline-flex items-center gap-1.5 text-secondary hover:text-foreground"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              GitHub
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("linkedin_click")}
              className="link-underline inline-flex items-center gap-1.5 text-secondary hover:text-foreground"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
              </svg>
              LinkedIn
            </a>
            <button
              type="button"
              onClick={() => {
                copyEmail();
                trackEvent("email_click");
              }}
              className="link-underline inline-flex items-center gap-1.5 text-secondary hover:text-foreground"
              aria-live="polite"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {copied ? "Email copied" : PROFILE.email}
            </button>
          </div>

          {/* Telemetry */}
          <dl
            className="hero-enter mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden border border-border bg-border/60 sm:grid-cols-4"
            style={{ "--enter-delay": "400ms" } as React.CSSProperties}
          >
            {TELEMETRY.map((item) => (
              <div key={item.label} className="bg-background/80 px-4 py-3.5 backdrop-blur">
                <dd className="font-mono text-xl font-semibold tracking-tight text-foreground">
                  {item.value}
                  <span className="text-accent">+</span>
                </dd>
                <dt className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-faint">
          scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  );
}
