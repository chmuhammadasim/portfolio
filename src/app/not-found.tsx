import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Muhammad Asim Chattha",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm font-medium tracking-widest text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Looks like this route doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-secondary">
        The page you&apos;re looking for was moved, renamed, or never existed.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back to portfolio
        </Link>
        <Link href="/blogs" className="btn btn-secondary">
          Read the blog
        </Link>
      </div>
    </div>
  );
}
