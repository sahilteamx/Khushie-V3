import { SiteConfig } from '../types/content';

/**
 * KHUSHIE V3 — VERIFIED REAL PERSONAL CONTENT FROM SAHIL
 * Extracted verbatim from Khushie-V2-FINAL.zip (messages, chapters, jokes, gifts, photos, and birthday.mp3).
 * Birthday Date: 08 October (2026-10-08T00:00:00+05:30).
 * Secret PIN is validated internally and NEVER displayed on screen.
 */
export const SITE_CONTENT: SiteConfig = {
  projectName: 'Khushie V3',
  brandSubtitle: 'My Birthday Princess 👑',
  version: '3.0.0',
  recipientName: 'Khushi',
  recipientNickname: 'Meri Bacchiiiiiiiiiiiiiiiiiii ✨💓',
  senderName: 'Sahil',
  birthdayIso: '2026-10-08T00:00:00+05:30',
  birthdayMonth: 10,
  birthdayDay: 8,
  birthdayDisplay: '08 October',
  acceptedPins: ['0810', '1810'],
  basePath: './',
  audioTrackPath: './public/audio/birthday.mp3',
  audioFallbackPath: './music/birthday.mp3',
  audioTrackTitle: 'Khushi’s Birthday Soundtrack ❤️',
  youtubeUrl: 'https://www.youtube.com/watch?v=57jZJ2QpKRg',
  heroGreeting: '08 OCTOBER • MY BIRTHDAY PRINCESS 👑',
  heroTitle: 'Happy Birthday, Khushi',
  heroNicknamesLine:
    'Hey Khushi, Nah Meri Khushiiiiiiiiiiiiiiiiiiiiiiii 😁 Meriiiiiiiiiiiiiiiiiiiiiiii Bacchiiiiiiiiiiiiiiiiiii ✨ Meriiiiiiiiiiiiiiiiiiiiiiii jaaaaaaaaan 🥰 My wifeyyyyyyyyyyyyyyy 🫣🤗',
  heroTeaserLine: 'Kahna toh bahot kucch hai… dheere dheere batata hu😘',
  heroQuote: '“Aap mere liye bahot special hain… aur aaj ka din bas aapke liye hai. ❤️”',
  heroQuoteAuthor: '— Always yours, Sahil',
  butterflySecretNote:
    'Tumne butterfly ko touch kiya… aur meri heartbeat phir se skip kar gayi. 🦋❤️ Aapki smile hi meri sabse favourite jagah hai, Meri Bacchii ✨',
  primaryCtaLabel: 'Open Your Surprise ✨',
  secondaryCtaLabel: 'Read Our Story ❤️',

  navItems: [
    {
      path: '/',
      label: '3D Stage & Home',
      shortLabel: 'Home',
      description: '3D Velvet Theater Curtain, 08 Oct Monument, Blooming Tree & 3D Filmstrip'
    },
    {
      path: '/story',
      label: 'Our Story',
      shortLabel: 'Story',
      badge: '4 Chapters',
      description: 'The Little Us 🌱, Those Days ✨, Right Here Right Now ❤️ & Yet to Come 💍'
    },
    {
      path: '/memories',
      label: '3D Memory World',
      shortLabel: 'Memories',
      badge: '3D Galaxy',
      description: '3D Polaroid Corkboard Wall, 360° Orbiting Photo Galaxy & 3D Flipping Scrapbook'
    },
    {
      path: '/message',
      label: 'Love Letter & iPhone',
      shortLabel: 'Message',
      badge: '3D Chat',
      description: '3D Wax-Sealed Envelope Letter + Interactive 3D iPhone iMessage Chat'
    },
    {
      path: '/fun-zone',
      label: 'Fun Zone & Studio',
      shortLabel: 'Fun Zone',
      badge: '6 Experiences',
      description: '3D Cake, Catch Hearts, Pop Balloons, Photo Memory Match, Sticker Studio & Wish Maker'
    },
    {
      path: '/gifts',
      label: '3D Mystery Gifts',
      shortLabel: 'Gifts',
      badge: '5+1 Boxes',
      description: 'Five 3D rotating gift cubes plus the hidden sixth final surprise box'
    },
    {
      path: '/surprise',
      label: 'Secret Vault',
      shortLabel: 'Surprise',
      description: 'Hidden PIN Gate, 08 October 3D Number Stage & Personal Moment Reveal'
    },
    {
      path: '/cake',
      label: '3D Cake Ceremony',
      shortLabel: 'Cake',
      description: 'Interactive 3D Birthday Cake, Candle Blowing, Knife Slice & Wish Reveal'
    },
    {
      path: '/finale',
      label: 'Grand Finale',
      shortLabel: 'Finale',
      description: '3D Sky Lanterns, Final Phone Reveal & Complete Journey Hub'
    }
  ],

  storyChapters: [
    {
      id: 'chapter-01',
      number: '01',
      approvedTitle: '01 — The Little Us 🌱',
      shortTitle: 'The Little Us',
      emoji: '🌱',
      eraLabel: 'Childhood',
      dateSubtitle: 'The early days',
      themeAccent: '#E88D9E',
      paragraphs: [
        'Bachpan ke woh din… jab humein khud bhi nahi pata tha ki saamne wala insaan ek din itna special ban jayega. 🥹',
        'Kabhi saath khelna, kabhi chhoti-chhoti baaton par ladna, kabhi ek dusre ko pareshaan karna… aur phir kuch der baad sab normal. ❤️',
        'Tab hum bas bachche the, apni hi duniya mein busy… Kahan pata tha ki unhi chhoti-chhoti yaadon se ek din itni khoobsurat story ban jayegi. ✨'
      ],
      imageWebp: './public/images/story/chapter-01.webp',
      imageJpg: './public/images/story/chapter-01.jpg',
      imageAlt: 'Chapter 01 — The Little Us childhood storybook collage'
    },
    {
      id: 'chapter-02',
      number: '02',
      approvedTitle: '02 — Those Days ✨',
      shortTitle: 'Those Days',
      emoji: '✨',
      eraLabel: 'School & tuition',
      dateSubtitle: 'Those growing-up days',
      themeAccent: '#F2D0A9',
      paragraphs: [
        'Phir woh din aaye jab hum thode bade ho rahe the… school, tuition aur roz ki wahi normal si conversations.',
        'Aur haan… Gullu bhi tha. 😂',
        'Gullu ke naam se flirting karna, Khushi ko chhedna, Khushi ka wapas mujhe chhedna… aur dono ka ye pretend karna ki kuch bhi nahi ho raha. 😁❤️',
        'Kabhi tuition ki baatein, kabhi school ki, kabhi bilkul faltu ki conversation… lekin pata hi nahi chala ki ye “normal” conversations hamare liye itni special kab ban gayi.',
        'Shayad wahi woh time tha jab friendship ke andar kuch aur bhi quietly grow hona shuru ho gaya tha. 🫣❤️'
      ],
      imageWebp: './public/images/story/chapter-02.webp',
      imageJpg: './public/images/story/chapter-02.jpg',
      imageAlt: 'Chapter 02 — Those Days school and rooftop sunset storybook collage'
    },
    {
      id: 'chapter-03',
      number: '03',
      approvedTitle: '03 — Right Here, Right Now ❤️',
      shortTitle: 'Right Here, Right Now',
      emoji: '❤️',
      eraLabel: 'Present day',
      dateSubtitle: 'Right here, right now',
      themeAccent: '#E88D9E',
      paragraphs: [
        'Har story hamesha easy nahi hoti.',
        'Hamare beech bhi aise bahot saare moments aaye jab situation itni kharab ho gayi ki sach mein laga… shayad ab hum dono ek dusre se door ho jayenge.',
        'Lekin har baar kuch na kuch humein wapas ek dusre ke paas le aaya.',
        'Problems aati gayi… hum unhe solve karte gaye. Misunderstandings hui… humne ek dusre ko samjha.',
        'Aur sabse ajeeb baat? Jitni baar laga ki shayad hum door ho jayenge, utna hi zyada humara bond strong hota gaya. ❤️',
        'Aaj jab peeche mudkar dekhta hoon toh lagta hai… Hum sirf achhe moments ki wajah se yahan nahi hain, balki un saare difficult moments ko saath cross karke yahan tak aaye hain.',
        'Aur shayad isi wajah se… Right here, right now — this chapter means a little more. ❤️'
      ],
      imageWebp: './public/images/story/chapter-03.webp',
      imageJpg: './public/images/story/chapter-03.jpg',
      imageAlt: 'Chapter 03 — Right Here, Right Now present day storybook collage'
    },
    {
      id: 'chapter-04',
      number: '04',
      approvedTitle: '04 — The Chapter Yet to Come 💍',
      shortTitle: 'The Chapter Yet to Come',
      emoji: '💍',
      eraLabel: 'Not written yet',
      dateSubtitle: 'Coming soon…',
      themeAccent: '#A78BFA',
      paragraphs: [
        'Some chapters are meant to be read… and some are meant to be lived.',
        'Aage kya likha hai?',
        'Shayad abhi batana thoda jaldi hoga. 🫣',
        'Bas itna samajh lo… The next chapter is waiting.',
        'Coming Soon… ❤️'
      ],
      imageWebp: './public/images/story/chapter-04.webp',
      imageJpg: './public/images/story/chapter-04.jpg',
      imageAlt: 'Chapter 04 — The Chapter Yet to Come future dreams storybook collage'
    }
  ],

  memories: [
    {
      id: 'memory-01',
      title: 'Memory 01 — The Little Us',
      polaroidTag: 'Cutie 😍',
      category: 'childhood',
      aspect: 'portrait',
      rotationDeg: -4,
      imageWebp: './public/images/memories/memory-01.webp',
      imageJpg: './public/images/memories/memory-01.jpg',
      altText: 'Childhood memory by the sunlit stream with a paper boat',
      caption: 'One of the moments worth keeping. 🌱❤️'
    },
    {
      id: 'memory-02',
      title: 'Memory 02 — Sunset Rooftop Talks',
      polaroidTag: 'Meri Bacchii ✨',
      category: 'those-days',
      aspect: 'portrait',
      rotationDeg: 3.5,
      imageWebp: './public/images/memories/memory-02.webp',
      imageJpg: './public/images/memories/memory-02.jpg',
      altText: 'Sunset rooftop memory looking at phones together',
      caption: 'A little moment, kept safe in this story. ✨'
    },
    {
      id: 'memory-03',
      title: 'Memory 03 — Peaceful Horizons',
      polaroidTag: 'My Love ❤️',
      category: 'present',
      aspect: 'portrait',
      rotationDeg: -2.8,
      imageWebp: './public/images/memories/memory-03.webp',
      imageJpg: './public/images/memories/memory-03.jpg',
      altText: 'Mountain lake memory reading together in peace',
      caption: 'Another frame from the journey. ❤️'
    },
    {
      id: 'memory-04',
      title: 'Memory 04 — Sacred Duas Together',
      polaroidTag: 'My Wifeyy 💍',
      category: 'future',
      aspect: 'portrait',
      rotationDeg: 4.2,
      imageWebp: './public/images/memories/memory-04.webp',
      imageJpg: './public/images/memories/memory-04.jpg',
      altText: 'Sacred prayer memory together at Makkah',
      caption: 'Because some moments deserve their own space. 🕋❤️'
    },
    {
      id: 'moment-01',
      title: 'Childhood Sunset Bench',
      polaroidTag: 'Little Us 🌱',
      category: 'childhood',
      aspect: 'portrait',
      rotationDeg: 2.5,
      imageWebp: './public/images/memories/moment-01.webp',
      imageJpg: './public/images/memories/moment-01.jpg',
      altText: 'Childhood bench sunset scene from Chapter 01',
      caption: 'Bachpan ki woh chhoti-chhoti yaadein… 🥹'
    },
    {
      id: 'moment-02',
      title: 'Rainy Day Umbrella',
      polaroidTag: 'Sunshine ☀️',
      category: 'childhood',
      aspect: 'portrait',
      rotationDeg: -3.2,
      imageWebp: './public/images/memories/moment-02.webp',
      imageJpg: './public/images/memories/moment-02.jpg',
      altText: 'Sharing an umbrella in the rain from Chapter 01',
      caption: 'Kabhi saath khelna, kabhi chhoti baaton par ladna ❤️'
    },
    {
      id: 'moment-03',
      title: 'Those Growing-Up Days',
      polaroidTag: 'Gullu Era 😂',
      category: 'those-days',
      aspect: 'portrait',
      rotationDeg: 3.8,
      imageWebp: './public/images/memories/moment-03.webp',
      imageJpg: './public/images/memories/moment-03.jpg',
      altText: 'Evening lights scene from Chapter 02',
      caption: 'School, tuition aur roz ki wahi special conversations ✨'
    },
    {
      id: 'moment-04',
      title: 'Starlight Conversations',
      polaroidTag: 'Dream Girl ✨',
      category: 'those-days',
      aspect: 'portrait',
      rotationDeg: -4.1,
      imageWebp: './public/images/memories/moment-04.webp',
      imageJpg: './public/images/memories/moment-04.jpg',
      altText: 'Late night study and laughter from Chapter 02',
      caption: 'Jab friendship ke andar kuch aur quietly grow ho raha tha 🫣❤️'
    },
    {
      id: 'moment-05',
      title: 'Standing Together Through Everything',
      polaroidTag: 'Meri Jaan 🥰',
      category: 'present',
      aspect: 'portrait',
      rotationDeg: 2.2,
      imageWebp: './public/images/memories/moment-05.webp',
      imageJpg: './public/images/memories/moment-05.jpg',
      altText: 'Couple standing under an umbrella in the rain from Chapter 03',
      caption: 'Har difficult moment ko saath cross karke yahan tak aaye hain ❤️'
    },
    {
      id: 'moment-06',
      title: 'Quiet Sukoon',
      polaroidTag: 'Princess 👑',
      category: 'present',
      aspect: 'portrait',
      rotationDeg: -2.6,
      imageWebp: './public/images/memories/moment-06.webp',
      imageJpg: './public/images/memories/moment-06.jpg',
      altText: 'Reading together in a warm library from Chapter 03',
      caption: 'Aapke saath ek ajeeb sa sukoon milta hai ❤️'
    },
    {
      id: 'moment-07',
      title: 'The Wedding Dream',
      polaroidTag: 'Forever 💍',
      category: 'future',
      aspect: 'portrait',
      rotationDeg: 3.4,
      imageWebp: './public/images/memories/moment-07.webp',
      imageJpg: './public/images/memories/moment-07.jpg',
      altText: 'Wedding celebration scene from Chapter 04',
      caption: 'Some chapters are meant to be lived… Coming Soon 💍❤️'
    },
    {
      id: 'moment-08',
      title: 'Makkah & Beyond',
      polaroidTag: 'Duas 🤲❤️',
      category: 'future',
      aspect: 'portrait',
      rotationDeg: -3.5,
      imageWebp: './public/images/memories/moment-08.webp',
      imageJpg: './public/images/memories/moment-08.jpg',
      altText: 'Future pilgrimage and travels together from Chapter 04',
      caption: 'The best chapters are still waiting… ✨❤️'
    },
    {
      id: 'our-journey',
      title: 'Our Journey · 19 Complete Moments',
      polaroidTag: '19 Moments ❤️',
      category: 'keepsake',
      aspect: 'landscape',
      rotationDeg: 0,
      imageWebp: './public/images/memories/our-journey.webp',
      imageJpg: './public/images/memories/our-journey.jpg',
      altText: 'Our Journey — 19 moments kept together as one complete collage',
      caption: '19 moments, kept together as one complete collage — from Childhood to Forever. ❤️'
    }
  ],

  personalSections: [
    {
      id: 'birthday-message',
      categoryTitle: 'Dear Khushi, ❤️🥹',
      subtitle: 'Khushi, sabse pehle toh aapko dil se Happy Birthday ❤️🥹',
      paragraphs: [
        'Khushi, sabse pehle toh aapko dil se Happy Birthday ❤️🥹',
        'Pata nahi kaise itne saal nikal gaye, lekin ek baat hai… aap meri life ka woh part ban chuki hain jise main chaah kar bhi ignore nahi kar sakta. Aapke saath jitni memories hain na, unmein kuch itni funny hain ki yaad karke hasi aa jaati hai, aur kuch aisi hain jo bas dil ke bahot kareeb hain.',
        'Main bas itna chahta hoon ki aap hamesha khush rahein, bina kisi tension ke smile karein, jo dreams hain woh poore hon aur life mein aapko woh saari khushiyan milein jo aap deserve karti hain. 🥰',
        'Aur haan… aaj birthday hai isliye zyada emotional nahi hounga 😂 Abhi bahot kuch kehna baaki hai… dheere-dheere sab bataunga. 😌❤️',
        'Bas ek baat hamesha yaad rakhna — aap mere liye bahot special hain. ❤️ Happy Birthday meri Khushi. 🫣🤗'
      ]
    },
    {
      id: 'why-youre-special',
      categoryTitle: 'Why You’re Special ❤️',
      subtitle: 'Meri Bacchiiiiiiiiiiiiiiiiiii ✨💓',
      paragraphs: [
        'Aapki kaunsi quality mujhe sabse zyada pasand hai? Sach bolun toh… aapki saari qualities. 🥰',
        'Achhi ho ya thodi si ajeeb, mujhe aapki har cheez apni si lagti hai.',
        'Aur aapka gussa… 😂 Pata nahi aapko ye sunna pasand aayega ya nahi, lekin gusse mein bhi aap mujhe cute hi lagti hain. 🥰',
        'Kabhi-kabhi aapka gussa dekhkar mujhe samajh nahi aata ki aapko manaun ya pehle thoda aur chhedun. 🤣🫣',
        'Aapke saath ek ajeeb sa sukoon milta hai. Kuch special karna zaroori nahi hota… bas aapse baat ho jaaye, toh bhi dil ko accha lagta hai. ❤️',
        'Aur nickname? Meri Bacchiiiiiiiiiiiiiiiiiii ✨💓 Bas ye naam bolte hi pata nahi kyun automatically smile aa jaati hai. 🥰'
      ]
    },
    {
      id: 'inside-jokes',
      categoryTitle: 'Our Little Inside Jokes 😂',
      subtitle: 'Humari story mein pyaar jitna hai, utni hi thodi si teasing bhi zaroori hai 😁❤️',
      paragraphs: [
        '“Aap mujhse naraz hain?” — “Bilkul.” — “Achha… 5 minute baad baat karenge.” 🤣',
        '“Aapko meri yaad aa rahi thi?” — “Nahi.” — “Achha ji… phir itni der se online kiske liye thi?” 🫣😂',
        '“Aap gussa kyun kar rahi hain?” — “Bas kar rahi hoon.” — “Theek hai, gusse mein bhi cute lag rahi hain.” 🥰🤣',
        'Aur kabhi-kabhi toh bina kisi reason ke bas ek dusre ko chhedna hi kaafi hai. 😂',
        '“Aapko yeh sab dekh kar face par smile toh aa gayi hogi na? 🤣 Toh aise smile 😁 karte hue jaiye… aur bartan pending hain, woh dho lijiye. Aapki Ammi bula rahi hain. 🤣🤣🤣🤣🤣”',
        'Aapko chhedne ka mauka mile aur main chhod doon… aisa kaise ho sakta hai? 😌😂 Bas humari ye chhoti-chhoti baatein hi toh hain jo normal moments ko bhi yaadgaar bana deti hain. ❤️'
      ]
    },
    {
      id: 'a-little-secret',
      categoryTitle: '🥹 A Little Secret For You',
      subtitle: 'Secret message found ✨',
      paragraphs: [
        'Agar aap yahan tak pahunch gayi hain… toh matlab aapne meri chhoti si hidden baat bhi dhoondh li. 😁❤️',
        'Waise toh maine is poori website mein bahot kuch keh diya hai… lekin ek baat shayad kahin properly nahi keh paaya.',
        'Aap meri life ka sirf ek beautiful part nahi hain… aap un logon mein se hain jinke hone se life thodi aur acchi lagti hai. ❤️',
        'Aapke saath guzara hua har moment perfect ho, zaroori nahi… lekin aapke saath guzra hua moment mere liye important zaroor hota hai.',
        'Aur agar kabhi aapko lage ki aap ordinary hain… toh ek baar ye hidden message yaad kar lena: Kisi ki duniya mein aap bahot special hain. Aur woh koi aur nahi… main hoon. 🫣❤️',
        'Ab zyada emotional nahi hona… warna next surprise unlock nahi hoga. 😂🎁 Secret message found. ✨'
      ]
    },
    {
      id: 'always-with-you',
      categoryTitle: '❤️ Always With You',
      subtitle: 'Aapki har situation mein, aapka support banke… main yahin hoon ❤️',
      paragraphs: [
        'Khushi, life mein har din same nahi hota. Kabhi aap bahot khush hongi, kabhi mood bilkul accha nahi hoga, kabhi gussa aayega, kabhi bina kisi reason ke mood off hoga… aur kabhi sab kuch perfect lagega.',
        'Lekin in sab mein ek cheez same rahegi — main aapke saath hoon. ❤️',
        'Aap gusse mein ho, main tab bhi aapke saath hoon. Aapka mood kharab ho, tab bhi. Aap bahot khush ho, tab bhi. Aapke din acche ja rahe ho ya bahot difficult ho, tab bhi.',
        'Aapko har baar strong banne ki zarurat nahi hai. Kabhi mann ho toh mujhse baat kar lena, kabhi chup rehna ho toh bhi theek hai… bas ye yaad rakhna ki aapko sab kuch akela handle karne ki zarurat nahi hai.',
        'Main har problem solve kar dunga, aisa promise nahi karunga… lekin har problem mein aapka saath zaroor dunga. 🤗❤️ Bas jab bhi lage ki sab kuch thoda zyada ho raha hai, ek baar mujhe bula lena. Aapki har situation mein, aapka support banke… main yahin hoon. ❤️'
      ]
    },
    {
      id: 'one-last-thing',
      categoryTitle: '❤️ One Last Thing…',
      subtitle: 'Always yours, Sahil',
      paragraphs: [
        'Khushi, Itna sab dekhne ke baad bhi shayad mere paas kehne ke liye bahot kuch baaki hai… 🥹 Lekin har baat words mein keh paana possible nahi hota.',
        'Bas aaj ke din main itna kehna chahta hoon— Thank you. ❤️',
        'Meri life ka part banne ke liye, meri itni saari baatein sunne ke liye, mere nakhre jhelne ke liye, mujhe samajhne ke liye… aur un countless memories ke liye jo humne saath banayi hain.',
        'Aage life humein kahan le jayegi, ye toh koi nahi jaanta. Lekin jo bhi aaye, jitne bhi chapters likhe jaayein… main chahta hoon ki unmein aapki smile zaroor ho. 🥰',
        'Toh meri Khushi… Aaj bas dil se ek baar phir— Happy Birthday. ❤️🎂 Hamesha khush rahiye, smile karti rahiye…',
        'Aur haan… Ye story abhi khatam nahi hui hai. The best chapters are still waiting… ✨❤️ — Always yours, Sahil'
      ]
    }
  ],

  gifts: [
    {
      id: 'gift-01',
      number: '01',
      ribbonLabel: 'MYSTERY GIFT 01',
      title: 'A Tiny Reminder',
      subtitle: 'Tap the 3D cube to untie the ribbon',
      revealHeading: '01 — A Tiny Reminder ❤️',
      revealBody:
        'No matter how many chapters happen, some people simply make ordinary days feel special. ❤️',
      accentColor: '#E88D9E',
      iconSymbol: '💌'
    },
    {
      id: 'gift-02',
      number: '02',
      ribbonLabel: 'MYSTERY GIFT 02',
      title: 'The Chaos Box',
      subtitle: 'Tap the 3D cube to untie the ribbon',
      revealHeading: '02 — The Chaos Box 😂',
      revealBody:
        'Congratulations. You opened a box containing absolutely no serious business. 😂',
      accentColor: '#F2D0A9',
      iconSymbol: '🤪'
    },
    {
      id: 'gift-03',
      number: '03',
      ribbonLabel: 'MYSTERY GIFT 03',
      title: 'A Little Clue',
      subtitle: 'Tap the 3D cube to untie the ribbon',
      revealHeading: '03 — A Little Clue ✨',
      revealBody:
        'The next chapter is waiting. You already know where to go. ✨',
      accentColor: '#A78BFA',
      iconSymbol: '✨'
    },
    {
      id: 'gift-04',
      number: '04',
      ribbonLabel: 'MYSTERY GIFT 04',
      title: 'Bonus Sparkle',
      subtitle: 'Tap the 3D cube to untie the ribbon',
      revealHeading: '04 — Bonus Sparkle 😁',
      revealBody:
        'A few extra Fun Score points, because apparently opening gifts is now a skill. 😁',
      accentColor: '#F2D0A9',
      iconSymbol: '🌟'
    },
    {
      id: 'gift-05',
      number: '05',
      ribbonLabel: 'MYSTERY GIFT 05',
      title: 'One More Thing',
      subtitle: 'Tap the 3D cube to untie the ribbon',
      revealHeading: '05 — One More Thing 🥰',
      revealBody:
        'A birthday wish: keep smiling, keep being you, and keep making memories. 🥰',
      accentColor: '#E88D9E',
      iconSymbol: '🎂'
    }
  ],

  stickerTemplates: [
    { id: 'stk-crown', label: 'Birthday Princess Crown', symbol: '👑', color: '#F2D0A9' },
    { id: 'stk-rose', label: 'Blush Rose', symbol: '🌹', color: '#E88D9E' },
    { id: 'stk-sparkles', label: 'Starlight', symbol: '✨', color: '#F2D0A9' },
    { id: 'stk-heart', label: 'Velvet Heart', symbol: '❤️', color: '#E88D9E' },
    { id: 'stk-cake', label: 'Birthday Cake', symbol: '🎂', color: '#F2D0A9' },
    { id: 'stk-butterfly', label: 'Secret Butterfly', symbol: '🦋', color: '#A78BFA' },
    { id: 'stk-ring', label: 'Future Chapter Ring', symbol: '💍', color: '#F2D0A9' },
    { id: 'stk-laugh', label: 'Gullu Laugh', symbol: '😂', color: '#E88D9E' }
  ],

  phoneInitialChat: [
    {
      id: 'msg-1',
      sender: 'sahil',
      text: 'Happpppyyyy birthday Meri Khushiiiiiiiiiiiiiiiiiiiiiiii ❤️🎂👑',
      time: '12:00 AM'
    },
    {
      id: 'msg-2',
      sender: 'sahil',
      text: '08 October nikal gaya par aapka birthday celebration abhi khatam nahi hua hai! 🫣✨',
      time: '12:01 AM'
    },
    {
      id: 'msg-3',
      sender: 'sahil',
      text: 'I hope ye 3D website dekh ke aapke chote se face pe ek badi si smile toh aayi hogi 🥰❤️',
      time: '12:02 AM'
    },
    {
      id: 'msg-4',
      sender: 'sahil',
      text: 'Toh aise smile 😁 karte hue jaiye… aur bartan pending hain, woh dho lijiye. Aapki Ammi bula rahi hain 🤣🤣🤣🤣',
      time: '12:03 AM'
    },
    {
      id: 'msg-5',
      sender: 'sahil',
      text: 'Always with you, Meri Bacchii ✨💓 — Yours, Sahil ❤️',
      time: '12:04 AM'
    }
  ]
};
