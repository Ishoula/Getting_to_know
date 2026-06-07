"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const TECHS = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
  "MongoDB", "Tailwind", "Prisma", "REST", "GraphQL",
  "Docker", "Git", "Python", "Java", "Spring Boot",
  "SQLite", "Redis", "JWT", "React Native", "Figma",
  "Linux", "Vercel", "AWS", "C++", "Framer",
];

const FALL_DURATION = 4;
const CONCURRENT = 7;
const CYCLE = FALL_DURATION * (TECHS.length / CONCURRENT);

function seeded(i: number, scale: number, offset = 0) {
  return (Math.sin(i * 127.1 + offset) * 0.5 + 0.5) * scale;
}

export function HeroBubble() {
  return (
    <div className="relative min-h-[420px] flex flex-col md:flex-row items-start justify-start pt-6 md:pt-0 overflow-hidden">

      {/* Character — md+ only, smaller on md, full on lg */}
      <div className="hidden md:flex flex-col items-center relative z-20 flex-shrink-0">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-yellow-500/10 blur-3xl" />
        <Image
          src="/moi.jpg"
          alt="I.Shoula"
          width={220}
          height={360}
          priority
          className="relative z-10 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,.15)] lg:w-[320px] lg:h-auto"
        />
        {/* CTAs below image — md only */}
        <div className="md:flex lg:hidden flex-col items-center gap-3 mt-4 z-10">
          <span className="tracking-[0.3em] text-xs font-bold text-foreground">I.SHOULA</span>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild size="sm">
              <Link href="#projects">
                View Work <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="#contact">Contact</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a href="#quickie">
                Quickie <Star className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bubble + rain wrapper */}
      <div className="relative w-full min-w-0 flex-1 max-w-xl md:max-w-4xl lg:max-w-4xl">

        {/* ── SMALL (< md): plain text hero, no bubble ── */}
        <div className="md:hidden flex flex-col px-2 pt-4 pb-6">
          <p className="text-muted-foreground text-sm mb-2">Call Me</p>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
            I.Shoula
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-sm">
            I build full-stack systems that feel alive — fast, scalable, and intentional from UI to infrastructure.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="#projects">
                See My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="#contact">{"Let's Talk"}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#quickie">
                Quickie <Star className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* ── MD+: cloud SVG — scaled down on md, full on lg ── */}
        <div className="hidden md:block relative z-10 mt-6 lg:mt-0">
          <svg
            viewBox="0 0 700 320"
            className="w-full animate-subtle-float"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="
                M 110 258
                A 52 46 0 0 1 58  205
                A 52 46 0 0 1 60  150
                A 58 52 0 0 1 106 83
                A 58 52 0 0 1 186 52
                A 60 53 0 0 1 270 37
                A 60 53 0 0 1 358 37
                A 60 53 0 0 1 442 53
                A 58 52 0 0 1 518 85
                A 56 50 0 0 1 556 150
                A 52 46 0 0 1 558 205
                A 52 46 0 0 1 506 258
                A 56 50 0 0 1 432 283
                A 56 50 0 0 1 350 294
                A 56 50 0 0 1 268 283
                A 56 50 0 0 1 186 272
                A 56 50 0 0 1 110 258
                Z
              "
              className="fill-[#e8e8e8] dark:fill-[#2a2a2a] stroke-foreground"
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          {/* Content overlay — on md: only tagline + headline + subtitle inside bubble */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-16 lg:px-20 pb-4 pt-4 gap-0 md:-translate-x-2 lg:-translate-x-6">
            <span className="uppercase tracking-[0.3em] text-[10px] lg:text-[11px] font-semibold text-muted-foreground">
              Full Stack · Mobile Developer
            </span>
            <h1 className="mt-2 text-lg md:text-xl lg:text-2xl font-black leading-tight text-foreground">
              Building Systems
              <br />
              With Intent.
            </h1>
            <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-[240px] lg:max-w-xs">
              From UI to infrastructure, every detail serves a purpose.
            </p>
            {/* CTAs + signature — inside bubble on lg only */}
            <div className="hidden lg:flex mt-4 flex-wrap justify-center gap-2">
              <Button asChild size="sm">
                <Link href="#projects">
                  View Work <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="#contact">Contact</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <a href="#quickie">
                  Quickie <Star className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
            <span className="hidden lg:block mt-4 tracking-[0.3em] text-xs lg:text-sm font-bold text-foreground">
              I.SHOULA
            </span>
          </div>
        </div>

        {/* Tech rain — md+ only, falls from bubble bottom */}
        <div
          className="hidden md:block absolute left-[10%] right-[10%] top-[72%] h-[280px] overflow-hidden pointer-events-none z-0"
          aria-hidden="true"
        >
          {TECHS.map((tech, i) => {
            const left    = +seeded(i, 85, 0).toFixed(4);
            const opacity = +(0.18 + seeded(i, 0.22, 3)).toFixed(4);
            const size    = +(10 + seeded(i, 5, 4)).toFixed(4);
            const delay   = -+((i / TECHS.length) * CYCLE).toFixed(2);

            return (
              <span
                key={tech}
                className="absolute top-0 font-mono font-semibold whitespace-nowrap text-foreground"
                style={{
                  left: `${left}%`,
                  fontSize: `${size}px`,
                  opacity,
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
