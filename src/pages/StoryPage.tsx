import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';

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
        <span className="eyebrow-tag">FOUR APPROVED CHAPTERS</span>
        <h1 className="page-main-title">Our Story Across Four Chapters</h1>
        <p className="page-main-subtitle">
          Move through each chapter using the timeline tabs below, or switch to the full stacked view to read all four chapters continuously.
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
            {showAllStacked ? 'Switch to Single Chapter View' : 'View All 4 Chapters Stacked'}
          </button>
        </div>
      </header>

      {!showAllStacked ? (
        <article className="story-chapter-stage" aria-live="polite">
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
            </div>

            <div className="story-text-panel">
              <div className="chapter-pill-row">
                <span className="chapter-index-badge">CHAPTER {currentChapter.number} OF 04</span>
                <span className="chapter-emoji-badge" aria-hidden="true">{currentChapter.emoji}</span>
              </div>

              <h2 className="chapter-approved-heading">{currentChapter.approvedTitle}</h2>
              <h3 className="chapter-summary-sub">{currentChapter.summaryHeadline}</h3>

              <p className="chapter-narrative-body">{currentChapter.narrativeBody}</p>

              <div className="content-slot-callout">
                <strong>Content Provenance Note:</strong> {currentChapter.customSlotNote}
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
                    Continue to Memories Gallery →
                  </button>
                )}
              </div>
            </div>
          </div>
        </article>
      ) : (
        <div className="story-stacked-list">
          {chapters.map((ch) => (
            <article key={ch.id} className="story-chapter-stage stacked-card">
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
                  <span className="chapter-index-badge">CHAPTER {ch.number}</span>
                  <h2 className="chapter-approved-heading">{ch.approvedTitle}</h2>
                  <h3 className="chapter-summary-sub">{ch.summaryHeadline}</h3>
                  <p className="chapter-narrative-body">{ch.narrativeBody}</p>
                  <div className="content-slot-callout">
                    <strong>Content Slot:</strong> {ch.customSlotNote}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
