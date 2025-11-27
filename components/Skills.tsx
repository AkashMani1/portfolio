"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import { Code2, Database, Layout, Terminal, Cpu, Globe } from "lucide-react";
import FadeIn from "./FadeIn";
import MagneticTag from "./MagneticTag";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => setOpacity(0);

  // Map categories to icons
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages": return <Code2 size={24} className="text-blue-500" />;
      case "webmobile": return <Globe size={24} className="text-green-500" />; // Renamed for display logic below
      case "database": return <Database size={24} className="text-purple-500" />;
      case "tools": return <Terminal size={24} className="text-orange-500" />;
      case "core": return <Cpu size={24} className="text-red-500" />;
      default: return <Layout size={24} className="text-gray-500" />;
    }
  };

  // Renaming keys for cleaner UI display
  const displayNames: Record<string, string> = {
    languages: "Core Languages",
    webMobile: "Full-Stack Ecosystem",
    database: "Data Architecture",
    tools: "DevOps & Tools",
    core: "CS Fundamentals"
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container-custom">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Technical Arsenal
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
              I don't just use tools; I choose the right technology for the problem. 
              Here is my stack for building scalable, high-performance applications.
            </p>
          </div>
        </FadeIn>

        {/* BENTO GRID WITH SPOTLIGHT */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* THE GLOWING SPOTLIGHT FOLLOWER */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
            }}
          />

          {Object.entries(portfolioData.skills).map(([category, skills], idx) => (
            <FadeIn key={category} delay={idx * 0.1} className="h-full">
              <div className="relative h-full bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 overflow-hidden group hover:border-primary/20 transition-colors">
                
                {/* Internal Card Glow */}
                <div 
                  className="absolute -inset-px bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-white dark:bg-white/10 shadow-sm">
                      {getIcon(category)}
                    </div>
                    <h3 className="text-xl font-bold capitalize text-gray-900 dark:text-gray-100">
                      {displayNames[category] || category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <MagneticTag key={skill}>
                        <span className="inline-block px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/50 transition-colors cursor-default shadow-sm hover:shadow-md">
                          {skill}
                        </span>
                      </MagneticTag>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* EXTRA CARD: "Currently Learning" - Shows Growth Mindset */}
          <FadeIn delay={0.6} className="h-full">
            <div className="relative h-full bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 overflow-hidden group">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-primary/20 shadow-sm animate-pulse">
                     <Cpu size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Next on Radar
                  </h3>
               </div>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                 Continuously expanding my horizon. Currently exploring:
               </p>
               <div className="flex flex-wrap gap-3">
                  {["GraphQL", "Docker", "AWS Lambda"].map((item) => (
                     <span key={item} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        {item}
                     </span>
                  ))}
               </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}