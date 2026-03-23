"use client";
import { motion } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import { GraduationCap, Calendar, Code, Globe, Cpu, Target, User } from "lucide-react";
import FadeIn from "./FadeIn";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { cn } from "@/app/lib/utils";

const focusIcons = [Code, Globe, Cpu, Target];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-4">
            The <span className="text-gradient">Architect</span> Behind the Code
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl leading-relaxed">
            I build systems that bridge the gap between complex backend logic and 
            intuitive user experiences.
          </p>
        </FadeIn>
        
        <BentoGrid className="mb-20">
          {/* Summary Card - Large */}
          <BentoGridItem
            title="Professional Philosophy"
            description={
              <div className="space-y-4 mt-2">
                {portfolioData.summary.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            }
            className="md:col-span-2 md:row-span-2 min-h-[30rem]"
            icon={<User className="text-primary" size={24} />}
          />

          {/* Current Focus Card */}
          <BentoGridItem
            title="Current Radar"
            description={
              <ul className="space-y-4 mt-4">
                {portfolioData.currentFocus.map((focus, index) => {
                  const Icon = focusIcons[index] || Target;
                  return (
                    <li key={focus} className="flex items-center gap-3 text-sm font-medium">
                      <Icon size={18} className="text-primary" />
                      <span>{focus}</span>
                    </li>
                  );
                })}
              </ul>
            }
            className="md:col-span-1"
            icon={<Target className="text-accent" size={24} />}
          />

          {/* Education Card */}
          <BentoGridItem
            title="Foundations"
            description={
              <div className="space-y-6 mt-4">
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="group/edu">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap size={16} className="text-primary" />
                      <span className="text-xs font-black uppercase tracking-widest text-foreground/40">{edu.year}</span>
                    </div>
                    <div className="font-bold text-foreground group-hover/edu:text-primary transition-colors">{edu.degree}</div>
                    <div className="text-xs text-foreground/60">{edu.school}</div>
                  </div>
                ))}
              </div>
            }
            className="md:col-span-1"
            icon={<GraduationCap className="text-primary" size={24} />}
          />
        </BentoGrid>
      </div>
    </section>
  );
}
