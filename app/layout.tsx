import type { Metadata, Viewport } from "next"; // Import Viewport
import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  // --- EDITED: Changed Title ---
  title: "Akash Mani | Portfolio",
  description: "Portfolio of Akash Mani",
  // --- NEW: LINK TO GEAR ICON ---
  icons: {
    icon: "/favicon.svg", 
  },
};

// NEW: Explicit Viewport definition for perfect mobile scaling
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents accidental zooming on inputs
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
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
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

          <Navbar />
          <main className="min-h-screen flex flex-col relative z-10 overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}