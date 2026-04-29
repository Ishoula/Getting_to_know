"use client";

import dynamic from "next/dynamic";

import { TechGrid } from "./TechGrid";

const TechTree = dynamic(() => import("@/components/TechTree"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-black/5 rounded-xl">
      Loading Tech Tree...
    </div>
  ),
});

export function TechTreeSection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold">Tech Stack</h2>
        <p className="text-muted-foreground text-sm">Interactive growth map</p>
      </div>
      
      {/* 2D Grid for Mobile & Tablets */}
      <div className="lg:hidden">
        <TechGrid />
      </div>

      {/* 3D Tree for Desktop */}
      <div className="hidden lg:block w-full h-[600px] bg-black/5 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing">
        <TechTree />
      </div>
    </section>
  );
}
