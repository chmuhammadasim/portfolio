import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "404 — Route Not Found",
  description: "This page does not exist. Explore projects, skills, and experience instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main
        id="main"
        className="container-site flex min-h-[80vh] flex-col items-center justify-center py-24 text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          // signal lost
        </p>
        <p className="mt-4 font-mono text-7xl font-semibold tracking-tight text-gradient-brand sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          This route doesn&apos;t exist.
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-secondary">
          The page was moved, renamed, or never existed. Re-enter through one of the
          indexed routes below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to portfolio
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            Projects
          </Link>
          <Link href="/skills" className="btn btn-secondary">
            Skills
          </Link>
          <Link href="/resume" className="btn btn-ghost">
            Resume
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
