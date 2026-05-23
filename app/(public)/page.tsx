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

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  try {
    await connectToDatabase();
    const [projects, recommendations] = await Promise.all([
      Project.find({}).sort({ createdAt: -1 }).limit(3).lean(),
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
      <section className="py-20 md:py-32">
        <div className="max-w-3xl">
          <p className="text-muted-foreground mb-4 animate-fade-in-up">
            Call Me
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            I.Shoula
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up">
            I build full-stack systems that feel alive — fast, scalable, and
            intentional from UI to infrastructure.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up">
            <Button
              size="lg"
              asChild
              className="group hover:scale-105 transition"
            >
              <Link href="/#projects">
                See My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/#contact">Let’s Talk</Link>
            </Button>

            <Button size="lg" variant="secondary" asChild className="group">
              <a href="/#quickie">
                Quickie
                <Star className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* WHAT I DO SECTION */}
      <section className="py-16 border-t border-border/40">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">What I Work On</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {[
            {
              icon: Globe,
              title: "Frontend Systems",
              desc: "Interfaces that feel natural — responsive, clean, and built with React and Next.js.",
            },
            {
              icon: Database,
              title: "Backend Systems",
              desc: "APIs and logic designed to stay stable under load — structured with Node.js and databases.",
            },
            {
              icon: Code2,
              title: "Full-Stack Architecture",
              desc: "Connecting UI, backend, and data into one system that holds together as it grows.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 md:p-6 rounded-lg border border-border/40 bg-card hover:shadow-lg hover:-translate-y-1 transition"
            >
              <item.icon className="h-5 w-5 md:h-6 md:w-6 text-primary mb-3 md:mb-4" />

              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                {item.title}
              </h3>

              <p className="text-muted-foreground text-xs md:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

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
