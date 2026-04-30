import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Code2, Award, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PrintButton } from "@/components/PrintButton";

const experiences = [
  {
    title: "Data Analyst",
    company: "CodeAlpha",
    period: "2025",
    description: "Worked on data analysis and visualization projects, leveraging languages like Python to transform raw data into actionable insights that informed business strategies.",
  },
  {
    title: "Data Analyst",
    company: "Sandai Global",
    period: "2025-Present",
    description: "Currently working as a data detective analyzing complex datasets to uncover insights that drove strategic decisions. Developed interactive dashboards and visualizations using Microsoft Excel, resulting in a 30% increase in data-driven decision-making across the organization.",
  },
  {
    title: "Fullstack Developer",
    company: "Sunnet",
    period: "2026-Present",
    description: "Worked as a fullstack developer, building and maintaining mobile and web applications using technologies like React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions that met client needs and enhanced user experience.",
  },
];

const education = [
  {
    degree: "Software Programming Embedded Systems and Cyber Security",
    school: "Rwanda Coding Academy",
    period: "2024-Present",
  },
];

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Framer Motion", "JSP"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Java", "Prisma", "SpringBoot","Python"] },
  { category: "Tools & Others", items: ["Git", " Ms.Excel", "Google Sheets", "Cloudinary", "C++","C"] },
  { category: "Soft Skills", items: ["Problem Solving", "Communication", "Teamwork", "Adaptability", "Time Management","Data Structures","Algorithms","Figma"] },
];

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
        <div className="animate-fade-slide-up flex flex-col md:flex-row gap-8 items-start md:items-center" style={{ animationDelay: "100ms" }}>
          <Image 
            src="/moii.png" 
            alt="Ishoula Profile" 
            width={240} 
            height={240} 
            className="rounded-full object-cover border-4 border-primary/20 w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 shadow-lg"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Ishoula</h1>
            <p className="text-xl text-primary font-medium">Full-Stack Developer</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-muted-foreground">
            <a href="mailto:shoulamite2k@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              shoulamite2k@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +250 798 482 836
            </span>
            <a href="https://github.com/Ishoula" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Github className="h-4 w-4" />
              github.com/Ishoula
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Mussanze, Rwanda
            </span>
          </div>
          </div>
        </div>
        <PrintButton />
      </div>

      <div className="grid gap-16">
        {/* Experience */}
        <section className="animate-fade-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
          </div>
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-border/60 hover:before:bg-primary/50 transition-colors">
                <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 border border-border/40 px-3 py-1 rounded-full">{exp.period}</span>
                </div>
                <p className="text-primary font-semibold mb-4">{exp.company}</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="animate-fade-slide-up" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Education</h2>
          </div>
          <div className="grid gap-6">
            {education.map((edu, i) => (
              <Card key={i} className="border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                      <p className="text-primary font-medium">{edu.school}</p>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground bg-muted/50 px-4 py-1.5 rounded-full">{edu.period}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="animate-fade-slide-up" style={{ animationDelay: "500ms" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Code2 className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Technical Skills</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {skills.map((skillGroup, i) => (
              <div key={i} className="space-y-6 p-6 rounded-2xl bg-muted/30 border border-border/40">
                <h3 className="font-bold text-primary uppercase text-xs tracking-widest">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {skillGroup.items.map((skill, j) => (
                    <span key={j} className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-background border border-border/40 shadow-sm hover:border-primary/40 hover:scale-105 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="animate-fade-slide-up" style={{ animationDelay: "600ms" }}>
           <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Introduction to Programming using Python",
              "PicoCTF-Afrrica 2025 Certificate of Achievement",
              "Wavumbuzi Entrepreneurship Certificate",
              "AI Fundamentals certificate",
              "Data Literacy certificate"
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/40 bg-card/30">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-muted-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-24 text-center animate-fade-slide-up" style={{ animationDelay: "700ms" }}>
        <p className="text-muted-foreground mb-6">Interested in working together?</p>
        <Button variant="outline" asChild size="lg" className="rounded-full group px-8 h-14 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
          <Link href="/#contact">
            Let&apos;s start a conversation
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
