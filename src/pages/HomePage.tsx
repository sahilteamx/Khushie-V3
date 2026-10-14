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

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthdayToday: boolean;
}

function computeCountdown(): CountdownState {
  const now = new Date();
  const currentYear = now.getFullYear();
  const isToday = now.getMonth() === 9 && now.getDate() === 18;
  if (isToday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthdayToday: true };
  }
  let target = new Date(currentYear, 9, 18, 0, 0, 0);
  if (now.getTime() > target.getTime()) {
    target = new Date(currentYear + 1, 9, 18, 0, 0, 0);
  }
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isBirthdayToday: false };
}

export function HomePage({
  onNavigate,
  reducedMotion,
  aesthetic,
  onChangeAesthetic
}: HomePageProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() => computeCountdown());
  const [pinInput, setPinInput] = useState<string>('');
  const [pinUnlocked, setPinUnlocked] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(computeCountdown());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handlePinSubmit = (e: Event) => {
    e.preventDefault();
    if (pinInput.trim() === SITE_CONTENT.unlockPin) {
      setPinUnlocked(true);
      setPinError('');
    } else {
      setPinError('Hint: Try 1810 (October 18) or click "Quick Unlock" below.');
    }
  };

  return (
    <div className="page-container home-page">
      <section className="hero-section" aria-labelledby="hero-main-heading">
        {/* MotionSites Layer 3 Asymmetric Editorial Subtext Callouts */}
        <div className="motionsites-editorial-rail" aria-hidden="true">
          <span className="editorial-rail-left">Elegance in Every Starlight Frame • V3 Edition</span>
          <span className="editorial-rail-right">October 18 Celebration • Keepsake Vault 1810</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy-column">
            <div className="eyebrow-pill liquid-glass">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span>{SITE_CONTENT.heroGreeting}</span>
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

            <p className="hero-lead">
              {SITE_CONTENT.heroSubtitle}
            </p>

            <SpotlightCard className="countdown-panel" reducedMotion={reducedMotion}>
              <div className="countdown-header">
                <span className="countdown-label">
                  {countdown.isBirthdayToday
                    ? '🎉 TODAY IS OCTOBER 18 — HAPPY BIRTHDAY!'
                    : 'COUNTDOWN TO OCTOBER 18 CELEBRATION'}
                </span>
              </div>
              <div className="countdown-grid">
                <div className="countdown-cell">
                  <span className="countdown-num">{String(countdown.days).padStart(2, '0')}</span>
                  <span className="countdown-unit">Days</span>
                </div>
                <div className="countdown-cell">
                  <span className="countdown-num">{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="countdown-unit">Hours</span>
                </div>
                <div className="countdown-cell">
                  <span className="countdown-num">{String(countdown.minutes).padStart(2, '0')}</span>
                  <span className="countdown-unit">Minutes</span>
                </div>
                <div className="countdown-cell">
                  <span className="countdown-num">{String(countdown.seconds).padStart(2, '0')}</span>
                  <span className="countdown-unit">Seconds</span>
                </div>
              </div>
            </SpotlightCard>

            <div className="hero-cta-row">
              <button
                type="button"
                className="btn-primary btn-lg motionsites-glow-cta"
                onClick={() => onNavigate('/story')}
              >
                {SITE_CONTENT.primaryCtaLabel} →
              </button>
              <button
                type="button"
                className="btn-secondary btn-lg liquid-glass"
                onClick={() => onNavigate('/message')}
              >
                💌 Read Birthday Letter
              </button>
              <button
                type="button"
                className="btn-ghost btn-lg"
                onClick={() => onNavigate('/cake')}
              >
                🎂 Cut the Cake
              </button>
            </div>
          </div>

          <div className="hero-visual-column">
            <SpotlightCard
              className={`celestial-emblem-card ${reducedMotion ? 'static' : 'animated'}`}
              reducedMotion={reducedMotion}
              tilt={true}
              size={300}
            >
              <svg
                viewBox="0 0 360 380"
                className="hero-constellation-svg"
                role="img"
                aria-label="Cinematic blooming starlight tree illustration for Khushi"
              >
                <defs>
                  <radialGradient id="heroGlow" cx="50%" cy="45%" r="50%">
                    <stop offset="0%" stopColor="#E88D9E" stopOpacity="0.38" />
                    <stop offset="60%" stopColor="#A78BFA" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#0B0910" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F2D0A9" />
                    <stop offset="100%" stopColor="#E88D9E" />
                  </linearGradient>
                </defs>

                <circle cx="180" cy="170" r="150" fill="url(#heroGlow)" />
                <circle cx="180" cy="170" r="126" fill="none" stroke="#F2D0A9" strokeOpacity="0.22" strokeDasharray="4 6" />
                <circle cx="180" cy="170" r="92" fill="none" stroke="#E88D9E" strokeOpacity="0.28" />

                <path
                  d="M180 320 C180 265, 178 225, 180 175 M180 235 C150 210, 125 185, 110 155 M180 220 C210 195, 235 175, 250 145 M180 195 C158 165, 142 138, 135 110 M180 190 C202 160, 218 135, 225 108"
                  stroke="url(#trunkGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />

                <circle cx="180" cy="105" r="9" fill="#E88D9E" />
                <circle cx="135" cy="110" r="7.5" fill="#F2D0A9" />
                <circle cx="225" cy="108" r="7.5" fill="#F2D0A9" />
                <circle cx="110" cy="155" r="8" fill="#A78BFA" />
                <circle cx="250" cy="145" r="8" fill="#E88D9E" />
                <circle cx="155" cy="145" r="6.5" fill="#FAF6F8" />
                <circle cx="206" cy="142" r="6.5" fill="#FAF6F8" />
                <circle cx="180" cy="168" r="10" fill="#F2D0A9" />

                <path d="M125 320 L235 320" stroke="#F2D0A9" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
                <text x="180" y="348" textAnchor="middle" fill="#F2D0A9" fontSize="13" letterSpacing="2">
                  OCTOBER 18 • PIN 1810
                </text>
              </svg>

              <div className="pin-keepsake-box">
                <div className="pin-box-header">
                  <span className="pin-box-badge">🔒 KEEPSAKE VAULT CODE: 1810</span>
                  {pinUnlocked ? (
                    <span className="pin-unlocked-tag">✓ Unlocked</span>
                  ) : null}
                </div>

                {!pinUnlocked ? (
                  <form className="pin-form" onSubmit={handlePinSubmit}>
                    <label htmlFor="home-pin-input" className="sr-only">
                      Enter Birthday PIN (1810)
                    </label>
                    <input
                      id="home-pin-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="Enter 1810"
                      value={pinInput}
                      onChange={(e: Event) => setPinInput((e.target as HTMLInputElement).value)}
                      className="pin-input"
                    />
                    <button type="submit" className="btn-primary btn-sm">
                      Unlock
                    </button>
                    <button
                      type="button"
                      className="btn-ghost btn-sm"
                      onClick={() => {
                        setPinInput('1810');
                        setPinUnlocked(true);
                        setPinError('');
                      }}
                    >
                      Quick Unlock
                    </button>
                  </form>
                ) : (
                  <div className="pin-secret-revealed" role="status">
                    <p>
                      ✨ <strong>Keepsake Note Unlocked:</strong> Every chapter, game, and starlight detail in V3 is ready for you.
                    </p>
                    <button
                      type="button"
                      className="btn-secondary btn-sm"
                      onClick={() => onNavigate('/surprise')}
                    >
                      Open Surprise Vault →
                    </button>
                  </div>
                )}
                {pinError ? <p className="pin-error-text" role="alert">{pinError}</p> : null}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Live DesignPrompts.dev & MotionSites.ai Aesthetic Switcher Showcase */}
      <section className="designprompts-showcase-bar liquid-glass" aria-labelledby="design-prompts-heading">
        <div className="dp-bar-header">
          <div>
            <span className="eyebrow-tag">LIVE DESIGN SYSTEM • DESIGNPROMPTS.DEV & MOTIONSITES.AI</span>
            <h2 id="design-prompts-heading" className="dp-bar-title">
              Interactive UI Aesthetic Engine
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

      <section className="destinations-section" aria-labelledby="destinations-heading">
        <div className="section-header-block">
          <span className="eyebrow-tag">COMPLETE EXPERIENCE MAP</span>
          <h2 id="destinations-heading" className="section-title">
            Explore Every Chapter & Interactive Keepsake
          </h2>
          <p className="section-subtitle">
            Navigate freely through the story chapters, memory gallery, personal message, arcade games, and birthday cake ceremony.
          </p>
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
