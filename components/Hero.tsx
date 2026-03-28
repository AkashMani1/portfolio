"use client";
import { ArrowRight, Download, Github, Linkedin, Sparkles } from "lucide-react";
import { portfolioData } from "../app/data/portfolio";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-64 md:pb-40 overflow-hidden mesh-gradient">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-accent/20 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-primary text-sm font-medium mb-8">
            <Sparkles size={16} className="text-accent" />
            <span className="text-foreground/80">Available — Internships, Freelance &amp; Junior Roles</span>
          </div>
        </FadeIn>

        <div className="max-w-4xl">
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-8xl font-heading font-black leading-[1.1] mb-8 tracking-tighter">
              Building <span className="text-gradient">Products</span> <br />
              <span className="flex items-center gap-4">
                That Ship
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="hidden md:block h-[4px] bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mb-12 leading-relaxed font-body">
              Full-stack developer who turns ideas into production-grade applications — clean architecture, strong backend, and UI that feels right on real devices.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <a
                href="#projects"
                className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 transition-transform group-hover:scale-105" />
                <span className="relative flex items-center gap-2">
                  Explore Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              <a
                href={portfolioData.personalInfo.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-full glass-card font-bold transition-all hover:bg-surface-hover flex items-center gap-2"
              >
                View Résumé <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
              </a>

              <div className="flex gap-6 pl-2 sm:pl-6 sm:border-l border-border">
                <a 
                  href={portfolioData.personalInfo.github} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="text-foreground/40 hover:text-primary transition-all hover:scale-125"
                >
                  <Github size={28} />
                </a>
                <a 
                  href={portfolioData.personalInfo.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-foreground/40 hover:text-primary transition-all hover:scale-125"
                >
                  <Linkedin size={28} />  
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
