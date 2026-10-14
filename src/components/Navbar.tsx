import React, { useState } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';
import { RoutePath } from '../types/content';
import { AestheticPresetId, AESTHETIC_PRESETS } from '../lib/theme-prompts';
import { ScrollProgressBar } from './MotionPrimitives';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  aesthetic: AestheticPresetId;
  onChangeAesthetic: (next: AestheticPresetId) => void;
}

export function Navbar({
  currentPath,
  onNavigate,
  reducedMotion,
  onToggleReducedMotion,
  aesthetic,
  onChangeAesthetic
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleLinkClick = (e: Event, path: RoutePath) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header className="site-header" role="banner">
      <ScrollProgressBar />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="header-inner">
        <div className="motionsites-nav-pill liquid-glass">
          <a
            href="#/"
            className="brand-link"
            onClick={(e: Event) => handleLinkClick(e, '/')}
            aria-label="Khushie V3 Home"
          >
            {/* Exact Four-Lobed Pinwheel SVG from MotionSites AI Aether Lane Prompt */}
            <svg
              viewBox="0 0 256 256"
              className="brand-pinwheel-svg"
              aria-hidden="true"
            >
              <path
                d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z"
                fill="currentColor"
              />
            </svg>
            <span className="brand-text">
              <span className="brand-name">{SITE_CONTENT.projectName}</span>
              <span className="brand-date">{SITE_CONTENT.birthdayDisplay}</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="nav-list">
              {SITE_CONTENT.navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <li key={item.path} className="nav-item">
                    <a
                      href={`#${item.path}`}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e: Event) => handleLinkClick(e, item.path)}
                    >
                      <span>{item.shortLabel}</span>
                      {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <label htmlFor="aesthetic-preset-select" className="sr-only">
              Select UI Design Prompt Style
            </label>
            <select
              id="aesthetic-preset-select"
              className="aesthetic-select"
              value={aesthetic}
              onChange={(e: Event) =>
                onChangeAesthetic((e.target as HTMLSelectElement).value as AestheticPresetId)
              }
              aria-label="DesignPrompts UI Style Preset"
              title="Switch between MotionSites & DesignPrompts.dev UI styles"
            >
              {AESTHETIC_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  ✦ {p.shortLabel}
                </option>
              ))}
            </select>

            <button
              type="button"
              className={`motion-toggle-btn ${reducedMotion ? 'active' : ''}`}
              onClick={onToggleReducedMotion}
              aria-pressed={reducedMotion}
              title={reducedMotion ? 'Reduced motion is active' : 'Enable reduced motion'}
            >
              <span aria-hidden="true">{reducedMotion ? '◐' : '✧'}</span>
              <span className="motion-toggle-label">
                {reducedMotion ? 'Calm Mode: ON' : 'Calm Mode'}
              </span>
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="menu-icon" aria-hidden="true">
                {mobileOpen ? '✕' : '☰'}
              </span>
              <span className="menu-btn-text">{mobileOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav-drawer"
          className="mobile-nav-drawer liquid-glass"
          aria-label="Mobile Navigation"
        >
          <div className="mobile-style-switcher">
            <span className="mobile-style-label">UI Design Prompt Style:</span>
            <div className="mobile-style-pills">
              {AESTHETIC_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`filter-pill-btn ${aesthetic === p.id ? 'active' : ''}`}
                  onClick={() => onChangeAesthetic(p.id)}
                >
                  {p.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <ul className="mobile-nav-list">
            {SITE_CONTENT.navItems.map((item, idx) => {
              const isActive = currentPath === item.path;
              return (
                <li
                  key={item.path}
                  className="mobile-stagger-item"
                  style={{ '--stagger-idx': idx } as any}
                >
                  <a
                    href={`#${item.path}`}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e: Event) => handleLinkClick(e, item.path)}
                  >
                    <div className="mobile-nav-row">
                      <span className="mobile-nav-title">{item.label}</span>
                      {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                    </div>
                    <span className="mobile-nav-desc">{item.description}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
