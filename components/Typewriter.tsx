"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const words = [
  "Full-Stack Developer",
  "Computer Science Student",
  "UI/UX Enthusiast",
  "Problem Solver"
];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index % words.length];
    const updateSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => prev + 1); // Next word
      } else {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <span className="inline-block min-w-[200px] text-primary">
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block w-1 h-5 bg-primary align-middle"
      />
    </span>
  );
}