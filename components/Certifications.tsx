"use client";
import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import { Award, Code, GraduationCap, ExternalLink } from "lucide-react";
import FadeIn from "./FadeIn";

// Placeholder data for Job Simulations (as seen in your reference image)
const simulationData = [
  {
    title: "JPMorgan Software Engineering",
    type: "Job Simulation",
    issuer: "Forage",
    desc: "Implemented a Spring Boot project with Kafka and H2 database. Gained exposure to large-scale financial system architecture and API design.",
    icon: GraduationCap,
    link: "#"
  },
  {
    title: "Deloitte Technology Simulation",
    type: "Job Simulation",
    issuer: "Forage",
    desc: "Solved real-world business problems using technology-focused approaches. Applied software engineering principles to create scalable solutions.",
    icon: Code,
    link: "#"
  },
];


export default function Certifications() {
  return (
    <section id="certifications" className="py-24 container-custom">
      <FadeIn>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Certifications & Simulations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Proof of capability through structured training and virtual work experience.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Render Formal Certifications */}
        {portfolioData.certifications.map((cert, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative p-6 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm"
            >
              <Award size={36} className="text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
              <p className="text-sm text-primary font-medium">{cert.issuer}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm leading-relaxed">
                {cert.desc}
              </p>
            </motion.div>
          </FadeIn>
        ))}

        {/* Render Job Simulations (from the reference image) */}
        {simulationData.map((sim, idx) => (
          <FadeIn key={idx} delay={(portfolioData.certifications.length + idx) * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative p-6 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm"
            >
              <sim.icon size={36} className="text-primary mb-4" />
              <span className="absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                {sim.issuer}
              </span>
              <h3 className="text-xl font-bold mb-2">{sim.title}</h3>
              <p className="text-sm text-gray-500 font-medium">{sim.type}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm leading-relaxed">
                {sim.desc}
              </p>
              <a href={sim.link} className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                View Certificate <ExternalLink size={14} />
              </a>
            </motion.div>
          </FadeIn>
        ))}

      </div>
    </section>
  );
}