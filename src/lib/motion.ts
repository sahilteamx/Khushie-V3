import { useState, useEffect, useCallback } from './react-runtime';

const STORAGE_KEY = 'khushie_v3_reduced_motion';

export function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') return true;
    if (saved === 'false') return false;
  } catch (_e) {
    // Ignore storage access errors
  }
  if (window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => getInitialReducedMotion());

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('reduced-motion', reducedMotion);
    }
    const handleCustom = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail;
      setReducedMotion(Boolean(detail));
    };
    window.addEventListener('khushie:reduced-motion', handleCustom);
    return () => window.removeEventListener('khushie:reduced-motion', handleCustom);
  }, [reducedMotion]);

  const toggleReducedMotion = useCallback(() => {
    const next = !reducedMotion;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    } catch (_e) {
      // Ignore storage errors
    }
    document.body.classList.toggle('reduced-motion', next);
    window.dispatchEvent(new CustomEvent('khushie:reduced-motion', { detail: next }));
  }, [reducedMotion]);

  return { reducedMotion, toggleReducedMotion };
}
