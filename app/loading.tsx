"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative">
        {/* The Big Bubble */}
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center animate-pulse border border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)]">
          <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/30 animate-bounce-slow">
            <Image
              src="/profile.jpg"
              alt="Introuction to..."
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Loading Ring */}
        <div className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        
        {/* Text */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-primary font-medium tracking-widest text-xs uppercase animate-pulse">
          I.Shoula
        </div>
      </div>
      
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
