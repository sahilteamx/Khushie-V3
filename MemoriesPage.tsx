import React, { useState, useEffect, useRef } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { MemoryItem, RoutePath } from '../types/content';

interface MemoriesPageProps {
  onNavigate: (path: RoutePath) => void;
}

type MemoryViewMode = 'polaroid-wall' | 'galaxy-3d' | 'sketchbook-3d';

export function MemoriesPage({ onNavigate }: MemoriesPageProps) {
  const [viewMode, setViewMode] = useState<MemoryViewMode>('polaroid-wall');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [butterflyNoteOpen, setButterflyNoteOpen] = useState<boolean>(false);
  const [galaxyAngle, setGalaxyAngle] = useState<number>(0);
  const [autoOrbit, setAutoOrbit] = useState<boolean>(true);
  const [bookSpreadIdx, setBookSpreadIdx] = useState<number>(0);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const filteredMemories: MemoryItem[] =
    selectedCategory === 'all'
      ? SITE_CONTENT.memories
      : SITE_CONTENT.memories.filter((m) => m.category === selectedCategory);

  const isLightboxOpen = lightboxIdx !== null && filteredMemories[lightboxIdx] !== undefined;
  const activeMemory = isLightboxOpen ? filteredMemories[lightboxIdx as number] : null;

  // 3D Galaxy Auto-Orbit loop
  useEffect(() => {
    if (viewMode !== 'galaxy-3d' || !autoOrbit) return;
    const timer = window.setInterval(() => {
      setGalaxyAngle((prev) => (prev - 1.5) % 360);
    }, 60);
    return () => window.clearInterval(timer);
  }, [viewMode, autoOrbit]);

  // Lightbox Keyboard Listener
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

  // Sketchbook pages
  const bookSpreads = [
    {
      title: 'Cover — Sketchbook of Us ✨',
      subtitle: '08 October Keepsake Edition • Khushi & Sahil',
      imageWebp: './public/images/memories/our-journey.webp',
      imageJpg: './public/images/memories/our-journey.jpg',
      body: '19 moments kept together as one complete collage — from childhood mischief to unwritten future dreams.'
    },
    ...SITE_CONTENT.storyChapters.map((ch) => ({
      title: ch.approvedTitle,
      subtitle: `${ch.eraLabel} • ${ch.dateSubtitle}`,
      imageWebp: ch.imageWebp,
      imageJpg: ch.imageJpg,
      body: ch.paragraphs.join(' ')
    }))
  ];
  const currentSpread = bookSpreads[bookSpreadIdx] || bookSpreads[0];

  const galaxyItems = SITE_CONTENT.memories.slice(0, 10);

  return (
    <div className="page-container memories-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">3D MEMORY WORLD • 19 MOMENTS & POLAROIDS</span>
        <h1 className="page-main-title">Memories & Visual Keepsakes</h1>
        <p className="page-main-subtitle">
          Explore our memories across three 3D interactive modes: the **3D Polaroid Wall** (tap the glowing butterfly 🦋 for a secret note!), the **360° 3D Orbiting Galaxy**, or the **3D Page-Flipping Sketchbook**.
        </p>

        {/* 3D View Mode Switcher */}
        <div className="memory-3d-mode-switcher" role="tablist" aria-label="3D Memory View Modes">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'polaroid-wall'}
            className={`fun-tab-btn ${viewMode === 'polaroid-wall' ? 'active' : ''}`}
            onClick={() => setViewMode('polaroid-wall')}
          >
            📌 3D Polaroid Wall & Butterfly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'galaxy-3d'}
            className={`fun-tab-btn ${viewMode === 'galaxy-3d' ? 'active' : ''}`}
            onClick={() => setViewMode('galaxy-3d')}
          >
            🌌 360° 3D Photo Galaxy
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'sketchbook-3d'}
            className={`fun-tab-btn ${viewMode === 'sketchbook-3d' ? 'active' : ''}`}
            onClick={() => setViewMode('sketchbook-3d')}
          >
            📖 3D Flipping Sketchbook
          </button>
        </div>

        {viewMode === 'polaroid-wall' ? (
          <div className="filter-pills-row" role="group" aria-label="Filter gallery by era">
            {[
              { id: 'all', label: 'All 13 Frames' },
              { id: 'childhood', label: '01 Childhood 🌱' },
              { id: 'those-days', label: '02 Those Days ✨' },
              { id: 'present', label: '03 Present ❤️' },
              { id: 'future', label: '04 Future 💍' },
              { id: 'keepsake', label: '19 Moments Collage' }
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
        ) : null}
      </header>

      {/* MODE 1: 3D Polaroid Corkboard Wall + Glowing Butterfly Secret Note */}
      {viewMode === 'polaroid-wall' ? (
        <section className="polaroid-wall-stage" aria-label="3D Polaroid Wall">
          <div className="butterfly-secret-bar">
            <button
              type="button"
              className="glowing-butterfly-btn"
              onClick={() => setButterflyNoteOpen(!butterflyNoteOpen)}
              aria-expanded={butterflyNoteOpen}
            >
              <span className="butterfly-icon" aria-hidden="true">🦋</span>
              <span>Touch the Glowing Butterfly ✨</span>
            </button>

            {butterflyNoteOpen ? (
              <div className="butterfly-popup-card liquid-glass" role="status">
                <p>{SITE_CONTENT.butterflySecretNote}</p>
                <button
                  type="button"
                  className="btn-ghost btn-sm"
                  onClick={() => setButterflyNoteOpen(false)}
                >
                  Close Note ✕
                </button>
              </div>
            ) : null}
          </div>

          <div className="memories-grid polaroid-corkboard-grid">
            {filteredMemories.map((item, idx) => (
              <article
                key={item.id}
                className={`memory-card polaroid-3d-frame ${item.aspect === 'landscape' ? 'wide-frame' : ''}`}
                style={{ '--polaroid-rot': `${item.rotationDeg}deg` } as any}
              >
                <span className="polaroid-heart-pin" aria-hidden="true">♥</span>
                <button
                  type="button"
                  className="memory-card-trigger polaroid-paper"
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
                    <span className="memory-zoom-badge">⤢ View Full</span>
                  </div>

                  <div className="polaroid-handwritten-footer">
                    <span className="polaroid-tag-script">{item.polaroidTag}</span>
                    <h2 className="memory-card-title">{item.title}</h2>
                    <p className="memory-slot-note">{item.caption}</p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* MODE 2: 360° 3D Deep-Space Orbiting Photo Galaxy */}
      {viewMode === 'galaxy-3d' ? (
        <section className="galaxy-3d-stage liquid-glass" aria-label="360 Degree 3D Orbiting Photo Galaxy">
          <div className="galaxy-controls-header">
            <div>
              <span className="eyebrow-tag">3D ORBITING MEMORY GALAXY</span>
              <h2>Spin Around Our 3D Starlight Universe</h2>
            </div>
            <div className="galaxy-btn-group">
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => {
                  setAutoOrbit(false);
                  setGalaxyAngle((a) => a + 36);
                }}
              >
                ⟲ Rotate Left
              </button>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => setAutoOrbit(!autoOrbit)}
              >
                {autoOrbit ? '⏸ Pause 3D Orbit' : '▶ Auto-Orbit 3D'}
              </button>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => {
                  setAutoOrbit(false);
                  setGalaxyAngle((a) => a - 36);
                }}
              >
                Rotate Right ⟳
              </button>
            </div>
          </div>

          <div className="galaxy-3d-viewport">
            <div className="galaxy-central-core" aria-hidden="true">
              <span>KHUSHI • 08 OCT</span>
            </div>
            <div
              className="galaxy-3d-ring"
              style={{ transform: `rotateX(-7deg) rotateY(${galaxyAngle}deg)` }}
            >
              {galaxyItems.map((item, idx) => {
                const itemAngle = idx * (360 / galaxyItems.length);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="galaxy-3d-card"
                    style={{
                      transform: `rotateY(${itemAngle}deg) translateZ(340px)`
                    }}
                    onClick={() => {
                      setSelectedCategory('all');
                      setLightboxIdx(idx);
                    }}
                    aria-label={`Inspect ${item.title}`}
                  >
                    <img src={item.imageWebp} alt={item.altText} />
                    <span className="galaxy-card-label">{item.polaroidTag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* MODE 3: 3D Interactive Page-Flipping Sketchbook */}
      {viewMode === 'sketchbook-3d' ? (
        <section className="sketchbook-3d-stage liquid-glass" aria-label="3D Interactive Sketchbook">
          <div className="galaxy-controls-header">
            <div>
              <span className="eyebrow-tag">SPIRAL SKETCHBOOK • PAGE {bookSpreadIdx + 1} OF {bookSpreads.length}</span>
              <h2>{currentSpread.title}</h2>
            </div>
            <div className="galaxy-btn-group">
              <button
                type="button"
                className="btn-secondary btn-sm"
                disabled={bookSpreadIdx === 0}
                onClick={() => setBookSpreadIdx(Math.max(0, bookSpreadIdx - 1))}
              >
                ← Flip Previous Page
              </button>
              <button
                type="button"
                className="btn-primary btn-sm"
                disabled={bookSpreadIdx === bookSpreads.length - 1}
                onClick={() => setBookSpreadIdx(Math.min(bookSpreads.length - 1, bookSpreadIdx + 1))}
              >
                Flip Next Page →
              </button>
            </div>
          </div>

          <div className="sketchbook-3d-book">
            <div className="sketchbook-spiral-spine" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="sketchbook-page-left">
              <picture>
                <source srcSet={currentSpread.imageWebp} type="image/webp" />
                <img
                  src={currentSpread.imageJpg}
                  alt={currentSpread.title}
                  className="sketchbook-spread-img"
                />
              </picture>
            </div>
            <div className="sketchbook-page-right">
              <span className="eyebrow-tag">{currentSpread.subtitle}</span>
              <h3 className="sketchbook-page-heading">{currentSpread.title}</h3>
              <p className="sketchbook-page-text">{currentSpread.body}</p>
              <div className="sketchbook-page-dots">
                {bookSpreads.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`page-dot-btn ${idx === bookSpreadIdx ? 'active' : ''}`}
                    onClick={() => setBookSpreadIdx(idx)}
                    aria-label={`Jump to sketchbook page ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Full-Screen Accessible Lightbox */}
      {isLightboxOpen && activeMemory ? (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox view: ${activeMemory.title}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="lightbox-dialog liquid-glass">
            <div className="lightbox-top-bar">
              <span className="lightbox-counter">
                Frame {(lightboxIdx as number) + 1} of {filteredMemories.length} • {activeMemory.polaroidTag}
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
                  <p>{activeMemory.caption}</p>
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
          Continue to Sahil’s Love Letter & 3D iPhone Chat 💌 →
        </button>
      </div>
    </div>
  );
}
