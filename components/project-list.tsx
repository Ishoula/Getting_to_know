"use client";

import { ProjectCard } from "@/components/project-card";
import React, { useState, useEffect, useRef } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [displayCount, setDisplayCount] = useState(8);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 640); // Tailwind sm breakpoint
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Infinite scroll observer (only on small screens)
  useEffect(() => {
    if (!isSmallScreen) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setDisplayCount((prev) => Math.min(prev + 4, projects.length));
      }
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, [isSmallScreen, projects.length]);

  const displayedProjects = projects.slice(0, displayCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayedProjects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            image={project.image}
          />
        ))}
      </div>
      {isSmallScreen && displayCount < projects.length && (
        <div ref={sentinelRef} className="h-10" />
      )}
    </>
  );
};
