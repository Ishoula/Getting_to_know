import { Metadata } from "next";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProjectDetailsProps {
  params: Promise<{ id: string }>;
}

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

export async function generateMetadata({ params }: ProjectDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-6">
            {project.githubUrl && (
              <Button asChild size="lg" className="rounded-full">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="outline" asChild size="lg" className="rounded-full">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </div>

        {project.image && (
          <div className="relative aspect-video rounded-2xl overflow-hidden border bg-muted shadow-2xl group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
