import { Metadata } from "next";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { ProjectsTable } from "@/components/dashboard/projects-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Projects",
  description: "Create, edit, and delete portfolio projects",
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

export default async function ProjectsManagementPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}
