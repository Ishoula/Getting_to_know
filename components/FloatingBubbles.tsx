"use client";

import { useEffect, useState } from "react";

type Bubble = {
  size: number;
  left: number;
  delay: number;
  duration: number;
};

export default function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generated: Bubble[] = Array.from({ length: 25 }).map(() => ({
      size: Math.random() * 20 + 10,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 8,
    }));

    setBubbles(generated);
  }, []);

  if (bubbles.length === 0) return null; // prevents mismatch flash

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-[-60px] rounded-full opacity-20 animate-floatBubble
                     bg-black dark:bg-white"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}