"use client";
import React, { useState, useEffect } from "react";
import { Award, Code, GraduationCap, ExternalLink, Loader2 } from "lucide-react";
import FadeIn from "./FadeIn";
import { db } from "../app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { portfolioData, CertificationItem } from "@/app/data/portfolio";
import { cn } from "@/app/lib/utils";

const simulationData = [
  {
    title: "JPMorgan Software Engineering",
    type: "Job Simulation",
    issuer: "Forage",
    desc: "Implemented a Spring Boot project with Kafka and H2 database. Gained exposure to large-scale financial system architecture.",
    icon: GraduationCap,
    link: "#"
  },
  {
    title: "Deloitte Technology Simulation",
    type: "Job Simulation",
    issuer: "Forage",
    desc: "Solved real-world business problems using technology-focused approaches. Applied software engineering principles.",
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
          const data = querySnapshot.docs
            .map((doc) => doc.data())
            .filter((item): item is CertificationItem => {
              return (
                typeof item.title === "string" &&
                typeof item.issuer === "string" &&
                typeof item.desc === "string"
              );
            });
          setCertifications(data);
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <div className="max-w-3xl">
            <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase block mb-4">
              Credentials
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 tracking-tight">
              Validated <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed font-body">
              Proof of capability through structured training and vertical market 
              simulations from world-class organizations.
            </p>
          </div>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="glass-card glass-card-hover p-8 group h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-heading font-black mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                    {cert.issuer}
                  </div>
                  <p className="text-foreground/50 text-sm leading-relaxed mb-6 flex-1 italic">
                    &quot;{cert.desc}&quot;
                  </p>
                  {cert.link && cert.link.startsWith("http") && (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors mt-auto"
                    >
                      Verify <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}

            {simulationData.map((sim, idx) => (
              <FadeIn key={sim.title} delay={(certifications.length + idx) * 0.05}>
                <div className="glass-card glass-card-hover p-8 group h-full flex flex-col border-accent/20">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <sim.icon size={24} />
                  </div>
                  <h3 className="text-xl font-heading font-black mb-2 tracking-tight group-hover:text-accent transition-colors">
                    {sim.title}
                  </h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">
                    {sim.issuer} • {sim.type}
                  </div>
                  <p className="text-foreground/50 text-sm leading-relaxed flex-1 italic">
                    &quot;{sim.desc}&quot;
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
