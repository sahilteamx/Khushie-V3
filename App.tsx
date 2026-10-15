import React from './lib/react-runtime';
import { useRouter } from './lib/router';
import { useReducedMotion } from './lib/motion';
import { useAestheticPreset } from './lib/theme-prompts';
import { SITE_CONTENT } from './data/content';
import { AmbientCanvas } from './components/AmbientCanvas';
import { Navbar } from './components/Navbar';
import { MusicPlayer } from './components/MusicPlayer';
import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { MessagePage } from './pages/MessagePage';
import { FunZonePage } from './pages/FunZonePage';
import { GiftsPage } from './pages/GiftsPage';
import { SurprisePage } from './pages/SurprisePage';
import { CakePage } from './pages/CakePage';
import { FinalePage } from './pages/FinalePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const { currentPath, isKnownRoute, navigate } = useRouter();
  const { reducedMotion, toggleReducedMotion } = useReducedMotion();
  const { preset, setPreset } = useAestheticPreset();

  const renderRouteView = () => {
    if (!isKnownRoute) {
      return <NotFoundPage currentPath={currentPath} onNavigate={navigate} />;
    }
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            onNavigate={navigate}
            reducedMotion={reducedMotion}
            aesthetic={preset}
            onChangeAesthetic={setPreset}
          />
        );
      case '/story':
        return <StoryPage onNavigate={navigate} reducedMotion={reducedMotion} />;
      case '/memories':
        return <MemoriesPage onNavigate={navigate} />;
      case '/message':
        return <MessagePage onNavigate={navigate} />;
      case '/fun-zone':
        return <FunZonePage onNavigate={navigate} reducedMotion={reducedMotion} />;
      case '/gifts':
        return <GiftsPage onNavigate={navigate} />;
      case '/surprise':
        return <SurprisePage onNavigate={navigate} />;
      case '/cake':
        return <CakePage onNavigate={navigate} reducedMotion={reducedMotion} />;
      case '/finale':
        return <FinalePage onNavigate={navigate} />;
      default:
        return <NotFoundPage currentPath={currentPath} onNavigate={navigate} />;
    }
  };

  return (
    <div className={`app-viewport ${reducedMotion ? 'reduced-motion-mode' : ''}`} data-aesthetic={preset}>
      <AmbientCanvas reducedMotion={reducedMotion} />

      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        aesthetic={preset}
        onChangeAesthetic={setPreset}
      />

      <main id="main-content" className="main-stage" tabIndex={-1}>
        {renderRouteView()}
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="footer-inner">
          <p className="footer-brand">
            ✦ <strong>{SITE_CONTENT.projectName}</strong> — Crafted for {SITE_CONTENT.recipientName} ({SITE_CONTENT.birthdayDisplay})
          </p>
          <p className="footer-note">
            MotionSites Liquid-Glass & DesignPrompts.dev UI System • Motion Primitives Micro-Interactions • GitHub Pages Ready
          </p>
        </div>
      </footer>

      <MusicPlayer />
    </div>
  );
}
