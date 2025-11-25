"use client";
import { motion } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import FadeIn from "./FadeIn";

export default function Experience() {
  return (
    <section id="experience" className="py-20 container-custom">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
      </FadeIn>
      
      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 space-y-12">
        {portfolioData.experience.map((exp, idx) => (
          <FadeIn key={idx} delay={idx * 0.2} className="pl-8 relative">
            {/* Animated Timeline Dot */}
            <motion.span 
              whileHover={{ scale: 1.5, backgroundColor: "#3b82f6" }} // Expands and turns blue on hover
              className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-background transition-colors"
            ></motion.span>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold">{exp.role}</h3>
              <div className="text-primary font-medium text-lg mt-1">{exp.company}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 italic mt-1 font-mono">{exp.duration}</div>
            </div>
            
            {/* STAGGERED LIST ANIMATION */}
            <motion.ul 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 } // Delay between each bullet point
                }
              }}
              className="space-y-3 text-gray-600 dark:text-gray-300 text-sm mb-6"
            >
              {exp.points.map((point, i) => (
                <motion.li 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ x: 5, color: "#3b82f6" }} // Moves right and turns blue on hover
                  className="flex items-start gap-2 leading-relaxed cursor-default transition-colors"
                >
                  <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-primary/60"></span>
                  {point}
                </motion.li>
              ))}
            </motion.ul>
            
            {/* Tech Stack Tags with pop-in effect */}
            <div className="flex flex-wrap gap-2">
              {exp.stack.map((tech, i) => (
                <motion.span 
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 + 0.5 }} // Loads after the text
                  whileHover={{ y: -3 }} // Floats up on hover
                  className="text-xs font-medium border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-gray-500 bg-gray-50 dark:bg-gray-800/50 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}