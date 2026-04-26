"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, Database, Globe, Quote, Star } from "lucide-react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import TechTree from "@/components/TechTree";
import FloatingBubbles from "@/components/FloatingBubbles";
import { useEffect, useState } from "react";

interface Recommendation {
  _id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar?: string;
  featured: boolean;
}

export default function HomePage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    fetch("/api/recommendations")
      .then((res) => res.json())
      .then(setRecommendations)
      .catch(console.error);
  }, []);
  return (
    <>
    
    <div className="container mx-auto px-4 relative">
      <FloatingBubbles/>
      {/* HERO SECTION */}
      <section className="py-20 md:py-32">
        <div className="max-w-3xl">
          <p className="text-muted-foreground mb-4 animate-fade-in-up">
            Call Me
          </p>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            I.Shoula
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up">
            A full-stack developer building scalable systems, modern UI
            experiences, and clean backend architectures.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up">
            <Button
              size="lg"
              asChild
              className="group hover:scale-105 transition"
            >
              <Link href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHAT I DO SECTION */}
      <section className="py-16 border-t border-border/40">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">What I Do</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: "Frontend Development",
              desc: "Building responsive and interactive UIs with React & Next.js.",
            },
            {
              icon: Database,
              title: "Backend Development",
              desc: "Designing APIs and scalable backend systems with Node.js.",
            },
            {
              icon: Code2,
              title: "Full-Stack Systems",
              desc: "End-to-end application architecture and deployment.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-lg border border-border/40 bg-card hover:shadow-lg hover:-translate-y-1 transition"
            >
              <item.icon className="h-6 w-6 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK (3D TREE) */}
      {/* TECH STACK (3D TREE) */}
      <section className="py-16 border-t border-border/40">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Tech Stack</h2>
          <p className="text-muted-foreground text-sm">
            Interactive growth map
          </p>
        </div>

        {/* 🔥 FIX: REAL HEIGHT */}
        <div className="w-full h-[600px] bg-black/5 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing">
          <Canvas
            className="w-full h-full"
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true }}
            dpr={[1, 2]}
          >
            <TechTree />
          </Canvas>
        </div>
      </section>

      {/* RECOMMENDATIONS SECTION */}
      {recommendations.length > 0 && (
        <section className="py-16 border-t border-border/40">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Recommendations</h2>
            <p className="text-muted-foreground text-sm">What people say about working with me</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 6).map((rec) => (
              <Card key={rec._id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                {rec.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-semibold text-lg">
                      {rec.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{rec.name}</h3>
                      <p className="text-sm text-muted-foreground">{rec.role}</p>
                      <p className="text-xs text-muted-foreground">{rec.company}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10" />
                    <p className="text-sm leading-relaxed pl-4 pt-2 text-muted-foreground">
                      {rec.testimonial}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="py-16 border-t border-border/40 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Let’s build something impactful
        </h2>

        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          I’m open to internships, freelance work, and collaborations.
        </p>

        <Button size="lg" asChild className="group hover:scale-105 transition">
          <Link href="/contact">
            Get In Touch
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
          </Link>
        </Button>
      </section>
    </div>
    </>
  );
}