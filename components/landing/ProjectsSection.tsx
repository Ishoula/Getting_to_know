"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { ProjectModal, type ProjectModalData } from "@/components/ProjectModal";
import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  const [api, setApi] = useState<CarouselApi>();
  const [modalProject, setModalProject] = useState<ProjectModalData | null>(
    null,
  );
  const sectionRef = useRef<HTMLElement>(null);

  const liveProjects = projects.filter((p) => !!p.liveUrl);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

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
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: liveProjects.length > 1 }}
          className={cn(
            "relative opacity-0",
            isVisible && "animate-fade-in-up",
          )}
        >
          <CarouselContent className="-ml-5">
            {liveProjects.map((project) => (
              <CarouselItem
                key={project._id}
                className="basis-full pl-5 lg:basis-[86%]"
              >
                <ProjectPoster
                  project={project}
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
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-3 top-[42%] z-20 size-10 border-border/70 bg-background/85 shadow-lg backdrop-blur md:-left-5" />
          <CarouselNext className="right-3 top-[42%] z-20 size-10 border-border/70 bg-background/85 shadow-lg backdrop-blur md:-right-5" />

          <div className="mt-5 flex justify-center gap-2">
            {liveProjects.map((project, i) => (
              <button
                key={project._id}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to ${project.title}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === current
                    ? "w-7 bg-foreground"
                    : "w-2 bg-foreground/25 hover:bg-foreground/50",
                )}
              />
            ))}
          </div>
        </Carousel>
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

function ProjectPoster({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm">
      <button
        type="button"
        onClick={onOpen}
        className="group relative block w-full overflow-hidden text-left"
        aria-label={`View details for ${project.title}`}
      >
        <div className="relative min-h-[420px] bg-muted md:min-h-[560px]">
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-background to-muted" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-bl-full bg-foreground/[0.03]" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[56px] border-foreground/5" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[64px] border-foreground/5" />

          <div className="absolute inset-x-0 top-8 z-10 flex justify-center px-6 md:top-10">
            <span className="rounded-full border border-border/70 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
              Featured Project
            </span>
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center px-8 pb-12 pt-20">
            {project.image ? (
              <div className="relative h-[250px] w-full max-w-3xl drop-shadow-2xl md:h-[390px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 90vw, 960px"
                  priority={false}
                />
              </div>
            ) : (
              <div className="flex h-56 w-56 items-center justify-center rounded-full border border-border bg-background/70 text-6xl font-black uppercase text-foreground/20 md:h-72 md:w-72">
                {project.title.slice(0, 2)}
              </div>
            )}
          </div>

          <h3 className="absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 overflow-hidden px-4 text-center text-[clamp(3rem,13vw,9rem)] font-black uppercase leading-none tracking-normal text-foreground/90 mix-blend-difference md:px-8">
            {project.title}
          </h3>
        </div>
      </button>

      <div className="grid gap-6 border-t border-border/70 bg-card p-5 md:grid-cols-[1fr_auto] md:items-end md:p-7">
        <div className="space-y-4">
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-end">
          {project.liveUrl && (
            <Button asChild>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
