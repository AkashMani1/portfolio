"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Calculate rotation: Limit to +/- 10 degrees
    setRotation({ x: yPct * -20, y: xPct * 20 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 }); // Reset on leave
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
      {children}
    </motion.div>
  );
}