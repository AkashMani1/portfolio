"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";
import { ExternalLink, Github } from "lucide-react";

const categories = ["All", "Web", "Mobile", "Others"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = portfolioData.projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                key={project.title}
                className="group bg-white dark:bg-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all"
              >
                {/* Placeholder for image if you add one later */}
                <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-gray-400">
                    {/*  */}
                   <span className="text-sm">Project Preview</span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={project.links.live} className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                      <ExternalLink size={16} className="mr-1" /> Live
                    </a>
                    <a href={project.links.code} className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                      <Github size={16} className="mr-1" /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}