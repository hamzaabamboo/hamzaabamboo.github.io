"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { CyberSpace } from "./CyberSpace";
import { useTheme } from "next-themes";

function CameraRig() {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Gentle floating camera
    // eslint-disable-next-line react-hooks/immutability
    state.camera.position.x = Math.sin(time * 0.2) * 2;
    // eslint-disable-next-line react-hooks/immutability
    state.camera.position.y = Math.cos(time * 0.2) * 2;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ProjectBackground() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraRig />
        <CyberSpace isDark={isDark} />
      </Canvas>
      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-zinc-50/80 dark:bg-black/80 backdrop-blur-[2px]" />
    </div>
  );
}
