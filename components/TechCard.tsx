"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

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
  const [themeVars, setThemeVars] = useState(() => ({
    card: "0 0% 8%",
    muted: "0 0% 12%",
    primary: "217 91% 60%",
    foreground: "0 0% 100%",
  }));

  const cardWidth = size?.width ?? 1.4;
  const cardHeight = size?.height ?? 0.7;
  const cardDepth = size?.depth ?? 0.15;
  const fontSize = size?.fontSize ?? 0.16;

  useEffect(() => {
    const read = () => {
      const styles = getComputedStyle(document.documentElement);
      const defaults = {
        card: "0 0% 8%",
        muted: "0 0% 12%",
        primary: "217 91% 60%",
        foreground: "0 0% 100%",
      };

      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";

      const getVar = (name: string, fallback: string) => {
        const raw = styles.getPropertyValue(name).trim();
        return raw || fallback;
      };

      setThemeVars({
        card: isDark ? "0 0% 100%" : "0 0% 0%",
        muted: isDark ? "0 0% 94%" : "0 0% 8%",
        primary: getVar("--primary", defaults.primary),
        foreground: isDark ? "0 0% 0%" : "0 0% 100%",
      });
    };

    read();
    const observer = new MutationObserver(() => read());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const colors = useMemo(() => {
    const base = new THREE.Color(`hsl(${themeVars.card})`);
    const hover = new THREE.Color(`hsl(${themeVars.muted})`);
    const accent = new THREE.Color(`hsl(${themeVars.primary})`);
    const foreground = new THREE.Color(`hsl(${themeVars.foreground})`);
    return { base, hover, accent, foreground };
  }, [themeVars]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Dynamic Scaling
    const scale = hovered || isActive ? 1.2 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.15);

    // Gentle "Floating" wobble
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
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
      {/* CARD BODY: Using RoundedBox for a premium UI feel */}
      <RoundedBox args={[cardWidth, cardHeight, cardDepth]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color={hovered || isActive ? colors.hover : colors.base}
          roughness={0.3}
          metalness={0.8}
          emissive={isActive ? colors.accent : "#000000"}
          emissiveIntensity={isActive ? 0.5 : 0}
        />
      </RoundedBox>

      {/* INNER GLOW / BORDER (Visible when hovered) */}
      {(hovered || isActive) && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.5, 0.8]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={0.3} />
        </mesh>
      )}

      {/* TEXT: Raised slightly off the surface */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={fontSize}
        color={colors.foreground}
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
      >
        {label}
      </Text>
    </group>
  );
}