import React, { useState, useEffect, useRef } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';

export interface MagicalStorybook3DProps {
  reducedMotion: boolean;
  onNavigate: (path: RoutePath) => void;
}

type BookStage = 'approaching' | 'opening-cover' | 'open-reading' | 'closed-cover';

interface TurnAnimationState {
  active: boolean;
  direction: 'next' | 'prev';
  fromIdx: number;
  toIdx: number;
  progress: number;
}

const INTRO_SEEN_KEY = 'khushie_v3_storybook_intro_seen';

function hasSeenBookIntro(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === 'true';
  } catch (_e) {
    return false;
  }
}

function markBookIntroSeen(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
  } catch (_e) {}
}

export function MagicalStorybook3D({ reducedMotion, onNavigate }: MagicalStorybook3DProps) {
  const chapters = SITE_CONTENT.storyChapters;

  // All 5 spreads: the 4 approved chapters + Our Journey 19-Moments Finale Spread
  const spreads = [
    ...chapters.map((ch) => ({
      id: ch.id,
      number: ch.number,
      approvedTitle: ch.approvedTitle,
      shortTitle: ch.shortTitle,
      emoji: ch.emoji,
      eraLabel: ch.eraLabel,
      dateSubtitle: ch.dateSubtitle,
      paragraphs: ch.paragraphs,
      imageWebp: ch.imageWebp,
      imageJpg: ch.imageJpg,
      imageAlt: ch.imageAlt
    })),
    {
      id: 'spread-our-journey',
      number: '05',
      approvedTitle: '05 — Our Journey · 19 Moments ✨',
      shortTitle: 'Our Journey',
      emoji: '💜',
      eraLabel: 'Complete Keepsake Collage',
      dateSubtitle: '08 October Edition · Khushi & Sahil',
      paragraphs: [
        '19 moments, kept together as one complete collage — tracing every smile from childhood days to the chapters still waiting ahead.',
        'Every photograph in this book is a reminder that our story is built from real laughter, shared resilience, and quiet warmth. ❤️'
      ],
      imageWebp: './public/images/memories/our-journey.webp',
      imageJpg: './public/images/memories/our-journey.jpg',
      imageAlt: 'Our Journey — 19 Moments complete storybook collage'
    }
  ];

  const [bookStage, setBookStage] = useState<BookStage>(() =>
    reducedMotion || hasSeenBookIntro() ? 'open-reading' : 'approaching'
  );
  const [activeSpreadIdx, setActiveSpreadIdx] = useState<number>(0);
  const [turnState, setTurnState] = useState<TurnAnimationState>({
    active: false,
    direction: 'next',
    fromIdx: 0,
    toIdx: 0,
    progress: 0
  });
  const [cameraPitch, setCameraPitch] = useState<number>(9);
  const [cameraYaw, setCameraYaw] = useState<number>(-4);
  const [cameraZoom, setCameraZoom] = useState<number>(1);
  const [imgFallbacks, setImgFallbacks] = useState<Record<string, boolean>>({});

  const sparkleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageCurlCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const turnRafRef = useRef<number>(0);

  const currentSpread = spreads[activeSpreadIdx] || spreads[0];

  // 1. Cinematic Opening Sequence (Dark environment -> Camera approaches -> Cover opens -> Spread 1 visible)
  useEffect(() => {
    if (reducedMotion) {
      setBookStage('open-reading');
      return;
    }
    if (bookStage === 'approaching') {
      const t1 = window.setTimeout(() => {
        setBookStage('opening-cover');
      }, 850);
      return () => window.clearTimeout(t1);
    }
    if (bookStage === 'opening-cover') {
      const t2 = window.setTimeout(() => {
        markBookIntroSeen();
        setBookStage('open-reading');
      }, 950);
      return () => window.clearTimeout(t2);
    }
  }, [bookStage, reducedMotion]);

  // 2. Scroll-Driven Book Camera Controller (Phase 3E)
  useEffect(() => {
    if (reducedMotion) {
      setCameraPitch(4);
      setCameraYaw(0);
      setCameraZoom(1);
      return;
    }
    const handleScroll = () => {
      const sy = window.scrollY || 0;
      const ratio = Math.min(1, Math.max(0, sy / 420));
      setCameraPitch(Number((11 - ratio * 7).toFixed(2)));
      setCameraYaw(Number((-4 + ratio * 4).toFixed(2)));
      setCameraZoom(Number((0.97 + ratio * 0.03).toFixed(3)));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  // 3. Ambient Lavender & Violet Magical Sparkles Canvas around the 3D Book
  useEffect(() => {
    const canvas = sparkleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const width = (canvas.width = 960);
    const height = (canvas.height = 540);

    const sparkles = Array.from({ length: reducedMotion ? 14 : 36 }, (_, i) => ({
      x: ((i * 97) % 100) * (width / 100),
      y: ((i * 61) % 100) * (height / 100),
      r: 1.1 + (i % 3) * 0.9,
      vy: -(0.22 + (i % 4) * 0.08),
      vx: (i % 2 === 0 ? 1 : -1) * 0.12,
      phase: i * 0.7,
      color: i % 3 === 0 ? '#E9D5FF' : i % 2 === 0 ? '#C4B5FD' : '#A78BFA'
    }));

    let tick = 0;
    const renderSparkles = () => {
      tick += 0.035;
      ctx.clearRect(0, 0, width, height);

      // Lavender volumetric backlight behind the floating book
      const grad = ctx.createRadialGradient(width * 0.5, height * 0.52, 20, width * 0.5, height * 0.52, 420);
      grad.addColorStop(0, 'rgba(196, 181, 253, 0.22)');
      grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.09)');
      grad.addColorStop(1, 'rgba(5, 7, 20, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const sp of sparkles) {
        const pulse = reducedMotion ? 0.55 : 0.35 + 0.55 * Math.abs(Math.sin(tick + sp.phase));
        ctx.save();
        ctx.globalAlpha = pulse;
        ctx.fillStyle = sp.color;
        ctx.shadowColor = '#C4B5FD';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (!reducedMotion) {
          sp.y += sp.vy;
          sp.x += sp.vx;
          if (sp.y < 10) sp.y = height - 10;
          if (sp.x < 10) sp.x = width - 10;
          if (sp.x > width - 10) sp.x = 10;
        }
      }

      if (!reducedMotion && !document.hidden) {
        rafId = window.requestAnimationFrame(renderSparkles);
      }
    };

    renderSparkles();
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  // 4. Procedural Cylindrical Page-Curl Deformation Renderer (Phase 3C)
  useEffect(() => {
    const canvas = pageCurlCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!turnState.active) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const w = (canvas.width = 860);
    const h = (canvas.height = 500);
    const spineX = w * 0.5;
    const pageW = w * 0.46;
    const topY = 24;
    const pageH = h - 48;

    const t = turnState.progress; // 0 -> 1
    const isNext = turnState.direction === 'next';

    ctx.clearRect(0, 0, w, h);

    // Draw cast shadow on the underlying spread
    const angle = isNext ? t * Math.PI : (1 - t) * Math.PI;
    const curlTipX = spineX + Math.cos(angle) * pageW;
    const curlArchLift = Math.sin(angle) * 34;

    ctx.save();
    const shadowGrad = ctx.createLinearGradient(spineX, 0, curlTipX, 0);
    shadowGrad.addColorStop(0, 'rgba(8, 6, 22, 0.52)');
    shadowGrad.addColorStop(0.7, 'rgba(8, 6, 22, 0.22)');
    shadowGrad.addColorStop(1, 'rgba(8, 6, 22, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(
      Math.min(spineX, curlTipX),
      topY + 6,
      Math.abs(curlTipX - spineX) + 18,
      pageH
    );
    ctx.restore();

    // Render 28 vertical cylindrical-deformed mesh strips for realistic curved paper bending
    const strips = 28;
    for (let i = 0; i < strips; i++) {
      const s0 = i / strips;
      const s1 = (i + 1) / strips;

      // Cylindrical bend profile: outer edge curls higher and foreshortens around the cylinder
      const bend0 = Math.sin(s0 * Math.PI) * curlArchLift;
      const bend1 = Math.sin(s1 * Math.PI) * curlArchLift;

      const x0 = spineX + (curlTipX - spineX) * s0;
      const x1 = spineX + (curlTipX - spineX) * s1;

      // Paper illumination with specular crease highlight near the curl cylinder peak
      const creaseFactor = Math.exp(-Math.pow((s0 - 0.62) * 3.8, 2));
      const baseLuma = t < 0.5 ? 244 : 238;
      const r = Math.min(255, Math.round(baseLuma + creaseFactor * 12 - (1 - s0) * 18));
      const g = Math.min(255, Math.round(baseLuma - 4 + creaseFactor * 10 - (1 - s0) * 20));
      const b = Math.min(255, Math.round(baseLuma + 4 + creaseFactor * 14 - (1 - s0) * 14));

      ctx.save();
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.beginPath();
      ctx.moveTo(x0, topY - bend0);
      ctx.lineTo(x1, topY - bend1);
      ctx.lineTo(x1, topY + pageH - bend1 * 0.65);
      ctx.lineTo(x0, topY + pageH - bend0 * 0.65);
      ctx.closePath();
      ctx.fill();

      // Subtle faux text lines on the curling page surface
      if (i % 3 === 0 && s0 > 0.15 && s0 < 0.88) {
        ctx.strokeStyle = 'rgba(90, 75, 125, 0.22)';
        ctx.lineWidth = 1.2;
        for (let lineIdx = 1; lineIdx <= 6; lineIdx++) {
          const ly = topY + (pageH / 8) * lineIdx - bend0 * 0.8;
          ctx.beginPath();
          ctx.moveTo(x0, ly);
          ctx.lineTo(x1, ly);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // Lavender edge glow on the curling page lip
    ctx.save();
    ctx.strokeStyle = 'rgba(196, 181, 253, 0.85)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(curlTipX, topY - Math.sin(Math.PI * 0.95) * curlArchLift);
    ctx.lineTo(curlTipX, topY + pageH);
    ctx.stroke();
    ctx.restore();
  }, [turnState]);

  useEffect(() => {
    return () => {
      if (turnRafRef.current) window.cancelAnimationFrame(turnRafRef.current);
    };
  }, []);

  const triggerPageTurn = (targetIdx: number) => {
    const clamped = Math.max(0, Math.min(spreads.length - 1, targetIdx));
    if (clamped === activeSpreadIdx || turnState.active) return;

    if (bookStage !== 'open-reading') {
      setBookStage('open-reading');
    }

    if (reducedMotion) {
      setActiveSpreadIdx(clamped);
      return;
    }

    const direction: 'next' | 'prev' = clamped > activeSpreadIdx ? 'next' : 'prev';
    const fromIdx = activeSpreadIdx;
    const durationMs = 560;
    const startTime = performance.now();

    const step = (now: number) => {
      const raw = Math.min(1, (now - startTime) / durationMs);
      // Smooth cubic ease-in-out
      const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      if (raw >= 0.5) {
        setActiveSpreadIdx(clamped);
      }

      if (raw < 1) {
        setTurnState({
          active: true,
          direction,
          fromIdx,
          toIdx: clamped,
          progress: eased
        });
        turnRafRef.current = window.requestAnimationFrame(step);
      } else {
        setTurnState({
          active: false,
          direction,
          fromIdx: clamped,
          toIdx: clamped,
          progress: 0
        });
        setActiveSpreadIdx(clamped);
      }
    };

    turnRafRef.current = window.requestAnimationFrame(step);
  };

  // 5. Desktop Keyboard Navigation (ArrowRight / ArrowLeft)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        triggerPageTurn(activeSpreadIdx + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        triggerPageTurn(activeSpreadIdx - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSpreadIdx, turnState.active, bookStage, reducedMotion]);

  // 6. Touch Swipe Gesture Support (Prevents accidental vertical scroll turns)
  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches && e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartRef.current || !e.changedTouches || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) {
        triggerPageTurn(activeSpreadIdx + 1);
      } else {
        triggerPageTurn(activeSpreadIdx - 1);
      }
    }
  };

  const skipOrOpenCover = () => {
    markBookIntroSeen();
    setBookStage('open-reading');
  };

  const replayBookIntro = () => {
    setActiveSpreadIdx(0);
    setBookStage('approaching');
  };

  return (
    <section
      className={`magical-storybook-3d-section stage-${bookStage}`}
      aria-label="Magical 3D Hardcover Storybook"
    >
      {/* Top Storybook Control & Chapter Jump Bar */}
      <div className="storybook-3d-toolbar liquid-glass">
        <div className="storybook-chapter-pills" role="tablist" aria-label="Storybook Spreads">
          {spreads.map((sp, idx) => {
            const isCurrent = bookStage === 'open-reading' && idx === activeSpreadIdx;
            return (
              <button
                key={sp.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                className={`storybook-pill-btn ${isCurrent ? 'active' : ''}`}
                onClick={() => {
                  if (bookStage !== 'open-reading') {
                    setBookStage('open-reading');
                    setActiveSpreadIdx(idx);
                  } else {
                    triggerPageTurn(idx);
                  }
                }}
              >
                <span className="pill-num">{sp.number}</span>
                <span className="pill-label">{sp.shortTitle}</span>
              </button>
            );
          })}
        </div>

        <div className="storybook-utility-btns">
          {bookStage !== 'open-reading' ? (
            <button
              type="button"
              className="btn-primary btn-sm"
              onClick={skipOrOpenCover}
            >
              Open Book Cover / Skip Intro →
            </button>
          ) : (
            <button
              type="button"
              className="btn-ghost btn-sm"
              onClick={() => setBookStage('closed-cover')}
            >
              📕 Close Hardcover
            </button>
          )}
          <button
            type="button"
            className="btn-ghost btn-sm"
            onClick={replayBookIntro}
          >
            ✨ Replay 3D Opening
          </button>
        </div>
      </div>

      {/* Main 3D Atmospheric Book Environment */}
      <div
        className="storybook-3d-environment"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={sparkleCanvasRef}
          className="storybook-sparkle-canvas"
          aria-hidden="true"
        />

        {/* Physical 3D Book Object */}
        <div
          className={`physical-3d-book book-state-${bookStage} ${turnState.active ? 'is-turning' : ''}`}
          style={{
            '--book-pitch': `${cameraPitch}deg`,
            '--book-yaw': `${cameraYaw}deg`,
            '--book-zoom': cameraZoom
          } as any}
        >
          {/* Floating Ground Shadow & Lavender Aura */}
          <div className="book-3d-ground-shadow" aria-hidden="true" />
          <div className="book-3d-lavender-halo" aria-hidden="true" />

          {/* 3D Spine & Hardcover Shell */}
          <div className="book-3d-spine" aria-hidden="true">
            <span className="spine-rib" />
            <span className="spine-title">KHUSHI • 08 OCTOBER</span>
            <span className="spine-rib" />
          </div>

          {/* Visible 3D Layered Page Thickness Edges */}
          <div className="book-3d-page-edges edge-left" aria-hidden="true" />
          <div className="book-3d-page-edges edge-right" aria-hidden="true" />
          <div className="book-3d-page-edges edge-bottom" aria-hidden="true" />

          {/* Closed / Opening 3D Hardcover Front Board */}
          {bookStage !== 'open-reading' ? (
            <div className="book-3d-front-cover">
              <div className="cover-foil-frame">
                <span className="cover-eyebrow">08 OCTOBER • MAGICAL 3D EDITION</span>
                <h2 className="cover-main-title">The Story of Us</h2>
                <p className="cover-subtitle">Crafted for My Birthday Princess, Khushi 👑</p>
                <div className="cover-crest" aria-hidden="true">✦ K & S ✦</div>
                <button
                  type="button"
                  className="btn-primary cover-open-btn"
                  onClick={skipOrOpenCover}
                >
                  📖 Open Hardcover Book
                </button>
              </div>
            </div>
          ) : null}

          {/* Open 2-Page Physical Spread */}
          <div
            className={`book-3d-open-spread ${bookStage === 'open-reading' ? 'visible' : 'hidden-spread'}`}
            aria-live="polite"
          >
            {/* Left Page: Verified Chapter Photograph & Caption Plate */}
            <div className="book-page book-page-left">
              <div className="page-inner-frame">
                <div className="page-running-head">
                  <span>KHUSHIE V3 STORYBOOK</span>
                  <span>CHAPTER {currentSpread.number}</span>
                </div>

                <div className="page-photo-plate">
                  {!imgFallbacks[currentSpread.id] ? (
                    <picture>
                      <source srcSet={currentSpread.imageWebp} type="image/webp" />
                      <img
                        src={currentSpread.imageJpg}
                        alt={currentSpread.imageAlt}
                        className="book-spread-photo"
                        onError={() =>
                          setImgFallbacks((prev) => ({ ...prev, [currentSpread.id]: true }))
                        }
                      />
                    </picture>
                  ) : (
                    <div className="media-fallback-box">
                      <span>{currentSpread.emoji} {currentSpread.approvedTitle}</span>
                    </div>
                  )}
                  <div className="photo-lavender-vignette" aria-hidden="true" />
                </div>

                <div className="page-photo-caption">
                  <span className="caption-era-tag">
                    {currentSpread.number} · {currentSpread.eraLabel} {currentSpread.emoji}
                  </span>
                  <p className="caption-date-sub">{currentSpread.dateSubtitle}</p>
                </div>

                <div className="page-folio-footer">
                  <span>Page {activeSpreadIdx * 2 + 1}</span>
                </div>
              </div>
            </div>

            {/* Center Bookbinding Gutter Crease */}
            <div className="book-center-gutter" aria-hidden="true" />

            {/* Right Page: Approved Chapter Title & Sahil's Verbatim Story Text */}
            <div className="book-page book-page-right">
              <div className="page-inner-frame">
                <div className="page-running-head">
                  <span>{currentSpread.eraLabel.toUpperCase()}</span>
                  <span>08 OCTOBER</span>
                </div>

                <header className="page-story-header">
                  <span className="page-chapter-badge">
                    CHAPTER {currentSpread.number} OF 0{spreads.length}
                  </span>
                  <h2 className="page-chapter-title">{currentSpread.approvedTitle}</h2>
                </header>

                <div className="page-story-prose">
                  {currentSpread.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="book-prose-paragraph">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="page-folio-footer">
                  <span>Always yours, Sahil</span>
                  <span>Page {activeSpreadIdx * 2 + 2}</span>
                </div>
              </div>
            </div>

            {/* Procedural Cylindrical Page-Curl Deformation Canvas Overlay */}
            <canvas
              ref={pageCurlCanvasRef}
              className={`page-curl-overlay-canvas ${turnState.active ? 'active' : ''}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Prominent Bottom Page-Turn & Navigation Bar */}
      <div className="storybook-bottom-controls liquid-glass">
        <button
          type="button"
          className="btn-secondary book-turn-btn prev"
          disabled={activeSpreadIdx === 0 || turnState.active}
          onClick={() => triggerPageTurn(activeSpreadIdx - 1)}
          aria-label="Turn to previous page"
        >
          ← Previous Page
        </button>

        <div className="storybook-progress-indicator">
          <span className="spread-counter-text">
            Spread <strong>0{activeSpreadIdx + 1}</strong> / 0{spreads.length} — {currentSpread.approvedTitle}
          </span>
          <div className="spread-progress-track" aria-hidden="true">
            <div
              className="spread-progress-fill"
              style={{ width: `${((activeSpreadIdx + 1) / spreads.length) * 100}%` }}
            />
          </div>
        </div>

        {activeSpreadIdx < spreads.length - 1 ? (
          <button
            type="button"
            className="btn-primary book-turn-btn next"
            disabled={turnState.active}
            onClick={() => triggerPageTurn(activeSpreadIdx + 1)}
            aria-label="Turn to next page"
          >
            Turn Next Page →
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary book-turn-btn next"
            onClick={() => onNavigate('/memories')}
          >
            Explore 3D Memory World 🌌 →
          </button>
        )}
      </div>
    </section>
  );
}
