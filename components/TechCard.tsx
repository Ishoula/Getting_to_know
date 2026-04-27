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

  // 🎯 CORE THEME RULE (what you asked for)
  const colors = useMemo(() => {
    return {
      card: isDark ? "#ffffff" : "#000000",
      text: isDark ? "#000000" : "#ffffff",
      accent: "#3b82f6",
    };
  }, [isDark]);

  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame((state) => {
    if (!meshRef.current) return;

    const s = hovered || isActive ? 1.2 : 1.0;
    targetScale.current.set(s, s, s);
    meshRef.current.scale.lerp(targetScale.current, 0.15);

    meshRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
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
      {/* CARD */}
      <RoundedBox args={[cardWidth, cardHeight, cardDepth]} radius={0.05}>
        <meshStandardMaterial
          color={colors.card}
          roughness={0.4}
          metalness={0.2}
          emissive={isActive ? colors.accent : "#000000"}
          emissiveIntensity={isActive ? 0.4 : 0}
        />
      </RoundedBox>

      {/* Glow on hover/active */}
      {(hovered || isActive) && (
        <mesh position={[0, 0, -0.01]}>
        </mesh>
      )}

      {/* TEXT */}
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