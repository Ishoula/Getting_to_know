import { Metadata } from "next";
import Quickie from "@/components/identity-bubble/Quickie";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse my portfolio of web development projects.",
};

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project: any) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>

      <div id="quickie" className="hidden lg:block scroll-mt-24">
        <Quickie />
      </div>
    </div>
  );
}
