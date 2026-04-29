"use client";

import { treeData } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TechGrid() {
  // Group by level or just show all? 
  // Let's filter out the root node and group the rest.
  const mainCategories = treeData.filter(t => t.level === 1);
  const subItems = treeData.filter(t => t.level > 1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {treeData.filter(t => t.level > 0).map((tech) => (
        <Card 
          key={tech.label} 
          className="border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group"
        >
          <CardContent className="p-2.5 flex items-center justify-center text-center h-full">
            <span className="text-xs font-medium group-hover:text-primary transition-colors">
              {tech.label}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
