"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeIn({ children, delay = 0, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start slightly below and invisible
      whileInView={{ opacity: 1, y: 0 }} // Animate to final position
      viewport={{ once: true, margin: "-50px" }} // Trigger when 50px of item is visible
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }} // Smooth easing
      className={className}
    >
      {children}
    </motion.div>
  );
}