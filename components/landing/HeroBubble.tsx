"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBubble() {
  return (
    <div className="relative min-h-[420px] md:min-h-[500px] flex flex-col md:flex-row items-center justify-center pt-6 md:pt-0">
      <div className="text-center max-w-3xl">
        <span className="uppercase tracking-[0.3em] text-sm font-semibold text-muted-foreground">
          Full Stack Developer
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
          Building Scalable Web & Mobile Applications
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Hi, I'm I.Shoula — a full-stack developer specializing in React, Next.js, and Spring Boot. I create fast, accessible, and user-centric applications from design to deployment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#projects">
              View My Work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
