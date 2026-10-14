import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';

interface SurprisePageProps {
  onNavigate: (path: RoutePath) => void;
}

export function SurprisePage({ onNavigate }: SurprisePageProps) {
  const [starsLit, setStarsLit] = useState<boolean[]>([true, false, false, false, false]);
  const [vaultRevealed, setVaultRevealed] = useState<boolean>(false);

  const litTotal = starsLit.filter(Boolean).length;
  const allStarsAligned = litTotal === starsLit.length || vaultRevealed;

  const toggleStar = (idx: number) => {
    const next = starsLit.slice();
    next[idx] = !next[idx];
    setStarsLit(next);
    if (next.every(Boolean)) {
      setVaultRevealed(true);
    }
  };

  const skipToReveal = () => {
    setStarsLit([true, true, true, true, true]);
    setVaultRevealed(true);
  };

  const resetSurprise = () => {
    setStarsLit([true, false, false, false, false]);
    setVaultRevealed(false);
  };

  return (
    <div className="page-container surprise-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">OCTOBER 18 CONSTELLATION REVEAL</span>
        <h1 className="page-main-title">The Starlight Surprise Sequence</h1>
        <p className="page-main-subtitle">
          Illuminate all five stars in the October 18 constellation—or use the instant reveal button below—to unlock the tribute card.
        </p>

        <div className="gifts-action-bar">
          <span className="metric-pill" aria-live="polite">
            Constellation Stars: <strong>{litTotal}</strong> / 5
          </span>
          <button type="button" className="btn-primary btn-sm" onClick={skipToReveal}>
            ✨ Instant Reveal (Skip Sequence)
          </button>
          <button type="button" className="btn-ghost btn-sm" onClick={resetSurprise}>
            ↺ Reset Constellation
          </button>
        </div>
      </header>

      <section className="constellation-stage-card" aria-label="Interactive Constellation Lock">
        <div className="constellation-nodes-row" role="group" aria-label="Five Constellation Stars">
          {[
            'I • Warmth',
            'II • Grace',
            'III • Joy',
            'IV • Radiance',
            'V • October 18'
          ].map((label, idx) => {
            const isLit = starsLit[idx];
            return (
              <button
                key={label}
                type="button"
                className={`star-node-btn ${isLit ? 'illuminated' : 'dim'}`}
                onClick={() => toggleStar(idx)}
                aria-pressed={isLit}
              >
                <span className="star-node-icon" aria-hidden="true">
                  {isLit ? '🌟' : '☆'}
                </span>
                <span className="star-node-label">{label}</span>
              </button>
            );
          })}
        </div>

        {allStarsAligned ? (
          <div className="surprise-vault-unlocked" role="region" aria-label="Unlocked Starlight Tribute">
            <span className="eyebrow-tag">CONSTELLATION COMPLETE • CODE 1810</span>
            <h2 className="surprise-reveal-title">
              You Are the Brightest Part of October 18, {SITE_CONTENT.recipientName}
            </h2>
            <p className="surprise-reveal-body">
              When all five stars align, they form a single simple message: thank you for being someone whose kindness, laughter, and presence make life genuinely brighter. May this year bring you every happiness you have ever wished for.
            </p>
            <div className="wish-banner-actions">
              <button type="button" className="btn-primary" onClick={() => onNavigate('/cake')}>
                Proceed to Birthday Cake Ceremony 🎂 →
              </button>
              <button type="button" className="btn-secondary" onClick={() => onNavigate('/finale')}>
                Visit Grand Finale 🏮
              </button>
            </div>
          </div>
        ) : (
          <p className="constellation-hint-note">
            Tap the remaining {5 - litTotal} star{5 - litTotal === 1 ? '' : 's'} above or click "Instant Reveal" to open the birthday tribute.
          </p>
        )}
      </section>
    </div>
  );
}
