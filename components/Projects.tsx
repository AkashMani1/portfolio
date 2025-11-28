"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import { ExternalLink, Github } from "lucide-react";
import FadeIn from "./FadeIn";
import TiltCard from "./TiltCard";

const categories = ["All", "Web", "Mobile", "Others"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = portfolioData.projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  // LOGIC: Cursor Glow - Drastically reduced opacity (0.08) for subtle feel
  const getGlowColor = (category: string) => {
    if (category === "Web") return "rgba(59, 130, 246, 0.08)"; 
    if (category === "Mobile") return "rgba(16, 185, 129, 0.08)"; 
    if (category === "Others") return "rgba(249, 115, 22, 0.08)"; 
    return "rgba(59, 130, 246, 0.08)"; 
  };

  return (
    <section id="projects" className="py-20">
      <div className="container-custom">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Featured Projects</h2>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-glow="rgba(168, 85, 247, 0.08)" 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary text-gray-600 dark:text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* 3D TILT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -10 }} // Lift Effect
              key={project.title}
              data-glow={getGlowColor(project.category)}
            >
              <TiltCard className="h-full">
                <div className="group h-full bg-white dark:bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all flex flex-col cursor-pointer">
                  
                  {/* Preview Area */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-gray-400 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-sm font-bold tracking-widest uppercase border border-gray-300 dark:border-gray-700 px-4 py-1 rounded">
                      Preview
                    </span>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors text-gray-900 dark:text-white">
                        {project.title}
                        </h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/10 font-medium text-gray-600 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 mt-auto border-t border-gray-100 dark:border-gray-800 pt-4">
                      <a href={project.links.live} className="flex items-center text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors text-gray-500 dark:text-gray-400">
                        <ExternalLink size={14} className="mr-1.5" /> Live Demo
                      </a>
                      <a href={project.links.code} className="flex items-center text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors text-gray-500 dark:text-gray-400">
                        <Github size={14} className="mr-1.5" /> View Code
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}