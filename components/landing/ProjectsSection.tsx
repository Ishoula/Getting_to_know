"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

import { ProjectCard } from "@/components/project-card";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const liveProjects = projects.filter((p) => !!p.liveUrl);

  // Intersection observer for animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-16 border-t border-border/40 overflow-hidden">
      <div className="max-w-2xl mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg">
          Highlights of my recent projects.
        </p>
      </div>

      {liveProjects.length > 0 ? (
        <div className="relative mb-10 group">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />

          <div className="overflow-hidden">
            <div
              className={`flex gap-6 w-max items-stretch ${isVisible ? "animate-marquee group-hover:paused" : ""}`}
              style={{ width: "max-content" }}
            >
              {liveProjects.map((project, i) => (
                <div 
                  key={`${project._id}-${i}`}
                  className={`flex-shrink-0 h-auto w-[240px] sm:w-[280px] md:w-[320px] ${isVisible ? "animate-fadeSlideUp" : "opacity-0"}`}
                  style={{
                    animationDelay: `${Math.min(i, 8) * 120}ms`,
                  }}
                >
                  <ProjectCard
                    id={project._id}
                    title={project.title}
                    description={project.description}
                    techStack={project.techStack}
                    githubUrl={project.githubUrl}
                    liveUrl={project.liveUrl}
                    image={project.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">
            No live demo projects yet. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
}
