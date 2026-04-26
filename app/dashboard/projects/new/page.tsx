import { Metadata } from "next";
import { ProjectForm } from "@/components/dashboard/project-form";

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new portfolio project",
};

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <ProjectForm />
    </div>
  );
}
