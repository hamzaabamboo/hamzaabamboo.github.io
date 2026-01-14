"use client";

import { Text, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  Noise,
  Glitch,
  Scanline
} from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

const CHARS = [
  "0",
  "1",
  "<",
  ">",
  "{",
  "}",
  "/",
  "*",
  "¦",
  "|",
  "[",
  "]",
  "∆",
  "⚡"
];

function CodeStorm({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);

  const colors = isDark
    ? ["#22d3ee", "#4ade80", "#a78bfa", "#f472b6", "#facc15", "#fb923c"]
    : ["#0c4a6e", "#14532d", "#4c1d95", "#831843", "#713f12", "#9a3412"];

  const textParticles = useMemo(() => {
    return Array.from({ length: 120 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      ] as [number, number, number],
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      scale: Math.random() * 0.4 + 0.25,
      colorIndex: Math.floor(Math.random() * 6)
    }));
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (typeof window === "undefined") return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const scroll = total > 0 ? window.scrollY / total : 0;
    const targetRot = scroll * Math.PI;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRot,
      delta * 2
    );
    const targetY = scroll * 15;
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      delta * 2
    );
  });

  return (
    <group ref={group}>
      {textParticles.map((p, i) => (
        <Text
          key={i}
          position={p.position}
          fontSize={p.scale}
          color={colors[p.colorIndex]}
          anchorX="center"
          anchorY="middle"
        >
          {p.char}
        </Text>
      ))}
      <DataBits isDark={isDark} />
      <GridFloor isDark={isDark} />
    </group>
  );
}

function DataBits({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 500; // Increased from 300
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.1
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  useEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      dummy.position.set(p.position[0], p.position[1], p.position[2]);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const s = Math.random() > 0.9 ? 1.5 : 0.4;
      dummy.scale.set(0.04, s, 0.04);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, particles]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={isDark ? "#22d3ee" : "#0ea5e9"}
        transparent
        opacity={isDark ? 0.3 : 0.5}
      />
    </instancedMesh>
  );
}

function GridFloor({ isDark }: { isDark: boolean }) {
  return (
    <gridHelper
      args={[
        100,
        40,
        isDark ? "#22d3ee" : "#94a3b8",
        isDark ? "#0e7490" : "#cbd5e1"
      ]}
      position={[0, -10, 0]}
    />
  );
}

export function CyberSpace({ isDark }: { isDark: boolean }) {
  const bg = isDark ? "#020617" : "#f8fafc";

  return (
    <>
      <color attach="background" args={[bg]} />
      {isDark && <fog attach="fog" args={["#020617", 10, 50]} />}

      <ambientLight intensity={isDark ? 0.8 : 1} />

      <CodeStorm isDark={isDark} />
      <Sparkles
        count={300}
        scale={40}
        size={isDark ? 2 : 3}
        color={isDark ? "#22d3ee" : "#0369a1"}
        opacity={isDark ? 0.5 : 1}
        speed={0}
      />

      {isDark && (
        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0}
            mipmapBlur
            intensity={1.5}
            radius={0.4}
          />
          <Glitch
            delay={new THREE.Vector2(4, 10)}
            duration={new THREE.Vector2(0.1, 0.2)}
            strength={new THREE.Vector2(0.05, 0.1)}
            mode={GlitchMode.SPORADIC}
            active
          />
          <Scanline density={1.2} opacity={0.03} />
          <Noise opacity={0.03} />
        </EffectComposer>
      )}
    </>
  );
}
