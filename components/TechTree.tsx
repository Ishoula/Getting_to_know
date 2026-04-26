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

  { label: "React", level: 2, branch: "left" },
  { label: "Next.js", level: 2, branch: "left" },
  { label: "Tailwind", level: 2, branch: "left" },

  { label: "Node.js", level: 2, branch: "right" },
  { label: "PostgreSQL", level: 2, branch: "right" },
  { label: "GraphQL", level: 2, branch: "right" },

  { label: "Docker", level: 2, branch: "center" },
  { label: "AWS", level: 2, branch: "center" },
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

      <group position={[0, -1.5, 0]}>
        {treeData.map((tech, i) => {
          let x = 0;
          let y = tech.level * 1.8;
          let z = 0;

          if (tech.level === 1) {
            if (tech.branch === "left") x = -2;
            if (tech.branch === "right") x = 2;
            if (tech.branch === "center") x = 0;
          }

          if (tech.level === 2) {
            const siblings = treeData.filter(
              (t) => t.level === 2 && t.branch === tech.branch
            );
            const index = siblings.indexOf(tech);

            const spread = 1.3;

            if (tech.branch === "left") x = -2.5 + index * spread;
            if (tech.branch === "right") x = 2.5 - index * spread;
            if (tech.branch === "center") x = (index - 1) * spread;

            y += 0.6;
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
            />
          );
        })}
      </group>
    </>
  );
}