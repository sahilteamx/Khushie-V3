import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { PhoneChatBubble, RoutePath } from '../types/content';
import { SpotlightCard } from '../components/MotionPrimitives';

interface MessagePageProps {
  onNavigate: (path: RoutePath) => void;
}

interface WallWish {
  id: number;
  name: string;
  message: string;
  date: string;
}

const WALL_STORAGE_KEY = 'khushie_v3_wish_wall';

const DEFAULT_WALL_WISHES: WallWish[] = [
  {
    id: 1,
    name: 'Sahil ❤️',
    message: 'Happy Birthday meri Khushi! Hamesha aise hi smile karti rahiye, Meri Bacchii ✨💓',
    date: '08 Oct 2026'
  }
];

function loadWallWishes(): WallWish[] {
  if (typeof window === 'undefined') return DEFAULT_WALL_WISHES;
  try {
    const raw = window.localStorage.getItem(WALL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_e) {}
  return DEFAULT_WALL_WISHES;
}

export function MessagePage({ onNavigate }: MessagePageProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(true);
  const [chatMessages, setChatMessages] = useState<PhoneChatBubble[]>(() => SITE_CONTENT.phoneInitialChat);
  const [replyInput, setReplyInput] = useState<string>('');
  const [wallWishes, setWallWishes] = useState<WallWish[]>(() => loadWallWishes());
  const [wallName, setWallName] = useState<string>('');
  const [wallText, setWallText] = useState<string>('');
  const [wallStatus, setWallStatus] = useState<string>('');

  const handleSendPhoneReply = (e: Event) => {
    e.preventDefault();
    const trimmed = replyInput.trim();
    if (!trimmed) return;
    const userMsg: PhoneChatBubble = {
      id: `user-${Date.now()}`,
      sender: 'khushi',
      text: trimmed,
      time: 'Just now'
    };
    const autoReply: PhoneChatBubble = {
      id: `sahil-${Date.now() + 1}`,
      sender: 'sahil',
      text: 'Aww Meri Bacchiiiiiiiiiiiiiiiiiii 🥰❤️ Smile aa gayi na face pe? Always yours, Sahil ✨',
      time: 'Just now'
    };
    setChatMessages((prev) => [...prev, userMsg, autoReply]);
    setReplyInput('');
  };

  const handleAddWallWish = (e: Event) => {
    e.preventDefault();
    if (!wallName.trim() || !wallText.trim()) {
      setWallStatus('Please enter both your name and birthday wish.');
      return;
    }
    const newWish: WallWish = {
      id: Date.now(),
      name: wallName.trim().slice(0, 80),
      message: wallText.trim().slice(0, 1000),
      date: '08 Oct Celebration'
    };
    const next = [newWish, ...wallWishes];
    setWallWishes(next);
    try {
      window.localStorage.setItem(WALL_STORAGE_KEY, JSON.stringify(next));
    } catch (_e) {}
    setWallName('');
    setWallText('');
    setWallStatus('✓ Your birthday wish has been pinned to Khushi’s wall!');
  };

  return (
    <div className="page-container message-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">A PERSONAL LETTER & 3D IPHONE CHAT • FOR KHUSHI</span>
        <h1 className="page-main-title">A Letter for {SITE_CONTENT.recipientName} ❤️</h1>
        <p className="page-main-subtitle">
          Every word written by Sahil for your birthday—accompanied by an interactive 3D iPhone chat and a static-safe Birthday Wish Wall.
        </p>

        <div className="envelope-toggle-bar">
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={() => setEnvelopeOpen(!envelopeOpen)}
            aria-expanded={envelopeOpen}
          >
            {envelopeOpen ? '✉️ Fold 3D Wax-Sealed Envelope' : '💌 Break Seal & Open 3D Envelope'}
          </button>
        </div>
      </header>

      {/* Part 1: 3D Wax-Sealed Envelope & Full Verbatim Letter */}
      {!envelopeOpen ? (
        <div className="wax-envelope-closed envelope-3d-card liquid-glass">
          <div className="wax-seal-emblem" aria-hidden="true">K • 08</div>
          <h2>Dear Khushi, ❤️</h2>
          <p>Tap below to break the golden wax seal and unfold Sahil’s complete six-part birthday letter.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setEnvelopeOpen(true)}
          >
            Break Seal & Read Letter 💌
          </button>
        </div>
      ) : (
        <div className="letter-manuscript-grid">
          {SITE_CONTENT.personalSections.map((sec, idx) => (
            <SpotlightCard key={sec.id} className="letter-section-card" tilt={true}>
              <div className="letter-card-header">
                <div>
                  <span className="letter-section-num">PART 0{idx + 1}</span>
                  <h2 className="letter-section-title">{sec.categoryTitle}</h2>
                  <p className="letter-section-sub">{sec.subtitle}</p>
                </div>
              </div>

              <div className="letter-paragraphs">
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="letter-body-p">
                    {para}
                  </p>
                ))}
              </div>

              <footer className="letter-card-footer">
                <span className="provenance-chip">Always yours, Sahil ❤️</span>
              </footer>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Part 2: Interactive 3D iPhone 16 Pro iMessage Chat (Inspired by sujal_mehra 54.3s & final-celebration.js) */}
      <section className="iphone-3d-section" aria-labelledby="iphone-chat-heading">
        <div className="iphone-3d-grid">
          <div className="iphone-copy-col">
            <span className="eyebrow-tag">3D INTERACTIVE SMARTPHONE REVEAL</span>
            <h2 id="iphone-chat-heading" className="section-title">
              One Last Thing… Live on Your 3D Phone 📱❤️
            </h2>
            <p className="section-subtitle">
              Read Sahil’s direct messages inside the 3D iPhone screen—and type a reply at the bottom to see an instant response!
            </p>
          </div>

          <div className="iphone-3d-bezel" role="region" aria-label="Interactive 3D iPhone Chat with Sahil">
            <div className="iphone-dynamic-island" aria-hidden="true" />
            <div className="iphone-chat-header">
              <div className="iphone-avatar">S❤️</div>
              <div className="iphone-contact-meta">
                <strong>My love ❤️ (Sahil)</strong>
                <span>iMessage • online now</span>
              </div>
            </div>

            <div className="iphone-messages-scroll" aria-live="polite">
              {chatMessages.map((m) => (
                <div
                  key={m.id}
                  className={`iphone-bubble-row ${m.sender === 'khushi' ? 'outgoing' : 'incoming'}`}
                >
                  <div className="iphone-bubble">
                    <p>{m.text}</p>
                    <small>{m.time}</small>
                  </div>
                </div>
              ))}
            </div>

            <form className="iphone-input-bar" onSubmit={handleSendPhoneReply}>
              <label htmlFor="iphone-reply-input" className="sr-only">
                Type a reply to Sahil
              </label>
              <input
                id="iphone-reply-input"
                type="text"
                placeholder="Happpppyyyy birthday thank you..."
                value={replyInput}
                onChange={(e: Event) => setReplyInput((e.target as HTMLInputElement).value)}
                className="iphone-text-input"
              />
              <button type="submit" className="iphone-send-btn" aria-label="Send message">
                ↑
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Part 3: Static-Safe Birthday Wish Wall (100% GitHub Pages Compatible — Zero PHP crashes!) */}
      <section className="wish-wall-section liquid-glass" aria-labelledby="wish-wall-heading">
        <div className="section-header-block">
          <span className="eyebrow-tag">LEAVE A LITTLE SOMETHING • BIRTHDAY WISH WALL</span>
          <h2 id="wish-wall-heading" className="section-title">
            Send a Birthday Message for Khushi ✨
          </h2>
          <p className="section-subtitle">
            Leave a birthday wish below—saved directly in your browser with zero server or PHP errors on GitHub Pages.
          </p>
        </div>

        <form className="wish-wall-form" onSubmit={handleAddWallWish}>
          <div className="wish-wall-inputs">
            <input
              type="text"
              placeholder="Your Name"
              value={wallName}
              onChange={(e: Event) => setWallName((e.target as HTMLInputElement).value)}
              className="pin-input"
              aria-label="Your Name"
            />
            <input
              type="text"
              placeholder="Write your birthday wish for Khushi…"
              value={wallText}
              onChange={(e: Event) => setWallText((e.target as HTMLInputElement).value)}
              className="pin-input"
              aria-label="Birthday Wish Message"
            />
            <button type="submit" className="btn-primary btn-sm">
              Post Wish ↗
            </button>
          </div>
          {wallStatus ? <p className="mic-feedback-note" role="status">{wallStatus}</p> : null}
        </form>

        <div className="wish-wall-cards">
          {wallWishes.map((w) => (
            <article key={w.id} className="wish-wall-item">
              <div className="wish-wall-item-head">
                <strong>{w.name}</strong>
                <span>{w.date}</span>
              </div>
              <p>{w.message}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="page-footer-cta">
        <button type="button" className="btn-primary" onClick={() => onNavigate('/fun-zone')}>
          Enter Birthday Fun Zone 🎮 →
        </button>
      </div>
    </div>
  );
}
