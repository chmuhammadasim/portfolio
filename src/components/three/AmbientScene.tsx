"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Reusable ambient 3D backdrop for a section. Renders a lightweight,
 * unlit line/points scene that only mounts when near the viewport and
 * pauses for reduced-motion users. Variants:
 *   - "network"   connected node graph (security / living system)
 *   - "orbit"     wireframe rings + orbiting particles
 *   - "grid"      architectural floor grid + rising particles
 *   - "particles" drifting point field
 */

type Variant = "network" | "orbit" | "grid" | "particles";

function Network() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Points>(null);
  const t = useRef(0);

  const { nodePositions, linePositions } = useMemo(() => {
    const count = 52;
    const nodePos = new Float32Array(count * 3);
    const seeds: number[][] = [];
    for (let i = 0; i < count; i++) {
      nodePos[i * 3] = (Math.random() - 0.5) * 15;
      nodePos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      nodePos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      seeds.push([nodePos[i * 3], nodePos[i * 3 + 1], nodePos[i * 3 + 2]]);
    }
    const lines: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = seeds[i][0] - seeds[j][0];
        const dy = seeds[i][1] - seeds[j][1];
        const dz = seeds[i][2] - seeds[j][2];
        if (dx * dx + dy * dy + dz * dz < 10) {
          lines.push(seeds[i][0], seeds[i][1], seeds[i][2], seeds[j][0], seeds[j][1], seeds[j][2]);
        }
      }
    }
    return { nodePositions: nodePos, linePositions: new Float32Array(lines) };
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) group.current.rotation.y = t.current * 0.05;
    if (nodes.current) {
      const m = nodes.current.material as THREE.PointsMaterial;
      m.opacity = 0.5 + Math.sin(t.current * 1.2) * 0.25;
    }
  });

  return (
    <group ref={group}>
      <points ref={nodes}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#e04b1f"
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#c84b24" transparent opacity={0.14} />
      </lineSegments>
    </group>
  );
}

function Orbit() {
  const group = useRef<THREE.Group>(null);
  const torus = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Points>(null);
  const t = useRef(0);

  const ringPositions = useMemo(() => {
    const n = 90;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * 2.6;
      arr[i * 3 + 1] = Math.sin(a) * 0.55;
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) group.current.rotation.y = t.current * 0.15;
    if (torus.current) {
      torus.current.rotation.x = t.current * 0.2;
      torus.current.rotation.z = t.current * 0.12;
    }
    if (ring.current) ring.current.rotation.z = t.current * 0.3;
  });

  return (
    <group ref={group}>
      <mesh ref={torus} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.3, 0.02, 12, 120]} />
        <meshBasicMaterial color="#e04b1f" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.7, 0.008, 8, 90]} />
        <meshBasicMaterial color="#c84b24" wireframe transparent opacity={0.3} />
      </mesh>
      <points ref={ring}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ringPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#c84b24"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Grid() {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);
  const t = useRef(0);

  const grid = useMemo(() => {
    const gh = new THREE.GridHelper(
      60,
      48,
      new THREE.Color("#8f1018"),
      new THREE.Color("#2a1512")
    );
    const m = gh.material as THREE.LineBasicMaterial;
    m.transparent = true;
    m.opacity = 0.18;
    return gh;
  }, []);

  const positions = useMemo(() => {
    const n = 120;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = Math.random() * 8 - 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) {
      group.current.rotation.x = -0.6 + Math.sin(t.current * 0.1) * 0.05;
      group.current.position.y = Math.sin(t.current * 0.15) * 0.2;
    }
    if (particles.current) particles.current.position.y = (t.current * 0.4) % 6;
  });

  return (
    <group ref={group}>
      <primitive object={grid} position={[0, -3, 0]} />
      <points ref={particles} position={[0, -2, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#e04b1f"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Particles() {
  const pts = useRef<THREE.Points>(null);
  const t = useRef(0);

  const positions = useMemo(() => {
    const n = 130;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.5 + Math.random() * 4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      arr[i * 3 + 2] = r * Math.cos(ph);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (pts.current) {
      pts.current.rotation.y = t.current * 0.04;
      pts.current.rotation.x = Math.sin(t.current * 0.12) * 0.1;
    }
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#c84b24"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function AmbientScene({
  variant = "particles",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setNear(e.isIntersecting)),
      { rootMargin: "100% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      {near && (
        <Canvas
          frameloop={reduced ? "demand" : "always"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          {variant === "network" && <Network />}
          {variant === "orbit" && <Orbit />}
          {variant === "grid" && <Grid />}
          {variant === "particles" && <Particles />}
        </Canvas>
      )}
    </div>
  );
}
