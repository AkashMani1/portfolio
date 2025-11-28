"use client";
import { motion } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import { GraduationCap, Calendar, Code, Globe, Cpu, Target } from "lucide-react"; // Added icons for Focus
import FadeIn from "./FadeIn";

export default function About() {
  return (
    // 1. Section background is transparent so particles show through
    <section id="about" className="py-24 relative">
      <div className="container-custom">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
            About Me
          </h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {/* Left Column: Summary Text */}
          <div className="md:col-span-2 space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {portfolioData.summary.map((paragraph, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <p>{paragraph}</p>
              </FadeIn>
            ))}
          </div>
          
          {/* Right Column: Focus Card (Glassy & Redefined Text) */}
          <FadeIn delay={0.2} className="h-full">
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 dark:bg-white/5 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 h-full backdrop-blur-md cursor-default"
            >
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Current Focus
              </h3>
              {/* REDEFINED TEXT: More Professional & Senior */}
              <ul className="space-y-5 text-sm font-medium text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-3">
                  <Code size={18} className="text-primary opacity-80" />
                  <span>Advanced Algorithmic Logic</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe size={18} className="text-primary opacity-80" />
                  <span>Scalable Distributed Systems</span>
                </li>
                <li className="flex items-center gap-3">
                  <Cpu size={18} className="text-primary opacity-80" />
                  <span>System Architecture Patterns</span>
                </li>
                <li className="flex items-center gap-3">
                  <Target size={18} className="text-primary opacity-80" />
                  <span>Open Source Ecosystems</span>
                </li>
              </ul>
            </motion.div>
          </FadeIn>
        </div>

        {/* EDUCATION SECTION: Restored to Horizontal List Format */}
        <FadeIn>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
            <span className="text-primary text-3xl">🎓</span> Education
          </h3>
        </FadeIn>
        
        <div className="space-y-6">
          {portfolioData.education.map((edu, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <motion.div 
                whileHover={{ x: 10, backgroundColor: "rgba(59, 130, 246, 0.05)" }} // Slide right + subtle blue tint
                className="group flex flex-col md:flex-row md:items-start justify-between p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-sm transition-colors cursor-default"
              >
                {/* Left: Icon & Details */}
                <div className="flex gap-5">
                  <div className="mt-1 p-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">
                      {edu.school}
                    </p>
                    {edu.desc && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-3 leading-relaxed max-w-2xl">
                        {edu.desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Year Pill */}
                <div className="mt-4 md:mt-0 md:pl-6 flex items-start">
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-mono font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5 group-hover:border-primary/30 transition-colors">
                    <Calendar size={12} />
                    {edu.year}
                  </span>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}