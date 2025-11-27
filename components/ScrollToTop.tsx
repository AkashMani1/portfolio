"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Convert 0-1 progress to 0-100 path length for SVG
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white dark:bg-card shadow-lg border border-gray-200 dark:border-gray-800 group"
        >
          {/* Progress Ring SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-200 dark:text-gray-800" />
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-primary"
              style={{ pathLength }}
            />
          </svg>
          
          <ArrowUp size={20} className="relative z-10 text-gray-900 dark:text-white group-hover:text-primary transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}