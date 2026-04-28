"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, X } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  const [showContact, setShowContact] = useState(false);

  return (
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
  );
}
