import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";

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
  return (
    <section id="projects" className="py-16 border-t border-border/40">
      <div className="max-w-2xl mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg">
          Highlights of my recent projects.
        </p>
      </div>

                {(() => {
            const liveProjects = projects.filter((p) => !!p.liveUrl);
            return liveProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {liveProjects.map((project) => (
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
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No live demo projects yet. Check back soon!
                </p>
              </div>
            );
          })()}

{/* 
      <div className="mt-10">
        <Button asChild size="lg">
          <Link href="/projects">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div> */}
    </section>
  );
}
