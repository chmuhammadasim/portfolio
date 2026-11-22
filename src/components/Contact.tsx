"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "./Reveal";
import AmbientScene from "./three/AmbientSceneLoader";
import { PROFILE } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const CHANNELS = [
  {
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "in/muhammad-asim-chattha",
    href: PROFILE.socials.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "chmuhammadasim",
    href: PROFILE.socials.github,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "Resume",
    value: "HTML + PDF",
    href: "/resume",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto still works */
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad relative overflow-hidden"
    >
      <AmbientScene variant="orbit" className="opacity-40" />
      <div className="container-site relative z-10">
        <Reveal>
          <div className="holo-card relative overflow-hidden p-7 md:p-12">
            <div className="scan-line" aria-hidden="true" />
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow">
                  <span className="idx">09</span> // Contact
                </p>
                <h2
                  id="contact-heading"
                  className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                >
                  Let&apos;s build something{" "}
                  <span className="text-gradient-cyber">meaningful.</span>
                </h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-secondary">
                  Have a project, a security platform to build, or a backend problem worth
                  discussing? My inbox is open.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      copyEmail();
                      trackEvent("email_click");
                    }}
                    className="btn btn-primary"
                    aria-live="polite"
                  >
                    {copied ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        Email copied
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Copy email
                      </>
                    )}
                  </button>
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("linkedin_click")}
                    className="btn btn-secondary"
                  >
                    Message on LinkedIn
                  </a>
                  <Link
                    href="/resume"
                    onClick={() => trackEvent("resume_click")}
                    className="btn btn-ghost"
                  >
                    View resume
                  </Link>
                </div>

                <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  <span className="inline-flex items-center gap-2">
                    <span className="status-dot status-dot--green" aria-hidden="true" />
                    Open to conversations
                  </span>
                  <span className="text-faint">//</span>
                  <span>{PROFILE.location}</span>
                </p>
              </div>

              <ul className="grid gap-2.5">
                {CHANNELS.map((channel) => {
                  const external = channel.href.startsWith("http");
                  const isEmail = channel.href.startsWith("mailto:");
                  return (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        onClick={() => {
                          if (isEmail) trackEvent("email_click");
                          if (channel.label === "GitHub") trackEvent("github_click");
                          if (channel.label === "LinkedIn") trackEvent("linkedin_click");
                          if (channel.label === "Resume") trackEvent("resume_click");
                        }}
                        className="group flex items-center gap-4 rounded border border-border bg-background/60 px-4 py-3.5 transition-colors hover:border-accent/50 hover:bg-accent-soft/40"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-surface text-accent transition-colors group-hover:border-accent/40">
                          {channel.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                            {channel.label}
                          </span>
                          <span className="mt-0.5 block truncate text-[13px] text-secondary group-hover:text-foreground">
                            {channel.value}
                          </span>
                        </span>
                        <svg
                          className="shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
