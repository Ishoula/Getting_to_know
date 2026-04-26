"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import TechCard from "./TechCard";

const treeData = [
  { label: "Software Development", level: 0, branch: "trunk" },

  { label: "Frontend", level: 1, branch: "left" },
  { label: "Backend", level: 1, branch: "right" },
  { label: "DevOps", level: 1, branch: "center" },

  { label: "TypeScript", level: 2, branch: "left" },
  { label: "Prisma", level: 2, branch: "right" },
  { label: "Redis", level: 2, branch: "right" },
  { label: "Jest", level: 2, branch: "left" },
  { label: "GitHub Actions", level: 2, branch: "center" },
  { label: "Kubernetes", level: 2, branch: "center" },

  { label: "React", level: 3, branch: "left" },
  { label: "Next.js", level: 3, branch: "left" },
  { label: "Tailwind", level: 3, branch: "left" },

  { label: "Node.js", level: 3, branch: "right" },
  { label: "PostgreSQL", level: 3, branch: "right" },
  { label: "GraphQL", level: 3, branch: "right" },

  { label: "Docker", level: 3, branch: "center" },
  { label: "AWS", level: 3, branch: "center" },
];

export default function TechTree() {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const mouse = useRef({ x: 0, y: 0 }).current;

  useFrame(({ mouse: m }) => {
    mouse.x = m.x;
    mouse.y = m.y;
  });

  return (
    <>
      <fog attach="fog" args={["#050505", 6, 14]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} />

      <group position={[0, -3.0, 0]}>
        {treeData.map((tech, i) => {
          let x = 0;
          let y = tech.level * 1.8;
          let z = 0;

          if (tech.level === 0) {
            y += 0.8;
          }

          if (tech.level === 1) {
            const allLevel1 = treeData.filter((t) => t.level === 1);
            const globalIndex = allLevel1.indexOf(tech);
            const total = allLevel1.length;

            const halfWidth = 2.5;
            const arcHeight = 0.5;

            const t = total > 1 ? (globalIndex / (total - 1)) * 2 - 1 : 0;
            x = t * halfWidth;
            y += arcHeight * (1 - t * t);
            z = -0.1;
          }

          if (tech.level === 2) {
            const allLevel2 = treeData.filter((t) => t.level === 2);
            const globalIndex = allLevel2.indexOf(tech);
            const total = allLevel2.length;

            const halfWidth = 4.0;
            const arcHeight = 0.6;

            const t = total > 1 ? (globalIndex / (total - 1)) * 2 - 1 : 0;
            x = t * halfWidth;
            y += -0.4 + arcHeight * (1 - t * t);
            z = -0.3;
          }

          if (tech.level === 3) {
            const allLevel3 = treeData.filter((t) => t.level === 3);
            const globalIndex = allLevel3.indexOf(tech);
            const total = allLevel3.length;

            const halfWidth = 5.0;
            const arcHeight = 1.2;

            const t = total > 1 ? (globalIndex / (total - 1)) * 2 - 1 : 0;
            x = t * halfWidth;
            y += -0.8 + arcHeight * (1 - t * t);
            z = -0.2;
          }

          return (
            <TechCard
              key={tech.label}
              label={tech.label}
              basePosition={[x, y, z]}
              isActive={activeTech === tech.label}
              onSelect={setActiveTech}
              setHoveredTech={setHoveredTech}
              mouse={mouse}
              size={
                tech.level === 0
                  ? { width: 2.4, height: 0.9, depth: 0.18, fontSize: 0.22 }
                  : undefined
              }
            />
          );
        })}
      </group>
    </>
  );
}