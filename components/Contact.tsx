"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../app/data/portfolio";
import { Github, Linkedin, Copy, Check, Send } from "lucide-react";
import FadeIn from "./FadeIn";
import confetti from "canvas-confetti"; // IMPORT CONFETTI

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // JAVASCRIPT: Confetti Trigger
  const handleSendMessage = () => {
    setIsSending(true);
    
    // Trigger confetti from both sides
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Reset button after 2 seconds
    setTimeout(() => setIsSending(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container-custom max-w-4xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
              Let's work together.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Currently open for <span className="text-primary font-medium">internships</span> and new opportunities. 
              Got a project in mind? Let's make it happen.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Contact Details</p>
                
                <button
                  onClick={handleCopyEmail}
                  className="group relative w-full text-left p-6 rounded-2xl bg-white dark:bg-card border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all shadow-sm hover:shadow-md overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Mail me at</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {portfolioData.personalInfo.email}
                      </p>
                    </div>
                    
                    <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-all">
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check size={20} />
                          </motion.div>
                        ) : (
                          <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Copy size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Socials</p>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: portfolioData.personalInfo.github },
                    { icon: Linkedin, href: portfolioData.personalInfo.linkedin }
                  ].map((Item, idx) => (
                    <a
                      key={idx}
                      href={Item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <Item.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.4}>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-3 px-2 text-lg focus:outline-none focus:border-primary transition-colors placeholder-gray-400 dark:placeholder-gray-600" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-3 px-2 text-lg focus:outline-none focus:border-primary transition-colors placeholder-gray-400 dark:placeholder-gray-600" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Message</label>
                <textarea rows={4} placeholder="Tell me about your project..." className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-3 px-2 text-lg focus:outline-none focus:border-primary transition-colors resize-none placeholder-gray-400 dark:placeholder-gray-600"></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSending}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary dark:hover:bg-primary hover:text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : "Send Message"} <Send size={18} />
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}