import { SiteConfig } from '../types/content';

/**
 * CENTRALIZED SOURCE-OF-TRUTH CONTENT CONFIGURATION (Khushie V3)
 *
 * PERSONAL-CONTENT SAFETY & PROVENANCE POLICY:
 * 1. Verified facts from project inputs:
 *    - Recipient Name: Khushi ("Khushie")
 *    - Celebration Date: October 18 (PIN: 1810)
 *    - Approved Four Story Chapter Titles:
 *      01 — The Little Us 🌱
 *      02 — Those Days ✨
 *      03 — Right Here, Right Now ❤️
 *      04 — The Chapter Yet to Come 💍
 * 2. Zero Fabricated Memories:
 *    Where specific personal anecdotes, private inside jokes, or shared dates were not
 *    supplied in verified text files, this module provides refined, honest editorial copy
 *    and clearly marked customizable content slots. No fake dates, locations, or
 *    unverified relationship claims are asserted as fact.
 * 3. How to Personalize:
 *    Edit the strings in `SITE_CONTENT` below (or use the interactive Personalize Drawer
 *    on the `/message` page) to insert your own private notes before or after publishing.
 */
export const SITE_CONTENT: SiteConfig = {
  projectName: 'Khushie V3',
  version: '3.0.0',
  recipientName: 'Khushi',
  recipientNickname: 'Khushie',
  birthdayMonth: 10,
  birthdayDay: 18,
  birthdayDisplay: 'October 18',
  unlockPin: '1810',
  basePath: './',
  audioTrackPath: './public/audio/birthday.mp3',
  audioFallbackPath: './audio/birthday.mp3',
  audioTrackTitle: 'Celesta Birthday Nocturne (Instrumental)',
  heroGreeting: 'OCTOBER 18 • CINEMATIC KEEPSAKE EDITION',
  heroTitle: 'Happy Birthday, Khushi',
  heroSubtitle:
    'An intimate, dark-cinematic birthday experience crafted with starlight, interactive keepsakes, and four chapters of celebration.',
  primaryCtaLabel: 'Begin the Experience',
  secondaryCtaLabel: 'Explore Our Story',

  navItems: [
    {
      path: '/',
      label: 'Home',
      shortLabel: 'Home',
      description: 'Cinematic intro, October 18 countdown, and keepsake entry'
    },
    {
      path: '/story',
      label: 'Our Story',
      shortLabel: 'Story',
      badge: '4 Chapters',
      description: 'Four-chapter interactive timeline from beginnings to tomorrow'
    },
    {
      path: '/memories',
      label: 'Memories',
      shortLabel: 'Gallery',
      description: 'Editorial keepsake gallery with full-screen lightbox viewer'
    },
    {
      path: '/message',
      label: 'Message',
      shortLabel: 'Letter',
      description: 'Birthday letter and nine curated personal note sections'
    },
    {
      path: '/fun-zone',
      label: 'Fun Zone',
      shortLabel: 'Fun Zone',
      badge: '5 Games',
      description: 'Interactive birthday cake, arcade mini-games, and Sticker Studio'
    },
    {
      path: '/gifts',
      label: 'Gifts',
      shortLabel: 'Gifts',
      description: 'Three interactive wrapped keepsake boxes to unbox'
    },
    {
      path: '/surprise',
      label: 'Surprise',
      shortLabel: 'Surprise',
      description: 'Starlight constellation lock and three-stage reveal moment'
    },
    {
      path: '/cake',
      label: 'Cake',
      shortLabel: 'Cake',
      description: 'Interactive candle lighting, wish moment, and cake cutting'
    },
    {
      path: '/finale',
      label: 'Finale',
      shortLabel: 'Finale',
      description: 'Closing sky-lantern tribute and chapter revisit hub'
    }
  ],

  storyChapters: [
    {
      id: 'chapter-01',
      number: '01',
      approvedTitle: '01 — The Little Us 🌱',
      emoji: '🌱',
      themeAccent: '#E88D9E',
      verifiedStatus: 'verified-structure-customizable-slot',
      summaryHeadline: 'Where quiet beginnings first took root',
      narrativeBody:
        'Every meaningful story starts with small, unassuming moments—the early conversations, effortless smiles, and the quiet comfort of discovering someone whose presence makes ordinary days feel lighter. This first chapter honors those foundational beginnings.',
      customSlotNote:
        'Personal Memory Slot 01: Update `storyChapters[0].narrativeBody` in `src/data/content.ts` to add your specific first-meeting date or early memory.',
      imageWebp: './public/images/story/chapter-01.webp',
      imageJpg: './public/images/story/chapter-01.jpg',
      imageAlt: 'Chapter 01 artwork featuring botanical concentric rings and warm rose glow'
    },
    {
      id: 'chapter-02',
      number: '02',
      approvedTitle: '02 — Those Days ✨',
      emoji: '✨',
      themeAccent: '#F2D0A9',
      verifiedStatus: 'verified-structure-customizable-slot',
      summaryHeadline: 'Shared laughter and moments that stayed',
      narrativeBody:
        'Looking back at the days that turned into favorite chapters—the spontaneous conversations, late-evening laughs, and the moments that quietly became golden keepsakes. Even the simplest hours shine brighter in hindsight.',
      customSlotNote:
        'Personal Memory Slot 02: Update `storyChapters[1].narrativeBody` in `src/data/content.ts` with your favorite shared moments or milestones.',
      imageWebp: './public/images/story/chapter-02.webp',
      imageJpg: './public/images/story/chapter-02.jpg',
      imageAlt: 'Chapter 02 artwork featuring golden starburst geometry against midnight plum'
    },
    {
      id: 'chapter-03',
      number: '03',
      approvedTitle: '03 — Right Here, Right Now ❤️',
      emoji: '❤️',
      themeAccent: '#E88D9E',
      verifiedStatus: 'verified-structure-customizable-slot',
      summaryHeadline: 'Celebrating who you are today',
      narrativeBody:
        'Right here in the present, October 18 is all about celebrating your warmth, resilience, grace, and the unmistakable light you bring into every room. May today pause the rush of the world and surround you with genuine joy.',
      customSlotNote:
        'Personal Memory Slot 03: Update `storyChapters[2].narrativeBody` in `src/data/content.ts` with a reflection on the present moment.',
      imageWebp: './public/images/story/chapter-03.webp',
      imageJpg: './public/images/story/chapter-03.jpg',
      imageAlt: 'Chapter 03 artwork featuring a geometric heart curve in blush rose and champagne gold'
    },
    {
      id: 'chapter-04',
      number: '04',
      approvedTitle: '04 — The Chapter Yet to Come 💍',
      emoji: '💍',
      themeAccent: '#A78BFA',
      verifiedStatus: 'verified-structure-customizable-slot',
      summaryHeadline: 'Bright horizons and unwritten pages ahead',
      narrativeBody:
        'The best chapters are still ahead—new horizons, fulfilled dreams, peaceful mornings, and countless reasons to celebrate. Here is to the future waiting to unfold, carrying forward every bit of warmth from where we started.',
      customSlotNote:
        'Personal Memory Slot 04: Update `storyChapters[3].narrativeBody` in `src/data/content.ts` with your wishes and hopes for the future.',
      imageWebp: './public/images/story/chapter-04.webp',
      imageJpg: './public/images/story/chapter-04.jpg',
      imageAlt: 'Chapter 04 artwork featuring intertwined luminous rings and twilight violet glow'
    }
  ],

  memories: [
    {
      id: 'memory-01',
      title: 'Keepsake Frame I — Golden Hour Reverie',
      category: 'keepsake',
      aspect: 'portrait',
      imageWebp: './public/images/memories/memory-01.webp',
      imageJpg: './public/images/memories/memory-01.jpg',
      altText: 'Curated atmospheric keepsake frame 01 with constellation lines in champagne gold',
      captionSlot: 'Verified Photo Slot 01 — Replace `public/images/memories/memory-01.jpg` with your personal photo.',
      provenanceNote: 'Generated local atmospheric artwork (no unverified personal photo assumed).'
    },
    {
      id: 'memory-02',
      title: 'Keepsake Frame II — Starlight & Laughter',
      category: 'celebration',
      aspect: 'portrait',
      imageWebp: './public/images/memories/memory-02.webp',
      imageJpg: './public/images/memories/memory-02.jpg',
      altText: 'Curated atmospheric keepsake frame 02 with starburst rays in twilight violet and gold',
      captionSlot: 'Verified Photo Slot 02 — Replace `public/images/memories/memory-02.jpg` with your personal photo.',
      provenanceNote: 'Generated local atmospheric artwork (no unverified personal photo assumed).'
    },
    {
      id: 'memory-03',
      title: 'Keepsake Frame III — Quiet Celebrations',
      category: 'constellation',
      aspect: 'portrait',
      imageWebp: './public/images/memories/memory-03.webp',
      imageJpg: './public/images/memories/memory-03.jpg',
      altText: 'Curated atmospheric keepsake frame 03 with rose heart geometry and bokeh light',
      captionSlot: 'Verified Photo Slot 03 — Replace `public/images/memories/memory-03.jpg` with your personal photo.',
      provenanceNote: 'Generated local atmospheric artwork (no unverified personal photo assumed).'
    },
    {
      id: 'memory-04',
      title: 'Keepsake Frame IV — October 18 Keepsake',
      category: 'milestone',
      aspect: 'portrait',
      imageWebp: './public/images/memories/memory-04.webp',
      imageJpg: './public/images/memories/memory-04.jpg',
      altText: 'Curated atmospheric keepsake frame 04 with luminous ring motif for October 18',
      captionSlot: 'Verified Photo Slot 04 — Replace `public/images/memories/memory-04.jpg` with your personal photo.',
      provenanceNote: 'Generated local atmospheric artwork (no unverified personal photo assumed).'
    },
    {
      id: 'our-journey',
      title: 'Keepsake Panorama — Our Journey Canvas',
      category: 'milestone',
      aspect: 'landscape',
      imageWebp: './public/images/our-journey.webp',
      imageJpg: './public/images/our-journey.jpg',
      altText: 'Wide atmospheric keepsake banner for Khushie V3 October 18 edition',
      captionSlot: 'Verified Banner Slot — Replace `public/images/our-journey.jpg` with a favorite wide photo.',
      provenanceNote: 'Generated local atmospheric banner (no unverified personal photo assumed).'
    }
  ],

  personalSections: [
    {
      id: 'opening-message',
      categoryTitle: 'Opening Message',
      subtitle: 'A quiet welcome to your October 18 keepsake',
      verifiedStatus: 'verified-greeting',
      paragraphs: [
        'Welcome to your personal birthday space, Khushi. Every corner of this website was designed to feel calm, luminous, and celebratory—a place you can revisit whenever you want a reminder of how deeply you are appreciated.',
        'Take your time exploring the chapters, opening the keepsake boxes, lighting the birthday candles, or simply listening to the soft celesta melody.'
      ],
      editHint: 'Editable in `src/data/content.ts` -> `personalSections[0]`'
    },
    {
      id: 'birthday-message',
      categoryTitle: 'Birthday Message',
      subtitle: 'For October 18 — Wishing you light, peace, and joy',
      verifiedStatus: 'verified-greeting',
      paragraphs: [
        'Happy Birthday, Khushi! May this new year of your life bring you closer to everything that makes your heart feel at home. You deserve days filled with genuine laughter, peaceful evenings, and dreams that unfold with grace.',
        'May every step you take this year be met with kindness, strength, and wonderful surprises.'
      ],
      editHint: 'Editable in `src/data/content.ts` -> `personalSections[1]`'
    },
    {
      id: 'our-story-note',
      categoryTitle: 'Our Story',
      subtitle: 'Reflections on the journey across four chapters',
      verifiedStatus: 'documented-slot',
      paragraphs: [
        'Every meaningful connection is built from small moments of trust, understanding, and shared happiness. Across our four story chapters—from "The Little Us 🌱" to "The Chapter Yet to Come 💍"—this space holds room for the memories that matter most.'
      ],
      editHint: 'Personal Content Slot: Customize in `src/data/content.ts` -> `personalSections[2]` with your verified story reflection.'
    },
    {
      id: 'four-story-chapters',
      categoryTitle: 'Four Story Chapters',
      subtitle: '01 The Little Us 🌱 • 02 Those Days ✨ • 03 Right Here, Right Now ❤️ • 04 The Chapter Yet to Come 💍',
      verifiedStatus: 'verified-greeting',
      paragraphs: [
        'The four approved chapters trace a complete arc: honoring early beginnings, cherishing favorite days, celebrating the present moment on October 18, and looking warmly toward tomorrow.'
      ],
      editHint: 'See full interactive chapters on the `/story` route or edit in `storyChapters`.'
    },
    {
      id: 'why-youre-special',
      categoryTitle: 'Why You’re Special',
      subtitle: 'The qualities that make you unforgettable',
      verifiedStatus: 'documented-slot',
      paragraphs: [
        'It is the way you bring warmth into ordinary moments, your thoughtfulness toward the people you care about, and the genuineness in your smile. You make the world around you gentler and brighter simply by being yourself.'
      ],
      editHint: 'Personal Content Slot: Add specific personal traits in `src/data/content.ts` -> `personalSections[4]`.'
    },
    {
      id: 'inside-jokes',
      categoryTitle: 'Inside Jokes',
      subtitle: 'Reserved slot for your real shared laughs',
      verifiedStatus: 'documented-slot',
      paragraphs: [
        '[Dedicated Personal Slot — Rather than inventing artificial jokes, this card is intentionally reserved for your real inside jokes, favorite phrases, and shared humor. Use the Personalize button above or edit `src/data/content.ts` to add them.]'
      ],
      editHint: 'Personal Content Slot: Replace in `src/data/content.ts` -> `personalSections[5]`.'
    },
    {
      id: 'a-little-secret',
      categoryTitle: 'A Little Secret For You',
      subtitle: 'Unlocked with keepsake code 1810',
      verifiedStatus: 'documented-slot',
      paragraphs: [
        'Behind all the animations, starlight particles, and interactive games, the simplest truth is this: this entire experience was built just to see you smile on your birthday.'
      ],
      editHint: 'Personal Content Slot: Customize your private note in `src/data/content.ts` -> `personalSections[6]`.'
    },
    {
      id: 'one-last-thing',
      categoryTitle: 'One Last Thing…',
      subtitle: 'Before you blow out the candles',
      verifiedStatus: 'verified-greeting',
      paragraphs: [
        'Never forget how far you have come and how much beauty lies ahead of you. Whenever a day feels overwhelming, remember that you are celebrated—not only on October 18, but every single day.'
      ],
      editHint: 'Editable in `src/data/content.ts` -> `personalSections[7]`'
    },
    {
      id: 'always-with-you',
      categoryTitle: 'Always With You',
      subtitle: 'A closing note of warmth and constancy',
      verifiedStatus: 'documented-slot',
      paragraphs: [
        'No matter where life leads or how busy the seasons become, warm wishes and unwavering support remain with you through every chapter. Happy Birthday once again, Khushi.'
      ],
      editHint: 'Editable in `src/data/content.ts` -> `personalSections[8]`'
    }
  ],

  gifts: [
    {
      id: 'gift-starlight',
      ribbonLabel: 'KEEPSAKE BOX 01',
      title: 'The Starlight Wish Jar',
      subtitle: 'Untie the champagne ribbon to reveal',
      revealHeading: '365 Nights of Calm & Radiance',
      revealBody:
        'A symbolic keepsake wishing you peaceful nights, bright mornings, and the quiet confidence that your dreams are worth every step.',
      accentColor: '#F2D0A9',
      iconSymbol: '✨'
    },
    {
      id: 'gift-bloom',
      ribbonLabel: 'KEEPSAKE BOX 02',
      title: 'The Velvet Rose Keepsake',
      subtitle: 'Untie the blush ribbon to reveal',
      revealHeading: 'Unfading Warmth & Joy',
      revealBody:
        'An everlasting digital bloom crafted for October 18—a reminder that your kindness and laughter leave a lasting mark everywhere you go.',
      accentColor: '#E88D9E',
      iconSymbol: '🌹'
    },
    {
      id: 'gift-compass',
      ribbonLabel: 'KEEPSAKE BOX 03',
      title: 'The Horizon Keepsake',
      subtitle: 'Untie the twilight ribbon to reveal',
      revealHeading: 'For Every Chapter Yet to Come',
      revealBody:
        'A token for all the adventures, milestones, and happy memories waiting in the chapters ahead. Customize this gift slot in `src/data/content.ts` if pairing with a real-world gift!',
      accentColor: '#A78BFA',
      iconSymbol: '🎁'
    }
  ],

  stickerTemplates: [
    { id: 'stk-crown', label: 'Birthday Crown', symbol: '👑', color: '#F2D0A9' },
    { id: 'stk-rose', label: 'Blush Rose', symbol: '🌹', color: '#E88D9E' },
    { id: 'stk-sparkles', label: 'Starlight', symbol: '✨', color: '#F2D0A9' },
    { id: 'stk-heart', label: 'Velvet Heart', symbol: '💖', color: '#E88D9E' },
    { id: 'stk-cake', label: 'Birthday Cake', symbol: '🎂', color: '#F2D0A9' },
    { id: 'stk-butterfly', label: 'Twilight Butterfly', symbol: '🦋', color: '#A78BFA' },
    { id: 'stk-star', label: 'Shooting Star', symbol: '🌟', color: '#F2D0A9' },
    { id: 'stk-gem', label: 'Crystal Gem', symbol: '💎', color: '#A78BFA' }
  ]
};
