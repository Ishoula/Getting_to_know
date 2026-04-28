"use client";

import dynamic from "next/dynamic";

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
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Tech Stack</h2>
        <p className="text-muted-foreground text-sm">Interactive growth map</p>
      </div>
      <div className="w-full h-[600px] bg-black/5 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing">
        <TechTree />
      </div>
    </section>
  );
}
