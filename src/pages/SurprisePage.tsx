import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';
import { SpotlightCard } from '../components/MotionPrimitives';

interface SurprisePageProps {
  onNavigate: (path: RoutePath) => void;
}

export function SurprisePage({ onNavigate }: SurprisePageProps) {
  const [enteredDigits, setEnteredDigits] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [starsLit, setStarsLit] = useState<boolean[]>([true, false, false, false, false]);
  const [vaultRevealed, setVaultRevealed] = useState<boolean>(false);

  const litTotal = starsLit.filter(Boolean).length;
  const allStarsAligned = litTotal === starsLit.length || vaultRevealed;

  const handleDigitPress = (digit: string) => {
    if (enteredDigits.length >= 4) return;
    const next = enteredDigits + digit;
    setEnteredDigits(next);
    setPinError('');
    if (next.length === 4) {
      if (SITE_CONTENT.acceptedPins.includes(next)) {
        setStarsLit([true, true, true, true, true]);
        setVaultRevealed(true);
      } else {
        setPinError('That PIN did not match. Try again or click "Instant Reveal" above.');
        window.setTimeout(() => setEnteredDigits(''), 400);
      }
    }
  };

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
    setPinError('');
  };

  const resetSurprise = () => {
    setStarsLit([true, false, false, false, false]);
    setVaultRevealed(false);
    setEnteredDigits('');
    setPinError('');
  };

  return (
    <div className="page-container surprise-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">CHAPTER THREE • 08 OCTOBER SECRET SURPRISE</span>
        <h1 className="page-main-title">The Starlight Surprise Sequence</h1>
        <p className="page-main-subtitle">
          Enter the secret 4-digit Birthday PIN on the keypad below, illuminate all five constellation stars, or use the instant reveal button to unlock your personal moment.
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

      <section className="constellation-stage-card liquid-glass" aria-label="Interactive Constellation & Secret PIN Gate">
        {/* Secret 4-dot PIN Keypad (Password Never Shown in Plain Text!) */}
        {!allStarsAligned ? (
          <div className="surprise-pin-keypad-box">
            <span className="eyebrow-tag">A PRIVATE LITTLE CHAPTER</span>
            <h3>A Tiny Secret First 🔒</h3>
            <p className="section-subtitle">
              Enter the 4-digit secret Birthday PIN on the keypad (or align the 5 stars below).
            </p>
            <div className="pin-dots-row" aria-label={`${enteredDigits.length} of 4 digits entered`}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`pin-keypad-dot ${enteredDigits.length > i ? 'filled' : ''}`}
                />
              ))}
            </div>
            {pinError ? <p className="pin-error-text" role="alert">{pinError}</p> : null}
            <div className="pin-numeric-grid" role="group" aria-label="Secret PIN Keypad">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                <button
                  key={d}
                  type="button"
                  className="pin-num-btn"
                  onClick={() => handleDigitPress(d)}
                >
                  {d}
                </button>
              ))}
              <button
                type="button"
                className="pin-num-btn secondary"
                onClick={() => setEnteredDigits('')}
              >
                Clear
              </button>
              <button
                type="button"
                className="pin-num-btn"
                onClick={() => handleDigitPress('0')}
              >
                0
              </button>
              <button
                type="button"
                className="pin-num-btn secondary"
                onClick={() => setEnteredDigits((prev) => prev.slice(0, -1))}
              >
                ⌫
              </button>
            </div>
          </div>
        ) : null}

        <div className="constellation-nodes-row" role="group" aria-label="Five Constellation Stars">
          {[
            'I • The Little Us 🌱',
            'II • Those Days ✨',
            'III • Right Here ❤️',
            'IV • Yet to Come 💍',
            'V • 08 October 👑'
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
          <SpotlightCard className="surprise-vault-unlocked" role="region">
            <span className="eyebrow-tag">CONSTELLATION COMPLETE • 08 OCTOBER REVEAL</span>
            <div className="surprise-number-banner">
              <span className="giant-08-badge">08</span>
              <div>
                <h2 className="surprise-reveal-title">
                  Happy Birthday, Meri {SITE_CONTENT.recipientName} ❤️👑
                </h2>
                <p className="eyebrow-tag">08 OCTOBER • PERSONAL MOMENT UNLOCKED</p>
              </div>
            </div>

            <div className="surprise-personal-grid">
              <img
                src="./public/images/memories/memory-01.webp"
                alt="Khushi Birthday Memory"
                className="surprise-personal-photo"
              />
              <div className="surprise-personal-copy">
                <p className="surprise-reveal-body">
                  “Khushi, itna sab dekhne ke baad bhi shayad mere paas kehne ke liye bahot kuch baaki hai… 🥹 Lekin har baat words mein keh paana possible nahi hota. Bas aaj ke din — thank you. ❤️ Aur ye story abhi khatam nahi hui hai. The best chapters are still waiting… ✨❤️”
                </p>
                <p className="sahil-quote-author">— Always yours, Sahil</p>
                <div className="wish-banner-actions">
                  <button type="button" className="btn-primary" onClick={() => onNavigate('/cake')}>
                    Proceed to 3D Birthday Cake Ceremony 🎂 →
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => onNavigate('/gifts')}>
                    Open 5 Mystery Gifts 🎁
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => onNavigate('/message')}>
                    Read Full Letter 💌
                  </button>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ) : (
          <p className="constellation-hint-note">
            Tap the remaining {5 - litTotal} star{5 - litTotal === 1 ? '' : 's'} above or click "Instant Reveal" to open the birthday tribute.
          </p>
        )}
      </section>
    </div>
  );
}
