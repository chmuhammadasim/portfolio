import Link from "next/link";
import Reveal from "./Reveal";
import AmbientScene from "./three/AmbientSceneLoader";
import Tilt3D from "./three/Tilt3D";
import { SECURITY_AREAS } from "@/lib/site-data";

const AREA_DETAILS: Record<string, string> = {
  "Privileged Access Management":
    "Credential vaulting, least privilege, session monitoring, and audit logging for privileged accounts.",
  "DNS Filtering & Security":
    "Policy enforcement and threat intelligence at the DNS layer to protect managed networks.",
  "VPN Infrastructure":
    "User provisioning, subscriptions, and traffic monitoring for secure remote access.",
  "Endpoint Security & Compliance":
    "Telemetry collection, fleet policy management, incident detection, and response coordination.",
  "Network Security":
    "VLAN segmentation, firewalling, DHCP, and secure network design fundamentals.",
  "Authentication & Access Control":
    "JWT, OAuth, Firebase Auth, and least-privilege authorization patterns across services.",
  "Session Monitoring":
    "Visibility into privileged and user sessions with centralized administration.",
  "Audit Logging & Compliance":
    "Complete audit trails for privileged actions and platform administration.",
  "Threat Intelligence":
    "Normalizing and enforcing threat feeds inside security platforms.",
};

export default function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40"
    >
      <AmbientScene variant="network" className="opacity-40" />
      <div className="container-site relative z-10">
        <Reveal>
          <p className="eyebrow">
            <span className="idx">04</span> // Security
          </p>
          <h2
            id="security-heading"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Security is the architecture, not the checkbox.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
            My daily work spans the security stack of enterprise products — from DNS
            filtering and endpoint telemetry to privileged access and audit. These are
            the domains I build and operate in.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY_AREAS.map((area, index) => (
            <Reveal key={area} delay={index * 40}>
              <Tilt3D max={5} className="h-full">
                <article className="card group h-full p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded border border-accent/25 bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
                      </svg>
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
                    {area}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                    {AREA_DETAILS[area]}
                  </p>
                </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded border border-border bg-background/50 px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span className="text-accent">//</span> security work runs through
              Atrios DNS Security, OmniPriv PAM, CyberSentinel, and DeWall
            </p>
            <Link
              href="/skills#security"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent"
            >
              Security skill matrix
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
