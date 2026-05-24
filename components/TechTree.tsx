"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import TechCard from "./TechCard";

import { treeData } from "@/lib/constants";

export default function TechTree() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ 
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      dpr={[1, 2]}
      className="w-full h-full"
      onCreated={({ gl }) => {
        const handleContextLost = (event: Event) => {
          event.preventDefault();
          console.warn("WebGL Context Lost. This may happen due to GPU overload or multi-tab usage.");
        };
        gl.domElement.addEventListener("webglcontextlost", handleContextLost, false);
      }}
    >





      <TechTreeContent />
      <Preload all />
    </Canvas>
  );
}

function TechTreeContent() {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  return (
    <>
      <fog attach="fog" args={["#050505", 6, 14]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} />

      <group position={[0, -4.0, 0]}>
        {treeData.map((tech) => {
          let x = 0;
          let y = tech.level * 1.8;
          let z = 0;

          if (tech.level === 0) y += 1.2;

          const levelItems = treeData.filter((t) => t.level === tech.level);
          const index = levelItems.indexOf(tech);
          const total = levelItems.length;

          const t = total > 1 ? (index / (total - 1)) * 2 - 1 : 0;

          if (tech.level === 1) {
            x = t * 2.5;
            y += 0.5 * (1 - t * t);
            z = -0.1;
          }

          if (tech.level === 2) {
            x = t * 4;
            y += -0.4 + 0.6 * (1 - t * t);
            z = -0.3;
          }

          if (tech.level === 3) {
            x = t * 5;
            y += -0.8 + 1.2 * (1 - t * t);
            z = -0.2;
          }

          return (
            <TechCard
              key={tech.label}
              label={tech.label}
              basePosition={[x, y, z]}
              isActive={activeTech === tech.label}
              setHoveredTech={setActiveTech}
              size={
                tech.level === 0
                  ? { width: 2.8, height: 0.7, depth: 0.18, fontSize: 0.22 }
                  : undefined
              }
            />
          );
        })}
      </group>
    </>
  );
}
