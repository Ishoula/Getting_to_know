import { Metadata } from "next";
import useSWR from "swr";
import { ProjectCard } from "@/components/project-card";
import { Skeleton } from "@/components/ui/Skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse my portfolio of web development projects.",
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProjectsPage() {
  const { data: projects, error } = useSWR<any[]>("/api/projects", fetcher, {
    fallbackData: [],
    revalidateOnFocus: false,
  });
  const isLoading = !projects && !error;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground text-lg">
          A collection of projects I&apos;ve worked on, ranging from web applications
          to open-source contributions.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project: {
            _id: string;
            title: string;
            description: string;
            techStack: string[];
            githubUrl?: string;
            liveUrl?: string;
            image?: string;
          }) => (
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
            No projects yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
