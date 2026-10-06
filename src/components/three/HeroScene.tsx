"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A cursor- and scroll-reactive abstract "computational structure" rendered
 * behind the hero typography: wireframe shell + faceted core + particle
 * field, lit in crimson/amber. Degrades gracefully (static frame, or skipped
 * entirely) when WebGL or motion is unavailable.
 */

const pointer = { x: 0, y: 0 };

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

function Structure() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const core = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);

  const shellEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.2, 1)),
    []
  );

  const dustPositions = useMemo(() => {
    const count = 340;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sy = typeof window !== "undefined" ? window.scrollY : 0;

    if (group.current) {
      const g = group.current;
      const targetRotY = pointer.x * 0.55 + t * 0.12;
      const targetRotX = pointer.y * 0.4 + Math.sin(t * 0.18) * 0.08;
      g.rotation.y += (targetRotY - g.rotation.y) * 0.045;
      g.rotation.x += (targetRotX - g.rotation.x) * 0.045;
      g.position.y = -sy * 0.0006;
      g.scale.setScalar(Math.max(0.82, 1 - sy * 0.0002));
    }
    if (shell.current) {
      shell.current.rotation.z = t * 0.05;
      shell.current.rotation.y = -t * 0.07;
    }
    if (core.current) core.current.rotation.y = t * 0.09;
    if (inner.current) {
      inner.current.rotation.y = -t * 0.06;
      inner.current.rotation.z = t * 0.04;
    }
    if (dust.current) {
      dust.current.rotation.y = -t * 0.028;
      dust.current.rotation.x = Math.sin(t * 0.14) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <lineSegments ref={shell} geometry={shellEdges}>
        <lineBasicMaterial color="#e04b1f" transparent opacity={0.32} />
      </lineSegments>

      <mesh ref={core}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#1c0d09"
          roughness={0.55}
          metalness={0.25}
          flatShading
        />
      </mesh>

      <mesh ref={inner} scale={0.62}>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial
          color="#2a100a"
          roughness={0.4}
          metalness={0.35}
          flatShading
        />
      </mesh>

      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#c84b24"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
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
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 5, 7]} intensity={4} color="#e04b1f" decay={0} />
      <pointLight position={[-7, -4, -5]} intensity={2.5} color="#c84b24" decay={0} />
      <directionalLight position={[0, 6, 8]} intensity={1.2} color="#ffe9dc" />
      <Structure />
    </Canvas>
  );
}

export default function HeroScene() {
  const [ready, setReady] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!supportsWebGL()) return;
    setReady(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  if (!ready) return null;
  return <Scene animate={animate} />;
}
