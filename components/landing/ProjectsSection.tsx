"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Github,
} from "lucide-react";

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

export function ProjectsSection({
  projects,
}: ProjectsSectionProps) {
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef<number | null>(null);

  /**
   * AUTO ROTATION
   */
  useEffect(() => {
    let last = performance.now();

    const animate = (time: number) => {
      const delta = time - last;
      last = time;

      setRotation((prev) => prev + delta * 0.01);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  /**
   * LIMIT ITEMS FOR BETTER VISUAL
   */
  const visibleProjects = useMemo(() => {
    return projects.slice(0, 8);
  }, [projects]);

  return (
    <section
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
            Portfolio
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Portfolio Showcase
        </h2>

        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          Interactive projects orbiting around creativity,
          performance, and clean engineering.
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

            <h3 className="text-3xl font-bold">
              Projects
            </h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Hover cards to interact
            </p>
          </div>
        </div>

        {/* ORBIT RINGS */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[620px] w-[620px] rounded-full border border-border/20" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[420px] w-[420px] rounded-full border border-border/10" />
        </div>

        {/* CARDS */}
        {visibleProjects.map((project, index) => {
          const angle =
            (360 / visibleProjects.length) * index + rotation;

          const radius = 300;

          const x =
            Math.cos((angle * Math.PI) / 180) * radius;

          const y =
            Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={project._id}
              className="absolute left-1/2 top-1/2 transition-transform duration-300"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translate(${x}px, ${y}px)
                `,
              }}
            >
              <Link
                href={`/projects/${project._id}`}
                className="group block"
              >
                <div className="relative w-[280px] overflow-hidden rounded-3xl border border-border/30 bg-background/80 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105">
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

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60" />

                    {/* ACTIONS */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      {project.liveUrl && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              project.liveUrl,
                              "_blank"
                            );
                          }}
                          className="rounded-full bg-white/90 p-2 text-black backdrop-blur"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}

                      {project.githubUrl && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              project.githubUrl,
                              "_blank"
                            );
                          }}
                          className="rounded-full bg-white/90 p-2 text-black backdrop-blur"
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

                    {/* STACK */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack
                        .slice(0, 3)
                        .map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="rounded-full"
                          >
                            {tech}
                          </Badge>
                        ))}

                      {project.techStack.length > 3 && (
                        <Badge
                          variant="outline"
                          className="rounded-full"
                        >
                          +
                          {project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-24 flex flex-col items-center gap-6">
        <Button
          asChild
          size="lg"
          className="rounded-full px-8"
        >
          <Link href="/projects">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}