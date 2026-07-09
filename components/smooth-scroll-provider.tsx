"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [shouldSmoothScroll, setShouldSmoothScroll] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setShouldSmoothScroll(!mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <>
      {shouldSmoothScroll && (
        <ReactLenis
          root
          options={{
            anchors: {
              offset: -112,
            },
            autoRaf: true,
            lerp: 0.085,
            smoothWheel: true,
            stopInertiaOnNavigate: true,
            syncTouch: false,
            wheelMultiplier: 0.95,
          }}
        />
      )}
      {children}
    </>
  );
}
