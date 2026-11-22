import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Security from "@/components/Security";
import GitHubShowcase from "@/components/GitHubShowcase";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import type { GitHubData } from "@/lib/github";

/**
 * Homepage assembler. GitHub telemetry is fetched on the server and
 * passed in; every other section reads from the static content layer.
 */
export default function HomeClient({ github }: { github: GitHubData }) {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Skills />
        <Security />
        <GitHubShowcase data={github} />
        <Experience />
        <Education />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
