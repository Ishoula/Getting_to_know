"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };



    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("cursor-pointer");
      
      setIsHovered(!!isSelectable);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    let frameId: number;
    const updateCursor = () => {
      // Interpolation logic
      dotPosRef.current.x += (mouseRef.current.x - dotPosRef.current.x) * 0.25;
      dotPosRef.current.y += (mouseRef.current.y - dotPosRef.current.y) * 0.25;
      
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.15;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${dotPosRef.current.x - 3}px, ${dotPosRef.current.y - 3}px, 0)`;
      }

      if (outerRef.current) {
        const rotation = resolvedTheme === 'dark' ? `rotate(${posRef.current.x / 5}deg)` : '';
        outerRef.current.style.transform = `translate3d(${posRef.current.x - 20}px, ${posRef.current.y - 20}px, 0) ${rotation}`;
      }

      frameId = requestAnimationFrame(updateCursor);
    };

    frameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, [mounted, isVisible, resolvedTheme]);

  if (!mounted || !isVisible) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Outer Cursor (Bubble or Moon) */}
      <div
        ref={outerRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center will-change-transform",
          "transition-transform duration-200 ease-out" // Only for scale
        )}
      >
        {resolvedTheme === 'dark' ? (
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "text-primary/70 transition-all duration-300",
              isHovered && "text-primary fill-primary/20 drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
            )}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ) : (
          <div
            className={cn(
              "w-8 h-8 rounded-full border border-primary/50 transition-all duration-300",
              isHovered && "bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]"
            )}
          />
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={innerRef}
        className={cn(
          "fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] transition-opacity duration-300 will-change-transform",
          isHovered && "opacity-0"
        )}
      />
    </>
  );
}
