import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Recommendation from "@/models/Recommendation";
import { auth } from "@/lib/auth";

export const maxDuration = 60;

// PUT approve/reject recommendation (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { approved, featured } = body;

    await connectToDatabase();
    const update: Record<string, unknown> = {};
    if (typeof approved === "boolean") update.approved = approved;
    if (typeof featured === "boolean") update.featured = featured;

    const recommendation = await Recommendation.findByIdAndUpdate(
      id,
      update,
      { new: true }
    );

    if (!recommendation) {
      return NextResponse.json(
        { error: "Recommendation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(recommendation);
  } catch (error: any) {
    console.error("Error updating recommendation:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update recommendation" },
      { status: 500 }
    );
  }
}

// DELETE recommendation (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const recommendation = await Recommendation.findByIdAndDelete(id);

    if (!recommendation) {
      return NextResponse.json(
        { error: "Recommendation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Recommendation deleted" });
  } catch (error) {
    console.error("Error deleting recommendation:", error);
    return NextResponse.json(
      { error: "Failed to delete recommendation" },
      { status: 500 }
    );
  }
}
