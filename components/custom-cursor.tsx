"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);


  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dotRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

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
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    // Smooth follow logic
    let frameId: number;
    const updateCursor = () => {
      setDotPosition((prev) => ({
        x: prev.x + (cursorRef.current.x - prev.x) * 0.2,
        y: prev.y + (cursorRef.current.y - prev.y) * 0.2,
      }));
      
      setPosition((prev) => ({
        x: prev.x + (cursorRef.current.x - prev.x) * 0.1,
        y: prev.y + (cursorRef.current.y - prev.y) * 0.1,
      }));

      frameId = requestAnimationFrame(updateCursor);
    };

    frameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible]);

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
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-300 ease-out flex items-center justify-center",
          isHovered && "scale-150",
          isClicking && "scale-90"
        )}
        style={{
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) ${resolvedTheme === 'dark' ? `rotate(${position.x / 5}deg)` : ''}`,
        }}
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
              isHovered && "bg-primary/10 border-primary scale-110 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
            )}
          />
        )}
      </div>

      {/* Inner Dot */}
      <div
        className={cn(
          "fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] transition-opacity duration-300",
          isHovered && "scale-0 opacity-0"
        )}
        style={{
          transform: `translate3d(${dotPosition.x - 3}px, ${dotPosition.y - 3}px, 0)`,
        }}
      />
    </>
  );
}
