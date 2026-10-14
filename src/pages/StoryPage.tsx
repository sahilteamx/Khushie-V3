import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';
import { SpotlightCard } from '../components/MotionPrimitives';

interface StoryPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function StoryPage({ onNavigate }: StoryPageProps) {
  const chapters = SITE_CONTENT.storyChapters;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [showAllStacked, setShowAllStacked] = useState<boolean>(false);
  const [imgFallbackMap, setImgFallbackMap] = useState<Record<string, boolean>>({});

  const currentChapter = chapters[activeIdx] || chapters[0];

  const handleImageError = (id: string) => {
    setImgFallbackMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page-container story-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">OUR STORY ACROSS FOUR CHAPTERS • 08 OCTOBER</span>
        <h1 className="page-main-title">Our Story Across Four Chapters</h1>
        <p className="page-main-subtitle">
          From childhood mischief ("The Little Us 🌱") and Gullu tuition days ("Those Days ✨") to standing strong together ("Right Here, Right Now ❤️") and the unwritten future ("The Chapter Yet to Come 💍").
        </p>

        <div className="story-mode-bar">
          <div className="chapter-tabs" role="tablist" aria-label="Story Chapters">
            {chapters.map((ch, idx) => {
              const isSelected = !showAllStacked && idx === activeIdx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`chapter-tab-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setShowAllStacked(false);
                    setActiveIdx(idx);
                  }}
                >
                  <span className="chapter-tab-num">{ch.number}</span>
                  <span className="chapter-tab-title">{ch.approvedTitle}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="btn-ghost btn-sm"
            onClick={() => setShowAllStacked(!showAllStacked)}
            aria-pressed={showAllStacked}
          >
            {showAllStacked ? 'Switch to 3D Chapter Stage' : 'View All 4 Chapters Stacked'}
          </button>
        </div>
      </header>

      {!showAllStacked ? (
        <SpotlightCard className="story-chapter-stage" tilt={true}>
          <div className="story-stage-grid">
            <div className="story-media-frame">
              {!imgFallbackMap[currentChapter.id] ? (
                <picture>
                  <source srcSet={currentChapter.imageWebp} type="image/webp" />
                  <img
                    src={currentChapter.imageJpg}
                    alt={currentChapter.imageAlt}
                    className="story-chapter-img"
                    loading="eager"
                    onError={() => handleImageError(currentChapter.id)}
                  />
                </picture>
              ) : (
                <div className="media-fallback-box">
                  <span className="fallback-emoji" aria-hidden="true">{currentChapter.emoji}</span>
                  <p>{currentChapter.approvedTitle}</p>
                </div>
              )}
              <span className="chapter-media-floating-tag">
                {currentChapter.number} · {currentChapter.eraLabel}
              </span>
            </div>

            <div className="story-text-panel">
              <div className="chapter-pill-row">
                <span className="chapter-index-badge">
                  CHAPTER {currentChapter.number} · {currentChapter.eraLabel.toUpperCase()}
                </span>
                <span className="chapter-emoji-badge" aria-hidden="true">{currentChapter.emoji}</span>
              </div>

              <h2 className="chapter-approved-heading">{currentChapter.approvedTitle}</h2>
              <h3 className="chapter-summary-sub">{currentChapter.dateSubtitle}</h3>

              <div className="chapter-paragraphs-stack">
                {currentChapter.paragraphs.map((pText, pIdx) => (
                  <p key={pIdx} className="chapter-narrative-body">
                    {pText}
                  </p>
                ))}
              </div>

              <div className="chapter-Pagination-row">
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
                >
                  ← Previous Chapter
                </button>

                {activeIdx < chapters.length - 1 ? (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setActiveIdx(Math.min(chapters.length - 1, activeIdx + 1))}
                  >
                    Next Chapter →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => onNavigate('/memories')}
                  >
                    Enter 3D Memory World 🌌 →
                  </button>
                )}
              </div>
            </div>
          </div>
        </SpotlightCard>
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

      {/* Dedicated Birthday Video & Envelope Link Section from story.html */}
      <section className="story-extras-grid" aria-label="Story Keepsake Extras">
        <SpotlightCard className="story-extra-card">
          <span className="eyebrow-tag">SEALED LETTER</span>
          <h3>Open Sahil’s Full Birthday Letter 💌</h3>
          <p>
            Read the complete six-part personal letter ("Why You're Special", "Our Little Inside Jokes", "A Little Secret For You", and "One Last Thing…").
          </p>
          <button type="button" className="btn-primary btn-sm" onClick={() => onNavigate('/message')}>
            Open Wax-Sealed Letter & 3D Phone Chat →
          </button>
        </SpotlightCard>

        <SpotlightCard className="story-extra-card">
          <span className="eyebrow-tag">SPECIAL VIDEO KEEPSAKE</span>
          <h3>A Little Birthday Video 🎬</h3>
          <p>
            Watch the special birthday video configured for Khushi on YouTube or explore the 3D Orbiting Photo Galaxy.
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
