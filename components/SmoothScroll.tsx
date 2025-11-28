"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with "Senior Dev" configuration
    const lenis = new Lenis({
      duration: 1.2, // The "weight" of the scroll. Higher = smoother/heavier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing function
      orientation: "vertical", 
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // The Animation Loop (Request Animation Frame)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // This component renders nothing visual
}