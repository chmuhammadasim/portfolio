"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Reusable ambient 3D backdrop. Mounts only when near the viewport,
 * pauses for reduced-motion users, and renders lightweight unlit
 * geometry. Variants:
 *   - "network"   connected node graph (security / living system)
 *   - "orbit"     wireframe rings + orbiting particles
 *   - "grid"      perspective floor grid + rising particles
 *   - "particles" drifting two-tone point field
 *   - "core"      compact wireframe core with orbital ring
 *   - "stream"    falling data-stream columns
 */

type Variant =
  | "network"
  | "orbit"
  | "grid"
  | "particles"
  | "core"
  | "stream"
  | "constellation";

const CYAN = "#22d3ee";
const VIOLET = "#a78bfa";
const PINK = "#f472b6";

function Network() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Points>(null);
  const t = useRef(0);

  const { nodePositions, linePositions } = useMemo(() => {
    const count = 58;
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
        if (dx * dx + dy * dy + dz * dz < 9.5) {
          lines.push(
            seeds[i][0], seeds[i][1], seeds[i][2],
            seeds[j][0], seeds[j][1], seeds[j][2]
          );
        }
      }
    }
    return { nodePositions: nodePos, linePositions: new Float32Array(lines) };
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) group.current.rotation.y = t.current * 0.045;
    if (nodes.current) {
      const m = nodes.current.material as THREE.PointsMaterial;
      m.opacity = 0.55 + Math.sin(t.current * 1.1) * 0.22;
    }
  });

  return (
    <group ref={group}>
      <points ref={nodes}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color={CYAN}
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={VIOLET} transparent opacity={0.16} />
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
    const n = 110;
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
    if (group.current) group.current.rotation.y = t.current * 0.12;
    if (torus.current) {
      torus.current.rotation.x = t.current * 0.18;
      torus.current.rotation.z = t.current * 0.1;
    }
    if (ring.current) ring.current.rotation.z = t.current * 0.26;
  });

  return (
    <group ref={group}>
      <mesh ref={torus} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.3, 0.012, 10, 160]} />
        <meshBasicMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.7, 0.006, 8, 120]} />
        <meshBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <points ref={ring}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ringPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={CYAN}
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
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
      new THREE.Color("#0e7490"),
      new THREE.Color("#14213a")
    );
    const m = gh.material as THREE.LineBasicMaterial;
    m.transparent = true;
    m.opacity = 0.3;
    return gh;
  }, []);

  const positions = useMemo(() => {
    const n = 150;
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
      group.current.rotation.x = -0.6 + Math.sin(t.current * 0.1) * 0.04;
      group.current.position.y = Math.sin(t.current * 0.15) * 0.18;
    }
    if (particles.current) particles.current.position.y = (t.current * 0.45) % 6;
  });

  return (
    <group ref={group}>
      <primitive object={grid} position={[0, -3, 0]} />
      <points ref={particles} position={[0, -2, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color={CYAN}
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

function Particles() {
  const pts = useRef<THREE.Points>(null);
  const t = useRef(0);

  const { positions, colors } = useMemo(() => {
    const n = 180;
    const arr = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const c1 = new THREE.Color(CYAN);
    const c2 = new THREE.Color(VIOLET);
    const c3 = new THREE.Color(PINK);
    for (let i = 0; i < n; i++) {
      const r = 2.4 + Math.random() * 4.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      arr[i * 3 + 2] = r * Math.cos(ph);
      const c = i % 5 === 0 ? c3 : i % 2 === 0 ? c1 : c2;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: arr, colors: col };
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (pts.current) {
      pts.current.rotation.y = t.current * 0.035;
      pts.current.rotation.x = Math.sin(t.current * 0.1) * 0.09;
    }
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.042}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) {
      group.current.rotation.y = t.current * 0.16;
      group.current.rotation.x = Math.sin(t.current * 0.2) * 0.12;
    }
    if (ring.current) {
      ring.current.rotation.z = t.current * 0.3;
      ring.current.rotation.x = Math.PI / 2.2 + Math.sin(t.current * 0.18) * 0.16;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0.32}
        />
      </mesh>
      <mesh scale={0.5}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#06101e"
          emissive="#0891b2"
          emissiveIntensity={1.4}
          metalness={0.6}
          roughness={0.4}
          flatShading
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[2.25, 0.007, 8, 140]} />
        <meshBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Stream() {
  const pts = useRef<THREE.Points>(null);
  const t = useRef(0);

  const positions = useMemo(() => {
    const n = 220;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = Math.random() * 16 - 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (pts.current) {
      pts.current.position.y = -((t.current * 0.9) % 4);
      pts.current.rotation.y = Math.sin(t.current * 0.08) * 0.08;
    }
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={CYAN}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Constellation() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Points>(null);
  const ring = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  const { positions, colors, lines } = useMemo(() => {
    const count = 44;
    const arr = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const seeds: number[][] = [];
    const palette = [
      new THREE.Color(CYAN),
      new THREE.Color(VIOLET),
      new THREE.Color(PINK),
    ];

    for (let i = 0; i < count; i++) {
      const angle = i * 0.52;
      const radius = 2.0 + (i % 5) * 0.3;
      const y = -3.1 + (i / (count - 1)) * 6.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
      seeds.push([x, y, z]);
      const c = palette[i % 3];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const linePoints: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = seeds[i][0] - seeds[j][0];
        const dy = seeds[i][1] - seeds[j][1];
        const dz = seeds[i][2] - seeds[j][2];
        if (dx * dx + dy * dy + dz * dz < 2.2) {
          linePoints.push(
            seeds[i][0], seeds[i][1], seeds[i][2],
            seeds[j][0], seeds[j][1], seeds[j][2]
          );
        }
      }
    }

    return {
      positions: arr,
      colors: col,
      lines: new Float32Array(linePoints),
    };
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) group.current.rotation.y = t.current * 0.09;
    if (nodes.current) {
      const material = nodes.current.material as THREE.PointsMaterial;
      material.opacity = 0.7 + Math.sin(t.current * 1.1) * 0.18;
    }
    if (ring.current) {
      ring.current.rotation.z = t.current * 0.12;
      ring.current.rotation.x = Math.PI / 2.4 + Math.sin(t.current * 0.12) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <points ref={nodes}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.2, 0.005, 8, 180]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
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
          dpr={[1, 1.4]}
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          {variant !== "core" && <ambientLight intensity={0.4} />}
          {variant === "core" && (
            <>
              <ambientLight intensity={0.5} />
              <pointLight position={[4, 4, 6]} intensity={3} color={CYAN} decay={0} />
              <pointLight position={[-5, -3, 4]} intensity={2} color={VIOLET} decay={0} />
            </>
          )}
          {variant === "network" && <Network />}
          {variant === "orbit" && <Orbit />}
          {variant === "grid" && <Grid />}
          {variant === "particles" && <Particles />}
          {variant === "core" && <Core />}
          {variant === "stream" && <Stream />}
          {variant === "constellation" && <Constellation />}
        </Canvas>
      )}
    </div>
  );
}
