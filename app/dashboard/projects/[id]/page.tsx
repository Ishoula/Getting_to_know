import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { ProjectForm } from "@/components/dashboard/project-form";

export const metadata: Metadata = {
  title: "Edit Project",
  description: "Edit your portfolio project",
};

async function getProject(id: string) {
  try {
    await connectToDatabase();
    const project = await Project.findById(id).lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ProjectForm project={project} />
    </div>
  );
}
