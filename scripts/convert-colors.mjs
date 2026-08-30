import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Map of hex colors to Tailwind v4 CSS variable names
const COLOR_MAP = {
  '#006063': 'primary',
  '#005254': 'primary-dark',
  '#00383a': 'primary-darker',
  '#e6e6e6': 'surface',
  '#231f20': 'ink',
  '#d79030': 'wood',
  '#4ac3e0': 'glass',
  '#f0523d': 'stone',
  '#8282d6': 'materia',
  '#65554a': 'metal',
};

// Files to process (only .tsx component/page files)
const TARGET_DIRS = ['src/components', 'src/pages'];

// Collect all .tsx files recursively
function getTsxFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getTsxFiles(fullPath));
    } else if (extname(fullPath) === '.tsx') {
      results.push(fullPath);
    }
  }
  return results;
}

// Replace Tailwind arbitrary color values with CSS variable names
function replaceTailwindColors(content) {
  let updated = content;

  // Replace Tailwind arbitrary color patterns:
  // bg-[#006063], text-[#006063], border-[#006063], hover:bg-[#006063], 
  // from-[#005254], via-[#006063], decoration-[#006063], group-hover:text-[#006063],
  // selection:bg-[#006063], bg-[#006063]/80, etc.
  // The pattern is: any class prefix followed by [#hex] or [#hex]/opacity
  for (const [hex, varName] of Object.entries(COLOR_MAP)) {
    // Escape hex for regex - # becomes \#
    const escapedHex = hex.replace('#', '\\#');
    
    // Match: [#006063] or [#006063]/80 (with optional opacity)
    const regex = new RegExp(`\\[${escapedHex}(\\/\\d+)?\\]`, 'g');
    
    updated = updated.replace(regex, (match, opacity) => {
      // If there's opacity, keep it: primary/80
      return opacity ? `${varName}${opacity}` : varName;
    });
  }

  // Replace color: '#hex' in data objects (like Hero.tsx materials array)
  // Example: color: '#d79030' -> color: 'var(--color-wood)'
  for (const [hex, varName] of Object.entries(COLOR_MAP)) {
    const regex = new RegExp(`('#|")${hex}('|")`, 'g');
    updated = updated.replace(regex, `var(--color-${varName.split('-').pop()})`);
  }

  return updated;
}

// Process all files
let totalFiles = 0;
let totalReplacements = 0;

for (const dir of TARGET_DIRS) {
  if (!statSync(dir).isDirectory()) continue;
  const files = getTsxFiles(dir);
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const updated = replaceTailwindColors(content);
    if (updated !== content) {
      writeFileSync(file, updated, 'utf8');
      console.log(`Updated: ${file}`);
      totalFiles++;
    }
  }
}

console.log(`\nDone! Updated ${totalFiles} files.`);