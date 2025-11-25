"use client";
import { motion } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="container-custom">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left Column: Summary */}
          <div className="md:col-span-2 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {portfolioData.summary.map((paragraph, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <p>{paragraph}</p>
              </FadeIn>
            ))}
          </div>
          
          {/* Right Column: Current Focus Card */}
          <FadeIn delay={0.3} className="h-full">
            <motion.div 
              whileHover={{ y: -5 }} // Subtle lift on hover
              className="bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 h-full"
            >
              <h3 className="font-bold text-lg mb-4 text-primary">Current Focus</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">👉 Strengthening DSA & Problem Solving</li>
                <li className="flex items-center gap-2">👉 Full-Stack Projects (MEAN/MERN)</li>
                <li className="flex items-center gap-2">👉 System Design Basics</li>
                <li className="flex items-center gap-2">👉 Open Source Contribution</li>
              </ul>
            </motion.div>
          </FadeIn>
        </div>

        {/* Education Section */}
        <div className="mt-12">
          <FadeIn>
            <h3 className="text-xl font-bold mb-6">Education</h3>
          </FadeIn>
          
          <div className="space-y-6">
            {portfolioData.education.map((edu, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <div className="group border-l-2 border-gray-200 dark:border-gray-800 pl-4 hover:border-primary transition-colors">
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{edu.degree}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.school} • {edu.year}</p>
                  {edu.desc && <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{edu.desc}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}