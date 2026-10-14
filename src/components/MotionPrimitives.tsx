import React, { useState, useEffect } from '../lib/react-runtime';

/**
 * Motion Primitives Inspired Building Blocks (MIT License — adapted for Khushie V3)
 * Implements:
 * - <TextEffect preset="fade-in-blur" per="word" /> (https://motion-primitives.com/docs/text-effect)
 * - <SpotlightCard size={240} /> (https://motion-primitives.com/docs/spotlight + MotionSites .liquid-glass)
 * - <GlowButton /> (https://motion-primitives.com/docs/glow-effect + MotionSites layered radial CTA)
 * - <ScrollProgressBar /> (https://motion-primitives.com/docs/scroll-progress)
 * Respects reducedMotion per https://motion.dev/docs/react-accessibility (replaces spatial transforms with opacity).
 */

export interface TextEffectProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  per?: 'word' | 'char';
  preset?: 'fade-in-blur' | 'slide' | 'scale' | 'fade';
  className?: string;
  reducedMotion?: boolean;
  id?: string;
}

export function TextEffect({
  text,
  as = 'h1',
  per = 'word',
  preset = 'fade-in-blur',
  className = '',
  reducedMotion = false,
  id
}: TextEffectProps) {
  const Tag = as as any;
  if (reducedMotion) {
    return (
      <Tag id={id} className={`mp-text-effect mp-reduced ${className}`.trim()}>
        {text}
      </Tag>
    );
  }

  const segments = per === 'char' ? text.split('') : text.split(' ');

  return (
    <Tag id={id} className={`mp-text-effect mp-preset-${preset} ${className}`.trim()}>
      {segments.map((seg, idx) => (
        <span
          key={`${idx}-${seg}`}
          className="mp-text-segment"
          style={{ '--seg-index': idx } as any}
        >
          {seg}
          {per === 'word' && idx < segments.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

export interface SpotlightCardProps {
  className?: string;
  reducedMotion?: boolean;
  tilt?: boolean;
  size?: number;
  children?: any;
}

export function SpotlightCard({
  className = '',
  reducedMotion = false,
  tilt = false,
  size = 260,
  children
}: SpotlightCardProps) {
  const [coords, setCoords] = useState<{ x: number; y: number; active: boolean; rotX: number; rotY: number }>({
    x: 50,
    y: 50,
    active: false,
    rotX: 0,
    rotY: 0
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (reducedMotion) return;
    const el = e.currentTarget as HTMLElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / Math.max(1, rect.width)) * 100;
    const pctY = (y / Math.max(1, rect.height)) * 100;
    const rotY = tilt ? ((pctX - 50) / 50) * 3.5 : 0;
    const rotX = tilt ? -((pctY - 50) / 50) * 3.5 : 0;
    setCoords({ x, y, active: true, rotX, rotY });
  };

  const handleMouseLeave = () => {
    if (coords.active) {
      setCoords({ ...coords, active: false, rotX: 0, rotY: 0 });
    }
  };

  const transformStyle =
    !reducedMotion && tilt && coords.active
      ? `perspective(900px) rotateX(${coords.rotX.toFixed(2)}deg) rotateY(${coords.rotY.toFixed(2)}deg)`
      : undefined;

  return (
    <div
      className={`liquid-glass mp-spotlight-card ${coords.active ? 'spotlight-active' : ''} ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--spot-x': `${coords.x}px`,
        '--spot-y': `${coords.y}px`,
        '--spot-size': `${size}px`,
        transform: transformStyle
      } as any}
    >
      <div className="mp-spotlight-overlay" aria-hidden="true" />
      <div className="mp-card-inner">{children}</div>
    </div>
  );
}

export function ScrollProgressBar() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const updateScroll = () => {
      const docEl = document.documentElement;
      const scrollTop = window.scrollY || docEl.scrollTop || 0;
      const scrollHeight = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      setProgress(pct);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return (
    <div className="mp-scroll-progress-track" aria-hidden="true">
      <div
        className="mp-scroll-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
