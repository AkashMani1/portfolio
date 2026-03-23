"use client";

import { BadgeCheck, Boxes, BrainCircuit, Rocket } from "lucide-react";
import FadeIn from "./FadeIn";
import { portfolioData } from "@/app/data/portfolio";
import { cn } from "@/app/lib/utils";

const icons = [Rocket, Boxes, BrainCircuit];

export default function MarketFit() {
  return (
    <section id="value" className="py-24 relative overflow-hidden">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <div className="max-w-3xl">
            <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase block mb-4">
              Value Proposition
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 tracking-tight">
              Bridging the <span className="text-gradient">Production</span> Gap
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed font-body">
              I bring a production-first mindset to every line of code, ensuring that 
              applications are not just functional, but scalable and maintainable.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {portfolioData.marketPriorities.map((item, index) => {
            const Icon = icons[index] || BadgeCheck;

            return (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="glass-card glass-card-hover h-full p-10 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-foreground/50 leading-relaxed font-body italic">
                     &quot;{item.desc}&quot;
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
