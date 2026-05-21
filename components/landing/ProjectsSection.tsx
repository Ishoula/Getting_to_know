"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const [rotation, setRotation] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  // Ref mirrors hoveredId so the RAF loop always reads the freshest value
  // without needing to be re-created on every hover change.
  const hoveredRef = useRef<string | null>(null);

  /* ------------------------------------------------------------------ */
  /* INTERSECTION OBSERVER – staggered entry animation                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------------------------ */
  /* RAF ROTATION – pauses while any card is hovered                     */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        // Only advance rotation when nothing is hovered
        if (!hoveredRef.current) {
          rotationRef.current += delta * 0.007; // ~0.007 deg/ms → smooth & elegant
          setRotation(rotationRef.current);
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleMouseEnter = (id: string) => {
    hoveredRef.current = id;
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    hoveredRef.current = null;
    setHoveredId(null);
  };

  /* ------------------------------------------------------------------ */
  /* DATA                                                                  */
  /* ------------------------------------------------------------------ */
  const visibleProjects = useMemo(() => projects.slice(0, 8), [projects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-32"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />

      {/* HEADER */}
      <div className="text-center space-y-5 mb-24">
        <div className="inline-flex items-center gap-2">
          <div className="h-1 w-10 rounded-full bg-primary" />
          <span className="uppercase tracking-[0.25em] text-xs text-primary font-semibold">
            Highligts
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Projects Showcase
        </h2>

        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          Highligts of my recent projects
        </p>
      </div>

      {/* ORBIT CONTAINER */}
      <div className="relative mx-auto h-[750px] w-full max-w-[1200px]">

        {/* CENTER CONTENT */}
        <div className="absolute left-1/2 top-1/2 z-20 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border/40 bg-background/70 backdrop-blur-xl shadow-2xl">
          <div className="text-center px-6">
            <p className="text-sm uppercase tracking-[0.25em] text-primary mb-2">
              Featured
            </p>
            <h3 className="text-3xl font-bold">Projects</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Hover cards to interact
            </p>
          </div>
        </div>

        {/* ORBIT RINGS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[620px] w-[620px] rounded-full border border-border/20" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[420px] w-[420px] rounded-full border border-border/10" />
        </div>

        {/* CARDS */}
        {visibleProjects.map((project, index) => {
          const count = visibleProjects.length;
          const angle = (360 / count) * index + rotation;
          const rad = (angle * Math.PI) / 180;
          const radius = 300;

          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          /**
           * DEPTH PERCEPTION
           * y ranges from -radius (top / "back") to +radius (bottom / "front").
           * depthFactor: 0 = behind center, 1 = in front.
           */
          const depthFactor = (y + radius) / (2 * radius);
          const depthScale = 0.78 + 0.22 * depthFactor;
          const depthOpacity = 0.48 + 0.52 * depthFactor;
          const zIndex = Math.round(depthFactor * 20) + 1;

          const isHovered = hoveredId === project._id;

          return (
            <div
              key={project._id}
              className="absolute left-1/2 top-1/2"
              style={{
                /**
                 * POSITION is driven entirely by RAF – no CSS transition here
                 * so the element tracks the animation without fighting it.
                 */
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                zIndex: isHovered ? 50 : zIndex,
                /**
                 * ENTRY FADE – one-shot, staggered per card.
                 * After isVisible is true the opacity stays 1, so the delay
                 * only fires once.
                 */
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.7s ease",
                transitionDelay: isVisible ? `${index * 90}ms` : "0ms",
              }}
              onMouseEnter={() => handleMouseEnter(project._id)}
              onMouseLeave={handleMouseLeave}
            >
              {/**
               * INNER WRAPPER – handles depth scale & hover effects via CSS.
               * Separating this from the position div means the CSS transition
               * only competes with itself, not with the RAF-driven translate.
               */}
              <div
                style={{
                  transform: `scale(${isHovered ? 1.06 : depthScale})`,
                  opacity: isHovered ? 1 : depthOpacity,
                  transition:
                    "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease",
                }}
              >
                <Link href={`/projects/${project._id}`} className="group block">
                  <div
                    className="relative w-[280px] overflow-hidden rounded-3xl bg-background/80 backdrop-blur-xl"
                    style={{
                      border: isHovered
                        ? "1px solid hsl(var(--primary) / 0.65)"
                        : "1px solid hsl(var(--border) / 0.3)",
                      boxShadow: isHovered
                        ? "0 0 48px -8px hsl(var(--primary) / 0.38), 0 25px 50px -12px rgba(0,0,0,0.55)"
                        : "0 10px 30px -8px rgba(0,0,0,0.28)",
                      transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                    }}
                  >
                    {/* IMAGE */}
                    <div className="relative h-44 w-full overflow-hidden">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                          <span className="text-muted-foreground text-sm">
                            No Image
                          </span>
                        </div>
                      )}

                      {/* OVERLAY GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60" />

                      {/* ACTION BUTTONS – slide up from bottom on hover */}
                      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        {project.liveUrl && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(project.liveUrl, "_blank");
                            }}
                            className="rounded-full bg-white/90 p-2 text-black backdrop-blur hover:bg-white transition-colors duration-200"
                            aria-label="Open live demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        )}
                        {project.githubUrl && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(project.githubUrl, "_blank");
                            }}
                            className="rounded-full bg-white/90 p-2 text-black backdrop-blur hover:bg-white transition-colors duration-200"
                            aria-label="Open GitHub repository"
                          >
                            <Github className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-4 p-5">
                      <div>
                        <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                          {project.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {project.description}
                        </p>
                      </div>

                      {/* STACK BADGES */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="rounded-full"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="outline" className="rounded-full">
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* FOOTER LINK */}
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        Explore
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-24 flex flex-col items-center gap-6">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/projects">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}