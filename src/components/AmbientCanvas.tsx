import React, { useEffect, useRef } from '../lib/react-runtime';

interface AmbientCanvasProps {
  reducedMotion: boolean;
}

interface Star3D {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
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

    const palette = ['#F2D0A9', '#E88D9E', '#A78BFA', '#FAF6F8', '#FFD1DC'];
    const numStars = Math.min(85, Math.max(36, Math.floor(width / 18)));
    const stars: Star3D[] = Array.from({ length: numStars }, (_, i) => ({
      x: (((i * 173) % 200) - 100) * (width / 100),
      y: (((i * 113) % 200) - 100) * (height / 100),
      z: ((i * 47) % 900) + 100,
      color: palette[i % palette.length],
      size: 1.2 + (i % 3) * 0.75
    }));

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle 3D gravitational lens / nebula halo in center
      const cx = width * 0.5;
      const cy = height * 0.38;
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.48);
      grad.addColorStop(0, 'rgba(232, 141, 158, 0.08)');
      grad.addColorStop(0.45, 'rgba(167, 139, 250, 0.04)');
      grad.addColorStop(1, 'rgba(10, 6, 26, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const s of stars) {
        if (!reducedMotion) {
          s.z -= 1.8;
          if (s.z <= 20) {
            s.z = 950;
          }
        }
        const perspective = 420 / s.z;
        const sx = cx + s.x * perspective * 0.5;
        const sy = cy + s.y * perspective * 0.5;
        const r = Math.max(0.6, Math.min(3.8, s.size * perspective * 0.55));
        const alpha = Math.min(0.85, Math.max(0.12, (1000 - s.z) / 1000));

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
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
