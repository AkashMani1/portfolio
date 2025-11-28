"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Default Color: Your Primary Blue with low opacity
  const [glowColor, setGlowColor] = useState("rgba(59, 130, 246, 0.15)");

  // Physics for movement
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Move the cursor
      mouseX.set(e.clientX - 200); // Center the 400px circle
      mouseY.set(e.clientY - 200);

      // 2. CHAMELEON LOGIC: Check what we are hovering over
      const target = e.target as HTMLElement;
      
      // Look for any parent element that has the "data-glow" attribute
      const glowElement = target.closest("[data-glow]");

      if (glowElement) {
        // If found, adopt that color
        const color = glowElement.getAttribute("data-glow");
        if (color) setGlowColor(color);
      } else {
        // If not found, revert to default Blue
        setGlowColor("rgba(59, 130, 246, 0.15)");
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