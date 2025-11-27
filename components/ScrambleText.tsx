"use client";
import { useState, useEffect, useRef } from "react";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length;

    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      iteration += 1 / 3; // Speed of decoding
    }, 30);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className={`cursor-default inline-block ${className}`}
    >
      {displayText}
    </span>
  );
}