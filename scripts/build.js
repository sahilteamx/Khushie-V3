const os = require("os");
const fs = require('fs');
const path = require('path');
const babel = require('/usr/share/nodejs/@babel/core');
const webpack = require('/usr/share/nodejs/webpack');

const ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const TMP_CJS_DIR = path.join(os.tmpdir(), 'khushie_v3_cjs_' + process.pid);
const DIST_DIR = path.join(ROOT, 'dist');

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function compileTree(srcDir, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    if (entry.isDirectory()) {
      compileTree(srcPath, path.join(outDir, entry.name));
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      const code = fs.readFileSync(srcPath, 'utf-8');
      const result = babel.transformSync(code, {
        filename: srcPath,
        presets: [
          ['/usr/share/nodejs/@babel/preset-env', { targets: { browsers: ['defaults'] }, modules: 'commonjs' }],
          ['/usr/share/nodejs/@babel/preset-typescript', { isTSX: entry.name.endsWith('.tsx'), allExtensions: true }],
          ['/usr/share/nodejs/@babel/preset-react', { runtime: 'classic' }]
        ]
      });
      const outName = entry.name.replace(/\.tsx?$/, '.js');
      fs.writeFileSync(path.join(outDir, outName), result.code, 'utf-8');
    }
  }
}

cleanDir(TMP_CJS_DIR);
fs.mkdirSync(DIST_DIR, { recursive: true });

// 1. Transpile TypeScript + JSX to CommonJS modules
compileTree(SRC_DIR, TMP_CJS_DIR);

// 2. Copy CSS design system to dist/styles.css
fs.copyFileSync(
  path.join(SRC_DIR, 'styles', 'main.css'),
  path.join(DIST_DIR, 'styles.css')
);

// 3. Bundle with Webpack 5
const compiler = webpack({
  mode: 'production',
  entry: path.join(TMP_CJS_DIR, 'main.js'),
  output: {
    path: DIST_DIR,
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.json']
  }
});

compiler.run((err, stats) => {
  fs.rmSync(TMP_CJS_DIR, { recursive: true, force: true });
  if (err || stats.hasErrors()) {
    console.error('Build failed:', err || stats.toString({ errors: true }));
    process.exit(1);
  }
  const appJsSize = fs.statSync(path.join(DIST_DIR, 'app.js')).size;
  const cssSize = fs.statSync(path.join(DIST_DIR, 'styles.css')).size;
  console.log(`✓ Production bundle built successfully: dist/app.js (${(appJsSize / 1024).toFixed(1)} KB), dist/styles.css (${(cssSize / 1024).toFixed(1)} KB)`);
});
