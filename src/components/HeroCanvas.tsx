"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originalX: number;
  originalY: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const nodeCount = 100;
    const maxDistance = 150;
    const mouse = { x: -1000, y: -1000, radius: 200 };
    let scrollPercent = 0;

    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Create nodes
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);

    initCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Calculate dispersion based on scroll
      const dispersion = scrollPercent * 250;

      // Update and draw nodes
      nodes.forEach((node) => {
        // Natural movement
        node.x += node.vx;
        node.y += node.vy;

        // Apply scroll dispersion (push away from center)
        if (dispersion > 0) {
          const centerX = width / 2;
          const centerY = height / 2;
          const dx = node.x - centerX;
          const dy = node.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            node.x += (dx / dist) * scrollPercent * 2;
            node.y += (dy / dist) * scrollPercent * 2;
          }
        }

        // Boundary collision
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse repulsion physics
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          node.x -= Math.cos(angle) * force * 3;
          node.y -= Math.sin(angle) * force * 3;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Draw glowing particle
        const particleGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        particleGradient.addColorStop(0, "rgba(6, 182, 212, 1)"); // Cyan center
        particleGradient.addColorStop(0.3, "rgba(139, 92, 246, 0.6)"); // Violet middle
        particleGradient.addColorStop(1, "rgba(59, 130, 246, 0)"); // Blue transparent fade
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            // Connection line gradient
            const lineGradient = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            lineGradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`); // Blue
            lineGradient.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 1.2})`); // Violet
            lineGradient.addColorStop(1, `rgba(6, 182, 212, ${alpha})`); // Cyan

            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1]"
    />
  );
}
