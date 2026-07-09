import React from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "lenis/dist/lenis.css";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { SkeletonProvider } from "@/context/SkeletonContext";
import SkeletonOverlay from "@/components/ui/SkeletonOverlay";

const _geist = Geist({ subsets: ["latin"] });

const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "I.Shoula",
    template: "%s | Scaling the Tech Tree",
  },
  description:
    "Full-stack developer portfolio showcasing projects, skills, and experience.",
  keywords: ["developer", "portfolio", "web development", "full-stack"],
  icons:{
    icon: "/icon.png",
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    
      <body className="font-sans antialiased bg-background relative isolate">
        <SkeletonProvider>
          <SkeletonOverlay />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScrollProvider>
              <CustomCursor />
              <div className="relative z-10">
                {children}
              </div>
            </SmoothScrollProvider>
          </ThemeProvider>
        </SkeletonProvider>


        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
