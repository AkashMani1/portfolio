"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  offset?: number;
  className?: string;
};

export default function Parallax({ children, offset = 50, className = "" }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const springY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  );
}
