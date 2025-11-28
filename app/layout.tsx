import type { Metadata } from "next";
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
import PersonalChatbot from "@/components/PersonalChatbot"; // <--- 1. NEW IMPORT

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Akash Mani | Full-Stack Developer",
  description: "Portfolio of Akash Mani",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll />
          <ParticleBackground />
          <CursorGlow />
          <ScrollProgress />
          <ScrollToTop />
          
          <CommandMenu /> 
          <PersonalChatbot /> {/* <--- 2. ADD CHATBOT HERE */}
          <Toaster position="bottom-right" theme="system" />
          <Analytics />

          <Navbar />
          <main className="min-h-screen flex flex-col relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}