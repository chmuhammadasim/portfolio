"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import HudLabel from "./HudLabel";

/**
 * A 3D technology sphere: glowing core, wireframe shell, orbital rings,
 * and billboarded HUD labels for the core stack. Decorative; the same
 * information is available as text in the surrounding section.
 */

const CYAN = "#22d3ee";
const VIOLET = "#a78bfa";
const PINK = "#f472b6";

const LABELS: { text: string; color: string }[] = [
  { text: "Go", color: CYAN },
  { text: "Node.js", color: VIOLET },
  { text: "React", color: CYAN },
  { text: "TypeScript", color: PINK },
  { text: "Flutter", color: VIOLET },
  { text: "PostgreSQL", color: CYAN },
  { text: "Redis", color: PINK },
  { text: "Docker", color: VIOLET },
  { text: "DNS", color: CYAN },
  { text: "PAM", color: PINK },
  { text: "VPN", color: VIOLET },
  { text: "Next.js", color: CYAN },
];

const pointer = { x: 0, y: 0 };

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function Sphere({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);
  const t = useRef(0);

  const labelPositions = useMemo(() => {
    const n = LABELS.length;
    return LABELS.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return [
        Math.cos(theta) * radius * 2.95,
        y * 2.15,
        Math.sin(theta) * radius * 2.95,
      ] as [number, number, number];
    });
  }, []);

  const dustPositions = useMemo(() => {
    const count = 260;
    const arr = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color(CYAN);
    const c2 = new THREE.Color(VIOLET);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
      const c = i % 2 === 0 ? c1 : c2;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions: arr, colors };
  }, []);

  useFrame((_, delta) => {
    if (!animate) return;
    t.current += delta;
    if (group.current) {
      const targetY = pointer.x * 0.38 + t.current * 0.07;
      const targetX = pointer.y * 0.22 + Math.sin(t.current * 0.15) * 0.05;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.035;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.035;
    }
    if (shell.current) {
      shell.current.rotation.y = -t.current * 0.05;
      shell.current.rotation.z = t.current * 0.03;
    }
    if (core.current) {
      core.current.rotation.y = t.current * 0.16;
      core.current.rotation.x = t.current * 0.06;
    }
    if (ringA.current) ringA.current.rotation.z = t.current * 0.16;
    if (ringB.current) {
      ringB.current.rotation.x = Math.PI / 2.5 + Math.sin(t.current * 0.2) * 0.2;
      ringB.current.rotation.y = -t.current * 0.1;
    }
    if (dust.current) {
      dust.current.rotation.y = -t.current * 0.025;
    }
  });

  return (
    <group ref={group}>
      {/* Glowing core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color="#031018"
          emissive="#0891b2"
          emissiveIntensity={1.9}
          roughness={0.3}
          metalness={0.6}
          flatShading
        />
      </mesh>

      {/* Wireframe shells */}
      <mesh>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.28} />
      </mesh>
      <mesh ref={shell}>
        <sphereGeometry args={[2.15, 18, 12]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.055} />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[2.55, 0.006, 8, 160]} />
        <meshBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[3.05, 0.005, 8, 160]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Technology labels */}
      {LABELS.map((label, index) => (
        <HudLabel
          key={label.text}
          text={label.text}
          color={label.color}
          position={labelPositions[index]}
          scale={1}
          opacity={0.9}
        />
      ))}

      {/* Particle halo */}
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[dustPositions.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function SkillSphere({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [near, setNear] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) return;
    setReady(true);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(motion.matches);

    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setNear(entry.isIntersecting)),
      { rootMargin: "60% 0px" }
    );
    observer.observe(el);

    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      {ready && near && (
        <Canvas
          frameloop={reduced ? "demand" : "always"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8.6], fov: 44 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 4, 7]} intensity={4} color={CYAN} decay={0} />
          <pointLight position={[-6, -3, 5]} intensity={2.8} color={VIOLET} decay={0} />
          <Sphere animate={!reduced} />
        </Canvas>
      )}
    </div>
  );
}
