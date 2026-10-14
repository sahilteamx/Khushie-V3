import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';

interface GiftsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function GiftsPage({ onNavigate }: GiftsPageProps) {
  const [openedMap, setOpenedMap] = useState<Record<string, boolean>>({});

  const toggleGift = (id: string) => {
    setOpenedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openAllGifts = () => {
    const next: Record<string, boolean> = {};
    SITE_CONTENT.gifts.forEach((g) => {
      next[g.id] = true;
    });
    setOpenedMap(next);
  };

  const resetAllGifts = () => {
    setOpenedMap({});
  };

  const openedCount = SITE_CONTENT.gifts.filter((g) => openedMap[g.id]).length;

  return (
    <div className="page-container gifts-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">THREE KEEPSAKE UNBOXING MOMENTS</span>
        <h1 className="page-main-title">Birthday Gift Reveal</h1>
        <p className="page-main-subtitle">
          Untie each ribbon to reveal the keepsake wishes inside—or use the quick controls below to open or re-wrap all three boxes.
        </p>

        <div className="gifts-action-bar">
          <span className="metric-pill" aria-live="polite">
            Unboxed: <strong>{openedCount}</strong> / {SITE_CONTENT.gifts.length}
          </span>
          <button type="button" className="btn-primary btn-sm" onClick={openAllGifts}>
            🎁 Unbox All Keepsakes
          </button>
          <button type="button" className="btn-ghost btn-sm" onClick={resetAllGifts}>
            ↺ Re-wrap Boxes
          </button>
        </div>
      </header>

      <section className="gifts-grid" aria-label="Keepsake Gift Boxes">
        {SITE_CONTENT.gifts.map((gift) => {
          const isOpen = Boolean(openedMap[gift.id]);
          return (
            <article
              key={gift.id}
              className={`gift-box-card ${isOpen ? 'unboxed' : 'wrapped'}`}
            >
              <div className="gift-ribbon-tag">{gift.ribbonLabel}</div>
              <div className="gift-icon-stage" aria-hidden="true">
                {isOpen ? gift.iconSymbol : '🎀'}
              </div>

              <h2 className="gift-box-title">{gift.title}</h2>
              <p className="gift-box-sub">{gift.subtitle}</p>

              {isOpen ? (
                <div className="gift-revealed-content" role="region" aria-label={gift.revealHeading}>
                  <h3 className="gift-reveal-heading">{gift.revealHeading}</h3>
                  <p className="gift-reveal-body">{gift.revealBody}</p>
                </div>
              ) : null}

              <button
                type="button"
                className={isOpen ? 'btn-ghost' : 'btn-primary'}
                onClick={() => toggleGift(gift.id)}
                aria-expanded={isOpen}
              >
                {isOpen ? 'Fold Keepsake Box' : 'Untie Ribbon & Open 🎁'}
              </button>
            </article>
          );
        })}
      </section>

      <div className="page-footer-cta">
        <button type="button" className="btn-primary" onClick={() => onNavigate('/surprise')}>
          Continue to Starlight Surprise ✨ →
        </button>
      </div>
    </div>
  );
}
