"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Security from "@/components/Security";
import Skills from "@/components/Skills";
import Highlights from "@/components/Highlights";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export type GitHubStats = {
  repos: number;
  followers: number;
  totalCommits: number;
  languages: number;
  memberSince: string;
};

/**
 * Homepage assembler. Server data (GitHub stats) is passed in;
 * everything else comes from the static content layer.
 */
export default function HomeClient({ stats }: { stats: GitHubStats }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Security />
        <Skills />
        <Highlights stats={stats} />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
