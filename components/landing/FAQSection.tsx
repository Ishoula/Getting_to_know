"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypeWriter";
const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I work mainly with React, Next.js, Node.js, Express, and databases like MongoDB and PostgreSQL.",
  },
  {
    question: "Are you available for freelance or internships?",
    answer:
      "Yes, I'm open to freelance work, collaborations, and internship opportunities.",
  },
  {
    question: "How do you approach building a project?",
    answer:
      "I focus on clean architecture, scalability, and user experience. I start with planning, then build iteratively with testing.",
  },
  {
    question: "Do you work on both frontend and backend?",
    answer:
      "Yes, I build full-stack applications including UI, APIs, and database systems.",
  },
];

export function FAQSection() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const typedAnswer = useTypewriter(
    activeFAQ !== null ? faqs[activeFAQ].answer : "",
    15,
  );
  return (
    <section className="py-16 border-t border-border/40">
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
        Frequently Asked Questions
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => setActiveFAQ(index)}
            className="cursor-pointer p-6 rounded-xl border border-border/40 bg-card hover:shadow-lg hover:-translate-y-1 transition"
          >
            <p className="font-medium">{faq.question}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeFAQ !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveFAQ(null)}
          />

          {/* MODAL CONTENT */}
          <div className="relative bg-card max-w-lg w-full mx-4 p-6 rounded-2xl shadow-2xl animate-fade-in-up">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setActiveFAQ(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X />
            </button>

            {/* CONTENT */}
            <h3 className="text-xl font-semibold mb-4">
              {faqs[activeFAQ].question}
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {typedAnswer}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
