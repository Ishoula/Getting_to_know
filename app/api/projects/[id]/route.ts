import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { projectSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// GET single project (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT update project (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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
    const project = await Project.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Error updating project:", error);
    
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
      { error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
