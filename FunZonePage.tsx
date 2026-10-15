import React, { useState, useEffect, useRef } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';
import { CakeCeremony } from '../components/CakeCeremony';

interface FunZonePageProps {
  onNavigate: (path: RoutePath) => void;
  reducedMotion: boolean;
}

type FunTab = 'cake' | 'hearts' | 'balloons' | 'memory' | 'stickers' | 'wishes';

interface FallingHeart {
  id: number;
  lane: number; // 0..4
  row: number;  // 0..5
  symbol: string;
  points: number;
}

interface BalloonItem {
  id: number;
  label: string;
  color: string;
  points: number;
  popped: boolean;
}

interface MatchCard {
  id: number;
  symbol: string;
  label: string;
  flipped: boolean;
  matched: boolean;
}

interface PlacedSticker {
  uid: number;
  symbol: string;
  label: string;
  x: number; // percentage 10..90
  y: number; // percentage 15..85
  scale: number;
  rotation: number;
}

function createInitialBalloons(): BalloonItem[] {
  const palette = [
    { color: '#E88D9E', symbol: '🎈', pts: 1, name: 'Rose Balloon' },
    { color: '#F2D0A9', symbol: '✨', pts: 2, name: 'Golden Star Balloon' },
    { color: '#A78BFA', symbol: '🎈', pts: 1, name: 'Twilight Balloon' }
  ];
  return Array.from({ length: 12 }, (_, idx) => {
    const p = palette[idx % palette.length];
    return {
      id: idx + 1,
      label: `${p.name} #${idx + 1}`,
      color: p.color,
      points: p.pts,
      popped: false
    };
  });
}

function createShuffledDeck(): MatchCard[] {
  const pairs = [
    { symbol: '🌹', label: 'Velvet Rose' },
    { symbol: '🎂', label: 'Birthday Cake' },
    { symbol: '✨', label: 'Starlight' },
    { symbol: '👑', label: 'Birthday Crown' },
    { symbol: '🦋', label: 'Twilight Butterfly' },
    { symbol: '💎', label: 'Crystal Gem' }
  ];
  const raw = [...pairs, ...pairs].map((item, idx) => ({
    id: idx + 1,
    symbol: item.symbol,
    label: item.label,
    flipped: false,
    matched: false,
    sortWeight: ((idx * 37 + 13) % 19)
  }));
  raw.sort((a, b) => a.sortWeight - b.sortWeight);
  return raw.map(({ sortWeight, ...card }, idx) => ({ ...card, id: idx + 1 }));
}

export function FunZonePage({ onNavigate, reducedMotion }: FunZonePageProps) {
  const [activeTab, setActiveTab] = useState<FunTab>('cake');

  // --- B. Catch the Hearts state ---
  const [heartsRunning, setHeartsRunning] = useState<boolean>(false);
  const [catcherLane, setCatcherLane] = useState<number>(2); // 0..4
  const [heartsScore, setHeartsScore] = useState<number>(0);
  const [heartsCompleted, setHeartsCompleted] = useState<boolean>(false);
  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([
    { id: 1, lane: 1, row: 1, symbol: '💖', points: 2 },
    { id: 2, lane: 3, row: 3, symbol: '✨', points: 3 }
  ]);
  const nextHeartId = useRef<number>(10);

  useEffect(() => {
    if (!heartsRunning || activeTab !== 'hearts') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setCatcherLane((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setCatcherLane((prev) => Math.min(4, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [heartsRunning, activeTab]);

  useEffect(() => {
    if (!heartsRunning || activeTab !== 'hearts') return;
    const tickMs = reducedMotion ? 900 : 620;
    const timer = window.setInterval(() => {
      setFallingHearts((prev) => {
        const updated: FallingHeart[] = [];
        let gained = 0;
        for (const h of prev) {
          const nextRow = h.row + 1;
          if (nextRow >= 5) {
            if (h.lane === catcherLane) {
              gained += h.points;
            }
          } else {
            updated.push({ ...h, row: nextRow });
          }
        }
        const id = nextHeartId.current++;
        const newLane = (id * 3) % 5;
        updated.push({
          id,
          lane: newLane,
          row: 0,
          symbol: id % 3 === 0 ? '🌟' : '💖',
          points: id % 3 === 0 ? 3 : 2
        });
        if (gained > 0) {
          setHeartsScore((s) => {
            const nextScore = s + gained;
            if (nextScore >= 16) {
              setHeartsCompleted(true);
              setHeartsRunning(false);
            }
            return nextScore;
          });
        }
        return updated;
      });
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [heartsRunning, activeTab, catcherLane, reducedMotion]);

  const startHeartsGame = () => {
    setHeartsScore(0);
    setHeartsCompleted(false);
    setCatcherLane(2);
    setFallingHearts([
      { id: 1, lane: 2, row: 1, symbol: '💖', points: 2 },
      { id: 2, lane: 0, row: 3, symbol: '🌟', points: 3 }
    ]);
    setHeartsRunning(true);
  };

  const catchHeartDirectly = (heart: FallingHeart) => {
    setCatcherLane(heart.lane);
    setFallingHearts((prev) => prev.filter((item) => item.id !== heart.id));
    setHeartsScore((s) => {
      const nextScore = s + heart.points;
      if (nextScore >= 16) {
        setHeartsCompleted(true);
        setHeartsRunning(false);
      }
      return nextScore;
    });
  };

  // --- C. Pop the Balloons state ---
  const [balloons, setBalloons] = useState<BalloonItem[]>(() => createInitialBalloons());
  const [balloonScore, setBalloonScore] = useState<number>(0);

  const poppedCount = balloons.filter((b) => b.popped).length;
  const allBalloonsPopped = poppedCount === balloons.length;

  const popBalloon = (id: number) => {
    setBalloons((prev) =>
      prev.map((b) => {
        if (b.id === id && !b.popped) {
          setBalloonScore((s) => s + b.points);
          return { ...b, popped: true };
        }
        return b;
      })
    );
  };

  const resetBalloons = () => {
    setBalloons(createInitialBalloons());
    setBalloonScore(0);
  };

  // --- D. Memory Match state ---
  const [cards, setCards] = useState<MatchCard[]>(() => createShuffledDeck());
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [boardLocked, setBoardLocked] = useState<boolean>(false);

  const matchedCount = cards.filter((c) => c.matched).length;
  const memoryComplete = matchedCount === cards.length;

  const handleCardClick = (cardId: number) => {
    if (boardLocked) return;
    const target = cards.find((c) => c.id === cardId);
    if (!target || target.flipped || target.matched) return;

    const nextFlipped = [...flippedIds, cardId];
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c))
    );
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = nextFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId ? { ...c, matched: true, flipped: true } : c
          )
        );
        setFlippedIds([]);
      } else {
        setBoardLocked(true);
        window.setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c
            )
          );
          setFlippedIds([]);
          setBoardLocked(false);
        }, 650);
      }
    }
  };

  const resetMemoryGame = () => {
    setBoardLocked(false);
    setFlippedIds([]);
    setMoves(0);
    setCards(createShuffledDeck());
  };

  // --- E. Sticker Studio state ---
  const [stickers, setStickers] = useState<PlacedSticker[]>([
    { uid: 1, symbol: '👑', label: 'Birthday Crown', x: 50, y: 28, scale: 1.2, rotation: 0 },
    { uid: 2, symbol: '🌹', label: 'Blush Rose', x: 26, y: 65, scale: 1.0, rotation: -12 },
    { uid: 3, symbol: '✨', label: 'Starlight', x: 74, y: 62, scale: 1.1, rotation: 15 }
  ]);
  const [selectedUid, setSelectedUid] = useState<number | null>(1);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [exportedDataUrl, setExportedDataUrl] = useState<string>('');
  const nextStickerUid = useRef<number>(10);

  const selectedSticker = stickers.find((s) => s.uid === selectedUid) || null;

  const addSticker = (tpl: { label: string; symbol: string }) => {
    const uid = nextStickerUid.current++;
    const offset = (uid % 5) * 8 - 16;
    const newItem: PlacedSticker = {
      uid,
      symbol: tpl.symbol,
      label: tpl.label,
      x: Math.min(82, Math.max(18, 50 + offset)),
      y: Math.min(78, Math.max(22, 50 + offset)),
      scale: 1.0,
      rotation: 0
    };
    setStickers((prev) => [...prev, newItem]);
    setSelectedUid(uid);
  };

  const updateSelectedSticker = (updater: (s: PlacedSticker) => PlacedSticker) => {
    if (selectedUid === null) return;
    setStickers((prev) =>
      prev.map((item) => (item.uid === selectedUid ? updater(item) : item))
    );
  };

  const removeSelectedSticker = () => {
    if (selectedUid === null) return;
    setStickers((prev) => prev.filter((s) => s.uid !== selectedUid));
    setSelectedUid(null);
  };

  const resetStickers = () => {
    setStickers([
      { uid: 1, symbol: '👑', label: 'Birthday Crown', x: 50, y: 28, scale: 1.2, rotation: 0 }
    ]);
    setSelectedUid(1);
    setExportStatus('');
    setExportedDataUrl('');
  };

  const exportStickerCardPng = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark cinematic background gradient
      const grad = ctx.createLinearGradient(0, 0, 800, 500);
      grad.addColorStop(0, '#0B0910');
      grad.addColorStop(0.5, '#191326');
      grad.addColorStop(1, '#26172E');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 800, 500);

      // Decorative border
      ctx.strokeStyle = '#F2D0A9';
      ctx.lineWidth = 3;
      ctx.strokeRect(24, 24, 752, 452);

      // Header & Center Typography
      ctx.fillStyle = '#F2D0A9';
      ctx.font = '600 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('08 OCTOBER KEEPSAKE POSTCARD', 400, 68);

      ctx.fillStyle = '#FAF6F8';
      ctx.font = 'bold 38px serif';
      ctx.fillText('Happy Birthday, Khushi ✨', 400, 255);

      // Draw placed stickers
      for (const st of stickers) {
        ctx.save();
        const px = (st.x / 100) * 800;
        const py = (st.y / 100) * 500;
        ctx.translate(px, py);
        ctx.rotate((st.rotation * Math.PI) / 180);
        ctx.font = `${Math.round(44 * st.scale)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(st.symbol, 0, 0);
        ctx.restore();
      }

      const dataUrl = canvas.toDataURL('image/png');
      setExportedDataUrl(dataUrl);
      setExportStatus('✓ Keepsake PNG rendered! Click "Download PNG File" below to save.');
    } catch (_err) {
      setExportStatus('Could not generate PNG preview in this browser.');
    }
  };

  // --- F. Wish Generator state (from wish-generator.js) ---
  const [wishMood, setWishMood] = useState<'sweet' | 'funny' | 'emotional' | 'cute'>('sweet');
  const [generatedWish, setGeneratedWish] = useState<string>(
    'Happy Birthday, Khushi! May this day bring you peaceful moments, genuine smiles and all the little happiness that makes a day feel special. ❤️'
  );

  const generateNewWish = (mood: 'sweet' | 'funny' | 'emotional' | 'cute') => {
    setWishMood(mood);
    const pool: Record<string, string[]> = {
      sweet: [
        'Happy Birthday, Khushi! May this day bring you peaceful moments, genuine smiles and all the little happiness that makes a day feel special. ❤️',
        'Here’s to friendship, silly conversations, unexpected laughs and the memories that quietly become your favourites. Happy Birthday, Khushi! ✨'
      ],
      funny: [
        'Happy Birthday, Khushi! May your cake be bigger than your problems, your selfies better than your expectations, and your day completely free from unnecessary seriousness. 😂🎂',
        'Birthday rule for Meri Bacchii: cake first, responsibilities later, aur bartan baad mein! 😂❤️'
      ],
      emotional: [
        'Happy Birthday, Khushi. I hope this year gives you the kind of happiness that feels calm and real — in ordinary moments, kind conversations, and the people who care about you. ❤️✨',
        'Keep the memories that make you smile, the lessons that made you stronger, and remember: main hamesha aapke saath hoon. ❤️'
      ],
      cute: [
        'Happy Birthday, Meri Bacchiiiiiiiiiiiiiiiiiii ✨💓 Hope your day is soft, happy, slightly silly and full of little surprises that make you smile without warning. 🥰🎂',
        'Sending extra sparkle to My Birthday Princess 👑! Keep smiling always. 🥰✨'
      ]
    };
    const list = pool[mood] || pool.sweet;
    const next = list[0] === generatedWish && list.length > 1 ? list[1] : list[0];
    setGeneratedWish(next);
  };

  return (
    <div className="page-container fun-zone-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">INTERACTIVE BIRTHDAY ARCADE & STUDIO</span>
        <h1 className="page-main-title">Birthday Fun Zone</h1>
        <p className="page-main-subtitle">
          Five interactive experiences crafted for mouse, touch, and keyboard navigation: Cake Ceremony, Catch the Hearts, Pop the Balloons, Memory Match, and Sticker Studio.
        </p>

        <div className="fun-tabs-bar" role="tablist" aria-label="Fun Zone Experiences">
          {[
            { id: 'cake', label: '🎂 Cake & Candles' },
            { id: 'hearts', label: '💖 Catch the Hearts' },
            { id: 'balloons', label: '🎈 Pop the Balloons' },
            { id: 'memory', label: '🃏 Memory Match' },
            { id: 'stickers', label: '🎨 Sticker Studio' },
            { id: 'wishes', label: '✨ Wish Generator' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`fun-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as FunTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'cake' ? (
        <CakeCeremony reducedMotion={reducedMotion} onNavigate={onNavigate} />
      ) : null}

      {activeTab === 'hearts' ? (
        <section className="game-stage-card" aria-labelledby="hearts-game-title">
          <div className="game-top-bar">
            <div>
              <h2 id="hearts-game-title" className="game-title">💖 Catch the Hearts</h2>
              <p className="game-instructions">
                Move the starlight catcher across 5 lanes using Left/Right buttons, Arrow keys, or by tapping any falling heart directly. Reach 16 points to complete the celebration!
              </p>
            </div>
            <div className="game-metrics-row">
              <span className="metric-pill" aria-live="polite">Score: <strong>{heartsScore}</strong> / 16</span>
              <button type="button" className="btn-primary btn-sm" onClick={startHeartsGame}>
                {heartsRunning ? 'Restart Round' : 'Start Game'}
              </button>
            </div>
          </div>

          {heartsCompleted ? (
            <div className="game-win-banner" role="status">
              <h3>🎉 Round Complete! You caught {heartsScore} points of birthday wishes!</h3>
              <button type="button" className="btn-secondary btn-sm" onClick={startHeartsGame}>
                Play Again
              </button>
            </div>
          ) : null}

          <div className="hearts-lanes-board" role="region" aria-label="Catch the Hearts 5-Lane Board">
            {[0, 1, 2, 3, 4].map((laneIdx) => {
              const laneHearts = fallingHearts.filter((h) => h.lane === laneIdx);
              const isCatcherHere = catcherLane === laneIdx;
              return (
                <div
                  key={`lane-${laneIdx}`}
                  className={`heart-lane-col ${isCatcherHere ? 'active-lane' : ''}`}
                  onClick={() => setCatcherLane(laneIdx)}
                >
                  <div className="lane-header">Lane {laneIdx + 1}</div>
                  <div className="lane-drop-zone">
                    {laneHearts.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        className="falling-heart-token"
                        style={{ top: `${h.row * 18}%` }}
                        onClick={() => catchHeartDirectly(h)}
                        aria-label={`Catch ${h.symbol} in lane ${laneIdx + 1} (+${h.points} points)`}
                      >
                        {h.symbol}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={`lane-catcher-btn ${isCatcherHere ? 'here' : ''}`}
                    onClick={() => setCatcherLane(laneIdx)}
                    aria-label={`Move catcher basket to lane ${laneIdx + 1}`}
                  >
                    {isCatcherHere ? '🧺 Catcher Here' : 'Move Here'}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="hearts-controls-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setCatcherLane(Math.max(0, catcherLane - 1))}
              disabled={catcherLane === 0}
            >
              ← Move Left
            </button>
            <span className="lane-indicator-text">Current Lane: {catcherLane + 1} of 5</span>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setCatcherLane(Math.min(4, catcherLane + 1))}
              disabled={catcherLane === 4}
            >
              Move Right →
            </button>
          </div>
        </section>
      ) : null}

      {activeTab === 'balloons' ? (
        <section className="game-stage-card" aria-labelledby="balloons-game-title">
          <div className="game-top-bar">
            <div>
              <h2 id="balloons-game-title" className="game-title">🎈 Pop the Birthday Balloons</h2>
              <p className="game-instructions">
                Tap, click, or press Enter on each balloon to pop it and release birthday sparkles. Golden balloons award +2 bonus points!
              </p>
            </div>
            <div className="game-metrics-row">
              <span className="metric-pill" aria-live="polite">
                Popped: <strong>{poppedCount}</strong> / {balloons.length} • Score: <strong>{balloonScore}</strong>
              </span>
              <button type="button" className="btn-secondary btn-sm" onClick={resetBalloons}>
                Reset Balloons
              </button>
            </div>
          </div>

          {allBalloonsPopped ? (
            <div className="game-win-banner" role="status">
              <h3>🎊 All 12 Birthday Balloons Popped! Final Score: {balloonScore} pts</h3>
              <button type="button" className="btn-primary btn-sm" onClick={resetBalloons}>
                Inflate New Balloons
              </button>
            </div>
          ) : null}

          <div className="balloons-grid" role="group" aria-label="Birthday Balloons">
            {balloons.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`balloon-target-btn ${b.popped ? 'popped' : 'inflated'}`}
                onClick={() => popBalloon(b.id)}
                disabled={b.popped}
                aria-label={b.popped ? `${b.label} (Popped)` : `Pop ${b.label} (+${b.points} points)`}
                style={{ '--balloon-color': b.color } as any}
              >
                <span className="balloon-visual" aria-hidden="true">
                  {b.popped ? '✨' : b.points > 1 ? '🌟' : '🎈'}
                </span>
                <span className="balloon-caption">
                  {b.popped ? 'Popped!' : `+${b.points} pt`}
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === 'memory' ? (
        <section className="game-stage-card" aria-labelledby="memory-game-title">
          <div className="game-top-bar">
            <div>
              <h2 id="memory-game-title" className="game-title">🃏 Keepsake Memory Match</h2>
              <p className="game-instructions">
                Flip two keepsake cards at a time to find all 6 matching birthday pairs. Rapid clicks are safely guarded so cards never get stuck.
              </p>
            </div>
            <div className="game-metrics-row">
              <span className="metric-pill" aria-live="polite">
                Pairs: <strong>{matchedCount / 2}</strong> / 6 • Moves: <strong>{moves}</strong>
              </span>
              <button type="button" className="btn-secondary btn-sm" onClick={resetMemoryGame}>
                Shuffle & Restart
              </button>
            </div>
          </div>

          {memoryComplete ? (
            <div className="game-win-banner" role="status">
              <h3>✨ All 6 Keepsake Pairs Matched in {moves} Moves!</h3>
              <button type="button" className="btn-primary btn-sm" onClick={resetMemoryGame}>
                Play Another Round
              </button>
            </div>
          ) : null}

          <div className="memory-cards-board" role="group" aria-label="Memory Match Cards">
            {cards.map((card, idx) => {
              const isRevealed = card.flipped || card.matched;
              return (
                <button
                  key={card.id}
                  type="button"
                  className={`memory-match-card ${isRevealed ? 'revealed' : 'hidden'} ${card.matched ? 'matched' : ''}`}
                  onClick={() => handleCardClick(card.id)}
                  aria-pressed={isRevealed}
                  aria-label={
                    isRevealed
                      ? `Card ${idx + 1}: ${card.label} (${card.matched ? 'Matched' : 'Flipped'})`
                      : `Card ${idx + 1}: Face down keepsake card`
                  }
                >
                  <span className="card-face-symbol" aria-hidden="true">
                    {isRevealed ? card.symbol : '✦'}
                  </span>
                  <span className="card-face-label">
                    {isRevealed ? card.label : `Card ${idx + 1}`}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {activeTab === 'stickers' ? (
        <section className="game-stage-card" aria-labelledby="sticker-studio-title">
          <div className="game-top-bar">
            <div>
              <h2 id="sticker-studio-title" className="game-title">🎨 Keepsake Sticker Studio</h2>
              <p className="game-instructions">
                Add stickers to the October 18 keepsake postcard below. Select any sticker to reposition, rotate, resize, or remove it using touch, mouse, or accessible buttons, then export your creation as a PNG!
              </p>
            </div>
            <div className="game-metrics-row">
              <button type="button" className="btn-primary btn-sm" onClick={exportStickerCardPng}>
                📸 Export Postcard as PNG
              </button>
              <button type="button" className="btn-ghost btn-sm" onClick={resetStickers}>
                Reset Canvas
              </button>
            </div>
          </div>

          <div className="sticker-palette-bar" role="group" aria-label="Add Stickers to Canvas">
            {SITE_CONTENT.stickerTemplates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                className="sticker-palette-btn"
                onClick={() => addSticker(tpl)}
              >
                <span aria-hidden="true">{tpl.symbol}</span>
                <span>+ {tpl.label}</span>
              </button>
            ))}
          </div>

          <div className="sticker-studio-workspace">
            <div
              className="sticker-postcard-canvas"
              role="region"
              aria-label="Interactive Postcard Canvas"
            >
              <div className="postcard-watermark">
                <span className="eyebrow-tag">08 OCTOBER KEEPSAKE POSTCARD</span>
                <h3>Happy Birthday, {SITE_CONTENT.recipientName} ✨</h3>
              </div>

              {stickers.map((st) => {
                const isSelected = st.uid === selectedUid;
                return (
                  <button
                    key={st.uid}
                    type="button"
                    className={`placed-sticker-btn ${isSelected ? 'selected' : ''}`}
                    style={{
                      left: `${st.x}%`,
                      top: `${st.y}%`,
                      transform: `translate(-50%, -50%) scale(${st.scale}) rotate(${st.rotation}deg)`
                    }}
                    onClick={() => setSelectedUid(st.uid)}
                    aria-label={`${st.label} at ${st.x}% horizontal, ${st.y}% vertical ${isSelected ? '(Selected)' : ''}`}
                  >
                    <span aria-hidden="true">{st.symbol}</span>
                  </button>
                );
              })}
            </div>

            <div className="sticker-inspector-panel" aria-label="Selected Sticker Controls">
              <h3 className="inspector-heading">
                {selectedSticker
                  ? `Editing: ${selectedSticker.symbol} ${selectedSticker.label}`
                  : 'Select a sticker on the card to adjust'}
              </h3>

              <div className="inspector-controls-grid">
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  disabled={!selectedSticker}
                  onClick={() =>
                    updateSelectedSticker((s) => ({ ...s, x: Math.max(10, s.x - 6) }))
                  }
                >
                  ← Move Left
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  disabled={!selectedSticker}
                  onClick={() =>
                    updateSelectedSticker((s) => ({ ...s, x: Math.min(90, s.x + 6) }))
                  }
                >
                  Move Right →
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  disabled={!selectedSticker}
                  onClick={() =>
                    updateSelectedSticker((s) => ({ ...s, y: Math.max(12, s.y - 6) }))
                  }
                >
                  ↑ Move Up
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  disabled={!selectedSticker}
                  onClick={() =>
                    updateSelectedSticker((s) => ({ ...s, y: Math.min(88, s.y + 6) }))
                  }
                >
                  ↓ Move Down
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  disabled={!selectedSticker}
                  onClick={() =>
                    updateSelectedSticker((s) => ({ ...s, rotation: s.rotation - 15 }))
                  }
                >
                  ↺ Rotate -15°
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  disabled={!selectedSticker}
                  onClick={() =>
                    updateSelectedSticker((s) => ({ ...s, rotation: s.rotation + 15 }))
                  }
                >
                  ↻ Rotate +15°
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  disabled={!selectedSticker}
                  onClick={() =>
                    updateSelectedSticker((s) => ({
                      ...s,
                      scale: Math.max(0.6, Number((s.scale - 0.15).toFixed(2)))
                    }))
                  }
                >
                  − Smaller
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  disabled={!selectedSticker}
                  onClick={() =>
                    updateSelectedSticker((s) => ({
                      ...s,
                      scale: Math.min(2.0, Number((s.scale + 0.15).toFixed(2)))
                    }))
                  }
                >
                  + Larger
                </button>
              </div>

              <button
                type="button"
                className="btn-ghost btn-sm delete-sticker-btn"
                disabled={!selectedSticker}
                onClick={removeSelectedSticker}
              >
                🗑️ Remove Selected Sticker
              </button>

              {exportStatus ? (
                <div className="export-result-box" role="status">
                  <p>{exportStatus}</p>
                  {exportedDataUrl ? (
                    <a
                      href={exportedDataUrl}
                      download="khushie-v3-postcard.png"
                      className="btn-primary btn-sm"
                    >
                      ⬇ Download PNG File
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
      {activeTab === 'wishes' ? (
        <section className="game-stage-card liquid-glass" aria-labelledby="wish-gen-title">
          <div className="game-top-bar">
            <div>
              <h2 id="wish-gen-title" className="game-title">✨ Custom Birthday Wish Generator</h2>
              <p className="game-instructions">
                Choose a mood below (Sweet, Funny, Emotional, or Cute) to generate a custom birthday card wish for Khushi!
              </p>
            </div>
          </div>

          <div className="sticker-palette-bar" role="group" aria-label="Wish Moods">
            {[
              { id: 'sweet', label: '💖 Sweet' },
              { id: 'funny', label: '😂 Funny' },
              { id: 'emotional', label: '🥹 Emotional' },
              { id: 'cute', label: '🥰 Cute' }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                className={`fun-tab-btn ${wishMood === m.id ? 'active' : ''}`}
                onClick={() => generateNewWish(m.id as any)}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="wish-reveal-banner">
            <span className="eyebrow-tag">GENERATED WISH • {wishMood.toUpperCase()} MOOD</span>
            <p className="sahil-blockquote" style={{ marginTop: '12px' }}>
              “{generatedWish}”
            </p>
            <div className="wish-banner-actions">
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => generateNewWish(wishMood)}
              >
                ↻ Generate Another {wishMood} Wish
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
