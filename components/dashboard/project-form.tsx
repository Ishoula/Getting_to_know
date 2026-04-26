"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, X, Plus } from "lucide-react";

function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Image compression failed"));
        },
        file.type || "image/jpeg",
        quality
      );
    };
    img.onerror = () => reject(new Error("Failed to load image for compression"));
    img.src = URL.createObjectURL(file);
  });
}

interface ProjectFormProps {
  project?: {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    featured: boolean;
  };
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || []);
  const [techInput, setTechInput] = useState("");
  const [featured, setFeatured] = useState(project?.featured || false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function addTech() {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  }

  function removeTech(tech: string) {
    setTechStack(techStack.filter((t) => t !== tech));
  }

  function handleTechKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("techStack", JSON.stringify(techStack));
    formData.set("featured", String(featured));

    if (selectedFile) {
      try {
        const compressed = await compressImage(selectedFile);
        const compressedFile = new File([compressed], selectedFile.name, {
          type: compressed.type || selectedFile.type,
        });
        formData.set("image", compressedFile);
      } catch (compressErr) {
        console.error("Image compression failed:", compressErr);
        setError("Failed to process image. Please try a different image.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const url = project ? `/api/projects/${project._id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save project");
      }

      router.push("/dashboard/projects");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? "Edit Project" : "Create Project"}</CardTitle>
        <CardDescription>
          {project
            ? "Update your project details"
            : "Add a new project to your portfolio"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={project?.title}
              placeholder="Project name"
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project?.description}
              placeholder="Describe your project..."
              rows={4}
              required
              maxLength={1000}
            />
          </div>

          <div className="space-y-2">
            <Label>Tech Stack *</Label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                placeholder="Add technology"
              />
              <Button type="button" variant="outline" onClick={addTech}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {techStack.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Add at least one technology
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                defaultValue={project?.githubUrl}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                defaultValue={project?.liveUrl}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Project Image</Label>
            <Input id="existingImage" name="existingImage" type="hidden" defaultValue={project?.image} />
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="featured">Featured Project</Label>
              <p className="text-sm text-muted-foreground">
                Display this project prominently
              </p>
            </div>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={setFeatured}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || techStack.length === 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : project ? (
                "Update Project"
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
