"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme(); // FIX: Use resolvedTheme instead of theme
  const [mounted, setMounted] = useState(false);

  // Wait for mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const numberOfParticles = 80;
    const connectionDistance = 120;
    const mouseRadius = 150;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.directionX = Math.random() * 1 - 0.5;
        this.directionY = Math.random() * 1 - 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        if (this.x > (canvas?.width || 0) || this.x < 0) this.directionX = -this.directionX;
        if (this.y > (canvas?.height || 0) || this.y < 0) this.directionY = -this.directionY;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
            if (mouse.x < this.x && this.x < (canvas?.width || 0) - 10) this.x += 2;
            if (mouse.x > this.x && this.x > 10) this.x -= 2;
            if (mouse.y < this.y && this.y < (canvas?.height || 0) - 10) this.y += 2;
            if (mouse.y > this.y && this.y > 10) this.y -= 2;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        
        // FIX: Check resolvedTheme to ensure visibility
        ctx.fillStyle = resolvedTheme === "dark" 
          ? "rgba(255,255,255,0.3)" // White particles for Dark Mode
          : "rgba(0,0,0,0.2)";      // Black particles for Light Mode
        ctx.fill();
      }
    }

    const init = () => {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const distance =
            (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);

          if (distance < (connectionDistance * connectionDistance)) {
            opacityValue = 1 - distance / 15000;
            if (!ctx) return;
            
            // FIX: Check resolvedTheme here too
            ctx.strokeStyle = resolvedTheme === "dark" 
                ? `rgba(255,255,255,${opacityValue})` 
                : `rgba(0,0,0,${opacityValue})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme, mounted]); // Re-run when theme resolves

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
}