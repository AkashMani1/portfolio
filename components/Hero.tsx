"use client";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { portfolioData } from "../app/data/portfolio"; // OR "../data/portfolio" if @ fails
import FadeIn from "./FadeIn"; // Import our new helper

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 container-custom flex flex-col justify-center min-h-[80vh]">
      
      {/* 1. Small Title - Fast */}
      <FadeIn delay={0.1}>
        <span className="text-primary font-medium tracking-wider text-sm uppercase mb-2 block">
          {portfolioData.personalInfo.title}
        </span>
      </FadeIn>

      {/* 2. Main Name - Medium speed */}
      <FadeIn delay={0.2}>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Hello, I&apos;m {portfolioData.personalInfo.name}. <br />
          <span className="text-gray-500 dark:text-gray-400">
            {portfolioData.personalInfo.tagline}
          </span>
        </h1>
      </FadeIn>

      {/* 3. Description - Slower */}
      <FadeIn delay={0.3}>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8 leading-relaxed">
          I am a software developer based in {portfolioData.personalInfo.location}, 
          passionate about building accessible, pixel-perfect user interfaces and robust backend systems.
        </p>
      </FadeIn>

      {/* 4. Buttons & Socials - Last */}
      <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex gap-4">
            <a
            href="#projects"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
            >
            View Projects <ArrowRight size={18} />
            </a>
            <a
            href={portfolioData.personalInfo.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
            >
            Download CV <Download size={18} />
            </a>
        </div>
        
        <div className="flex gap-6 text-gray-500 dark:text-gray-400 mt-4 sm:mt-0 sm:ml-6">
          <a href={portfolioData.personalInfo.github} target="_blank" className="hover:text-primary transition-colors hover:scale-110">
            <Github size={24} />
          </a>
          <a href={portfolioData.personalInfo.linkedin} target="_blank" className="hover:text-primary transition-colors hover:scale-110">
            <Linkedin size={24} />
          </a>
        </div>
      </FadeIn>

    </section>
  );
}