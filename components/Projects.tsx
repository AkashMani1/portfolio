"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, PlayCircle, Loader2, Code2, Rocket, Layout } from "lucide-react";
import FadeIn from "./FadeIn";
import { db } from "../app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { portfolioData, ProjectItem } from "@/app/data/portfolio";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { cn } from "@/app/lib/utils";

const categories = ["All", "Web", "Mobile", "Others"];

type CloudProject = ProjectItem & { id?: string };

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<CloudProject[]>(portfolioData.projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.reduce<CloudProject[]>((acc, doc) => {
            const project = { id: doc.id, ...doc.data() } as any;
            acc.push(project);
            return acc;
          }, []);
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(portfolioData.projects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 tracking-tight">
                Featured <span className="text-gradient">Creations</span>
              </h2>
              <p className="text-foreground/60 text-lg leading-relaxed">
                A selection of digital products built with a focus on core architecture, 
                scalability, and production-ready implementation.
              </p>
            </div>
            
            <div className="flex gap-2 p-1 glass-card rounded-full self-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                    filter === cat
                      ? "bg-primary text-white shadow-lg"
                      : "text-foreground/40 hover:text-foreground/80 hover:bg-surface-hover"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <BentoGrid className="max-w-none md:auto-rows-[22rem]">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, idx) => (
                <BentoGridItem
                  key={project.id || project.title}
                  title={project.title}
                  description={project.desc}
                  header={
                    <div 
                      className="h-full min-h-[8rem] rounded-xl flex items-center justify-center relative overflow-hidden group-hover/bento:scale-[1.02] transition-transform duration-500"
                      style={{ 
                        background: `linear-gradient(135deg, ${project.spotlight || 'var(--color-primary)'}, var(--background))` 
                      }}
                    >
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/bento:opacity-100 transition-opacity" />
                      <div className="relative flex flex-col items-center">
                        <span className="text-[10px] uppercase font-black tracking-[0.2em] border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full mb-2 text-white">
                          {project.category}
                        </span>
                        <div className="flex gap-4 mt-2">
                          {project.links?.live && project.links.live !== "#" && (
                            <a href={project.links.live} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all hover:scale-110 text-white">
                              <Rocket size={18} />
                            </a>
                          )}
                          {project.links?.code && project.links.code !== "#" && (
                            <a href={project.links.code} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all hover:scale-110 text-white">
                              <Github size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  }
                  icon={<Code2 className="text-primary" size={20} />}
                  className={cn(
                    idx % 4 === 0 || idx % 4 === 3 ? "md:col-span-2" : "md:col-span-1",
                    "min-h-[22rem]"
                  )}
                  delay={idx * 0.05}
                />
              ))}
            </AnimatePresence>
          </BentoGrid>
        )}
      </div>
    </section>
  );
}
