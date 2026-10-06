"use client";

import { useRef } from "react";

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. */
  max?: number;
};

/**
 * Pointer-driven 3D perspective tilt. Pure CSS transforms (no WebGL),
 * so it is cheap enough to apply broadly. Respects prefers-reduced-motion
 * via the `.tilt-card` CSS (transform disabled there).
 */
export default function Tilt3D({ children, className = "", max = 7 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--tilt-x", `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${((px - 0.5) * max).toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
