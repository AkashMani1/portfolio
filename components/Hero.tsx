"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 container-custom flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-primary font-medium tracking-wider text-sm uppercase mb-2 block">
          {portfolioData.personalInfo.title}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Hello, I&apos;m {portfolioData.personalInfo.name}. <br />
          <span className="text-gray-500 dark:text-gray-400">
            {portfolioData.personalInfo.tagline}
          </span>
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8 leading-relaxed">
          I am a software developer based in {portfolioData.personalInfo.location}, 
          passionate about building accessible, pixel-perfect, user interfaces and robust backend systems.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <a
            href="#projects"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-600 transition-all"
          >
            View Projects <ArrowRight size={18} />
          </a>
          <a
            href={portfolioData.personalInfo.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            Download CV <Download size={18} />
          </a>
        </div>

        <div className="mt-10 flex gap-6 text-gray-500 dark:text-gray-400">
          <a href={portfolioData.personalInfo.github} target="_blank" className="hover:text-primary transition-colors">
            <Github size={24} />
          </a>
          <a href={portfolioData.personalInfo.linkedin} target="_blank" className="hover:text-primary transition-colors">
            <Linkedin size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}