import { useState, useEffect, useCallback } from './react-runtime';

export type AestheticPresetId = 'lumenvox-glass' | 'art-deco-noir' | 'modern-kinetic' | 'editorial-monochrome';

export interface AestheticPreset {
  id: AestheticPresetId;
  label: string;
  shortLabel: string;
  sourceRef: string;
  description: string;
}

export const AESTHETIC_PRESETS: AestheticPreset[] = [
  {
    id: 'lumenvox-glass',
    label: 'Lumenvox Liquid Glass (MotionSites)',
    shortLabel: 'Liquid Glass',
    sourceRef: 'motionsites.ai/lesson/build-animated-website-with-motionsites',
    description: 'Deep obsidian-plum (#0A061A) with specular masked .liquid-glass surfaces, warm blush rose, and champagne gold.'
  },
  {
    id: 'art-deco-noir',
    label: 'Art Deco Dark (designprompts.dev #10)',
    shortLabel: 'Art Deco',
    sourceRef: 'designprompts.dev (Style 10: Art Deco Dark)',
    description: 'Gilded champagne-gold geometry (#D4AF37), crisp double-hairline borders, and high-fashion editorial serif hierarchy.'
  },
  {
    id: 'modern-kinetic',
    label: 'Modern Dark Kinetic (MotionSites Aether Lane)',
    shortLabel: 'Modern Dark',
    sourceRef: 'motionsites.ai/lesson/build-animated-website-with-ai + designprompts.dev #03',
    description: 'Midnight navy (#020319) paired with periwinkle glow (#8F9EFF), translucent pill nav (#312D7C/40%), and gradient-clipped titles.'
  },
  {
    id: 'editorial-monochrome',
    label: 'Editorial Monochrome (designprompts.dev #01)',
    shortLabel: 'Monochrome',
    sourceRef: 'designprompts.dev/monochrome',
    description: 'Austere architectural contrast built on pure obsidian and alabaster white with oversized serif typography and sharp framing.'
  }
];

const THEME_STORAGE_KEY = 'khushie_v3_aesthetic_preset';

export function getInitialPreset(): AestheticPresetId {
  if (typeof window === 'undefined') return 'lumenvox-glass';
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY) as AestheticPresetId | null;
    if (saved && AESTHETIC_PRESETS.some((p) => p.id === saved)) {
      return saved;
    }
  } catch (_e) {
    // Ignore storage error
  }
  return 'lumenvox-glass';
}

export function useAestheticPreset() {
  const [preset, setPresetState] = useState<AestheticPresetId>(() => getInitialPreset());

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-aesthetic', preset);
    }
    const onCustom = (e: Event) => {
      const next = (e as CustomEvent<AestheticPresetId>).detail;
      if (next) setPresetState(next);
    };
    window.addEventListener('khushie:aesthetic-change', onCustom);
    return () => window.removeEventListener('khushie:aesthetic-change', onCustom);
  }, [preset]);

  const setPreset = useCallback((next: AestheticPresetId) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch (_e) {
      // Ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-aesthetic', next);
    }
    window.dispatchEvent(new CustomEvent('khushie:aesthetic-change', { detail: next }));
  }, []);

  return { preset, setPreset, presets: AESTHETIC_PRESETS };
}
