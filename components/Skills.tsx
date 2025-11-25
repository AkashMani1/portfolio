"use client";
import { motion } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import FadeIn from "./FadeIn";

export default function Skills() {
  // Animation settings for the list
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each tag appearing
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-20 container-custom">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-10">Technical Skills</h2>
      </FadeIn>

      <div className="space-y-10">
        {Object.entries(portfolioData.skills).map(([category, skills]) => (
          <div key={category}>
            <FadeIn>
              <h3 className="capitalize text-lg font-semibold mb-4 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-2 inline-block">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h3>
            </FadeIn>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants} // Applies the pop-up animation
                  whileHover={{ scale: 1.05 }} // Subtle zoom on hover
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-800 dark:text-gray-200 border border-transparent hover:border-primary transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}