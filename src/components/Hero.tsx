"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

/**
 * Hero section: status badge, name, value proposition, CTAs,
 * and a subtle cursor-following glow (desktop, hover-capable only).
 */
export default function Hero() {
  const [copied, setCopied] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const section = sectionRef.current;
    if (!glow || !section) return;

    // Only enable on fine pointers (not touch) — check once.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top = `${e.clientY - rect.top}px`;
      glow.classList.add("is-active");
    };
    const onLeave = () => glow.classList.remove("is-active");

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
      className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
    >
      {/* Grid background */}
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Cursor glow */}
      <div ref={glowRef} className="hero-glow" aria-hidden="true" />

      <div className="container-site relative z-10">
        <div className="mx-auto max-w-3xl">
          {/* Status badge */}
          <p className="hero-enter" style={{ "--enter-delay": "0ms" } as React.CSSProperties}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] text-secondary">
              <span className="status-dot" aria-hidden="true" />
              {PROFILE.headline}
            </span>
          </p>

          {/* Name */}
          <h1
            className="hero-enter mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            style={{ "--enter-delay": "80ms" } as React.CSSProperties}
          >
            {PROFILE.name}
          </h1>

          {/* Value proposition */}
          <p
            className="hero-enter mt-5 max-w-2xl text-lg leading-relaxed text-secondary md:text-xl"
            style={{ "--enter-delay": "160ms" } as React.CSSProperties}
          >
            {PROFILE.tagline}
          </p>
          <p
            className="hero-enter mt-4 max-w-2xl text-[15px] leading-relaxed text-muted"
            style={{ "--enter-delay": "220ms" } as React.CSSProperties}
          >
            I work on privileged access management, security platforms, DNS and VPN
            infrastructure, backend systems, and security automation — currently building
            enterprise security products at IotaScales.
          </p>

          {/* CTAs */}
          <div
            className="hero-enter mt-8 flex flex-wrap items-center gap-3"
            style={{ "--enter-delay": "300ms" } as React.CSSProperties}
          >
            <a
              href="#projects"
              onClick={() => trackEvent("view_work")}
              className="btn btn-primary"
            >
              View My Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={() => trackEvent("lets_connect")}
              className="btn btn-secondary"
            >
              Let&apos;s Connect
            </a>
          </div>

          {/* Secondary links */}
          <div
            className="hero-enter mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            style={{ "--enter-delay": "380ms" } as React.CSSProperties}
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
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {copied ? "Email copied" : PROFILE.email}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
