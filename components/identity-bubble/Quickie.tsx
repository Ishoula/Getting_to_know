'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, Mail, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const SECTIONS = [
  {
    id: 'intro',
    title: 'INTRO',
    content: (
      <div className="mx-auto max-w-[44ch] space-y-3 text-center sm:space-y-4 md:space-y-5">
        <p className="leading-relaxed">
          <TypewriterText
            text="I'm Ishoula—a developer focused on building efficient, meaningful systems. I work with JavaScript and databases, while exploring machine learning, data analysis, and cybersecurity through forensics and reverse engineering."
            speed={15}
          />
        </p>
        <p className="hidden lg:block leading-relaxed">
          <TypewriterText
            text="I approach tech as both a builder and an investigator—designing, analyzing, and improving systems with purpose. I'm driven by problem-solving, clean architecture, and continuous learning."
            delay={1400}
            speed={15}
          />
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
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-8 sm:gap-y-4 text-left">
        <div>
          <h3 className="font-bold text-foreground border-b-2 border-foreground/10 mb-0.5 sm:mb-1">
            <TypewriterText text="Frontend & Mobile" speed={14} />
          </h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base leading-snug">
            <TypewriterText
              text="Next.js, React, TypeScript, Tailwind CSS, React Native"
              delay={250}
              speed={11}
            />
          </p>
        </div>
        <div>
          <h3 className="font-bold text-foreground border-b-2 border-foreground/10 mb-0.5 sm:mb-1">
            <TypewriterText text="Backend" delay={450} speed={14} />
          </h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base leading-snug">
            <TypewriterText
              text="Node.js, PostgreSQL, REST, Prisma, Java, Spring Boot, Python, MongoDB, SQLite"
              delay={700}
              speed={10}
            />
          </p>
        </div> 
        <div>
          <h3 className="font-bold text-foreground border-b-2 border-foreground/10 mb-0.5 sm:mb-1">
            <TypewriterText text="Others" delay={900} speed={14} />
          </h3>
          <p className="text-[9px] xs:text-[11px] sm:text-[13px] md:text-base leading-snug">
            <TypewriterText
              text="Data Structures and Algorithms, Git, Embedded Systems, C++, C, Google Sheets, MS Excel, Python, Canva, Figma, Blender"
              delay={1150}
              speed={9}
            />
          </p>
        </div>
      </div>
    ),
    tagline: "What I bring to the table"
  },
  {
    id: 'projects',
    title: 'PROJECTS',
    content: (
      <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[400px] mx-auto">
        <div className="group/item relative bg-background border-2 border-foreground p-2 sm:p-3 rounded-xl transition-all text-left hover:border-primary/50">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-[11px] sm:text-sm md:text-base uppercase tracking-tight">
              <TypewriterText text="PesaTracker" speed={15} />
            </h3>
            <span className="text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 bg-foreground text-background rounded">LIVE</span>
          </div>
          <p className="text-[9px] sm:text-[11px] md:text-[13px] text-foreground/80 mt-1 line-clamp-2 tracking-wide">
            <TypewriterText
              text="Financial ecosystem with glassmorphism & real-time analytics."
              delay={250}
              speed={11}
            />
          </p>
        </div>
        <div className="group/item relative bg-background border-2 border-foreground p-2 sm:p-3 rounded-xl transition-all text-left hover:border-primary/50">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-[11px] sm:text-sm md:text-base uppercase tracking-tight">
              <TypewriterText text="Interactive Portfolio" delay={500} speed={15} />
            </h3>
            <span className="text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 border-2 border-foreground rounded">WIP</span>
          </div>
          <p className="text-[9px] sm:text-[11px] md:text-[13px] text-foreground/80 mt-1 line-clamp-2 tracking-wide">
            <TypewriterText
              text="Modern 3D showcase built with Next.js & Framer Motion."
              delay={750}
              speed={11}
            />
          </p>
        </div>
        <Link 
          href="/projects" 
          className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 group/link"
        >
          View All Projects
          <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
        </Link>
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
          <TypewriterText
            text="Looking for a developer who thinks like an investigator and builds like an architect? Let's talk about your next project."
            speed={15}
          />
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
                  <span>
                    <TypewriterText text="shoulamite2k@gmail.com" delay={400} speed={13} />
                  </span>
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
                  <span>
                    <TypewriterText text="+250 798 482 836" delay={650} speed={13} />
                  </span>
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
        <h1 className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
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

type TypewriterTextProps = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
};

function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 18,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(text);
      return;
    }

    setDisplayed('');

    let index = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length && interval) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [delay, reduceMotion, speed, text]);

  const done = displayed.length >= text.length;

  return (
    <span className={className}>
      <span className="whitespace-pre-wrap">{displayed}</span>
      {!reduceMotion && !done ? (
        <span className="ml-0.5 inline-block animate-pulse align-baseline">|</span>
      ) : null}
    </span>
  );
}

export default function Quickie() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const syncFromHash = () => {
      const shouldOpen = window.location.hash === '#quickie';

      setIsOpen(shouldOpen);

      if (shouldOpen) {
        setCurrentIndex(0);
        setDirection(0);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);

    return () => {
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  const openQuickie = () => {
    setCurrentIndex(0);
    setDirection(0);
    setIsOpen(true);

    if (window.location.hash !== '#quickie') {
      window.history.pushState(
        null,
        '',
        `${window.location.pathname}${window.location.search}#quickie`
      );
    }
  };

  const closeQuickie = () => {
    setIsOpen(false);

    if (window.location.hash === '#quickie') {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`
      );
    }
  };

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
        onClick={openQuickie}
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "hidden md:block fixed bottom-6 left-6 z-40 p-2.5 rounded-xl bg-card border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all",
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
              onClick={closeQuickie}
              className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
            />

            {/* Close Button */}
            <motion.button
              onClick={closeQuickie}
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
              <div className="animate-subtle-float relative pointer-events-auto scale-[0.5] xs:scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.85] transform-gpu antialiased subpixel-antialiased">
                
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
