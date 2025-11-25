"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              {portfolioData.summary.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-4 text-primary">Current Focus</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">👉 Strengthening DSA & Problem Solving</li>
                <li className="flex items-center gap-2">👉 Full-Stack Projects (MEAN/MERN)</li>
                <li className="flex items-center gap-2">👉 System Design Basics</li>
                <li className="flex items-center gap-2">👉 Open Source Contribution</li>
              </ul>
            </div>
          </div>

          {/* Education Sub-section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Education</h3>
            <div className="space-y-6">
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-800 pl-4">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.school} • {edu.year}</p>
                  {edu.desc && <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{edu.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}