import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Database, Globe, Star } from "lucide-react";
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

export const revalidate = 3600; // Revalidate every hour

async function getData() {
  try {
    await connectToDatabase();
    const projects = await Project.find({ liveUrl: { $exists: true, $ne: "" }, featured: true })
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
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
            <Image
              src="/moi dark.jpg"
              alt="I.Shoula - Full Stack Developer"
              width={300}
              height={300}
              className="relative rounded-full border-4 border-border shadow-xl"
            />
          </div>
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hi, I'm I.Shoula — a full-stack developer passionate about building scalable, user-centric web and mobile applications. With expertise in React, Next.js, Node.js, and Spring Boot, I craft solutions from UI design to backend architecture.
            </p>
            <p>
              I prioritize performance, accessibility, and clean code, focusing on delivering impactful products that solve real problems.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/resume" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
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
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Freelance",
      period: "2023 - Present",
      description: "Developed custom web and mobile applications for clients, focusing on React, Next.js, and Spring Boot stacks."
    },
    {
      title: "Junior Developer",
      company: "Tech Company",
      period: "2021 - 2023",
      description: "Contributed to frontend and backend development, database design, and API integrations."
    }
  ];

  return (
    <section id="experience" className="py-16 border-t border-border/40">
      <h2 className="text-2xl md:text-3xl font-bold mb-10">Experience & Achievements</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 border-l-2 border-border">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-foreground" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="text-muted-foreground font-medium">{exp.company} · {exp.period}</p>
              <p className="text-muted-foreground">{exp.description}</p>
            </div>
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
