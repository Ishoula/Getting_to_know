'use client';

import React from 'react';

export default function IshoulaIntro() {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-8 font-sans overflow-hidden">
      <div className="relative w-full max-w-4xl mx-auto transition-all duration-700 scale-[0.7] xs:scale-[0.85] sm:scale-[0.9] md:scale-100">
        <div className="animate-subtle-float">
          
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
            {/* Main Cloud Speech Bubble - Slightly taller path */}
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

            {/* Bottom Bubbles - Adjusted for taller bubble */}
            <circle cx="110" cy="615" r="52" fill="white" stroke="#111111" strokeWidth="10"/>
            <circle cx="55" cy="655" r="35" fill="white" stroke="#111111" strokeWidth="10"/>
            <circle cx="28" cy="678" r="15" fill="white" stroke="#111111" strokeWidth="10"/>
          </svg>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-12 md:px-16 py-8 text-center -translate-y-4 sm:translate-y-[-25px] md:translate-y-[-10px]">
            
            {/* INTRO Badge - Responsive */}
            <div className="mb-6 sm:mb-8 md:mb-10 -mt-2 sm:-mt-6">
              <div className="inline-block bg-white border-[4px] sm:border-[6px] md:border-[7px] border-black px-6 sm:px-12 md:px-20 py-1 sm:py-3 md:py-4 rounded-[60px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-default group">
                <h1 className="text-lg sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-1px] sm:tracking-[-2px] text-black group-hover:scale-105 transition-transform duration-300">
                  INTRO
                </h1>
              </div>
            </div>

            {/* Main Text - Responsive sizing */}
            <div className="max-w-[90%] sm:max-w-[85%] md:max-w-[520px] space-y-2 sm:space-y-4 md:space-y-7 text-[10px] xs:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17.5px] leading-tight sm:leading-relaxed md:leading-[1.65] text-gray-800 px-2 sm:px-4">
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

            {/* Divider - Responsive width */}
            <div className="w-20 sm:w-64 md:w-80 lg:w-96 h-px sm:h-0.5 bg-black my-4 sm:my-6 md:my-8" />

            {/* Tagline - Responsive */}
            <p className="text-[9px] xs:text-[11px] sm:text-[15px] md:text-lg lg:text-xl font-medium italic leading-tight max-w-[85%] sm:max-w-md text-black px-4">
              I build with intention, analyze with depth,<br className="hidden sm:block" />
              and learn without limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}