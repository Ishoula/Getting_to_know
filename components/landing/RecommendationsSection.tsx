"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Quote, Send } from "lucide-react";

interface Recommendation {
  _id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar?: string;
  featured: boolean;
}

export function RecommendationsSection({ initialRecommendations }: { initialRecommendations: Recommendation[] }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [recVisible, setRecVisible] = useState(false);
  const recSectionRef = useRef<HTMLDivElement>(null);
  const [showRecForm, setShowRecForm] = useState(false);
  const [recForm, setRecForm] = useState({ name: "", role: "", company: "", testimonial: "" });
  const [recSubmitting, setRecSubmitting] = useState(false);
  const [recSuccess, setRecSuccess] = useState(false);

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
    <section ref={recSectionRef} className="py-16 border-t border-border/40 overflow-hidden">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Recommendations</h2>
        <p className="text-muted-foreground text-sm">What people say about working with me</p>
      </div>

      {recommendations.length > 0 && (
        <div className="relative mb-10 group">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />

          <div className="overflow-hidden">
            <div
              className={`flex gap-6 w-max ${recVisible ? "animate-marquee group-hover:paused" : ""}`}
              style={{ width: "max-content" }}
            >
              {[...recommendations, ...recommendations].map((rec, i) => (
                <Card
                  key={`${rec._id}-${i}`}
                  className={`relative overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-[320px] md:w-[380px] ${recVisible ? "animate-fadeSlideUp" : ""}`}
                  style={{
                    animationDelay: `${Math.min(i, 8) * 120}ms`,
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

      <div className="max-w-xl mx-auto">
        {!showRecForm ? (
          <div className="text-center">
            <Button variant="outline" size="lg" onClick={() => setShowRecForm(true)} className="group">
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
  );
}
