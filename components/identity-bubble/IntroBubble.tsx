'use client';

import React from 'react';

export default function IshoulaIntro() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-8 font-sans">
      <div className="relative w-full max-w-3xl">
        
        {/* SVG Speech Bubble - Larger & Better Proportioned */}
        <svg 
          width="100%" 
          height="620" 
          viewBox="0 0 720 620" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Main Cloud Speech Bubble - Larger */}
          <path
            d="M90 90 
               Q90 50 160 45 
               Q210 15 290 45 
               Q360 15 430 45 
               Q510 15 580 50 
               Q650 70 660 140 
               Q680 220 640 300 
               Q670 380 610 450 
               Q580 520 500 530 
               Q420 570 340 530 
               Q250 560 170 510 
               Q100 500 70 420 
               Q50 320 70 200 
               Q60 130 90 90 Z"
            fill="white"
            stroke="#111111"
            strokeWidth="10"
          />

          {/* Bottom Bubbles */}
          <circle cx="110" cy="555" r="52" fill="white" stroke="#111111" strokeWidth="10"/>
          <circle cx="55" cy="595" r="35" fill="white" stroke="#111111" strokeWidth="10"/>
          <circle cx="28" cy="618" r="15" fill="white" stroke="#111111" strokeWidth="10"/>
        </svg>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-16 py-8 text-center">
          
          {/* INTRO Badge */}
          <div className="-mt-8 mb-4">
            <div className="inline-block bg-white border-[7px] border-black px-20 py-4 rounded-[60px]">
              <h1 className="text-6xl font-black tracking-[-2px] text-black">INTRO</h1>
            </div>
          </div>

          {/* Main Text */}
          <div className="max-w-[520px] space-y-7 text-[17.5px] leading-[1.65] text-gray-800 px-4">
            <p>
              I&apos;m Ishoula—a developer focused on building efficient, meaningful systems. 
              I work with JavaScript and databases, while exploring machine learning, data 
              analysis, and cybersecurity through forensics and reverse engineering.
            </p>
            
            <p>
              I approach tech as both a builder and an investigator—designing, analyzing, 
              and improving systems with purpose. I&apos;m driven by problem-solving, clean 
              architecture, and continuous learning.
            </p>
          </div>

          {/* Divider */}
          <div className="w-96 h-0.5 bg-black my-3" />

          {/* Tagline */}
          <p className="text-lg font-medium italic leading-tight max-w-md text-black">
            I build with intention, analyze with depth,<br />
            and learn without limits.
          </p>
        </div>
      </div>
    </div>
  );
}