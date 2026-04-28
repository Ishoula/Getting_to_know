"use client";

import { useEffect, useState } from "react";

type Star = {
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
};

export default function FloatingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 30 }).map(() => ({
      size: Math.random() * 15 + 5,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.2 + 0.1,
    }));

    setStars(generated);
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute bottom-[-60px] bg-black dark:bg-white animate-floatBubble"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      ))}
    </div>
  );
}