"use client";

import { useEffect, useMemo } from "react";
import { makeLabelTexture } from "./labelTexture";

/** Billboarded HUD label for Three.js scenes. */
export default function HudLabel({
  text,
  position,
  color = "#22d3ee",
  scale = 1,
  opacity = 0.92,
}: {
  text: string;
  position: [number, number, number];
  color?: string;
  scale?: number;
  opacity?: number;
}) {
  const texture = useMemo(() => makeLabelTexture(text, color), [text, color]);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite position={position} scale={[1.6 * scale, 0.4 * scale, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        depthTest={false}
      />
    </sprite>
  );
}
