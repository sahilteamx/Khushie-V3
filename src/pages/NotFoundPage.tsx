import React from '../lib/react-runtime';
import { RoutePath } from '../types/content';

interface NotFoundPageProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

export function NotFoundPage({ currentPath, onNavigate }: NotFoundPageProps) {
  return (
    <div className="page-container not-found-page">
      <section className="not-found-card" role="alert">
        <span className="eyebrow-tag">404 • DESTINATION NOT FOUND</span>
        <h1 className="page-main-title">This Starlight Path Does Not Exist</h1>
        <p className="page-main-subtitle">
          The requested route (<code>{currentPath}</code>) could not be found in Khushie V3. Use the buttons below to return to the celebration.
        </p>
        <div className="hero-cta-row" style={{ justifyContent: 'center' }}>
          <button type="button" className="btn-primary" onClick={() => onNavigate('/')}>
            Return to Home Scene →
          </button>
          <button type="button" className="btn-secondary" onClick={() => onNavigate('/story')}>
            Explore Our Story
          </button>
        </div>
      </section>
    </div>
  );
}
