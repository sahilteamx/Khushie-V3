const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const requiredAssets = [
  'index.html',
  '404.html',
  'dist/app.js',
  'dist/styles.css',
  'public/favicon.svg',
  'public/site.webmanifest',
  'public/audio/birthday.mp3',
  'public/music/birthday.mp3',
  'public/images/our-journey.jpg',
  'public/images/our-journey.webp',
  'public/images/memories/memory-01.jpg',
  'public/images/memories/memory-01.webp',
  'public/images/memories/memory-02.jpg',
  'public/images/memories/memory-02.webp',
  'public/images/memories/memory-03.jpg',
  'public/images/memories/memory-03.webp',
  'public/images/memories/memory-04.jpg',
  'public/images/memories/memory-04.webp',
  'public/images/story/chapter-01.jpg',
  'public/images/story/chapter-01.webp',
  'public/images/story/chapter-02.jpg',
  'public/images/story/chapter-02.webp',
  'public/images/story/chapter-03.jpg',
  'public/images/story/chapter-03.webp',
  'public/images/story/chapter-04.jpg',
  'public/images/story/chapter-04.webp'
];

let missing = 0;
for (const rel of requiredAssets) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full) || fs.statSync(full).size === 0) {
    console.error(`[MISSING OR EMPTY ASSET] ${rel}`);
    missing++;
  }
}

if (missing > 0) {
  process.exit(1);
}
console.log(`✓ Asset integrity check passed: all ${requiredAssets.length} required files exist and are non-empty.`);
