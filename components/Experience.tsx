"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import { Briefcase, Code, Layers, Server, Layout, GitBranch, Terminal } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Experience() {
  const [viewMode, setViewMode] = useState<"summary" | "technical">("technical");

  // LOGIC: Icon detection (Same logic, cleaner style)
  const getCategoryIcon = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("react") || lower.includes("frontend") || lower.includes("ui")) return <Layout size={18} className="text-blue-400" />;
    if (lower.includes("node") || lower.includes("api") || lower.includes("backend") || lower.includes("auth")) return <Server size={18} className="text-green-400" />;
    if (lower.includes("mongo") || lower.includes("database") || lower.includes("query")) return <Layers size={18} className="text-purple-400" />;
    if (lower.includes("git") || lower.includes("ci/cd") || lower.includes("deploy")) return <GitBranch size={18} className="text-orange-400" />;
    return <Terminal size={18} className="text-gray-400" />;
  };

  return (
    <section id="experience" className="py-32 container-custom relative">
      {/* Background Decor Line */}
      <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-800 to-transparent -z-10" />

      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">Career Path</span>
            <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
              Professional Experience
            </h2>
          </div>

          {/* SLEEK TOGGLE SWITCH */}
          <div className="relative flex bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/10 backdrop-blur-md">
            {/* The sliding active background */}
            <motion.div
              layout
              className="absolute top-1 bottom-1 rounded-full bg-white dark:bg-primary shadow-sm"
              initial={false}
              animate={{
                x: viewMode === "summary" ? 0 : "100%",
                width: "50%"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <button
              onClick={() => setViewMode("summary")}
              className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                viewMode === "summary" ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewMode("technical")}
              className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                viewMode === "technical" ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Engineering
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="space-y-12">
        {portfolioData.experience.map((exp, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div className="relative pl-8 md:pl-16 group">
              {/* Timeline Dot with Glow */}
              <div className="absolute left-[28px] md:left-[44px] top-8 w-3 h-3 rounded-full bg-gray-900 dark:bg-white ring-4 ring-gray-100 dark:ring-black z-10 group-hover:scale-125 group-hover:bg-primary group-hover:ring-primary/20 transition-all duration-300"></div>

              {/* GLASS CARD */}
              <motion.div
                layout
                className="relative p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-lg overflow-hidden transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
              >
                {/* Subtle Gradient Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 text-lg">
                                <span className="text-primary font-medium tracking-tight">{exp.company}</span>
                                <span className="text-gray-300 dark:text-gray-700">•</span>
                                <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{exp.duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Switcher */}
                    <AnimatePresence mode="wait">
                        {viewMode === "summary" ? (
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                                className="bg-primary/5 border-l-2 border-primary pl-6 py-2 rounded-r-xl"
                            >
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic font-light leading-relaxed">
                                &quot;{exp.description}&quot;
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="technical"
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                                className="grid gap-4"
                            >
                                {exp.points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 4 }}
                                    className="flex gap-4 items-start group/item"
                                >
                                    <div className="mt-1 min-w-[32px] h-[32px] rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                                        {getCategoryIcon(point)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base pt-1">
                                    {point}
                                    </p>
                                </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tech Stack Pills */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                            <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-transparent hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all cursor-default"
                            >
                            {tech}
                            </span>
                        ))}
                    </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}