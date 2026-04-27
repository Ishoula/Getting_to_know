"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Code2, Database, Globe, Quote, Star, Send, MessageSquare, X } from "lucide-react";
import Link from "next/link";
import FloatingBubbles from "@/components/FloatingBubbles";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ContactForm } from "@/components/contact-form";

const TechTree = dynamic(() => import("@/components/TechTree"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading Tech Tree...</div>
});

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
  const [recVisible, setRecVisible] = useState(false);
  const recSectionRef = useRef<HTMLDivElement>(null);
  const [showRecForm, setShowRecForm] = useState(false);
  const [recForm, setRecForm] = useState({ name: "", role: "", company: "", testimonial: "" });
  const [recSubmitting, setRecSubmitting] = useState(false);
  const [recSuccess, setRecSuccess] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetch("/api/recommendations")
      .then((res) => res.json())
      .then((data) => {
        console.log("[Recommendations] loaded:", data?.length ?? 0, data);
        setRecommendations(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("[Recommendations] fetch error:", err);
        // Fallback for demo if API fails
        setRecommendations([
          {
            _id: "fb1",
            name: "Dev Colleague",
            role: "Senior Developer",
            company: "Tech Solutions",
            testimonial: "A brilliant problem solver and a joy to work with.",
            featured: true
          }
        ]);
      });
  }, []);

  useEffect(() => {
    const el = recSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRecVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleRecSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecSubmitting(true);
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recForm),
      });
      if (res.ok) {
        setRecSuccess(true);
        setRecForm({ name: "", role: "", company: "", testimonial: "" });
        setTimeout(() => {
          setRecSuccess(false);
          setShowRecForm(false);
        }, 3000);
      }
    } catch {
      // silently fail
    } finally {
      setRecSubmitting(false);
    }
  };
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
              <Link href="/#contact">Contact Me</Link>
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

        <div className="w-full h-[600px] bg-black/5 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing">
          <TechTree />
        </div>
      </section>

      {/* RECOMMENDATIONS SECTION */}
      <section ref={recSectionRef} className="py-16 border-t border-border/40 overflow-hidden">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Recommendations</h2>
          <p className="text-muted-foreground text-sm">What people say about working with me</p>
        </div>

        {recommendations.length > 0 && (
          <div className="relative mb-10 group">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-linear-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-linear-to-l from-background to-transparent" />

            <div className="overflow-hidden">
              <div
                className={`flex gap-6 w-max ${recVisible ? "animate-marquee group-hover:paused" : ""}`}
                style={{
                  animationPlayState: recVisible ? undefined : "paused", width:"max-content"
                }}
              >
                {[...recommendations, ...recommendations].map((rec, i) => (
                  <Card
                    key={`${rec._id}-${i}`}
                    className={`relative overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-[320px] md:w-[380px] ${recVisible ? "animate-fadeSlideUp" : ""}`}
                    style={{
                      animationDelay: `${Math.min(i, 8) * 120}ms`,
                      animationPlayState: recVisible ? undefined : "paused",
                    }}
                  >
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
                        <p className="text-sm leading-relaxed pl-4 pt-2 text-muted-foreground line-clamp-4">
                          {rec.testimonial}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recommend Me Form */}
        <div className="max-w-xl mx-auto">
            {!showRecForm ? (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowRecForm(true)}
                  className="group"
                >
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition" />
                  Recommend Me
                </Button>
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  {recSuccess ? (
                    <div className="text-center py-6">
                      <p className="text-lg font-medium text-primary mb-2">Thank you!</p>
                      <p className="text-sm text-muted-foreground">Your recommendation has been submitted for review.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleRecSubmit} className="space-y-4">
                      <h3 className="text-lg font-semibold mb-2">Write a Recommendation</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rec-name">Your Name *</Label>
                          <Input
                            id="rec-name"
                            value={recForm.name}
                            onChange={(e) => setRecForm({ ...recForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rec-role">Your Role *</Label>
                          <Input
                            id="rec-role"
                            value={recForm.role}
                            onChange={(e) => setRecForm({ ...recForm, role: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rec-company">Company *</Label>
                        <Input
                          id="rec-company"
                          value={recForm.company}
                          onChange={(e) => setRecForm({ ...recForm, company: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rec-testimonial">Your Recommendation *</Label>
                        <Textarea
                          id="rec-testimonial"
                          value={recForm.testimonial}
                          onChange={(e) => setRecForm({ ...recForm, testimonial: e.target.value })}
                          required
                          rows={4}
                          placeholder="Share your experience working with me..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit" disabled={recSubmitting}>
                          {recSubmitting ? "Submitting..." : "Submit Recommendation"}
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => setShowRecForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 border-t border-border/40 mb-8">
        <div className="max-w-2xl mx-auto px-4">
          {!showContact ? (
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Ready to start a project?
              </h2>
              <Button 
                size="lg" 
                onClick={() => setShowContact(true)}
                className="group h-16 px-8 text-lg rounded-full shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                <MessageSquare className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                Let&apos;s talk Business
              </Button>
            </div>
          ) : (
            <div className="animate-scale-in">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Let&apos;s talk Business
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Fill out the form below and I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowContact(false)}
                  className="rounded-full hover:bg-muted"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <Card className="border-border/40 shadow-2xl overflow-hidden">
                <CardContent className="p-8">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
}