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
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
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
      githubUrl: formData.get("githubUrl")?.toString() || "",
      liveUrl: formData.get("liveUrl")?.toString() || "",
      image: imageUrl,
      featured: formData.get("featured") === "true",
    };

    const validatedData = projectSchema.parse(body);

    await connectToDatabase();
    const project = await Project.create(validatedData);

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Database validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
