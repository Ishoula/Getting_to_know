import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Code2, Award } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume | Ishoula",
  description: "My professional experience, education, and skills.",
};

export default function ResumePage() {
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Innovations Ltd",
      period: "2022 - Present",
      description: "Leading the development of enterprise-scale web applications using React, Next.js, and Node.js. Improved system performance by 40% and mentored junior developers.",
    },
    {
      title: "Full-Stack Developer",
      company: "Digital Solutions Agency",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client projects across various industries. Implemented automated testing and modern CI/CD pipelines.",
    },
    {
        title: "Junior Developer",
        company: "StartUp Hub",
        period: "2018 - 2020",
        description: "Assisted in building responsive web interfaces and developing RESTful APIs for emerging startups.",
      },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Rwanda",
      period: "2015 - 2019",
    },
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL", "Prisma"] },
    { category: "Tools & Others", items: ["Git", "Docker", "AWS", "CI/CD", "Jest", "Cloudinary"] },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
        <div className="animate-fade-slide-up" style={{ animationDelay: "100ms" }}>
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
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Kigali, Rwanda
            </span>
          </div>
        </div>
        <Button className="rounded-full shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group animate-fade-slide-up" style={{ animationDelay: "200ms" }}>
          <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
          Download Resume
        </Button>
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
          <div className="grid md:grid-cols-3 gap-8">
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
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "AWS Certified Solutions Architect",
              "Meta Front-End Developer Professional",
              "Google Cloud Digital Leader",
              "Advanced React Specialization"
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
