"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DownloadButton() {
  return (
    <Button
      asChild
      className="rounded-full shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group animate-fade-slide-up print:hidden"
      style={{ animationDelay: "200ms" }}
    >
      <a href="/resume.pdf" download>
        <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
        Download PDF
      </a>
    </Button>
  );
}