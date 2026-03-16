"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Code, GraduationCap, ExternalLink, Loader2 } from "lucide-react";
import FadeIn from "./FadeIn";
import { db } from "../app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { portfolioData, CertificationItem } from "@/app/data/portfolio";

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
  const [certifications, setCertifications] = useState<CertificationItem[]>(portfolioData.certifications);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "certifications"));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as CertificationItem[];
          setCertifications(data);
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
        setCertifications(portfolioData.certifications);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

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

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => (
            <FadeIn key={`${cert.title}-${idx}`} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative p-6 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm h-full"
              >
                <Award size={36} className="text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-sm text-primary font-medium">{cert.issuer}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm leading-relaxed">
                  {cert.desc}
                </p>
                {cert.link && cert.link !== "#" && (
                  <a href={cert.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                    View Certificate <ExternalLink size={14} />
                  </a>
                )}
              </motion.div>
            </FadeIn>
          ))}

          {simulationData.map((sim, idx) => (
            <FadeIn key={sim.title} delay={(certifications.length + idx) * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative p-6 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm h-full"
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
                {sim.link !== "#" && (
                  <a href={sim.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                    View Certificate <ExternalLink size={14} />
                  </a>
                )}
              </motion.div>
            </FadeIn>
          ))}

        </div>
      )}
    </section>
  );
}
