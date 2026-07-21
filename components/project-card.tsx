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
            <div className="flex flex-col md:flex-row">
          {/* Image */}
          {image && (
            <div className="relative h-36 sm:h-40 md:h-48 w-full md:w-2/3 bg-muted overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          {/* Vertical title – only on medium+ screens */}
          <div className="hidden md:flex items-center justify-center w-full md:w-1/3">
            <CardTitle className="text-base md:text-lg transform -rotate-90 origin-bottom-left text-primary">
              {title}
            </CardTitle>
          </div>
        </div>
              <CardHeader className="p-4 md:p-6 flex flex-col gap-2">
          {/* Mobile title */}
          <h3 className="md:hidden text-base font-semibold text-primary">
            {title}
          </h3>
          <CardDescription className="text-xs md:text-sm line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 md:pt-0 flex-1">
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
    <Card className="flex flex-col h-full overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 shadow-sm">
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

      <CardFooter className="p-4 md:p-6 pt-0 md:pt-0 gap-2">
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
