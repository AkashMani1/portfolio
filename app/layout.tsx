import type { Metadata, Viewport } from "next"; // Import Viewport
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import CursorGlow from "@/components/CursorGlow";
import ParticleBackground from "@/components/ParticleBackground";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { CommandMenu } from "@/components/CommandMenu";
import PersonalChatbot from "@/components/PersonalChatbot";
import PageViews from "@/components/PageViews"; 
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Akash Mani — Full-Stack Developer | React, Next.js & Node.js",
  description:
    "Akash Mani is a full-stack developer from Kolkata building production-ready applications with React, Next.js, Node.js, MongoDB and TypeScript. Open to internships and junior roles.",
  keywords: ["Akash Mani", "Full-Stack Developer", "React", "Next.js", "Node.js", "Portfolio", "Kolkata"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Akash Mani — Full-Stack Developer",
    description: "Building products that ship. React, Next.js, Node.js, TypeScript.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-body antialiased bg-background text-foreground overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll />
          <ParticleBackground />
          <CursorGlow />
          <ScrollProgress />
          <ScrollToTop />
          
          <CommandMenu /> 
          <PersonalChatbot />
          <Toaster position="bottom-right" theme="system" />
          <Analytics />
          <PageViews />

          <Navbar />
          <main className="min-h-screen flex flex-col relative z-10 overflow-x-hidden">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
