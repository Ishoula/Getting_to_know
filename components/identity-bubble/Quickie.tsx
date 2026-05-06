'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, Mail, X, Star, Focus } from 'lucide-react';
import { cn } from '@/lib/utils';


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
        Developer. Builder. Problem Solver
      </>
    )
  },
  {
    id: 'skills',
    title: 'SKILLS',
    content: (
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-x-8 sm:gap-y-4 text-left">
        <div>
          <h3 className="font-bold text-foreground border-b-2 border-foreground/10 mb-0.5 sm:mb-1">Frontend & Mobile</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">Next.js, React, TypeScript, Tailwind CSS, React Native</p>
        </div>
        <div>
          <h3 className="font-bold text-foreground border-b-2 border-foreground/10 mb-0.5 sm:mb-1">Backend</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">Node.js, PostgreSQL, REST, Prisma,Java, Spring Boot,Python, MongoDB, PostgreSQL, SQLite</p>
        </div> 
        <div>
          <h3 className="font-bold text-foreground border-b-2 border-foreground/10 mb-0.5 sm:mb-1">Others</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">Data Structures and Algorithms, Git, Embedded Systems, C++, C, Google sheets, Ms Excel, Python, Canva , Figma, Blender</p>
        </div>
      </div>
    ),
    tagline: "What I bring to the table"
  },
  {
    id: 'projects',
    title: 'PROJECTS',
    content: (
      <div className="space-y-2 sm:space-y-4">
        <div className="border-l-[3px] sm:border-l-4 border-foreground pl-3 sm:pl-4 py-0.5">
          <h3 className="font-bold text-foreground text-xs sm:text-lg md:text-xl">PesaTracker</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">A premium financial ecosystem with glassmorphism and real-time analytics.</p>
        </div>
        <div className="border-l-[3px] sm:border-l-4 border-foreground pl-3 sm:pl-4 py-0.5">
          <h3 className="font-bold text-foreground text-xs sm:text-lg md:text-xl">Interactive Portfolio</h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base">Modern 3D showcase built with Next.js, Three.js and Framer Motion.</p>
        </div>
      </div>
    ),
    tagline: "From concept to reality"
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
        <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:shoulamite2k@gmail.com"
                  className="group flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>shoulamite2k@gmail.com</span>
                </a>
              </li>
             <li>
                <a
                  href="https://wa.me/+250798482836"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm hover:text-green-500 transition-colors"
                >
                  <div className="p-2 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>+250 798 482 836</span>
                </a>
              </li>
            </ul>
          </div>
      </div>
    ),
    tagline: "Open for collaborations, challenges, and coffee."
  }
];

function SectionTitleBadge({ title }: { title: string }) {
  return (
    <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
      <div className="inline-flex items-center justify-center bg-card border-[4px] sm:border-[6px] md:border-[7px] border-foreground px-6 sm:px-12 md:px-20 py-1 sm:py-3 md:py-4 rounded-[60px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.35)]">
        <h1 className="text-lg sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-1px] sm:tracking-[-2px] text-foreground">
          {title}
        </h1>
      </div>
    </div>
  );
}

function StarFocusIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6", className)}>
      {/* Sharp Viewfinder Corners */}
      <div className="absolute inset-0 flex flex-col justify-between p-[2px]">
        <div className="flex justify-between">
          <div className="w-2.5 h-2.5 border-t-[2.5px] border-l-[2.5px] border-foreground" />
          <div className="w-2.5 h-2.5 border-t-[2.5px] border-r-[2.5px] border-foreground" />
        </div>
        <div className="flex justify-between">
          <div className="w-2.5 h-2.5 border-b-[2.5px] border-l-[2.5px] border-foreground" />
          <div className="w-2.5 h-2.5 border-b-[2.5px] border-r-[2.5px] border-foreground" />
        </div>
      </div>
      <Star className="w-[60%] h-[60%] text-foreground fill-none stroke-[2px]" />
    </div>
  );
}

export default function Quickie() {
  const [isOpen, setIsOpen] = useState(false);
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

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "fixed bottom-6 left-6 z-40 p-2.5 rounded-xl bg-card border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all",
          isOpen && "pointer-events-none opacity-0"
        )}
        aria-label="Open Quickie"
      >
        <StarFocusIcon className="text-foreground" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
            />

            {/* Close Button */}
            <motion.button
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-card border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-95 transition-all"
            >
              <X className="w-6 h-6 text-foreground" />
            </motion.button>

            {/* Bubble Container */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl mx-auto pointer-events-none"
            >
              <div className="animate-subtle-float relative pointer-events-auto scale-[0.5] xs:scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.85]">
                
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
                    className="fill-card stroke-foreground"
                    strokeWidth="12"
                  />

                  {/* Bottom Bubbles */}
                  <circle cx="110" cy="578" r="40" className="fill-card stroke-foreground" strokeWidth="10"/>
                  <circle cx="55" cy="600" r="28" className="fill-card stroke-foreground" strokeWidth="10"/>
                  <circle cx="28" cy="622" r="15" className="fill-card stroke-foreground" strokeWidth="10"/>
                </svg>

                {/* Navigation Arrows - Absolute Overlay */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-4 z-30 pointer-events-none">
                  <button
                    onClick={prevSection}
                    className="pointer-events-auto p-2 sm:p-4 bg-card border-[4px] sm:border-[6px] border-foreground rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.35)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.35)] transition-all cursor-pointer group active:scale-95"
                    aria-label="Previous section"
                  >
                    <ChevronLeft size={32} className="text-foreground group-hover:scale-110 transition-transform w-5 h-5 sm:w-8 sm:h-8" />
                  </button>
                  <button
                    onClick={nextSection}
                    className="pointer-events-auto p-2 sm:p-4 bg-card border-[4px] sm:border-[6px] border-foreground rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.35)] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.35)] transition-all cursor-pointer group active:scale-95"
                    aria-label="Next section"
                  >
                    <ChevronRight size={32} className="text-foreground group-hover:scale-110 transition-transform w-5 h-5 sm:w-8 sm:h-8" />
                  </button>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-start px-10 sm:px-14 md:px-20 pt-10 sm:pt-12 md:pt-14 text-center -translate-y-2 sm:translate-y-[-8px] md:translate-y-[-4px]">
                  
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
                      className="relative flex flex-col items-center justify-start w-full"
                    >
                      <SectionTitleBadge title={section.title} />

                      {/* Main Content Area */}
                      <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[520px] min-h-[140px] sm:min-h-[200px] flex items-center justify-center text-[10px] xs:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17.5px] leading-tight sm:leading-relaxed md:leading-[1.65] text-foreground px-2 sm:px-4 transition-all duration-500 mt-20 sm:mt-24 md:mt-32">
                        {section.content}
                      </div>

                      {/* Divider */}
                      <div className="w-20 sm:w-64 md:w-80 lg:w-96 h-px sm:h-0.5 bg-foreground my-4 sm:my-6 md:my-8" />

                      {/* Tagline */}
                      <p className="text-[9px] xs:text-[11px] sm:text-[15px] md:text-lg lg:text-xl font-medium italic leading-tight max-w-[85%] sm:max-w-md text-foreground px-4 -mt-2 sm:-mt-3 md:-mt-4">
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
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-foreground transition-all duration-300 ${
                              i === currentIndex ? 'bg-foreground border-foreground scale-125' : 'bg-transparent border-foreground hover:bg-foreground/20'
                            }`}
                            aria-label={`Go to section ${i + 1}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}