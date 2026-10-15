import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';
import { MagicalStorybook3D } from '../components/MagicalStorybook3D';
import { SpotlightCard } from '../components/MotionPrimitives';

interface StoryPageProps {
  onNavigate: (path: RoutePath) => void;
  reducedMotion?: boolean;
}

export function StoryPage({ onNavigate, reducedMotion = false }: StoryPageProps) {
  const chapters = SITE_CONTENT.storyChapters;
  const [showAllStacked, setShowAllStacked] = useState<boolean>(false);

  return (
    <div className="page-container story-page">
      <header className="page-hero-header story-editorial-header">
        <div className="story-header-top-row">
          <div>
            <span className="eyebrow-tag">MAGICAL 3D HARDCOVER STORYBOOK • 08 OCTOBER</span>
            <h1 className="page-main-title">Our Story Across Four Chapters</h1>
          </div>
          <button
            type="button"
            className="btn-ghost btn-sm"
            onClick={() => setShowAllStacked(!showAllStacked)}
            aria-pressed={showAllStacked}
          >
            {showAllStacked ? '📖 Switch to Magical 3D Book' : '📜 View All 4 Chapters Stacked'}
          </button>
        </div>
        <p className="page-main-subtitle">
          Turn the pages of the floating 3D hardcover book using the page controls, keyboard arrows (← / →), or touch swipes—or switch to the continuous stacked view anytime.
        </p>
      </header>

      {!showAllStacked ? (
        <MagicalStorybook3D reducedMotion={reducedMotion} onNavigate={onNavigate} />
      ) : (
        <div className="story-stacked-list">
          {chapters.map((ch) => (
            <SpotlightCard key={ch.id} className="story-chapter-stage stacked-card">
              <div className="story-stage-grid">
                <div className="story-media-frame">
                  <picture>
                    <source srcSet={ch.imageWebp} type="image/webp" />
                    <img
                      src={ch.imageJpg}
                      alt={ch.imageAlt}
                      className="story-chapter-img"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <div className="story-text-panel">
                  <span className="chapter-index-badge">CHAPTER {ch.number} · {ch.eraLabel}</span>
                  <h2 className="chapter-approved-heading">{ch.approvedTitle}</h2>
                  <h3 className="chapter-summary-sub">{ch.dateSubtitle}</h3>
                  {ch.paragraphs.map((pText, idx) => (
                    <p key={idx} className="chapter-narrative-body">{pText}</p>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      <section className="story-extras-grid" aria-label="Story Keepsake Extras">
        <SpotlightCard className="story-extra-card">
          <span className="eyebrow-tag">SEALED PERSONAL LETTER</span>
          <h3>Read Sahil’s Full Six-Part Letter 💌</h3>
          <p>
            Open the wax-sealed birthday letter ("Why You're Special", "Our Little Inside Jokes", "A Little Secret For You", and "One Last Thing…").
          </p>
          <button type="button" className="btn-primary btn-sm" onClick={() => onNavigate('/message')}>
            Open Love Letter & 3D Phone Chat →
          </button>
        </SpotlightCard>

        <SpotlightCard className="story-extra-card">
          <span className="eyebrow-tag">SPECIAL VIDEO KEEPSAKE</span>
          <h3>A Little Birthday Video 🎬</h3>
          <p>
            Watch the birthday video configured for Khushi or explore the 360° 3D Orbiting Photo Galaxy.
          </p>
          <div className="hero-cta-row">
            <a
              href={SITE_CONTENT.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-sm"
            >
              ▶ Watch Birthday Video ↗
            </a>
            <button type="button" className="btn-ghost btn-sm" onClick={() => onNavigate('/memories')}>
              Open 3D Photo Galaxy
            </button>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
}
