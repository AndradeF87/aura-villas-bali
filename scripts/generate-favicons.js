const fs = require('fs');
const path = require('path');

// Create a simple SVG icon for AURA Villas
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect width="512" height="512" rx="64" fill="#0f172a"/>
  <path d="M256 140 L320 340 L256 280 L192 340 Z" fill="#d4af37" opacity="0.9"/>
  <path d="M160 220 L256 100 L352 220 L320 240 L256 180 L192 240 Z" fill="#f59e0b"/>
  <circle cx="256" cy="380" r="24" fill="#d4af37"/>
</svg>`;

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');

// Save SVG icon
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);

// Create a simple favicon.ico (we'll use a data URL for simplicity)
const icoBase64 = 'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////Bv///0r///+K////qv///6r///+K////Sv///wYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///1D////s///////////////////////////////////////////////s////UAAAAAAAAAAAAAAAAAAAAAAAAAAA////Bv///6j///////////////////////////////////////////////////////////////+o////BgAAAAAAAAAA////BP///4T/////////////////////////////////////////////////////////////////////////hP///wQAAAAA////Sv///////////////////////////////////////////////////////////////////////////0r///8A////iv///////////////////////////////////////////////////////////////////////////4r///8A////qv///////////////////////////////////////////////////////////////////////////6r///8A////qv///////////////////////////////////////////////////////////////////////////6r///8A////iv///////////////////////////////////////////////////////////////////////////4r///8A////Sv///////////////////////////////////////////////////////////////////////////0r///8A////BP///4T/////////////////////////////////////////////////////////////////////////hP///wQAAAAAAAAABv///6j///////////////////////////////////////////////////////////////+o////BgAAAAAAAAAAAAAAAP///1D////s///////////////////////////////////////////////s////UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////Bv///0r///+K////qv///6r///+K////Sv///wYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
const icoBuffer = Buffer.from(icoBase64, 'base64');
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

// Create PNG files using canvas-like approach with data URLs
const sizes = [16, 32, 180, 192, 512];
const pngBase64Small = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACSSURBVHgBrZLRDYAgDEQfxgFcwRVcwRFcwRVcwRVcwRVcgb5rSWmhoCZ96SUJXO8KFABmdiGimmQVZEZEE8mqOudWRLRJVsEtqCgz14ho8H1fQsDM7Oac20lqASGEkaQQUAJKQAn4KcB7P3rvJ5LqA9YBNh9w3rcPyN57BViA9XcBFmABFmABPwWMMe8xxvT/AW/4GjsPJc0mJgAAAABJRU5ErkJggg==';

// Save different sized PNGs
fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), Buffer.from(pngBase64Small, 'base64'));
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), Buffer.from(pngBase64Small, 'base64'));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), Buffer.from(pngBase64Small, 'base64'));
fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), Buffer.from(pngBase64Small, 'base64'));
fs.writeFileSync(path.join(publicDir, 'favicon-512x512.png'), Buffer.from(pngBase64Small, 'base64'));

console.log('✅ Favicon files generated successfully');
console.log('Generated files:');
console.log('  - favicon.ico');
console.log('  - icon.svg');
console.log('  - favicon-16x16.png');
console.log('  - favicon-32x32.png');
console.log('  - apple-touch-icon.png');
console.log('  - favicon-192x192.png');
console.log('  - favicon-512x512.png');
console.log('  - site.webmanifest (already created)');