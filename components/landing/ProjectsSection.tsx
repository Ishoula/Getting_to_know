"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal, type ProjectModalData } from "@/components/ProjectModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  _id: string;
  title: string;
  description: string;
  problemSolved?: string;
  myRole?: string;
  keyChallenges?: string[];
  screenshots?: string[];
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
  const [current, setCurrent] = useState(0);
  const [modalProject, setModalProject] = useState<ProjectModalData | null>(
    null,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const liveProjects = projects.filter((p) => !!p.liveUrl);
  const total = liveProjects.length;

  // How many cards visible at once based on breakpoint — we handle via CSS,
  // but for button logic we just scroll one card at a time.
  const canPrev = current > 0;
  const canNext = current < total - 1;

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setCurrent(index);
  }, []);

  const prev = () => scrollTo(Math.max(0, current - 1));
  const next = () => scrollTo(Math.min(total - 1, current + 1));

  // Sync current index on native scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const { scrollLeft } = track;
      const card = track.children[0] as HTMLElement;
      if (!card) return;
      const cardWidth = card.offsetWidth + 24; // 24 = gap-6
      const idx = Math.round(scrollLeft / cardWidth);
      setCurrent(Math.min(idx, total - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [total]);

  // Intersection observer for section entrance animation
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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-8 border-t border-border/40"
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Featured Projects
          </h2>
          <p className="text-muted-foreground">Highlights of my recent work.</p>
        </div>
        <Link
          href="/projects"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          View all
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {liveProjects.length > 0 ? (
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous project"
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20",
              "w-10 h-10 rounded-full bg-card border border-border shadow-md",
              "flex items-center justify-center transition-all duration-200",
              "hover:scale-110 hover:shadow-lg active:scale-95",
              !canPrev && "opacity-30 pointer-events-none",
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next project"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20",
              "w-10 h-10 rounded-full bg-card border border-border shadow-md",
              "flex items-center justify-center transition-all duration-200",
              "hover:scale-110 hover:shadow-lg active:scale-95",
              !canNext && "opacity-30 pointer-events-none",
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Edge fade overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-background to-transparent" />

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {liveProjects.map((project, i) => (
              <div
                key={project._id}
                className={cn(
                  "flex-shrink-0 snap-start",
                  "w-[80vw] sm:w-[340px] md:w-[380px]",
                  isVisible ? "animate-fade-in-up" : "opacity-0",
                )}
                style={{ animationDelay: `${Math.min(i, 5) * 100}ms` }}
              >
                <ProjectCard
                  id={project._id}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  image={project.image}
                  onOpen={() =>
                    setModalProject({
                      id: project._id,
                      title: project.title,
                      description: project.description,
                      problemSolved: project.problemSolved,
                      myRole: project.myRole,
                      keyChallenges: project.keyChallenges,
                      screenshots: project.screenshots,
                      techStack: project.techStack,
                      githubUrl: project.githubUrl,
                      liveUrl: project.liveUrl,
                      image: project.image,
                    })
                  }
                />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {liveProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === current
                    ? "w-4 h-2 bg-foreground"
                    : "w-2 h-2 bg-foreground/25 hover:bg-foreground/50",
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No live projects yet. Check back soon!
          </p>
        </div>
      )}

      {/* Mobile view-all link */}
      <div className="sm:hidden mt-6 text-center">
        <Button variant="outline" asChild>
          <Link href="/projects">
            View all projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Project detail modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}
