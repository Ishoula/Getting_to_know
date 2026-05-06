'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SECTIONS = [
  {
    id: 'intro',
    title: 'INTRO',
    content: (
      <div className="space-y-2 sm:space-y-4 md:space-y-7">
        <p>
          I&apos;m Ishoula—a developer focused on building efficient, meaningful systems.
          I work with JavaScript and databases, while exploring machine learning, data
          analysis, and cybersecurity through forensics and reverse engineering.
        </p>
        <p className="hidden lg:block">
          I approach tech as both a builder and an investigator—designing, analyzing,
          and improving systems with purpose. I&apos;m driven by problem-solving, clean
          architecture, and continuous learning.
        </p>
      </div>
    ),
    tagline: (
      <>
        I build with intention, analyze with depth,<br className="hidden sm:block" />
        and learn without limits.
      </>
    )
  },
  {
    id: 'skills',
    title: 'SKILLS',
    content: (
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-x-8 sm:gap-y-4 text-left">
        <div>
          <h3 className="font-bold text-black border-b-2 border-black/10 mb-0.5 sm:mb-1">Frontend</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">Next.js, React, TypeScript, Tailwind CSS</p>
        </div>
        <div>
          <h3 className="font-bold text-black border-b-2 border-black/10 mb-0.5 sm:mb-1">Backend</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">Node.js, PostgreSQL, GraphQL, Prisma, Redis</p>
        </div>
        <div>
          <h3 className="font-bold text-black border-b-2 border-black/10 mb-0.5 sm:mb-1">DevOps</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">Docker, AWS, Kubernetes, CI/CD</p>
        </div>
        <div>
          <h3 className="font-bold text-black border-b-2 border-black/10 mb-0.5 sm:mb-1">Core</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">System Design, Security, Data Analysis</p>
        </div>
      </div>
    ),
    tagline: "Mastering the stack from pixels to production."
  },
  {
    id: 'projects',
    title: 'PROJECTS',
    content: (
      <div className="space-y-2 sm:space-y-4">
        <div className="border-l-[3px] sm:border-l-4 border-black pl-3 sm:pl-4 py-0.5">
          <h3 className="font-bold text-black text-xs sm:text-lg md:text-xl">PesaTracker</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">A premium financial ecosystem with glassmorphism and real-time analytics.</p>
        </div>
        <div className="border-l-[3px] sm:border-l-4 border-black pl-3 sm:pl-4 py-0.5">
          <h3 className="font-bold text-black text-xs sm:text-lg md:text-xl">Interactive Portfolio</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">Modern 3D showcase built with Next.js, Three.js and Framer Motion.</p>
        </div>
      </div>
    ),
    tagline: "Turning complex problems into elegant, functional reality."
  },
  {
    id: 'contact',
    title: 'CONTACT',
    content: (
      <div className="space-y-3 sm:space-y-6 flex flex-col items-center">
        <p className="text-center max-w-[400px]">
          Looking for a developer who thinks like an investigator and builds like an architect?
          Let&apos;s talk about your next project.
        </p>
        <button
          onClick={() => window.location.href = '#contact'}
          className="bg-black text-white px-5 sm:px-8 py-1.5 sm:py-3 rounded-full font-bold text-xs sm:text-base hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
        >
          GET IN TOUCH
        </button>
      </div>
    ),
    tagline: "Open for collaborations, challenges, and coffee."
  }
];

export default function Quickie() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSection = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SECTIONS.length);
  };

  const prevSection = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SECTIONS.length) % SECTIONS.length);
  };

  const section = SECTIONS[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="min-h-[72vh] flex items-center justify-center px-2 py-10 sm:px-6 sm:py-12 font-sans overflow-hidden">
      <div className="relative w-full max-w-3xl mx-auto transition-all duration-700 scale-[0.58] xs:scale-[0.7] sm:scale-[0.8] md:scale-[0.88] lg:scale-[0.95]">
        <div className="animate-subtle-float relative">
          
          {/* Responsive SVG Speech Bubble */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 720 700" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Main Cloud Speech Bubble */}
            <path
              d="M90 90 
                 Q90 50 160 45 
                 Q210 15 290 45 
                 Q360 15 430 45 
                 Q510 15 580 50 
                 Q650 70 660 140 
                 Q680 220 640 300 
                 Q670 380 610 480 
                 Q580 580 500 590 
                 Q420 630 340 590 
                 Q250 620 170 570 
                 Q100 560 70 420 
                 Q50 320 70 200 
                 Q60 130 90 90 Z"
              fill="white"
              stroke="#111111"
              strokeWidth="12"
            />

            {/* Bottom Bubbles */}
            <circle cx="110" cy="578" r="40" fill="white" stroke="#111111" strokeWidth="10"/>
            <circle cx="55" cy="600" r="28" fill="white" stroke="#111111" strokeWidth="10"/>
            <circle cx="28" cy="622" r="15" fill="white" stroke="#111111" strokeWidth="10"/>
          </svg>

          {/* Navigation Arrows - Absolute Overlay */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-4 z-30 pointer-events-none">
            <button
              onClick={prevSection}
              className="pointer-events-auto p-2 sm:p-4 bg-white border-[4px] sm:border-[6px] border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group active:scale-95"
              aria-label="Previous section"
            >
              <ChevronLeft size={32} className="text-black group-hover:scale-110 transition-transform w-5 h-5 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={nextSection}
              className="pointer-events-auto p-2 sm:p-4 bg-white border-[4px] sm:border-[6px] border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group active:scale-95"
              aria-label="Next section"
            >
              <ChevronRight size={32} className="text-black group-hover:scale-110 transition-transform w-5 h-5 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 sm:px-14 md:px-20 py-8 text-center -translate-y-4 sm:translate-y-[-25px] md:translate-y-[-10px]">
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="flex flex-col items-center justify-center w-full"
              >
                {/* Section Badge */}
                <div className="mb-6 sm:mb-8 md:mb-10 -mt-2 sm:-mt-6">
                  <div className="inline-block bg-white border-[4px] sm:border-[6px] md:border-[7px] border-black px-6 sm:px-12 md:px-20 py-1 sm:py-3 md:py-4 rounded-[60px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-default group">
                    <h1 className="text-lg sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-1px] sm:tracking-[-2px] text-black group-hover:scale-105 transition-transform duration-300">
                      {section.title}
                    </h1>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[520px] min-h-[140px] sm:min-h-[200px] flex items-center justify-center text-[10px] xs:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17.5px] leading-tight sm:leading-relaxed md:leading-[1.65] text-gray-800 px-2 sm:px-4">
                  {section.content}
                </div>

                {/* Divider */}
                <div className="w-20 sm:w-64 md:w-80 lg:w-96 h-px sm:h-0.5 bg-black my-4 sm:my-6 md:my-8" />

                {/* Tagline */}
                <p className="text-[9px] xs:text-[11px] sm:text-[15px] md:text-lg lg:text-xl font-medium italic leading-tight max-w-[85%] sm:max-w-md text-black px-4 -mt-2 sm:-mt-3 md:-mt-4">
                  {section.tagline}
                </p>

                {/* Progress Indicator */}
                <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-4 md:mt-5">
                  {SECTIONS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-black transition-all duration-300 ${
                        i === currentIndex ? 'bg-black scale-125' : 'bg-transparent hover:bg-black/20'
                      }`}
                      aria-label={`Go to section ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
