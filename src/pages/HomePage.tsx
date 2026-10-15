import React, { useState, useEffect } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';
import { TextEffect, SpotlightCard } from '../components/MotionPrimitives';
import { MagicalStorybook3D } from '../components/MagicalStorybook3D';
import { AestheticPresetId, AESTHETIC_PRESETS } from '../lib/theme-prompts';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
  reducedMotion: boolean;
  aesthetic: AestheticPresetId;
  onChangeAesthetic: (next: AestheticPresetId) => void;
}

interface TimeDisplayState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeMetrics(mode: 'since' | 'until'): TimeDisplayState {
  const now = new Date();
  const bday2026 = new Date('2026-10-08T00:00:00+05:30');
  const nextBday = new Date('2027-10-08T00:00:00+05:30');

  const diff =
    mode === 'since'
      ? Math.max(0, now.getTime() - bday2026.getTime())
      : Math.max(0, nextBday.getTime() - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function HomePage({
  onNavigate,
  reducedMotion,
  aesthetic,
  onChangeAesthetic
}: HomePageProps) {
  const [clockMode, setClockMode] = useState<'since' | 'until'>('since');
  const [clock, setClock] = useState<TimeDisplayState>(() => computeTimeMetrics('since'));
  const [pinInput, setPinInput] = useState<string>('');
  const [pinUnlocked, setPinUnlocked] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');
  const [scrollDepth, setScrollDepth] = useState<number>(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(computeTimeMetrics(clockMode));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [clockMode]);

  // Coordinated Scroll-Driven 3D Camera Progress
  useEffect(() => {
    if (reducedMotion) {
      setScrollDepth(0);
      return;
    }
    const onScroll = () => {
      const sy = window.scrollY || 0;
      setScrollDepth(Math.min(1, Math.max(0, sy / 700)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  const handlePinSubmit = (e: Event) => {
    e.preventDefault();
    const cleaned = pinInput.trim();
    if (SITE_CONTENT.acceptedPins.includes(cleaned)) {
      setPinUnlocked(true);
      setPinError('');
    } else {
      setPinError('Incorrect secret PIN. Hint: Enter her 4-digit birthday date (DDMM).');
    }
  };

  const heroCameraTransform = reducedMotion
    ? undefined
    : `perspective(1200px) translate3d(0, ${(scrollDepth * -14).toFixed(1)}px, 0) rotateX(${(scrollDepth * 3.5).toFixed(2)}deg)`;

  return (
    <div className="page-container home-page editorial-redesign">
      {/* SCENE 1 — LUXURY EDITORIAL 3D HERO */}
      <section className="hero-section editorial-hero-stage" aria-labelledby="hero-main-heading">
        <div className="hero-lavender-spotlight" aria-hidden="true" />

        <div className="hero-grid">
          <div className="hero-copy-column">
            <div className="eyebrow-pill liquid-glass">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span>{SITE_CONTENT.birthdayDisplay.toUpperCase()} • {SITE_CONTENT.brandSubtitle.toUpperCase()}</span>
            </div>

            <TextEffect
              id="hero-main-heading"
              as="h1"
              per="word"
              preset="fade-in-blur"
              text={SITE_CONTENT.heroTitle}
              reducedMotion={reducedMotion}
              className="hero-heading gradient-display-title"
            />

            <div className="hero-personal-card liquid-glass">
              <p className="hero-nicknames-text">
                {SITE_CONTENT.heroNicknamesLine}
              </p>
              <p className="hero-teaser-sub">
                {SITE_CONTENT.heroTeaserLine}
              </p>
            </div>

            <div className="hero-cta-row">
              <button
                type="button"
                className="btn-primary btn-lg motionsites-glow-cta"
                onClick={() => onNavigate('/story')}
              >
                📖 Open Magical 3D Storybook
              </button>
              <button
                type="button"
                className="btn-secondary btn-lg liquid-glass"
                onClick={() => onNavigate('/surprise')}
              >
                {SITE_CONTENT.primaryCtaLabel}
              </button>
              <button
                type="button"
                className="btn-ghost btn-lg"
                onClick={() => onNavigate('/memories')}
              >
                🌌 3D Memory World
              </button>
            </div>
          </div>

          {/* Right Column: Floating 3D Celestial Astrolabe & Blooming Lavender Tree + Secret PIN Vault */}
          <div className="hero-visual-column" style={{ transform: heroCameraTransform }}>
            <SpotlightCard
              className={`celestial-emblem-card hero-3d-sculpture-card ${reducedMotion ? 'static' : 'animated'}`}
              reducedMotion={reducedMotion}
              tilt={true}
              size={340}
            >
              <div className="sculpture-top-meta">
                <span className="eyebrow-tag">3D CELESTIAL KEEPSAKE</span>
                <span className="sculpture-date-pill">08 OCT</span>
              </div>

              <div className="hero-3d-orbit-stage">
                <div className="orbit-ring ring-outer" aria-hidden="true" />
                <div className="orbit-ring ring-inner" aria-hidden="true" />

                <svg
                  viewBox="0 0 620 620"
                  className="hero-constellation-svg"
                  role="img"
                  aria-label="3D lavender starlight wish tree for Khushi"
                >
                  <defs>
                    <linearGradient id="treeTrunkGradient" x1="0" y1="1" x2="0.9" y2="0">
                      <stop offset="0" stopColor="#4C3B78" />
                      <stop offset="0.5" stopColor="#9378D6" />
                      <stop offset="1" stopColor="#E9D5FF" />
                    </linearGradient>
                    <radialGradient id="treeGlow" cx="50%" cy="46%" r="54%">
                      <stop offset="0" stopColor="#C4B5FD" stopOpacity="0.38" />
                      <stop offset="0.55" stopColor="#8B5CF6" stopOpacity="0.14" />
                      <stop offset="1" stopColor="#050714" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="310" cy="295" r="235" fill="url(#treeGlow)" />
                  <circle cx="310" cy="295" r="198" fill="none" stroke="#C4B5FD" strokeOpacity="0.28" strokeDasharray="5 7" />
                  <ellipse cx="310" cy="575" rx="170" ry="18" fill="rgba(196, 181, 253, 0.16)" />

                  <g stroke="url(#treeTrunkGradient)" strokeLinecap="round" fill="none">
                    <path d="M310 570 C301 525 298 475 306 428 C313 383 314 333 310 285" strokeWidth="13" />
                    <path d="M300 560 C282 511 275 476 278 440 C281 407 264 374 244 343" strokeWidth="7.5" />
                    <path d="M320 559 C340 511 347 477 343 439 C339 402 357 372 382 340" strokeWidth="7.5" />
                    <path d="M309 405 C273 375 236 346 194 315 C161 291 132 269 104 243" strokeWidth="5.5" />
                    <path d="M307 386 C328 350 355 320 389 292 C421 266 457 239 493 209" strokeWidth="5.5" />
                    <path d="M300 360 C276 330 250 303 214 283 C181 265 155 240 132 212" strokeWidth="4.5" />
                    <path d="M318 351 C344 318 374 296 414 277 C450 260 484 235 518 202" strokeWidth="4.5" />
                    <path d="M305 248 C289 202 261 169 225 149 C195 132 169 128 142 134" strokeWidth="4" />
                    <path d="M315 248 C331 202 359 169 395 149 C425 132 452 128 479 134" strokeWidth="4" />
                  </g>

                  {[
                    [114, 212, 15, '#C4B5FD'], [168, 176, 17, '#E9D5FF'], [226, 237, 14, '#F2D0A9'],
                    [286, 166, 18, '#FAF6F8'], [382, 148, 16, '#C4B5FD'], [424, 194, 17, '#E9D5FF'],
                    [485, 165, 15, '#A78BFA'], [523, 202, 13, '#C4B5FD'], [318, 155, 20, '#E9D5FF'],
                    [171, 135, 14, '#FAF6F8'], [451, 135, 14, '#F2D0A9'], [250, 195, 15, '#A78BFA'],
                    [365, 210, 15, '#E9D5FF']
                  ].map(([cx, cy, rad, col], idx) => (
                    <g key={`blossom-${idx}`} transform={`translate(${cx}, ${cy})`}>
                      <circle r={Number(rad) * 1.4} fill={String(col)} opacity="0.28" />
                      <circle r={Number(rad) * 0.78} fill={String(col)} />
                      <circle r={Number(rad) * 0.32} fill="#FFFFFF" />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Hidden-Password Private Birthday Vault */}
              <div className="pin-keepsake-box">
                <div className="pin-box-header">
                  <span className="pin-box-badge">🔒 PRIVATE BIRTHDAY VAULT</span>
                  <span className="pin-dots-preview" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <i key={i} className={`secret-dot ${pinInput.length > i || pinUnlocked ? 'filled' : ''}`} />
                    ))}
                  </span>
                </div>

                {!pinUnlocked ? (
                  <form className="pin-form" onSubmit={handlePinSubmit}>
                    <label htmlFor="home-pin-input" className="sr-only">
                      Enter 4-digit secret Birthday PIN
                    </label>
                    <input
                      id="home-pin-input"
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      autoComplete="off"
                      placeholder="••••"
                      value={pinInput}
                      onChange={(e: Event) => setPinInput((e.target as HTMLInputElement).value)}
                      className="pin-input masked-pin-input"
                    />
                    <button type="submit" className="btn-primary btn-sm">
                      Unlock
                    </button>
                  </form>
                ) : (
                  <div className="pin-secret-revealed" role="status">
                    <p>
                      ✨ <strong>Keepsake Note Unlocked:</strong> “Kisi ki duniya mein aap bahot special hain… aur woh koi aur nahi, main hoon. 🫣❤️”
                    </p>
                    <button
                      type="button"
                      className="btn-secondary btn-sm"
                      onClick={() => onNavigate('/surprise')}
                    >
                      Enter Secret Surprise Hub →
                    </button>
                  </div>
                )}
                {pinError ? <p className="pin-error-text" role="alert">{pinError}</p> : null}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* SCENE 2 — INTERACTIVE MAGICAL 3D STORYBOOK EXPERIENCE */}
      <section className="home-storybook-showcase" aria-labelledby="home-storybook-heading">
        <div className="section-header-block">
          <span className="eyebrow-tag">INTERACTIVE 3D HARDCOVER BOOK • FOUR APPROVED CHAPTERS</span>
          <h2 id="home-storybook-heading" className="section-title">
            The Magical 3D Storybook of Us
          </h2>
          <p className="section-subtitle">
            Turn the physical 3D pages below to read each chapter and view our photographs—or open the dedicated Storybook page for the full reading view.
          </p>
        </div>

        <MagicalStorybook3D reducedMotion={reducedMotion} onNavigate={onNavigate} />
      </section>

      {/* SCENE 3 — SCROLL-DRIVEN FLOATING 3D MEMORY FRAMES & 08 OCTOBER CLOCK */}
      <section className="scroll-3d-memories-section" aria-labelledby="floating-memories-heading">
        <div className="scroll-3d-split-grid">
          <div className="floating-frames-column">
            <span className="eyebrow-tag">FLOATING 3D KEEPSAKE FRAMES</span>
            <h2 id="floating-memories-heading" className="section-title">
              Moments Suspended in Starlight
            </h2>
            <p className="section-subtitle">
              Tap any floating 3D photograph to step inside the 360° 3D Orbiting Photo Galaxy and Polaroid Wall.
            </p>

            <div className="floating-3d-photos-grid">
              {SITE_CONTENT.memories.slice(0, 4).map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  className="floating-3d-photo-card liquid-glass"
                  style={{ '--float-idx': idx } as any}
                  onClick={() => onNavigate('/memories')}
                  aria-label={`View ${m.title} in 3D Memory World`}
                >
                  <picture>
                    <source srcSet={m.imageWebp} type="image/webp" />
                    <img src={m.imageJpg} alt={m.altText} loading="lazy" />
                  </picture>
                  <div className="floating-photo-meta">
                    <strong>{m.polaroidTag}</strong>
                    <span>{m.caption}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="celebration-clock-column">
            <SpotlightCard className="countdown-panel luxury-clock-card" reducedMotion={reducedMotion}>
              <div className="countdown-header-flex">
                <span className="countdown-label">
                  {clockMode === 'since'
                    ? '08 OCTOBER CELEBRATED • TIME SINCE YOUR DAY'
                    : 'COUNTDOWN TO NEXT 08 OCTOBER'}
                </span>
                <button
                  type="button"
                  className="clock-mode-toggle"
                  onClick={() => {
                    const next = clockMode === 'since' ? 'until' : 'since';
                    setClockMode(next);
                    setClock(computeTimeMetrics(next));
                  }}
                >
                  {clockMode === 'since' ? 'Next 08 Oct ⏳' : 'Since 08 Oct 🎉'}
                </button>
              </div>

              <div className="countdown-grid">
                <div className="countdown-cell">
                  <span className="countdown-num">{String(clock.days).padStart(2, '0')}</span>
                  <span className="countdown-unit">Days</span>
                </div>
                <div className="countdown-cell">
                  <span className="countdown-num">{String(clock.hours).padStart(2, '0')}</span>
                  <span className="countdown-unit">Hours</span>
                </div>
                <div className="countdown-cell">
                  <span className="countdown-num">{String(clock.minutes).padStart(2, '0')}</span>
                  <span className="countdown-unit">Minutes</span>
                </div>
                <div className="countdown-cell">
                  <span className="countdown-num">{String(clock.seconds).padStart(2, '0')}</span>
                  <span className="countdown-unit">Seconds</span>
                </div>
              </div>
              <p className="countdown-Status-note">
                08 October ka din nikal gaya, par aapka celebration aur pyar har din naya hai! ❤️
              </p>
            </SpotlightCard>

            <blockquote className="sahil-quote-banner liquid-glass">
              <p className="sahil-blockquote">{SITE_CONTENT.heroQuote}</p>
              <cite className="sahil-quote-author">{SITE_CONTENT.heroQuoteAuthor}</cite>
            </blockquote>

            <div className="designprompts-showcase-bar liquid-glass">
              <div className="dp-bar-header">
                <span className="eyebrow-tag">THEME LIGHTING PRESET</span>
                <div className="dp-preset-buttons" role="group" aria-label="Switch Theme Lighting">
                  {AESTHETIC_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`dp-preset-btn ${aesthetic === p.id ? 'active' : ''}`}
                      aria-pressed={aesthetic === p.id}
                      onClick={() => onChangeAesthetic(p.id)}
                    >
                      <span>{p.shortLabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 4 — CURATED DESTINATIONS DIRECTORY */}
      <section className="destinations-section" aria-labelledby="destinations-heading">
        <div className="section-header-block">
          <span className="eyebrow-tag">COMPLETE EXPERIENCE DIRECTORY</span>
          <h2 id="destinations-heading" className="section-title">
            Explore Every Chapter & Interactive Keepsake
          </h2>
        </div>

        <div className="destination-cards-grid">
          {SITE_CONTENT.navItems
            .filter((item) => item.path !== '/')
            .map((item, idx) => (
              <SpotlightCard
                key={item.path}
                className="destination-card"
                reducedMotion={reducedMotion}
                tilt={true}
              >
                <div className="destination-card-top">
                  <span className="destination-index">0{idx + 1}</span>
                  {item.badge ? <span className="destination-badge">{item.badge}</span> : null}
                </div>
                <h3 className="destination-title">{item.label}</h3>
                <p className="destination-desc">{item.description}</p>
                <button
                  type="button"
                  className="btn-card-link"
                  onClick={() => onNavigate(item.path)}
                >
                  Open {item.shortLabel} →
                </button>
              </SpotlightCard>
            ))}
        </div>
      </section>
    </div>
  );
}
