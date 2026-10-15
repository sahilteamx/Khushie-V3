const assert = require('assert');
const fs = require('fs');
const path = require('path');

const contentCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'content.ts'), 'utf-8');

// Verify all 4 approved chapter titles exist verbatim
const approvedTitles = [
  '01 — The Little Us 🌱',
  '02 — Those Days ✨',
  '03 — Right Here, Right Now ❤️',
  '04 — The Chapter Yet to Come 💍'
];

for (const title of approvedTitles) {
  assert(contentCode.includes(title), `Missing approved chapter title: ${title}`);
}

// Verify all 9 planned routes exist
const requiredRoutes = ['/', '/story', '/memories', '/message', '/fun-zone', '/gifts', '/surprise', '/cake', '/finale'];
for (const route of requiredRoutes) {
  assert(contentCode.includes(`'${route}'`), `Missing route in content config: ${route}`);
}

console.log('✓ Unit verification passed: all 4 approved chapter labels and 9 routes verified.');
