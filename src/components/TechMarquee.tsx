const STACK = [
  "Go",
  "Node.js",
  "TypeScript",
  "React",
  "Next.js",
  "Flutter",
  "Dart",
  "Angular",
  "Python",
  "C++",
  "Solidity",
  "PostgreSQL",
  "MongoDB",
  "ClickHouse",
  "Redis",
  "Kafka",
  "NATS",
  "Docker",
  "Linux",
  "PowerDNS",
  "Supabase",
  "AWS S3",
];

/**
 * Infinite technology marquee. The second list is aria-hidden so screen
 * readers hear the stack once. CSS pauses it for reduced-motion users.
 */
export default function TechMarquee() {
  return (
    <section
      aria-label="Technology stack"
      className="relative overflow-hidden border-y border-border bg-surface/50 py-4"
    >
      <div className="container-site flex items-center gap-6">
        <span className="hud-label hidden shrink-0 items-center gap-2 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          stack
        </span>
        <div className="marquee min-w-0 flex-1">
          <div className="marquee-track items-center gap-8">
            <ul className="flex items-center gap-8" aria-label="Technologies used">
              {STACK.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
                >
                  {tech}
                  <span className="text-accent/30" aria-hidden="true">
                    /
                  </span>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-8" aria-hidden="true">
              {STACK.map((tech) => (
                <li
                  key={`dup-${tech}`}
                  className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
                >
                  {tech}
                  <span className="text-accent/30">/</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
