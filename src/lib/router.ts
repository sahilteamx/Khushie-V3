import { useState, useEffect, useCallback } from './react-runtime';
import { RoutePath } from '../types/content';
import { SITE_CONTENT } from '../data/content';

export const KNOWN_ROUTES: Set<string> = new Set([
  '/',
  '/story',
  '/memories',
  '/message',
  '/fun-zone',
  '/gifts',
  '/surprise',
  '/cake',
  '/finale'
]);

/**
 * Resolves the active logical route from:
 * 1. Hash route (`#/story`) — primary GitHub Pages subdirectory-safe navigation
 * 2. Query parameter (`?route=/story`) — populated by `404.html` on direct SPA refresh
 * 3. Direct pathname relative to repository base
 */
export function resolveCurrentPath(): string {
  if (typeof window === 'undefined') return '/';

  // 1. Check ?route= parameter from 404.html fallback
  const params = new URLSearchParams(window.location.search);
  const queryRoute = params.get('route');
  if (queryRoute) {
    const normalized = queryRoute.startsWith('/') ? queryRoute : `/${queryRoute}`;
    return normalized;
  }

  // 2. Check window.location.hash (e.g. "#/story" or "#story")
  const rawHash = window.location.hash;
  if (rawHash && rawHash.length > 1) {
    const cleaned = rawHash.replace(/^#/, '');
    if (cleaned.startsWith('/')) {
      return cleaned === '' ? '/' : cleaned;
    }
  }

  // 3. Check pathname for direct subroutes if not index.html
  const pathname = window.location.pathname || '/';
  for (const known of Array.from(KNOWN_ROUTES)) {
    if (known !== '/' && (pathname === known || pathname.endsWith(known))) {
      return known;
    }
  }

  return '/';
}

export function navigateTo(path: RoutePath | string): void {
  if (typeof window === 'undefined') return;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const targetHash = normalized === '/' ? '#/' : `#${normalized}`;
  if (window.location.hash !== targetHash) {
    window.location.hash = targetHash;
  } else {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => resolveCurrentPath());

  useEffect(() => {
    const syncRoute = () => {
      const next = resolveCurrentPath();
      setCurrentPath(next);

      // Update document title
      const navMatch = SITE_CONTENT.navItems.find((item) => item.path === next);
      if (navMatch) {
        document.title = `${navMatch.label} — ${SITE_CONTENT.projectName} (${SITE_CONTENT.birthdayDisplay})`;
      } else {
        document.title = `Page Not Found — ${SITE_CONTENT.projectName}`;
      }

      // Smooth scroll top unless reduced motion
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const navigate = useCallback((to: RoutePath | string) => {
    navigateTo(to);
  }, []);

  const isKnownRoute = KNOWN_ROUTES.has(currentPath);

  return {
    currentPath,
    isKnownRoute,
    navigate
  };
}
