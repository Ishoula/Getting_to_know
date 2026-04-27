import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Recommendation from "@/models/Recommendation";
import { auth } from "@/lib/auth";

export const maxDuration = 60;

// PATCH approve/reject recommendation (protected)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
      params.id,
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
  } catch (error) {
    console.error("Error updating recommendation:", error);
    return NextResponse.json(
      { error: "Failed to update recommendation" },
      { status: 500 }
    );
  }
}

// DELETE recommendation (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const recommendation = await Recommendation.findByIdAndDelete(params.id);

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
