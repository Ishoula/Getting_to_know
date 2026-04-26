import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Recommendation from "@/models/Recommendation";
import { auth } from "@/lib/auth";

export const maxDuration = 60;

// GET all recommendations (public)
export async function GET() {
  try {
    await connectToDatabase();
    const recommendations = await Recommendation.find({}).sort({ createdAt: -1 });
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}

// POST create new recommendation (protected)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, role, company, testimonial, avatar, featured } = body;

    if (!name || !role || !company || !testimonial) {
      return NextResponse.json(
        { error: "Name, role, company, and testimonial are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const recommendation = await Recommendation.create({
      name,
      role,
      company,
      testimonial,
      avatar,
      featured: featured || false,
    });

    return NextResponse.json(recommendation, { status: 201 });
  } catch (error) {
    console.error("Error creating recommendation:", error);
    return NextResponse.json(
      { error: "Failed to create recommendation" },
      { status: 500 }
    );
  }
}
