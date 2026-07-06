"use client";
import React from 'react';
import { useSkeleton } from '@/context/SkeletonContext';

/**
 * Full‑screen overlay that displays a shimmering skeleton placeholder
 * whenever the global loading state is true.
 */
export default function SkeletonOverlay() {
  const { isLoading } = useSkeleton();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-48 h-12 bg-accent animate-pulse rounded-md" />
    </div>
  );
}
