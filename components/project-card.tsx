"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  /** If provided, clicking the card opens the modal instead of navigating */
  onOpen?: () => void;
}

export function ProjectCard({
  id,
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  image,
  onOpen,
}: ProjectCardProps) {
  const cardBody = (
    <>
      <div className="flex flex-row items-stretch h-40 sm:h-44 md:h-48 border-b">
        {/* Image */}
        <div className="relative flex-1 bg-muted overflow-hidden h-full">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        
        {/* Vertical title */}
        <div className="flex items-center justify-center w-12 sm:w-16 md:w-20 bg-primary/5 h-full border-l">
          <CardTitle className="text-sm sm:text-base md:text-lg transform -rotate-90 text-primary whitespace-nowrap tracking-wider">
            {title}
          </CardTitle>
        </div>
      </div>
      <CardHeader className="p-4 md:p-5 flex flex-col gap-2">
        <CardDescription className="text-xs md:text-sm line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-5 pt-0 md:pt-0 flex-1">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[10px] md:text-xs transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </>
  );

  return (
    <Card className="flex flex-col h-full overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 shadow-sm bg-card/50 backdrop-blur-sm">
      {onOpen ? (
        <button
          onClick={onOpen}
          className="flex flex-col flex-1 text-left cursor-pointer"
          aria-label={`View details for ${title}`}
        >
          {cardBody}
        </button>
      ) : (
        <Link href={`/projects/${id}`} className="flex flex-col flex-1">
          {cardBody}
        </Link>
      )}

      <CardFooter className="p-4 md:p-5 pt-0 md:pt-0 gap-2 mt-auto">
        {githubUrl && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="group/btn transition-all duration-300 hover:scale-105"
          >
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
              Code
            </Link>
          </Button>
        )}
        {liveUrl && (
          <Button
            size="sm"
            asChild
            className="group/btn transition-all duration-300 hover:scale-105"
          >
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
