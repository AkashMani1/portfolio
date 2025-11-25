"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="py-20 container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-10">Technical Skills</h2>
        
        <div className="space-y-8">
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="capitalize text-lg font-semibold mb-3 text-gray-500 dark:text-gray-400">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    {skill}
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