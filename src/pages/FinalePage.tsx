import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';

interface FinalePageProps {
  onNavigate: (path: RoutePath) => void;
}

interface SkyLantern {
  id: number;
  wishLabel: string;
  x: number;
}

export function FinalePage({ onNavigate }: FinalePageProps) {
  const [lanterns, setLanterns] = useState<SkyLantern[]>([
    { id: 1, wishLabel: 'Radiant Joy', x: 24 },
    { id: 2, wishLabel: 'Peaceful Nights', x: 50 },
    { id: 3, wishLabel: 'Bright Horizons', x: 76 }
  ]);

  const releaseLantern = () => {
    const wishes = [
      'Unstoppable Dreams',
      'Endless Laughter',
      'Warm Memories',
      'October 18 Magic',
      'Golden Chapters Ahead'
    ];
    const nextId = lanterns.length + 1;
    const wishLabel = wishes[(nextId - 1) % wishes.length];
    const x = 16 + ((nextId * 23) % 68);
    setLanterns((prev) => [...prev, { id: nextId, wishLabel, x }]);
  };

  return (
    <div className="page-container finale-page">
      <section className="finale-hero-card" aria-labelledby="finale-main-heading">
        <span className="eyebrow-tag">CLOSING CINEMATIC SCENE</span>
        <h1 id="finale-main-heading" className="page-main-title">
          Here’s to Your Brightest Year Yet, {SITE_CONTENT.recipientName}
        </h1>
        <p className="page-main-subtitle">
          Release a sky lantern into the October 18 night sky below, or revisit any chapter, keepsake frame, or birthday game whenever you wish.
        </p>

        <div className="lantern-sky-stage" role="region" aria-label="Sky Lantern Tribute">
          <div className="lantern-list">
            {lanterns.map((l) => (
              <div
                key={l.id}
                className="sky-lantern-item"
                style={{ left: `${l.x}%` }}
              >
                <span className="lantern-icon" aria-hidden="true">🏮</span>
                <span className="lantern-tag">{l.wishLabel}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="finale-actions-bar">
          <button type="button" className="btn-primary" onClick={releaseLantern}>
            🏮 Release Another Sky Lantern ({lanterns.length})
          </button>
          <button type="button" className="btn-secondary" onClick={() => onNavigate('/')}>
            ↺ Return to Opening Scene
          </button>
        </div>
      </section>

      <section className="revisit-hub-section" aria-labelledby="revisit-heading">
        <h2 id="revisit-heading" className="section-title">Revisit Any Destination</h2>
        <div className="revisit-links-grid">
          {SITE_CONTENT.navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              className="revisit-pill-btn"
              onClick={() => onNavigate(item.path)}
            >
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
