"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const TECHS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Tailwind",
  "Prisma",
  "REST",
  "GraphQL",
  "Docker",
  "Git",
  "Python",
  "Java",
  "Spring Boot",
  "SQLite",
  "Redis",
  "JWT",
  "React Native",
  "Figma",
  "Linux",
  "Vercel",
  "AWS",
  "C++",
  "Framer",
];

const FALL_DURATION = 4; // how long one word takes to visibly fall (seconds)
const CONCURRENT = 7; // how many words are falling at once
// Each word's full cycle = fall time + pause time before next appearance
// With CONCURRENT=7, a word reappears every (TECHS.length/CONCURRENT) * stagger seconds
// Simplest correct model: give every word the SAME long cycle period,
// stagger delays evenly across that period.
// cycle = FALL_DURATION * (TECHS.length / CONCURRENT)
const CYCLE = FALL_DURATION * (TECHS.length / CONCURRENT); // ≈ 14.3s

// Deterministic horizontal position & size — stable across SSR/CSR
function seeded(i: number, scale: number, offset = 0) {
  return (Math.sin(i * 127.1 + offset) * 0.5 + 0.5) * scale;
}

export function HeroBubble() {
  return (
    <div className="relative min-h-[600px] flex flex-col lg:flex-row items-start justify-start pt-6 md:pt-0 overflow-hidden">
      {/* Character */}
      <div className="relative z-20 flex-shrink-0">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl" />
        <Image
          src="/moi.jpg"
          alt="I.Shoula"
          width={320}
          height={500}
          priority
          className="relative z-10 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,.15)]"
        />
      </div>

      {/* Bubble + rain wrapper */}
      <div className="relative w-full min-w-0 flex-1 max-w-3xl lg:max-w-4xl">
        {/* Cloud SVG */}
        <div className="relative z-10">
          <svg
            viewBox="0 0 700 280"
            className="w-full animate-subtle-float"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="
                M 110 224
                A 52 40 0 0 1 60  178
                A 52 40 0 0 1 62  130
                A 58 45 0 0 1 108 72
                A 58 45 0 0 1 186 45
                A 60 46 0 0 1 270 32
                A 60 46 0 0 1 358 32
                A 60 46 0 0 1 442 46
                A 58 45 0 0 1 518 74
                A 56 44 0 0 1 556 130
                A 52 40 0 0 1 558 178
                A 52 40 0 0 1 506 224
                A 56 43 0 0 1 432 246
                A 56 43 0 0 1 350 256
                A 56 43 0 0 1 268 246
                A 56 43 0 0 1 186 236
                A 56 43 0 0 1 110 224
                Z
              "
              className="fill-[#e8e8e8] dark:fill-[#2a2a2a] stroke-foreground"
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-20 pb-6 pt-6 gap-0 -translate-x-6">
            <span className="uppercase tracking-[0.35em] text-[11px] font-semibold text-muted-foreground ">
              Full Stack · Mobile Developer
            </span>
            <h1 className="mt-3 text-xl sm:text-2xl md:text-3xl font-black leading-tight text-foreground">
              Building Systems
              <br />
              With Intent.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              From UI to infrastructure, every detail serves a purpose.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild size="sm">
                <Link href="#projects">
                  View Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="#contact">Contact</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <a href="#quickie">
                  Quickie
                  <Star className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <span className="mt-5 tracking-[0.35em] text-sm font-bold text-foreground">
              I.SHOULA
            </span>
          </div>
        </div>

        {/* Tech rain — words fall from the bottom edge of the cloud */}
        <div
          className="absolute left-[10%] right-[10%] top-[72%] h-[280px] overflow-hidden pointer-events-none z-0"
          aria-hidden="true"
        >
          {TECHS.map((tech, i) => {
            const left = +seeded(i, 85, 0).toFixed(4);
            const opacity = +(0.18 + seeded(i, 0.22, 3)).toFixed(4);
            const size = +(10 + seeded(i, 5, 4)).toFixed(4);
            const delay = -+((i / TECHS.length) * CYCLE).toFixed(2);

            return (
              <span
                key={tech}
                className="absolute top-0 font-mono font-semibold whitespace-nowrap text-foreground"
                style={{
                  left: `${left}%`,
                  fontSize: `${size}px`,
                  opacity: opacity,
                  animation: `cloudRain ${CYCLE.toFixed(2)}s linear ${delay.toFixed(2)}s infinite`,
                }}
              >
                {tech}
              </span>
            );
          })}

          <style>{`
            @keyframes cloudRain {
              0%                                        { transform: translateY(-20px); opacity: 0; }
              ${((FALL_DURATION / CYCLE) * 8).toFixed(1)}%   { opacity: 1; }
              ${((FALL_DURATION / CYCLE) * 92).toFixed(1)}%  { opacity: 1; }
              ${((FALL_DURATION / CYCLE) * 100).toFixed(1)}% { transform: translateY(290px); opacity: 0; }
              100%                                      { transform: translateY(-20px); opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
