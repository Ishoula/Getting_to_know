"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Star = {
  size: number;
  left: number;
  top: number;
  opacity: number;
};

export default function FloatingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 50 }).map(() => ({
      size: Math.random() * 8 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.35 + 0.55,
    }));

    setStars(generated);
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden text-black dark:text-white [--star-glow:rgba(0,0,0,0.22)] dark:[--star-glow:rgba(255,255,255,0.42)]">
      {stars.map((s, i) => (
        <svg
          key={i}
          className="absolute"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={
            {
              width: s.size,
              height: s.size,
              left: `${s.left}%`,
              top: `${s.top}%`,
              opacity: s.opacity,
              filter:
                "drop-shadow(0 0 4px var(--star-glow)) drop-shadow(0 0 8px var(--star-glow))",
            } as CSSProperties & Record<string, string | number>
          }
        >
          <path
            fill="currentColor"
            d="M12 2.25l2.85 5.77 6.37.93-4.61 4.49 1.09 6.34L12 16.8l-5.7 2.98 1.09-6.34-4.61-4.49 6.37-.93L12 2.25z"
          />
        </svg>
      ))}
    </div>
  );
}
