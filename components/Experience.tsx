"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import { Briefcase, Layers, Server, Layout, GitBranch, Terminal, Calendar } from "lucide-react";
import FadeIn from "./FadeIn";
import { cn } from "@/app/lib/utils";

export default function Experience() {
  const [viewMode, setViewMode] = useState<"summary" | "technical">("technical");

  const getCategoryIcon = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("react") || lower.includes("frontend") || lower.includes("ui")) return <Layout size={18} className="text-primary" />;
    if (lower.includes("node") || lower.includes("api") || lower.includes("backend") || lower.includes("auth")) return <Server size={18} className="text-accent" />;
    if (lower.includes("mongo") || lower.includes("database") || lower.includes("query")) return <Layers size={18} className="text-purple-400" />;
    if (lower.includes("git") || lower.includes("ci/cd") || lower.includes("deploy")) return <GitBranch size={18} className="text-orange-400" />;
    return <Terminal size={18} className="text-foreground/40" />;
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase block mb-4">
                Career Roadmap
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 tracking-tight">
                Professional <span className="text-gradient">Journey</span>
              </h2>
            </div>
            
            <div className="flex glass-card p-1 rounded-full">
              {["summary", "technical"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                    viewMode === mode
                      ? "bg-primary text-white shadow-lg"
                      : "text-foreground/40 hover:text-foreground/80 hover:bg-surface-hover"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="space-y-12 relative">
          {/* Timeline Line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent hidden md:block" />

          {portfolioData.experience.map((exp, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="relative md:pl-16">
              {/* Timeline Dot */}
              <div className="absolute left-[18px] top-[40px] w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 hidden md:block" />
              
              <div className="glass-card glass-card-hover p-8 md:p-12 relative overflow-hidden group">
                {/* Decorative background logo/icon */}
                <Briefcase className="absolute -right-8 -bottom-8 w-48 h-48 text-foreground/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
                    <div>
                      <h3 className="text-3xl font-heading font-black mb-2 tracking-tight group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground/80">{exp.company}</span>
                        <span className="text-foreground/20">•</span>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                          <Calendar size={12} />
                          {exp.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {viewMode === "summary" ? (
                      <motion.div
                        key="summary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-6 bg-surface-hover rounded-2xl border-l-4 border-primary italic text-lg text-foreground/70"
                      >
                         &quot;{exp.description}&quot;
                      </motion.div>
                    ) : (
                      <motion.div
                        key="technical"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid gap-6"
                      >
                        {exp.points.map((point, i) => (
                          <div key={i} className="flex gap-4 group/item">
                            <div className="mt-1 w-8 h-8 rounded-xl bg-surface-hover border border-border flex items-center justify-center group-hover/item:border-primary/50 group-hover/item:bg-primary/10 transition-all duration-300">
                              {getCategoryIcon(point)}
                            </div>
                            <p className="text-foreground/60 leading-relaxed font-body flex-1">
                              {point}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-12 flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg bg-surface-hover border border-border text-foreground/40 hover:text-primary hover:border-primary/40 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}