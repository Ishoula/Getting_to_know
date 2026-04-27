"use client";

import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

interface TechCardProps {
  label: string;
  basePosition: [number, number, number];
  isActive: boolean;
  setHoveredTech: (val: string | null) => void;
  isAnyHovered: boolean; // 👈 add this
  size?: {
    width: number;
    height: number;
    depth?: number;
    fontSize?: number;
  };
}

export default function TechCard({
  label,
  basePosition,
  isActive,
  setHoveredTech,
  isAnyHovered,
  size,
}: TechCardProps) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const cardWidth = size?.width ?? 1.4;
  const cardHeight = size?.height ?? 0.7;
  const cardDepth = size?.depth ?? 0.15;
  const fontSize = size?.fontSize ?? 0.16;

  // 🎯 Theme colors
  const colors = useMemo(() => {
    return {
      card: isDark ? "#ffffff" : "#000000",
      text: isDark ? "#000000" : "#ffffff",
      accent: "#3b82f6",
    };
  }, [isDark]);

  // 🎲 Random motion config (stable per card)
  const random = useMemo(() => ({
    offsetX: Math.random() * 2 - 1,
    offsetY: Math.random() * 2 - 1,
    speed: 0.5 + Math.random() * 0.8,
    amplitude: 0.2 + Math.random() * 0.3,
    phase: Math.random() * Math.PI * 2,
  }), []);

  const targetScale = useRef(new THREE.Vector3(1, 1, 1));
useFrame((state) => {
  if (!meshRef.current) return;

  const t = state.clock.elapsedTime;

  // 🧲 STOP ALL motion if ANY card is hovered
  if (!isAnyHovered) {
    meshRef.current.position.x =
      basePosition[0] +
      Math.sin(t * random.speed + random.phase) *
        random.amplitude *
        random.offsetX;

    meshRef.current.position.y =
      basePosition[1] +
      Math.cos(t * random.speed + random.phase) *
        random.amplitude *
        random.offsetY;

    meshRef.current.position.z =
      basePosition[2] +
      Math.sin(t * random.speed) * 0.1;

    meshRef.current.rotation.z =
      Math.sin(t * random.speed) * 0.08;
  } else {
    meshRef.current.position.lerp(
      new THREE.Vector3(...basePosition),
      0.2
    );

    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      0,
      0.2
    );
  }

  const s = hovered || isActive ? 1.2 : 1.0;
  targetScale.current.set(s, s, s);
  meshRef.current.scale.lerp(targetScale.current, 0.15);
});

  return (
    <group
      ref={meshRef}
      position={basePosition}
      onPointerOver={() => {
        setHovered(true);
        setHoveredTech(label);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredTech(null);
        document.body.style.cursor = "auto";
      }}
    >
      <RoundedBox args={[cardWidth, cardHeight, cardDepth]} radius={0.05}>
        <meshStandardMaterial
          color={colors.card}
          roughness={0.4}
          metalness={0.2}
          emissive={isActive ? colors.accent : "#000000"}
          emissiveIntensity={isActive ? 0.4 : 0}
        />
      </RoundedBox>

      <Text
        position={[0, 0, 0.1]}
        fontSize={fontSize}
        color={colors.text}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}