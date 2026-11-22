"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, PROFILE } from "@/lib/site-data";
import ThemeToggle from "./ThemeToggle";

/**
 * Fixed HUD navigation. Route-aware active state, translucent on scroll,
 * accessible mobile menu, and a persistent resume link.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* top signal line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden="true"
      />
      <nav
        aria-label="Primary"
        className="container-site flex h-16 items-center justify-between gap-4"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-[15px] font-semibold tracking-tight text-foreground"
          aria-label="Muhammad Asim Chattha — home"
        >
          <span className="logo-cube" aria-hidden="true">
            <span className="logo-cube-inner">
              <span className="logo-cube-face logo-cube-front">AC</span>
              <span className="logo-cube-face logo-cube-back">AC</span>
              <span className="logo-cube-face logo-cube-right">//</span>
              <span className="logo-cube-face logo-cube-left">//</span>
              <span className="logo-cube-face logo-cube-top" />
              <span className="logo-cube-face logo-cube-bottom" />
            </span>
          </span>
          <span className="hidden sm:inline">
            <span className="text-accent">~/</span>asim
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent/80 animate-pulse" aria-hidden="true" />
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link rounded px-3 py-1.5 text-[13px] transition-colors ${
                  active ? "is-active" : "hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/resume"
            className="btn btn-primary hidden !px-3.5 !py-1.5 !text-[13px] sm:inline-flex"
          >
            Resume
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-border text-secondary transition-colors hover:border-accent/50 hover:text-foreground lg:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <div className="container-site grid gap-1 py-4">
            <p className="hud-label mb-2 px-3">// navigation</p>
            {NAV_LINKS.map((link, index) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded border px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "border-accent/40 bg-accent-soft text-foreground"
                      : "border-transparent text-secondary hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-[10px] text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              );
            })}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/resume"
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary"
              >
                Resume
              </Link>
              <a
                href={PROFILE.resumeUrl}
                download="Muhammad_Asim_Chattha_Resume.pdf"
                className="btn btn-secondary"
              >
                PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
