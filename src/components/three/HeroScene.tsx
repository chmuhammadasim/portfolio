"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import HudLabel from "./HudLabel";

/**
 * Cybernetic "neural core" behind the hero: a faceted shell, glowing
 * core, three orbital rings, data shards, and a cyan/violet particle
 * field. Cursor- and scroll-reactive. Degrades to a static frame for
 * reduced motion and skips WebGL entirely when unavailable.
 */

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

const CYAN = "#22d3ee";
const VIOLET = "#a78bfa";
const PINK = "#f472b6";

const HUD_LABELS: {
  text: string;
  position: [number, number, number];
  color: string;
  scale?: number;
}[] = [
  { text: "API", position: [1.9, 2.4, -1], color: VIOLET, scale: 0.85 },
  { text: "PAM", position: [3.3, 1.3, 0], color: CYAN, scale: 0.9 },
  { text: "VPN", position: [3.5, -1.2, -0.2], color: PINK, scale: 0.85 },
  { text: "DNS", position: [2.6, -2.4, 0.5], color: CYAN, scale: 0.8 },
];

function Core() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const shell2 = useRef<THREE.LineSegments>(null);
  const core = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const shards = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);

  const shellEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.15, 1)),
    []
  );
  const shell2Edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.75, 0)),
    []
  );

  const dustPositions = useMemo(() => {
    const count = 520;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color(CYAN);
    const violet = new THREE.Color(VIOLET);
    for (let i = 0; i < count; i++) {
      const radius = 3.1 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      const c = Math.random() > 0.5 ? cyan : violet;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  const shardData = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 2.9 + (i % 4) * 0.22;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.3) * 1.1,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 0.045 + (i % 5) * 0.018,
        color: i % 3 === 0 ? PINK : i % 3 === 1 ? CYAN : VIOLET,
        speed: 0.2 + (i % 6) * 0.04,
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sy = typeof window !== "undefined" ? window.scrollY : 0;

    if (group.current) {
      const g = group.current;
      const targetRotY = pointer.x * 0.5 + t * 0.1;
      const targetRotX = pointer.y * 0.34 + Math.sin(t * 0.18) * 0.06;
      g.rotation.y += (targetRotY - g.rotation.y) * 0.045;
      g.rotation.x += (targetRotX - g.rotation.x) * 0.045;
      g.position.y = -sy * 0.00055;
      g.scale.setScalar(Math.max(0.82, 1 - sy * 0.00018));
    }
    if (shell.current) {
      shell.current.rotation.z = t * 0.05;
      shell.current.rotation.y = -t * 0.07;
    }
    if (shell2.current) {
      shell2.current.rotation.y = t * 0.12;
      shell2.current.rotation.x = t * 0.06;
    }
    if (core.current) {
      core.current.rotation.y = t * 0.09;
      const material = core.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1.6 + Math.sin(t * 1.4) * 0.45;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.06;
      inner.current.rotation.z = t * 0.04;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.18;
    if (ringB.current) {
      ringB.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.2) * 0.18;
      ringB.current.rotation.y = t * 0.12;
    }
    if (ringC.current) {
      ringC.current.rotation.y = -t * 0.16;
      ringC.current.rotation.x = Math.PI / 3.2;
    }
    if (shards.current) {
      shards.current.rotation.y = t * 0.08;
      shards.current.children.forEach((child, index) => {
        const data = shardData[index];
        if (!data) return;
        child.position.y = data.position[1] + Math.sin(t * data.speed * 3 + index) * 0.14;
        child.rotation.x = t * data.speed;
        child.rotation.z = t * data.speed * 0.7;
      });
    }
    if (dust.current) {
      dust.current.rotation.y = -t * 0.03;
      dust.current.rotation.x = Math.sin(t * 0.12) * 0.12;
    }
  });

  return (
    <group ref={group}>
      {/* Faceted outer shell */}
      <lineSegments ref={shell} geometry={shellEdges}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.38} />
      </lineSegments>

      <lineSegments ref={shell2} geometry={shell2Edges}>
        <lineBasicMaterial color={VIOLET} transparent opacity={0.3} />
      </lineSegments>

      {/* Glowing core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshStandardMaterial
          color="#031018"
          emissive="#0891b2"
          emissiveIntensity={1.8}
          roughness={0.35}
          metalness={0.6}
          flatShading
        />
      </mesh>

      <mesh ref={inner} scale={0.56}>
        <icosahedronGeometry args={[1.18, 0]} />
        <meshStandardMaterial
          color="#0b1226"
          emissive={VIOLET}
          emissiveIntensity={0.9}
          roughness={0.3}
          metalness={0.7}
          flatShading
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.15, 0, 0]}>
        <torusGeometry args={[2.55, 0.008, 8, 160]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[3.05, 0.006, 8, 160]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringC} rotation={[0, 0, Math.PI / 3.2]}>
        <torusGeometry args={[2.95, 0.005, 8, 160]} />
        <meshBasicMaterial color={PINK} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Orbiting data shards */}
      <group ref={shards}>
        {shardData.map((shard, index) => (
          <mesh key={index} position={shard.position} scale={shard.scale}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshBasicMaterial
              color={shard.color}
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Particle field */}
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
          size={0.035}
          vertexColors
          transparent
          opacity={0.72}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* HUD labels */}
      {HUD_LABELS.map((label) => (
        <HudLabel
          key={label.text}
          text={label.text}
          position={label.position}
          color={label.color}
          scale={label.scale}
        />
      ))}

      {/* Holographic base ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2.9, 0]}>
        <torusGeometry args={[3.3, 0.004, 6, 180]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene({ animate }: { animate: boolean }) {
  return (
    <Canvas
      frameloop={animate ? "always" : "demand"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 5, 7]} intensity={5} color={CYAN} decay={0} />
      <pointLight position={[-7, -4, -5]} intensity={3.4} color={VIOLET} decay={0} />
      <pointLight position={[0, -6, 4]} intensity={1.4} color={PINK} decay={0} />
      <directionalLight position={[0, 6, 8]} intensity={1.1} color="#dff8ff" />
      <Core />
    </Canvas>
  );
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [near, setNear] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!supportsWebGL()) return;
    setReady(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onVisibility = () =>
      setVisible(document.visibilityState === "visible");

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    const el = wrapRef.current;
    let observer: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => setNear(entries[0]?.isIntersecting ?? true),
        { rootMargin: "20% 0px" }
      );
      observer.observe(el);
    }

    return () => {
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      {ready && <Scene animate={animate && near && visible} />}
    </div>
  );
}
