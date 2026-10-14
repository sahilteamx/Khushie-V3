import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';
import { SpotlightCard } from '../components/MotionPrimitives';

interface GiftsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function GiftsPage({ onNavigate }: GiftsPageProps) {
  const [openedMap, setOpenedMap] = useState<Record<string, boolean>>({});
  const [finalBoxOpened, setFinalBoxOpened] = useState<boolean>(false);

  const toggleGift = (id: string) => {
    setOpenedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openAllGifts = () => {
    const next: Record<string, boolean> = {};
    SITE_CONTENT.gifts.forEach((g) => {
      next[g.id] = true;
    });
    setOpenedMap(next);
    setFinalBoxOpened(true);
  };

  const resetAllGifts = () => {
    setOpenedMap({});
    setFinalBoxOpened(false);
  };

  const openedCount = SITE_CONTENT.gifts.filter((g) => openedMap[g.id]).length;
  const allFiveOpened = openedCount === SITE_CONTENT.gifts.length;

  return (
    <div className="page-container gifts-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">FIVE 3D MYSTERY GIFTS • ONE FINAL SURPRISE</span>
        <h1 className="page-main-title">Five Gifts. One Surprise. 🎁</h1>
        <p className="page-main-subtitle">
          Pick a 3D gift box. Open it. See what happens. No wrong choices — just birthday chaos! 😁 Unlock all five boxes to reveal the hidden sixth surprise.
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
            <SpotlightCard
              key={gift.id}
              className={`gift-box-card gift-3d-cube ${isOpen ? 'unboxed' : 'wrapped'}`}
              tilt={true}
            >
              <div className="gift-ribbon-tag">{gift.ribbonLabel}</div>
              <div className={`gift-icon-stage ${isOpen ? 'lid-popped' : ''}`} aria-hidden="true">
                {isOpen ? gift.iconSymbol : '🎁'}
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
            </SpotlightCard>
          );
        })}
      </section>

      {/* 6th Final Mystery Box unlocked when all 5 are discovered */}
      {allFiveOpened ? (
        <section className="final-sixth-gift-banner liquid-glass" role="status">
          <span className="eyebrow-tag">ALL FIVE DISCOVERED • BONUS SECRET UNLOCKED</span>
          <h2>🎁 There Was One More Little Surprise!</h2>
          <p>
            {finalBoxOpened
              ? '“The last little surprise — You found every gift. Now the birthday cake is waiting! 🎂❤️”'
              : 'Tap below to open the sixth golden keepsake box.'}
          </p>
          <div className="wish-banner-actions">
            {!finalBoxOpened ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setFinalBoxOpened(true)}
              >
                Open the Final Gift ✨
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={() => onNavigate('/cake')}
              >
                Continue to 3D Cake Celebration 🎂 →
              </button>
            )}
          </div>
        </section>
      ) : null}

      <div className="page-footer-cta">
        <button type="button" className="btn-primary" onClick={() => onNavigate('/surprise')}>
          Continue to Starlight Surprise ✨ →
        </button>
      </div>
    </div>
  );
}
