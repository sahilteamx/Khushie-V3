import React, { useEffect, useRef } from '../lib/react-runtime';

interface AmbientCanvasProps {
  reducedMotion: boolean;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export function AmbientCanvas({ reducedMotion }: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const palette = ['#F2D0A9', '#E88D9E', '#A78BFA', '#FAF6F8'];
    const count = Math.min(28, Math.max(12, Math.floor(width / 55)));
    const particles: Particle[] = Array.from({ length: count }, (_, idx) => ({
      x: ((idx * 137.5) % 100) * (width / 100),
      y: ((idx * 73.1) % 100) * (height / 100),
      r: 1.2 + (idx % 3) * 0.9,
      vx: ((idx % 2 === 0 ? 1 : -1) * (0.12 + (idx % 4) * 0.04)),
      vy: -(0.15 + (idx % 3) * 0.06),
      alpha: 0.18 + (idx % 5) * 0.08,
      color: palette[idx % palette.length]
    }));

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
      }
      if (!reducedMotion && !document.hidden) {
        animId = window.requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (reducedMotion) drawFrame();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) window.cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-canvas"
      aria-hidden="true"
    />
  );
}
