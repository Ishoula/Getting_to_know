import { Github, Linkedin, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Moi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building impactful software solutions with a focus on clean code and exceptional user experience.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:shoulamite2k@gmail.com"
                  className="group flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>shoulamite2k@gmail.com</span>
                </a>
              </li>
             <li>
                <a
                  href="https://wa.me/250788000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm hover:text-green-500 transition-colors"
                >
                  <div className="p-2 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>+250 798 482 836</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Presence */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Social</h4>
            <div className="flex flex-col gap-3">
              <Link
                href="https://github.com/Ishoula"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-sm hover:text-primary transition-colors p-2 -ml-2 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ishema-shimwa-shoulamite-a43b25218/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-sm hover:text-primary transition-colors p-2 -ml-2 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ishoula. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
