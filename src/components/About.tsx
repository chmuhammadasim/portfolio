import Reveal from "./Reveal";
import { PROFILE } from "@/lib/site-data";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">About</p>
              <h2
                id="about-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
              >
                Building software where engineering meets security.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-4 text-[15px] leading-relaxed text-secondary">
              <p>
                I&apos;m a software developer from {PROFILE.location}, focused on the
                intersection of engineering and security. My path started with a BS in
                Computer Science at Air University, Islamabad, and grew through hands-on
                work — full-stack applications, blockchain experiments, Flutter apps, and
                eventually the backend of enterprise security platforms.
              </p>
              <p>
                Today I build and maintain systems in the Atrios security suite at{" "}
                <span className="font-medium text-foreground">IotaScales</span>: DNS
                security, VPN management, privileged access management, and IP address
                management. I care about systems that are secure by design — access
                control, auditing, monitoring, and clean backend architecture.
              </p>
              <p>
                Beyond production work, I research and write about cybersecurity, operating
                systems, and AI on my blog, and contribute to open source on GitHub.
              </p>
              <ul className="grid gap-2 pt-2 sm:grid-cols-2">
                {[
                  "Software engineering",
                  "Cybersecurity",
                  "Secure infrastructure",
                  "Networking & DNS",
                  "Backend engineering",
                  "Product development",
                  "Continuous learning",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-secondary">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
