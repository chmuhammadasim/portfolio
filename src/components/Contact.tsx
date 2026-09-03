"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { PROFILE } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad"
    >
      <div className="container-site">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Contact</p>
            <h2
              id="contact-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Let&apos;s build something meaningful.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-secondary">
              Have a project, opportunity, or technical problem worth discussing? My inbox
              is open — I usually reply within a day.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
                    Email Me
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
                LinkedIn
              </a>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("github_click")}
                className="btn btn-secondary"
              >
                GitHub
              </a>
              <a
                href={PROFILE.resumeUrl}
                download="Muhammad_Asim_Chattha_Resume.pdf"
                onClick={() => trackEvent("resume_click")}
                className="btn btn-ghost"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
                </svg>
                Download Resume
              </a>
            </div>

            <p className="mt-8 font-mono text-xs text-muted">
              {PROFILE.location} · {PROFILE.email}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
