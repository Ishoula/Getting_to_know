import { Metadata } from "next";
import { connectToDatabase } from "@/lib/db";
import Recommendation from "@/models/Recommendation";
import { RecommendationsClient } from "@/components/dashboard/RecommendationsClient";

export const metadata: Metadata = {
  title: "Recommendations",
  description: "Manage testimonials from colleagues and clients",
};

async function getRecommendations() {
  try {
    await connectToDatabase();
    const recommendations = await Recommendation.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(recommendations));
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

export default async function RecommendationsPage() {
  const recommendations = await getRecommendations();

  return <RecommendationsClient initialRecommendations={recommendations} />;
}
