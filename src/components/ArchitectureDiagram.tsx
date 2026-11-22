import type { ReactNode } from "react";

/**
 * Lightweight, dependency-free architecture flow rendered from the case
 * study's architecture steps. The text is real content (not an image),
 * so it stays accessible and indexable.
 */
export default function ArchitectureDiagram({
  steps,
  label,
}: {
  steps: string[];
  label: string;
}) {
  const nodes: ReactNode[] = [];

  steps.forEach((step, index) => {
    nodes.push(
      <div
        key={step}
        className="relative flex-1 rounded border border-border bg-surface/80 p-3"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-secondary">
          {step}
        </p>
      </div>
    );

    if (index < steps.length - 1) {
      nodes.push(
        <span
          key={`connector-${index}`}
          className="self-center text-center font-mono text-[11px] text-accent/50"
          aria-hidden="true"
        >
          <span className="md:hidden">↓</span>
          <span className="hidden md:inline">→</span>
        </span>
      );
    }
  });

  return (
    <figure className="mt-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {nodes}
      </div>
      <figcaption className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
        // {label}
      </figcaption>
    </figure>
  );
}
