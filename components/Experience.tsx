"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-20 container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-10">Experience</h2>
        
        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 space-y-12">
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} className="pl-8 relative">
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-background"></span>
              
              <div className="mb-2">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <div className="text-primary font-medium">{exp.company}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{exp.duration}</div>
              </div>
              
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span key={tech} className="text-xs border border-gray-200 dark:border-gray-700 px-2 py-1 rounded text-gray-500">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}