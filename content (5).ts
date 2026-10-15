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
  shortTitle: string;
  emoji: string;
  eraLabel: string;
  dateSubtitle: string;
  themeAccent: string;
  paragraphs: string[];
  imageWebp: string;
  imageJpg: string;
  imageAlt: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  polaroidTag: string;
  category: 'keepsake' | 'childhood' | 'those-days' | 'present' | 'future';
  aspect: 'portrait' | 'landscape';
  rotationDeg: number;
  imageWebp: string;
  imageJpg: string;
  altText: string;
  caption: string;
}

export interface PersonalSectionItem {
  id: string;
  categoryTitle: string;
  subtitle: string;
  paragraphs: string[];
}

export interface GiftItem {
  id: string;
  number: string;
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

export interface PhoneChatBubble {
  id: string;
  sender: 'sahil' | 'khushi';
  text: string;
  time: string;
}

export interface SiteConfig {
  projectName: string;
  brandSubtitle: string;
  version: string;
  recipientName: string;
  recipientNickname: string;
  senderName: string;
  birthdayIso: string;   // "2026-10-08T00:00:00+05:30"
  birthdayMonth: number; // 10 (October)
  birthdayDay: number;   // 8 (08 October)
  birthdayDisplay: string;
  acceptedPins: string[]; // Hidden in UI — never rendered as plain text
  basePath: string;
  audioTrackPath: string;
  audioFallbackPath: string;
  audioTrackTitle: string;
  youtubeUrl: string;
  heroGreeting: string;
  heroTitle: string;
  heroNicknamesLine: string;
  heroTeaserLine: string;
  heroQuote: string;
  heroQuoteAuthor: string;
  butterflySecretNote: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  navItems: NavItem[];
  storyChapters: StoryChapter[];
  memories: MemoryItem[];
  personalSections: PersonalSectionItem[];
  gifts: GiftItem[];
  stickerTemplates: StickerTemplate[];
  phoneInitialChat: PhoneChatBubble[];
}
