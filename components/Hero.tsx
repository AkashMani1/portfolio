"use client";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { portfolioData } from "../app/data/portfolio"; // Adjusted path based on previous fixes
import FadeIn from "./FadeIn";
import Typewriter from "./Typewriter"; // Import the new component

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 container-custom flex flex-col justify-center min-h-[80vh]">
      
      <FadeIn delay={0.1}>
        <span className="text-gray-500 font-medium tracking-wider text-sm uppercase mb-2 block">
          Welcome to my portfolio
        </span>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Hi, I&apos;m {portfolioData.personalInfo.name}. <br />
          <span className="text-3xl md:text-5xl mt-2 block">
            I am a <Typewriter />
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8 leading-relaxed">
          {portfolioData.personalInfo.tagline}
        </p>
      </FadeIn>

      {/* Buttons code remains the same... */}
      <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
         {/* ... (Keep your existing buttons code here) ... */}
         <div className="flex gap-4">
            <a href="#projects" className="bg-primary text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-600 transition-all hover:scale-105 active:scale-95">
              View Projects <ArrowRight size={18} />
            </a>
            <a href={portfolioData.personalInfo.resumeLink} target="_blank" className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
              Download CV <Download size={18} />
            </a>
        </div>
      </FadeIn>
    </section>
  );
}