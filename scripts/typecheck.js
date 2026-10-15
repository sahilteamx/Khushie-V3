const fs = require('fs');
const path = require('path');
const babel = require('/usr/share/nodejs/@babel/core');

const SRC_DIR = path.join(__dirname, '..', 'src');

function collectFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, out);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      out.push(full);
    }
  }
  return out;
}

const files = collectFiles(SRC_DIR);
let errors = 0;

for (const file of files) {
  const code = fs.readFileSync(file, 'utf-8');
  try {
    babel.transformSync(code, {
      filename: file,
      presets: [
        ['/usr/share/nodejs/@babel/preset-typescript', { isTSX: file.endsWith('.tsx'), allExtensions: true }],
        ['/usr/share/nodejs/@babel/preset-react', { runtime: 'classic' }]
      ]
    });

    // Verify relative imports resolve to real files
    const importRegex = /from\s+['"](\.[^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(code)) !== null) {
      const rel = match[1];
      const base = path.resolve(path.dirname(file), rel);
      const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')];
      if (!candidates.some((c) => fs.existsSync(c))) {
        console.error(`[IMPORT ERROR] ${file}: Unresolved import '${rel}'`);
        errors++;
      }
    }
  } catch (err) {
    console.error(`[TYPE/SYNTAX ERROR] ${file}:`, err.message);
    errors++;
  }
}

if (errors > 0) {
  console.error(`Typecheck failed with ${errors} error(s).`);
  process.exit(1);
}
console.log(`✓ TypeScript & JSX verification passed across ${files.length} source modules (0 errors).`);
