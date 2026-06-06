import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Database, Globe, Star } from "lucide-react";
import Link from "next/link";

import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { RecommendationsSection } from "@/components/landing/RecommendationsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { TechTreeSection } from "@/components/landing/TechTreeSection";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import Recommendation from "@/models/Recommendation";
import { FAQSection } from "@/components/landing/FAQSection";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import Quickie from "@/components/identity-bubble/Quickie";
import { HeroBubble } from "@/components/landing/HeroBubble";
import { HeroBackground } from "@/components/landing/HeroBackground";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  try {
    await connectToDatabase();
    const [projects, recommendations] = await Promise.all([
      Project.find({ liveUrl: { $exists: true, $ne: "" } }).sort({ createdAt: -1 }).lean(),
      Recommendation.find({ approved: true }).sort({ createdAt: -1 }).lean(),
    ]);

    return {
      projects: JSON.parse(JSON.stringify(projects)),
      recommendations: JSON.parse(JSON.stringify(recommendations)),
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return { projects: [], recommendations: [] };
  }
}

export default async function HomePage() {
  const { projects, recommendations } = await getData();

  return (
    <div className="container mx-auto px-4 relative">
      {/* HERO SECTION */}
        <section className="relative -mt-14 pt-8 pb-10 md:pb-16">
  <HeroBackground />
  <HeroBubble />
  </section>

        {/* CTA buttons */}
        

      {/* PROJECTS SECTION */}
      <ProjectsSection projects={projects} />
      <TechTreeSection />

      {/* RECOMMENDATIONS */}
      <RecommendationsSection initialRecommendations={recommendations} />

      {/* CONTACT */}
      <ContactSection />

      {/* FAQ */}
      <FAQSection />

      <ScrollToTopButton />
      <div id="quickie" className="scroll-mt-24">
        <Quickie />
      </div>
    </div>
  );
}
