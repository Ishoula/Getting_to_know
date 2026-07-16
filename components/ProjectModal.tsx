"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export interface ProjectModalData {
  id: string;
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

interface ProjectModalProps {
  project: ProjectModalData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/60"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 border border-border hover:scale-110 active:scale-95 transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Main Image */}
            {project.image && (
              <div className="relative w-full aspect-video bg-muted overflow-hidden rounded-t-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Problem Solved */}
              {project.problemSolved && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Problem Solved</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>
              )}

              {/* My Role */}
              {project.myRole && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">My Role</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.myRole}
                  </p>
                </div>
              )}

              {/* Key Challenges */}
              {project.keyChallenges && project.keyChallenges.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Key Challenges</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {project.keyChallenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Screenshots</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="relative aspect-video bg-muted rounded-lg overflow-hidden"
                      >
                        <Image
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 224px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Overview</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
