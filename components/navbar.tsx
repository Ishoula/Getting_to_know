"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
  
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
<header className="sticky top-4 z-50 mx-auto mt-6 mb-4 w-[95%] max-w-[1400px] rounded-3xl border border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">      <nav className="container mx-auto flex h-20 items-center justify-between px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-all duration-300 hover:scale-105"
        >
          Moi
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                pathname === link.href
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-4 w-px bg-border/60" />
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground flex items-center gap-1.5 group"
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            Admin
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="transition-transform duration-200 active:scale-95"
          >
            <span className={cn(
              "transition-all duration-300",
              mobileMenuOpen ? "rotate-90" : "rotate-0"
            )}>
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden bg-background overflow-hidden transition-all duration-300 ease-in-out rounded-b-3xl",
          mobileMenuOpen ? "max-h-64 opacity-100 border-t border-border/40" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-foreground hover:translate-x-2 py-2",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              style={{ 
                transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms"
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px w-full bg-border/40 my-2" />
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2 py-2 flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
}
