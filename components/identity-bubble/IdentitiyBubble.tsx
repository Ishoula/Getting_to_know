"use client";

import { useState, useRef, useEffect } from "react";
import { Code2, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "Intro",
    content:
      "I.Shoula — full-stack developer building systems that feel alive.",
  },
  {
    title: "Skills",
    content:
      "React, Next.js, Node.js, MongoDB, PostgreSQL, System Design",
  },
  {
    title: "Projects",
    content:
      "I design scalable systems and full-stack applications with intention.",
    action: { label: "View Work", link: "/#projects" },
  },
  {
    title: "Contact",
    content:
      "Let’s build something meaningful. Reach out and let’s connect.",
    action: { label: "Let’s Talk", link: "/#contact" },
  },
];

export default function IdentityBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const next = () => setIndex((p) => (p + 1) % sections.length);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* FLOATING TRIGGER */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-xl z-50"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
      >
        <Code2 />
      </motion.button>

      {/* POPUP SYSTEM */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 🌑 BACKDROP OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 💬 CENTERED BUBBLE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: 60 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div
                ref={ref}
                className="relative w-[680px] h-[560px] drop-shadow-2xl"
              >
                {/* SVG BUBBLE BACKGROUND */}
                <svg
                  viewBox="0 0 400 400"
                  className="absolute inset-0 w-full h-full scale-125"
                >
                  {/* shadow */}
                  <path
                    d="M110,75 C70,75 40,110 40,150 C40,190 70,225 110,225 C115,225 120,224 125,223 C140,255 180,275 220,275 C270,275 310,245 325,205 C360,200 385,170 385,135 C385,95 355,65 315,65 C305,65 295,67 285,72 C265,40 220,20 175,20 C135,20 100,40 85,72 C93,73 102,75 110,75 Z"
                    fill="black"
                    opacity="0.12"
                  />

                  {/* main shape */}
                  <path
                    d="M100,65 C60,65 30,100 30,140 C30,180 60,215 100,215 C105,215 110,214 115,213 C130,245 170,265 210,265 C260,265 300,235 315,195 C350,190 375,160 375,125 C375,85 345,55 305,55 C295,55 285,57 275,62 C255,30 210,10 165,10 C125,10 90,30 75,62 C83,63 92,65 100,65 Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="4"
                  />

                  {/* decorative circles */}
                  <circle cx="280" cy="335" r="32" fill="black" />
                  <circle cx="345" cy="365" r="22" fill="black" />
                  <circle
                    cx="270"
                    cy="325"
                    r="30"
                    fill="white"
                    stroke="black"
                    strokeWidth="4"
                  />
                  <circle
                    cx="335"
                    cy="355"
                    r="20"
                    fill="white"
                    stroke="black"
                    strokeWidth="4"
                  />
                </svg>

                {/* CONTENT */}
                <div className="absolute top-[50px] left-[60px] right-[60px] bottom-[140px] flex flex-col">
                  {/* CLOSE */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute -top-2 right-0 text-black/60 hover:text-black"
                  >
                    <X size={18} />
                  </button>

                  {/* SECTION */}
                  <div className="mt-2 flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-xl font-bold mb-2 text-black">
                          {sections[index].title}
                        </h3>

                        <p className="text-sm text-black/70 leading-relaxed max-w-[380px]">
                          {sections[index].content}
                        </p>

                        {sections[index].action && (
                          <Link
                            href={sections[index].action.link}
                            className="text-sm text-black underline mt-3 inline-block"
                          >
                            {sections[index].action.label}
                          </Link>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* SIGNATURE & NAVIGATION */}
                  <div className="space-y-3">
                    <p className="text-[11px] text-black/60 border-t border-black/10 pt-2">
                      I build with intention, analyze with depth, and learn without limits
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {sections.map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i === index ? "bg-black" : "bg-black/20"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={next}
                        className="p-2 rounded-full bg-black text-white hover:scale-110 transition"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}