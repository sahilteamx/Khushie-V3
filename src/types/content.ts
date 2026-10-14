export type RoutePath =
  | '/'
  | '/story'
  | '/memories'
  | '/message'
  | '/fun-zone'
  | '/gifts'
  | '/surprise'
  | '/cake'
  | '/finale';

export interface NavItem {
  path: RoutePath;
  label: string;
  shortLabel: string;
  badge?: string;
  description: string;
}

export interface StoryChapter {
  id: string;
  number: string;
  approvedTitle: string;
  emoji: string;
  themeAccent: string;
  verifiedStatus: 'verified-structure-customizable-slot';
  summaryHeadline: string;
  narrativeBody: string;
  customSlotNote: string;
  imageWebp: string;
  imageJpg: string;
  imageAlt: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  category: 'keepsake' | 'celebration' | 'constellation' | 'milestone';
  aspect: 'portrait' | 'landscape';
  imageWebp: string;
  imageJpg: string;
  altText: string;
  captionSlot: string;
  provenanceNote: string;
}

export interface PersonalSectionItem {
  id: string;
  categoryTitle: string;
  subtitle: string;
  verifiedStatus: 'documented-slot' | 'verified-greeting';
  paragraphs: string[];
  editHint: string;
}

export interface GiftItem {
  id: string;
  ribbonLabel: string;
  title: string;
  subtitle: string;
  revealHeading: string;
  revealBody: string;
  accentColor: string;
  iconSymbol: string;
}

export interface StickerTemplate {
  id: string;
  label: string;
  symbol: string;
  color: string;
}

export interface SiteConfig {
  projectName: string;
  version: string;
  recipientName: string;
  recipientNickname: string;
  birthdayMonth: number; // 10 (October)
  birthdayDay: number;   // 18
  birthdayDisplay: string;
  unlockPin: string;     // "1810"
  basePath: string;
  audioTrackPath: string;
  audioFallbackPath: string;
  audioTrackTitle: string;
  heroGreeting: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  navItems: NavItem[];
  storyChapters: StoryChapter[];
  memories: MemoryItem[];
  personalSections: PersonalSectionItem[];
  gifts: GiftItem[];
  stickerTemplates: StickerTemplate[];
}
