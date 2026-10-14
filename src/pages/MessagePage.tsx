import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';

interface MessagePageProps {
  onNavigate: (path: RoutePath) => void;
}

const CUSTOM_NOTES_KEY = 'khushie_v3_custom_notes';

function loadCustomNotes(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(CUSTOM_NOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_e) {
    return {};
  }
}

export function MessagePage({ onNavigate }: MessagePageProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<Record<string, string>>(() => loadCustomNotes());

  const startEditing = (sectionId: string, currentText: string) => {
    setEditingId(sectionId);
    setDraftText(currentText);
  };

  const saveCustomNote = (sectionId: string) => {
    const updated = { ...customNotes, [sectionId]: draftText };
    setCustomNotes(updated);
    try {
      window.localStorage.setItem(CUSTOM_NOTES_KEY, JSON.stringify(updated));
    } catch (_e) {
      // Ignore storage error
    }
    setEditingId(null);
  };

  const resetCustomNote = (sectionId: string) => {
    const updated = { ...customNotes };
    delete updated[sectionId];
    setCustomNotes(updated);
    try {
      window.localStorage.setItem(CUSTOM_NOTES_KEY, JSON.stringify(updated));
    } catch (_e) {
      // Ignore
    }
    setEditingId(null);
  };

  return (
    <div className="page-container message-page">
      <header className="page-hero-header">
        <span className="eyebrow-tag">PERSONAL BIRTHDAY LETTER & 9 CURATED SECTIONS</span>
        <h1 className="page-main-title">A Letter for {SITE_CONTENT.recipientName}</h1>
        <p className="page-main-subtitle">
          Every section below is grounded in verified project structure—with zero fabricated memories. You can also personalize any slot directly in your browser or in <code>src/data/content.ts</code>.
        </p>

        <div className="envelope-toggle-bar">
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={() => setEnvelopeOpen(!envelopeOpen)}
            aria-expanded={envelopeOpen}
          >
            {envelopeOpen ? '✉️ Fold Wax-Sealed Envelope' : '💌 Open Wax-Sealed Envelope'}
          </button>
        </div>
      </header>

      {!envelopeOpen ? (
        <div className="wax-envelope-closed">
          <div className="wax-seal-emblem" aria-hidden="true">K • 18</div>
          <h2>For Khushi — October 18 Keepsake Letter</h2>
          <p>Tap below to break the wax seal and open the full nine-part birthday letter.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setEnvelopeOpen(true)}
          >
            Break Seal & Read Letter
          </button>
        </div>
      ) : (
        <div className="letter-manuscript-grid">
          {SITE_CONTENT.personalSections.map((sec, idx) => {
            const customOverride = customNotes[sec.id];
            const displayParagraphs = customOverride
              ? customOverride.split('\n').filter(Boolean)
              : sec.paragraphs;

            return (
              <article key={sec.id} className="letter-section-card">
                <div className="letter-card-header">
                  <div>
                    <span className="letter-section-num">SECTION 0{idx + 1}</span>
                    <h2 className="letter-section-title">{sec.categoryTitle}</h2>
                    <p className="letter-section-sub">{sec.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    className="btn-ghost btn-sm"
                    onClick={() =>
                      startEditing(sec.id, customOverride || sec.paragraphs.join('\n\n'))
                    }
                  >
                    ✎ Customize Slot
                  </button>
                </div>

                {editingId === sec.id ? (
                  <div className="slot-editor-box">
                    <label htmlFor={`editor-${sec.id}`} className="slot-editor-label">
                      Personalize "{sec.categoryTitle}" (saved locally in your browser):
                    </label>
                    <textarea
                      id={`editor-${sec.id}`}
                      rows={4}
                      value={draftText}
                      onChange={(e: Event) =>
                        setDraftText((e.target as HTMLTextAreaElement).value)
                      }
                      className="slot-textarea"
                    />
                    <div className="slot-editor-actions">
                      <button
                        type="button"
                        className="btn-primary btn-sm"
                        onClick={() => saveCustomNote(sec.id)}
                      >
                        Save Note
                      </button>
                      <button
                        type="button"
                        className="btn-ghost btn-sm"
                        onClick={() => resetCustomNote(sec.id)}
                      >
                        Restore Default
                      </button>
                      <button
                        type="button"
                        className="btn-ghost btn-sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="letter-paragraphs">
                    {displayParagraphs.map((para, pIdx) => (
                      <p key={pIdx} className="letter-body-p">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                <footer className="letter-card-footer">
                  <span className="provenance-chip">
                    {customOverride ? '✓ Personalized in Browser' : sec.editHint}
                  </span>
                </footer>
              </article>
            );
          })}
        </div>
      )}

      <div className="page-footer-cta">
        <button type="button" className="btn-primary" onClick={() => onNavigate('/fun-zone')}>
          Enter Birthday Fun Zone 🎮 →
        </button>
      </div>
    </div>
  );
}
