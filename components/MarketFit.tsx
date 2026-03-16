"use client";

import { BadgeCheck, Boxes, BrainCircuit, Rocket } from "lucide-react";
import FadeIn from "./FadeIn";
import { portfolioData } from "@/app/data/portfolio";

const icons = [Rocket, Boxes, BrainCircuit];

export default function MarketFit() {
  return (
    <section id="value" className="py-24 relative">
      <div className="container-custom">
        <FadeIn>
          <div className="max-w-3xl mb-12">
            <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase block mb-3">
              Market Fit
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What I bring to a modern full-stack team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              The strongest opportunities today favor developers who can ship across the stack,
              think in product terms, and grow into backend depth. That is the direction I am building toward.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {portfolioData.marketPriorities.map((item, index) => {
            const Icon = icons[index] || BadgeCheck;

            return (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="h-full rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-7 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
