import React, { useState, useEffect, useRef } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { MemoryItem, RoutePath } from '../types/content';

interface MemoriesPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function MemoriesPage({ onNavigate }: MemoriesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const filteredMemories: MemoryItem[] =
    selectedCategory === 'all'
      ? SITE_CONTENT.memories
      : SITE_CONTENT.memories.filter((m) => m.category === selectedCategory);

  const isLightboxOpen = lightboxIdx !== null && filteredMemories[lightboxIdx] !== undefined;
  const activeMemory = isLightboxOpen ? filteredMemories[lightboxIdx as number] : null;

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIdx(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) =>
          prev === null ? 0 : (prev + 1) % filteredMemories.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null
            ? 0
            : (prev - 1 + filteredMemories.length) % filteredMemories.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, filteredMemories.length]);

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 45 && filteredMemories.length > 1) {
      if (deltaX < 0) {
        setLightboxIdx((prev) => (prev === null ? 0 : (prev + 1) % filteredMemories.length));
      } else {
        setLightboxIdx((prev) =>
          prev === null ? 0 : (prev - 1 + filteredMemories.length) % filteredMemories.length
        );
      }
    }
  };

  return (
    <div className="page-container memories-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">EDITORIAL KEEPSAKE GALLERY</span>
        <h1 className="page-main-title">Memories & Visual Keepsakes</h1>
        <p className="page-main-subtitle">
          Select any frame to inspect it in the full-screen lightbox (supports keyboard arrows, Escape to close, and touch swipe). Replace files in <code>public/images/memories/</code> to display your personal photographs.
        </p>

        <div className="filter-pills-row" role="group" aria-label="Filter gallery by category">
          {[
            { id: 'all', label: 'All Keepsakes' },
            { id: 'keepsake', label: 'Keepsake' },
            { id: 'celebration', label: 'Celebration' },
            { id: 'constellation', label: 'Constellation' },
            { id: 'milestone', label: 'Milestone' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              aria-pressed={selectedCategory === cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setLightboxIdx(null);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <section className="memories-grid" aria-label="Gallery Frames">
        {filteredMemories.map((item, idx) => (
          <article
            key={item.id}
            className={`memory-card ${item.aspect === 'landscape' ? 'wide-frame' : ''}`}
          >
            <button
              type="button"
              className="memory-card-trigger"
              onClick={() => setLightboxIdx(idx)}
              aria-label={`Open ${item.title} in full-screen lightbox`}
            >
              <div className="memory-img-wrapper">
                {!brokenImages[item.id] ? (
                  <picture>
                    <source srcSet={item.imageWebp} type="image/webp" />
                    <img
                      src={item.imageJpg}
                      alt={item.altText}
                      className="memory-img"
                      loading="lazy"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [item.id]: true }))
                      }
                    />
                  </picture>
                ) : (
                  <div className="media-fallback-box">
                    <span>🖼️ {item.title}</span>
                  </div>
                )}
                <span className="memory-zoom-badge">⤢ Inspect Frame</span>
              </div>

              <div className="memory-card-caption">
                <span className="memory-cat-tag">{item.category.toUpperCase()}</span>
                <h2 className="memory-card-title">{item.title}</h2>
                <p className="memory-slot-note">{item.captionSlot}</p>
              </div>
            </button>
          </article>
        ))}
      </section>

      {isLightboxOpen && activeMemory ? (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox view: ${activeMemory.title}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="lightbox-dialog">
            <div className="lightbox-top-bar">
              <span className="lightbox-counter">
                Frame {(lightboxIdx as number) + 1} of {filteredMemories.length}
              </span>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxIdx(null)}
                aria-label="Close lightbox (Escape)"
              >
                ✕ Close
              </button>
            </div>

            <div className="lightbox-stage">
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={() =>
                  setLightboxIdx(
                    ((lightboxIdx as number) - 1 + filteredMemories.length) %
                      filteredMemories.length
                  )
                }
                aria-label="Previous image"
              >
                ‹
              </button>

              <div className="lightbox-media-box">
                <picture>
                  <source srcSet={activeMemory.imageWebp} type="image/webp" />
                  <img
                    src={activeMemory.imageJpg}
                    alt={activeMemory.altText}
                    className="lightbox-img"
                  />
                </picture>
                <div className="lightbox-caption-panel">
                  <h3>{activeMemory.title}</h3>
                  <p>{activeMemory.captionSlot}</p>
                  <small>{activeMemory.provenanceNote}</small>
                </div>
              </div>

              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={() =>
                  setLightboxIdx(((lightboxIdx as number) + 1) % filteredMemories.length)
                }
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="page-footer-cta">
        <button type="button" className="btn-primary" onClick={() => onNavigate('/message')}>
          Continue to Birthday Letter 💌 →
        </button>
      </div>
    </div>
  );
}
