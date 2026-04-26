import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { projectSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

export const maxDuration = 60;

// GET all projects (public)
export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST create new project (protected)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    const existingImage = formData.get("existingImage") as string | null;
    let imageUrl = existingImage && existingImage.trim() ? existingImage.trim() : undefined;

    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      const { uploadImageToCloudinary } = await import("@/lib/cloudinary");
      const uploaded = await uploadImageToCloudinary(imageFile);
      imageUrl = uploaded.url;
    }

    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
      techStack: (() => {
        const raw = formData.get("techStack");
        if (typeof raw !== "string") return [];
        try {
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })(),
      githubUrl: formData.get("githubUrl"),
      liveUrl: formData.get("liveUrl"),
      image: imageUrl,
      featured: formData.get("featured") === "true",
    };

    const validatedData = projectSchema.parse(body);

    await connectToDatabase();
    const project = await Project.create(validatedData);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
