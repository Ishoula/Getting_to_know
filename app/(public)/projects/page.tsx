import { Metadata } from "next";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { ProjectCard } from "@/components/project-card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse my portfolio of web development projects.",
};

async function getProjects() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground text-lg">
          A collection of projects I&apos;ve worked on, ranging from web applications
          to open-source contributions.
        </p>
      </div>

      {projects.length > 0 ? (
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
