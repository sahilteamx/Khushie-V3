import React, { useState, useEffect } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';
import { TextEffect, SpotlightCard } from '../components/MotionPrimitives';
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
  const [curtainsOpen, setCurtainsOpen] = useState<boolean>(true);
  const [clockMode, setClockMode] = useState<'since' | 'until'>('since');
  const [clock, setClock] = useState<TimeDisplayState>(() => computeTimeMetrics('since'));
  const [pinInput, setPinInput] = useState<string>('');
  const [pinUnlocked, setPinUnlocked] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');
  const [treeStage, setTreeStage] = useState<'blooming' | 'radiant'>('blooming');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(computeTimeMetrics(clockMode));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [clockMode]);

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

  return (
    <div className="page-container home-page">
      {/* 1. Interactive 3D Red Velvet Theater Curtain Stage ("NOW SHOWING — 08 OCTOBER") */}
      <div className={`theater-curtain-stage ${curtainsOpen ? 'curtains-open' : 'curtains-closed'}`}>
        <div className="marquee-lights-bar" aria-hidden="true">
          <span>★ SAVE THE DATE • 08 OCTOBER • MY BIRTHDAY PRINCESS KHUSHI 👑 ★</span>
        </div>

        <div className="curtain-panel curtain-left" aria-hidden="true" />
        <div className="curtain-panel curtain-right" aria-hidden="true" />

        {!curtainsOpen ? (
          <div className="curtain-center-placard liquid-glass">
            <span className="eyebrow-tag">NOW SHOWING • A SPECIAL PRODUCTION</span>
            <h2 className="curtain-title">For Khushi — 08 October Edition ✨</h2>
            <p className="curtain-sub">Tap below to part the 3D velvet stage curtains and enter the celebration.</p>
            <button
              type="button"
              className="btn-primary btn-lg motionsites-glow-cta"
              onClick={() => setCurtainsOpen(true)}
            >
              🎭 Open 3D Stage Curtains
            </button>
          </div>
        ) : null}

        <section className="hero-section" aria-labelledby="hero-main-heading">
          <div className="motionsites-editorial-rail">
            <span className="editorial-rail-left">👑 {SITE_CONTENT.brandSubtitle} • 3D Keepsake</span>
            <button
              type="button"
              className="curtain-replay-pill"
              onClick={() => setCurtainsOpen(!curtainsOpen)}
            >
              🎭 {curtainsOpen ? 'Close Velvet Curtains' : 'Open Velvet Curtains'}
            </button>
          </div>

          <div className="hero-grid">
            <div className="hero-copy-column">
              <div className="eyebrow-pill liquid-glass">
                <span className="eyebrow-dot" aria-hidden="true" />
                <span>{SITE_CONTENT.heroGreeting}</span>
              </div>

              {/* Giant 3D Extruded "08" Badge + Animated Title */}
              <div className="hero-3d-number-row">
                <div className="extruded-3d-number" aria-label="08 October">
                  <span className="num-3d-main">08</span>
                  <span className="num-3d-sub">OCT</span>
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
              </div>

              <p className="hero-lead hero-nicknames-box liquid-glass">
                {SITE_CONTENT.heroNicknamesLine}
              </p>

              <p className="hero-teaser-line">
                {SITE_CONTENT.heroTeaserLine}
              </p>

              {/* Post-Birthday 08 October Celebration Clock */}
              <SpotlightCard className="countdown-panel" reducedMotion={reducedMotion}>
                <div className="countdown-header-flex">
                  <span className="countdown-label">
                    {clockMode === 'since'
                      ? '🎉 08 OCTOBER CELEBRATED — TIME SINCE YOUR SPECIAL DAY'
                      : '⏳ COUNTDOWN TO NEXT 08 OCTOBER'}
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
                    {clockMode === 'since' ? 'Switch to Next Bday ⏳' : 'Time Since 08 Oct 🎉'}
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

              <div className="hero-cta-row">
                <button
                  type="button"
                  className="btn-primary btn-lg motionsites-glow-cta"
                  onClick={() => onNavigate('/surprise')}
                >
                  {SITE_CONTENT.primaryCtaLabel} ↗
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-lg liquid-glass"
                  onClick={() => onNavigate('/memories')}
                >
                  🌌 Enter 3D Memory World
                </button>
                <button
                  type="button"
                  className="btn-ghost btn-lg"
                  onClick={() => onNavigate('/message')}
                >
                  💌 Read Full Letter
                </button>
              </div>
            </div>

            {/* Right Column: 3D Blooming Tree from Khushie-V2 + Hidden Password Vault */}
            <div className="hero-visual-column">
              <SpotlightCard
                className={`celestial-emblem-card ${reducedMotion ? 'static' : 'animated'}`}
                reducedMotion={reducedMotion}
                tilt={true}
                size={320}
              >
                <div className="tree-stage-badge-row">
                  <span className="eyebrow-tag">3D BLOOMING WISH TREE</span>
                  <button
                    type="button"
                    className="btn-ghost btn-sm"
                    onClick={() => setTreeStage(treeStage === 'blooming' ? 'radiant' : 'blooming')}
                  >
                    🌸 {treeStage === 'blooming' ? 'Trigger Full Bloom ✨' : 'Soft Petal Glow'}
                  </button>
                </div>

                <svg
                  viewBox="0 0 620 660"
                  className={`hero-constellation-svg tree-${treeStage}`}
                  role="img"
                  aria-label="Cinematic blooming birthday wish tree for Khushi"
                >
                  <defs>
                    <linearGradient id="treeTrunkGradient" x1="0" y1="1" x2="0.9" y2="0">
                      <stop offset="0" stopColor="#7a5444" />
                      <stop offset="0.5" stopColor="#b08068" />
                      <stop offset="1" stopColor="#f2d0a9" />
                    </linearGradient>
                    <radialGradient id="treeGlow" cx="50%" cy="48%" r="55%">
                      <stop offset="0" stopColor="#E88D9E" stopOpacity="0.34" />
                      <stop offset="0.55" stopColor="#F2D0A9" stopOpacity="0.12" />
                      <stop offset="1" stopColor="#0A061A" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="310" cy="310" r="245" fill="url(#treeGlow)" />
                  <circle cx="310" cy="310" r="210" fill="none" stroke="#F2D0A9" strokeOpacity="0.22" strokeDasharray="5 7" />
                  <ellipse cx="310" cy="610" rx="185" ry="20" fill="rgba(242, 208, 169, 0.14)" />

                  {/* Trunk & Flowing Branches */}
                  <g stroke="url(#treeTrunkGradient)" strokeLinecap="round" fill="none">
                    <path d="M310 605 C301 560 298 510 306 463 C313 418 314 368 310 316" strokeWidth="14" />
                    <path d="M300 595 C282 546 275 511 278 475 C281 442 264 409 244 378" strokeWidth="8" />
                    <path d="M320 594 C340 546 347 512 343 474 C339 437 357 407 382 375" strokeWidth="8" />
                    <path d="M309 435 C273 405 236 376 194 345 C161 321 132 299 104 273" strokeWidth="6" />
                    <path d="M307 416 C328 380 355 350 389 322 C421 296 457 269 493 239" strokeWidth="6" />
                    <path d="M300 390 C276 360 250 333 214 313 C181 295 155 270 132 242" strokeWidth="5" />
                    <path d="M318 381 C344 348 374 326 414 307 C450 290 484 265 518 232" strokeWidth="5" />
                    <path d="M305 278 C289 232 261 199 225 179 C195 162 169 158 142 164" strokeWidth="4.5" />
                    <path d="M315 278 C331 232 359 199 395 179 C425 162 452 158 479 164" strokeWidth="4.5" />
                  </g>

                  {/* Glowing Cherry & Rose Blossoms */}
                  {[
                    [114, 242, 16, '#E88D9E'], [168, 206, 18, '#F2D0A9'], [226, 267, 15, '#E88D9E'],
                    [286, 196, 19, '#FAF6F8'], [382, 178, 17, '#E88D9E'], [424, 224, 18, '#F2D0A9'],
                    [485, 195, 16, '#A78BFA'], [523, 232, 14, '#E88D9E'], [318, 185, 21, '#F2D0A9'],
                    [171, 165, 15, '#FAF6F8'], [451, 165, 15, '#E88D9E'], [250, 225, 16, '#A78BFA'],
                    [365, 240, 16, '#F2D0A9']
                  ].map(([cx, cy, rad, col], idx) => (
                    <g key={`blossom-${idx}`} transform={`translate(${cx}, ${cy})`}>
                      <circle r={Number(rad) * 1.35} fill={String(col)} opacity="0.26" />
                      <circle r={Number(rad) * 0.78} fill={String(col)} />
                      <circle r={Number(rad) * 0.32} fill="#FFF8F0" />
                    </g>
                  ))}

                  <text x="310" y="642" textAnchor="middle" fill="#F2D0A9" fontSize="18" letterSpacing="4">
                    MY BIRTHDAY PRINCESS • KHUSHI 👑
                  </text>
                </svg>

                {/* Secret PIN Gate — Password Completely Hidden! */}
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
      </div>

      {/* 2. 3D Winding Filmstrip Ribbon of All 13 Real Photos (Inspired by sujal_mehra 32.1s) */}
      <section className="filmstrip-3d-section" aria-labelledby="filmstrip-heading">
        <div className="section-header-block">
          <span className="eyebrow-tag">3D CINEMA FILMSTRIP • 19 MOMENTS OF US</span>
          <h2 id="filmstrip-heading" className="section-title">
            A 3D Ribbon of Memories Worth Keeping
          </h2>
          <p className="section-subtitle">
            Tap any frame on the 3D winding filmstrip below to jump straight into the 3D Memory World & Polaroid Wall.
          </p>
        </div>

        <div className="filmstrip-3d-perspective">
          <div className="filmstrip-3d-track">
            {SITE_CONTENT.memories.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                className="filmstrip-frame-btn"
                style={{ '--frame-idx': idx } as any}
                onClick={() => onNavigate('/memories')}
                aria-label={`Open ${m.title} in 3D Memory World`}
              >
                <img src={m.imageWebp} alt={m.altText} loading="lazy" />
                <span className="filmstrip-frame-tag">{m.polaroidTag}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sahil's Verbatim Quote Block from index.html */}
      <section className="sahil-quote-banner liquid-glass" aria-label="Personal Quote for Khushi">
        <blockquote className="sahil-blockquote">
          {SITE_CONTENT.heroQuote}
        </blockquote>
        <p className="sahil-quote-author">{SITE_CONTENT.heroQuoteAuthor}</p>
      </section>

      {/* 4. Live DesignPrompts.dev & MotionSites.ai Aesthetic Switcher */}
      <section className="designprompts-showcase-bar liquid-glass" aria-labelledby="design-prompts-heading">
        <div className="dp-bar-header">
          <div>
            <span className="eyebrow-tag">LIVE 3D DESIGN ENGINE • DESIGNPROMPTS.DEV & MOTIONSITES.AI</span>
            <h2 id="design-prompts-heading" className="dp-bar-title">
              Switch 3D Theme Aesthetic
            </h2>
          </div>
          <div className="dp-preset-buttons" role="group" aria-label="Switch UI Design Prompt Preset">
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
        <p className="dp-bar-desc">
          {AESTHETIC_PRESETS.find((p) => p.id === aesthetic)?.description}
        </p>
      </section>

      {/* 5. Complete Experience Map */}
      <section className="destinations-section" aria-labelledby="destinations-heading">
        <div className="section-header-block">
          <span className="eyebrow-tag">EXPLORE THE FULL 3D EXPERIENCE</span>
          <h2 id="destinations-heading" className="section-title">
            Four Chapters. Nine Worlds. One Story. ❤️
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
