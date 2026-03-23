"use client";
import { ArrowRight, Download, Github, Linkedin, Sparkles } from "lucide-react";
import { portfolioData } from "../app/data/portfolio";
import FadeIn from "./FadeIn";
import Typewriter from "./Typewriter";
import Parallax from "./Parallax";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 container-custom flex flex-col justify-center min-h-[80vh]">
      <FadeIn delay={0.1}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
          <Sparkles size={16} />
          {portfolioData.personalInfo.availability}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h1 className="text-4xl md:text-7xl font-heading font-bold leading-tight mb-6 tracking-tight">
          Hi, I&apos;m{" "}
          <span className="text-primary">{portfolioData.personalInfo.name}</span>
          . <br />
          <span className="text-3xl md:text-5xl mt-2 block min-h-[1.2em] text-gray-800 dark:text-gray-100 font-body">
            I am a <Typewriter />
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8 leading-relaxed">
          {portfolioData.personalInfo.tagline}
        </p>
      </FadeIn>

      <FadeIn delay={0.35}>
        <Parallax offset={30}>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mb-10">
            {portfolioData.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-surface-1/50 px-5 py-4 backdrop-blur-md shadow-sm border-white/5"
              >
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-2">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white font-heading">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-body">{stat.note}</p>
              </div>
            ))}
          </div>
        </Parallax>
      </FadeIn>

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
          <a href={portfolioData.personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:scale-110">
            <Github size={24} />
          </a>
          <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:scale-110">
            <Linkedin size={24} />
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
