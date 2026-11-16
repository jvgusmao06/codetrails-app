"use client";

import { useEffect, useRef } from "react";

// ponytail: zero-dependency lightweight confetti burst using HTML5 Canvas
export function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#10B981", "#38BDF8", "#F59E0B", "#34D399", "#A78BFA"];
    const pieces = Array.from({ length: 65 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 180,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 10,
      vy: -(Math.random() * 8 + 4),
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
    }));

    let rafId = 0;
    function frame() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.alpha -= 0.012;
        if (p.alpha > 0) {
          alive = true;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size * 0.7);
        }
      }
      if (alive) {
        rafId = requestAnimationFrame(frame);
      }
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
