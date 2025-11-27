"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    // Configuration
    const numberOfParticles = 80; // Calculate based on screen size normally, but 80 is safe
    const connectionDistance = 120;
    const mouseRadius = 150;

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Mouse Interaction
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // PARTICLE CLASS (The Physics)
    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        // Random velocity between -0.5 and 0.5
        this.directionX = Math.random() * 1 - 0.5;
        this.directionY = Math.random() * 1 - 0.5;
        this.size = Math.random() * 2 + 1;
      }

      // Update position
      update() {
        // Wall collision detection (Bounce)
        if (this.x > (canvas?.width || 0) || this.x < 0) this.directionX = -this.directionX;
        if (this.y > (canvas?.height || 0) || this.y < 0) this.directionY = -this.directionY;

        // Mouse interaction (Repel)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
            // Move away from mouse
            if (mouse.x < this.x && this.x < (canvas?.width || 0) - 10) this.x += 2;
            if (mouse.x > this.x && this.x > 10) this.x -= 2;
            if (mouse.y < this.y && this.y < (canvas?.height || 0) - 10) this.y += 2;
            if (mouse.y > this.y && this.y > 10) this.y -= 2;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }

      // Draw particle
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        // Color based on theme (handled roughly here, optimized for performance)
        ctx.fillStyle = theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
        ctx.fill();
      }
    }

    // Initialize
    const init = () => {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    // Animation Loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Draw lines between particles (The Network Effect)
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
            ctx.strokeStyle = theme === "dark" 
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
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
}