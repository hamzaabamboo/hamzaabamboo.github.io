"use client";

import { CyberSpace } from "./CyberSpace";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CameraRig() {
  useFrame((state, delta) => {
    // Softly follow the mouse
    const x = state.pointer.x * 2; // Multiplier for sensitivity
    const y = state.pointer.y * 2;

    // Lerp camera position
    // eslint-disable-next-line react-hooks/immutability
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      x,
      delta * 2
    );
    // eslint-disable-next-line react-hooks/immutability
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      y,
      delta * 2
    );

    // Always look at center
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Experience({ isDark }: { isDark: boolean }) {
  return (
    <>
      <CameraRig />
      <CyberSpace isDark={isDark} />
    </>
  );
}
