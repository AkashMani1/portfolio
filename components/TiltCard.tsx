"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 1. TILT LOGIC (Physics)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    setRotation({ x: yPct * -15, y: xPct * 15 });

    // 2. SPOTLIGHT LOGIC (Lighting)
    setPosition({ x: mouseX, y: mouseY });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative transform-gpu perspective-1000 ${className}`}
    >
      {/* SPOTLIGHT OVERLAY */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />
      
      {/* SPOTLIGHT BORDER HIGHLIGHT */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 rounded-xl"
        style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`,
            maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
            maskComposite: `exclude`,
            WebkitMaskComposite: `xor`,
            padding: "1px", // The thickness of the glowing border
        }}
      />

      {children}
    </motion.div>
  );
}