import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Recommendation from "@/models/Recommendation";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// GET all recommendations (public gets only approved, admin gets all)
export async function GET() {
  try {
    const session = await auth();
    await connectToDatabase();

    const filter = session?.user ? {} : { approved: { $ne: false } };
    const recommendations = await Recommendation.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}

// POST create new recommendation (public - always unapproved)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, company, testimonial } = body;

    if (!name || !role  || !testimonial) {
      return NextResponse.json(
        { error: "Name, role, and testimonial are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const recommendation = await Recommendation.create({
      name,
      role,
      company,
      testimonial,
      approved: false,
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
