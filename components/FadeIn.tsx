"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

const springConfig = { type: "spring", stiffness: 300, damping: 30 };

export default function FadeIn({ children, delay = 0, className = "", y = 20 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: delay,
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}