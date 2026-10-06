"use client";

import dynamic from "next/dynamic";

/**
 * Lazy loader for AmbientScene. Keeps `three` + @react-three/fiber out
 * of the eager homepage bundle (they load on demand, client-side only),
 * matching the code-splitting used by the hero scene.
 */
const LazyAmbientScene = dynamic(() => import("./AmbientScene"), { ssr: false });

type Variant = "network" | "orbit" | "grid" | "particles";

export default function AmbientSceneLoader({
  variant = "particles",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  return <LazyAmbientScene variant={variant} className={className} />;
}
