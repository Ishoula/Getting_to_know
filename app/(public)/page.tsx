import {
  ArrowRight,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { TechTreeSection } from "@/components/landing/TechTreeSection";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { HeroBubble } from "@/components/landing/HeroBubble";
import { HeroBackground } from "@/components/landing/HeroBackground";
import experiences from "@/constants/experience.json"
export const revalidate = 3600; // Revalidate every hour

async function getData() {
  try {
    await connectToDatabase();
    const projects = await Project.find({
      liveUrl: { $exists: true, $ne: "" },
      featured: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return {
      projects: JSON.parse(JSON.stringify(projects)),
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return { projects: [] };
  }
}

function AboutSection() {
  return (
    <section id="about" className="py-16 border-t border-border/40">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="lg:w-1/3 flex justify-center lg:justify-start">
          <div className="relative">
            <Image
              src="/moi dark.jpg"
              alt="I.Shoula - Full Stack Developer"
              width={300}
              height={300}
              className="relative border-4 border-border shadow-xl"
            />
          </div>
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hi, I'm I.Shoula — a full-stack developer passionate about
              building scalable, user-centric web and mobile applications. With
              expertise in React, Next.js, Node.js, and Spring Boot, I craft
              solutions from UI design to backend architecture.
            </p>
            <p>
              I prioritize performance, accessibility, and clean code, focusing
              on delivering impactful products that solve real problems.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Download Resume
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-16 border-t border-border/40">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          <Briefcase className="h-6 w-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Experience
        </h2>
      </div>
      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-border/60 hover:before:bg-primary/50 transition-colors"
          >
            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 border border-border/40 px-3 py-1 rounded-full">
                {exp.period}
              </span>
            </div>
            <p className="text-primary font-semibold mb-4">{exp.company}</p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const { projects } = await getData();

  return (
    <div className="container mx-auto px-4 relative">
      {/* HERO SECTION */}
      <section className="relative -mt-14 pt-8 pb-10 md:pb-16">
        <HeroBackground />
        <HeroBubble />
      </section>

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* PROJECTS SECTION */}
      <ProjectsSection projects={projects} />

      {/* TECH TREE SECTION */}
      <TechTreeSection />

      {/* EXPERIENCE SECTION */}
      <ExperienceSection />

      {/* CONTACT SECTION */}
      <ContactSection />

      <ScrollToTopButton />
    </div>
  );
}
