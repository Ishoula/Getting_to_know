import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export function ProjectCard({
  id,
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  image,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 shadow-none">
      <Link href={`/projects/${id}`} className="flex flex-col flex-1">
        {image && (
          <div className="relative h-48 w-full bg-muted overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl transition-colors duration-300 group-hover:text-primary">{title}</CardTitle>
          <CardDescription className="text-xs md:text-sm line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0 flex-1">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[10px] md:text-xs transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 md:p-6 pt-0 md:pt-0 gap-2">
        {githubUrl && (
          <Button variant="outline" size="sm" asChild className="group/btn transition-all duration-300 hover:scale-105">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
              Code
            </Link>
          </Button>
        )}
        {liveUrl && (
          <Button size="sm" asChild className="group/btn transition-all duration-300 hover:scale-105">
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
