import Reveal from "./Reveal";
import { SECURITY_AREAS } from "@/lib/site-data";

const AREA_DETAILS: Record<string, string> = {
  "Privileged Access Management":
    "Credential vaulting, role-based access, session monitoring, and audit logging for privileged accounts.",
  "DNS Filtering & Security":
    "Policy enforcement and threat intelligence at the DNS layer to protect network access.",
  "VPN Infrastructure":
    "User provisioning, subscription management, and traffic monitoring for secure remote access.",
  "Network Security":
    "Secure network design, IP address management, and Cisco device fundamentals.",
  "Authentication & Access Control":
    "JWT-based auth, Firebase Auth, and least-privilege access patterns across backend systems.",
  "Session Monitoring":
    "Visibility into privileged and user sessions with centralized administration.",
  "Audit Logging & Compliance":
    "Complete audit trails for privileged actions and platform administration.",
  "Threat Intelligence":
    "Integrating threat feeds into security platforms for proactive filtering and alerts.",
};

export default function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="section-pad border-y border-border bg-surface"
    >
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">Security</p>
          <h2
            id="security-heading"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Engineering with security in mind.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
            My daily work spans the security stack of enterprise products — from DNS
            filtering to privileged access management. These are the domains I build and
            operate in.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {SECURITY_AREAS.map((area, index) => (
            <Reveal key={area} delay={index * 50}>
              <div className="card card-hover h-full p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
                  </svg>
                </span>
                <h3 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
                  {area}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {AREA_DETAILS[area]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
