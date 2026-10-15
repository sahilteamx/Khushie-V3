import React, { useState, useEffect, useRef } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';

interface CakeCeremonyProps {
  reducedMotion: boolean;
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

export function CakeCeremony({ reducedMotion, onNavigate, standalone = false }: CakeCeremonyProps) {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [cakeSliced, setCakeSliced] = useState<boolean>(false);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(false);
  const [micMessage, setMicMessage] = useState<string>('');
  const audioCtxRef = useRef<any>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);

  const litCount = candlesLit.filter(Boolean).length;
  const allBlownOut = litCount === 0;

  useEffect(() => {
    if (allBlownOut && !wishMade) {
      setWishMade(true);
    }
  }, [allBlownOut, wishMade]);

  useEffect(() => {
    return () => {
      stopMicListening();
    };
  }, []);

  const stopMicListening = () => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current && typeof audioCtxRef.current.close === 'function') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setMicActive(false);
  };

  const toggleSingleCandle = (idx: number) => {
    const next = candlesLit.slice();
    next[idx] = !next[idx];
    setCandlesLit(next);
    if (next.every((c) => !c)) {
      setWishMade(true);
    }
  };

  const blowOutAllCandles = () => {
    setCandlesLit([false, false, false, false, false]);
    setWishMade(true);
    stopMicListening();
  };

  const relightAllCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setCakeSliced(false);
    setWishMade(false);
    setMicMessage('');
  };

  const startMicBlowDetection = () => {
    if (micActive) {
      stopMicListening();
      setMicMessage('Microphone blow detection stopped.');
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicMessage('Microphone API is not available in this browser. Use the "Blow Out Candles" button instead!');
      return;
    }
    setMicMessage('Requesting microphone permission... Blow gently to extinguish the candles.');
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        micStreamRef.current = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        setMicActive(true);
        setMicMessage('Listening for a gentle blow... (or click "Blow Out Candles" anytime)');

        const checkVolume = () => {
          analyser.getByteFrequencyData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i];
          const avg = sum / data.length;
          if (avg > 48) {
            setCandlesLit([false, false, false, false, false]);
            setWishMade(true);
            setMicMessage('Candles blown out! Happy Birthday, Khushi!');
            stopMicListening();
            return;
          }
          rafRef.current = window.requestAnimationFrame(checkVolume);
        };
        rafRef.current = window.requestAnimationFrame(checkVolume);
      })
      .catch(() => {
        setMicMessage('Microphone permission declined or unavailable. Use the button or tap each candle directly!');
        setMicActive(false);
      });
  };

  return (
    <section className="cake-ceremony-card" aria-labelledby="cake-ceremony-heading">
      <div className="section-header-block">
        <span className="eyebrow-tag">08 OCTOBER 3D CAKE CELEBRATION</span>
        <h2 id="cake-ceremony-heading" className="section-title">
          {allBlownOut ? 'Wish Unlocked — Happy Birthday, Khushi!' : 'Make a Wish & Blow Out the Candles'}
        </h2>
        <p className="section-subtitle">
          Tap individual candles to toggle their flames, or use the celebration controls below.
        </p>
      </div>

      <div className="cake-stage-container">
        {allBlownOut && !reducedMotion ? (
          <div className="celebration-sparkles" aria-hidden="true">
            <span>✨</span><span>🎉</span><span>🌟</span><span>💖</span><span>✨</span>
          </div>
        ) : null}

        <div className="candles-row" role="group" aria-label="Birthday Candles">
          {candlesLit.map((isLit, idx) => (
            <button
              key={`candle-${idx}`}
              type="button"
              className={`candle-btn ${isLit ? 'lit' : 'unlit'}`}
              onClick={() => toggleSingleCandle(idx)}
              aria-pressed={isLit}
              aria-label={`Candle ${idx + 1}: ${isLit ? 'Lit (click to blow out)' : 'Extinguished (click to relight)'}`}
            >
              <span className={`candle-flame ${isLit ? 'active' : 'out'}`} aria-hidden="true">
                {isLit ? '🔥' : '💨'}
              </span>
              <span className="candle-wick" aria-hidden="true" />
              <span className="candle-stick" aria-hidden="true">
                <span className="candle-stripe" />
              </span>
            </button>
          ))}
        </div>

        <div className={`cake-tiers ${cakeSliced ? 'sliced' : ''}`} aria-hidden="true">
          <div className="cake-tier tier-top">
            <div className="frosting-drip" />
            <span className="tier-label">Khushi • 08 Oct 👑</span>
          </div>
          <div className="cake-tier tier-middle">
            <div className="frosting-drip" />
          </div>
          <div className="cake-tier tier-bottom">
            <div className="frosting-drip" />
          </div>
          <div className="cake-platter" />
        </div>

        <div className="cake-status-pill" aria-live="polite">
          {allBlownOut
            ? cakeSliced
              ? '🍰 First slice served! Wishing you the sweetest year ahead.'
              : '✨ All 5 candles extinguished! Ready to cut the birthday cake.'
            : `🕯️ ${litCount} of 5 candles glowing brightly`}
        </div>
      </div>

      <div className="cake-controls-bar">
        <button
          type="button"
          className="btn-primary"
          onClick={blowOutAllCandles}
          disabled={allBlownOut}
        >
          💨 Blow Out All Candles
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => setCakeSliced(true)}
          disabled={!allBlownOut || cakeSliced}
        >
          🍰 {cakeSliced ? 'Cake Sliced!' : 'Cut the Birthday Cake'}
        </button>

        <button
          type="button"
          className="btn-ghost"
          onClick={relightAllCandles}
        >
          🕯️ Relight Candles
        </button>

        <button
          type="button"
          className={`btn-ghost ${micActive ? 'active-mic' : ''}`}
          onClick={startMicBlowDetection}
        >
          🎙️ {micActive ? 'Stop Mic Sensor' : 'Optional: Blow via Mic'}
        </button>
      </div>

      {micMessage ? (
        <p className="mic-feedback-note" role="status">
          {micMessage}
        </p>
      ) : null}

      {wishMade ? (
        <div className="wish-reveal-banner" role="region" aria-label="Birthday Wish Reveal">
          <h3 className="wish-banner-title">✨ May Every Wish You Hold Come True ✨</h3>
          <p className="wish-banner-text">
            Happy Birthday, meri Khushi. ❤️ Thank you for all those little moments, laughs and memories. Aage ke chapters abhi baaki hain. ✨ — Always yours, Sahil
          </p>
          {standalone && onNavigate ? (
            <div className="wish-banner-actions">
              <button type="button" className="btn-primary" onClick={() => onNavigate('/finale')}>
                Continue to Grand Finale →
              </button>
              <button type="button" className="btn-secondary" onClick={() => onNavigate('/fun-zone')}>
                Play More in Fun Zone
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
