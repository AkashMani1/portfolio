"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Default Color: Nexus Indigo with low opacity
  const [glowColor, setGlowColor] = useState("rgba(79, 70, 229, 0.15)");

  // Physics for movement - More "Senior" feel (Responsive & Organic)
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Move the cursor
      mouseX.set(e.clientX - 200); 
      mouseY.set(e.clientY - 200);

      // 2. CHAMELEON LOGIC: Adopting site-wide Nexus interaction tokens
      const target = e.target as HTMLElement;
      const glowElement = target.closest("[data-glow]");

      if (glowElement) {
        const color = glowElement.getAttribute("data-glow");
        if (color) setGlowColor(color);
      } else {
        setGlowColor("rgba(79, 70, 229, 0.15)");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none z-0 hidden md:block"
      style={{ x, y }}
      animate={{ 
        backgroundColor: glowColor 
      }}
      transition={{ 
        backgroundColor: { duration: 0.4 } // Smooth color fade
      }}
    />
  );
}