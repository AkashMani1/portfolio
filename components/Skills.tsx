"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Terminal, Cpu, Globe, Loader2, Sparkles } from "lucide-react";
import FadeIn from "./FadeIn";
import { portfolioData } from "@/app/data/portfolio";
import { db } from "../app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { cn } from "@/app/lib/utils";

export default function Skills() {
  const [skillsData, setSkillsData] = useState<Record<string, string[]> | null>(portfolioData.skills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "skills"));
        if (!querySnapshot.empty) {
          const data: Record<string, string[]> = {};
          querySnapshot.forEach((doc) => {
            data[doc.id] = doc.data().items || [];
          });
          setSkillsData(data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages": return <Code2 size={24} className="text-primary" />;
      case "webmobile": return <Globe size={24} className="text-accent" />;
      case "database": return <Database size={24} className="text-purple-400" />;
      case "tools": return <Terminal size={24} className="text-orange-400" />;
      case "core": return <Cpu size={24} className="text-red-400" />;
      default: return <Layout size={24} className="text-foreground/40" />;
    }
  };

  const displayNames: Record<string, string> = {
    languages: "Core Languages",
    webMobile: "Full-Stack Ecosystem",
    database: "Data Architecture",
    tools: "DevOps & Tools",
    core: "CS Fundamentals"
  };

  const sortOrder = ["languages", "webMobile", "database", "tools", "core"];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <div className="max-w-3xl">
            <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase block mb-4">
              Technical Arsenal
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 tracking-tight">
              Mastered <span className="text-gradient">Technologies</span>
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed font-body">
              A deep dive into the tools and frameworks I use to build robust, 
              scalable, and high-performance digital products.
            </p>
          </div>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <BentoGrid>
            {skillsData && Object.entries(skillsData)
              .sort(([keyA], [keyB]) => sortOrder.indexOf(keyA) - sortOrder.indexOf(keyB))
              .map(([category, skills], idx) => (
                <BentoGridItem
                  key={category}
                  title={displayNames[category] || category}
                  description={
                    <div className="flex flex-wrap gap-2 mt-4">
                      {skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-surface-hover border border-border text-foreground/50 group-hover/bento:text-foreground transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  }
                  icon={getIcon(category)}
                  className={cn(
                    idx % 3 === 0 ? "md:col-span-2" : "md:col-span-1"
                  )}
                  delay={idx * 0.05}
                />
              ))}
              <BentoGridItem
                title="Next on Radar"
                description={
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Docker", "PostgreSQL", "Redis", "AI SDKs"].map((item) => (
                      <span key={item} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                        {item}
                      </span>
                    ))}
                  </div>
                }
                icon={<Sparkles className="text-primary animate-pulse" size={24} />}
                className="md:col-span-1"
                delay={0.3}
              />
          </BentoGrid>
        )}
      </div>
    </section>
  );
}
