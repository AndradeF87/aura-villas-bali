const { downloadAndExtractFonts } = require('google-fonts-helper');
const path = require('path');
const fs = require('fs');

async function downloadFonts() {
  const fontsDir = path.join(__dirname, '../public/fonts');
  
  // Download Inter
  const interFonts = await downloadAndExtractFonts({
    name: 'Inter',
    weights: ['300', '400', '500', '600', '700'],
    formats: ['woff2', 'woff'],
    outputDir: path.join(fontsDir, 'inter'),
  });
  
  // Download Playfair Display
  const playfairFonts = await downloadAndExtractFonts({
    name: 'Playfair Display',
    weights: ['400', '500', '600', '700', '800', '900'],
    formats: ['woff2', 'woff'],
    outputDir: path.join(fontsDir, 'playfair'),
  });
  
  console.log('Downloaded Inter fonts:', interFonts);
  console.log('Downloaded Playfair Display fonts:', playfairFonts);
  
  // Generate CSS
  const cssContent = `
/* Inter Font */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/inter/inter-v12-latin-300.woff2') format('woff2'),
       url('/fonts/inter/inter-v12-latin-300.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter/inter-v12-latin-regular.woff2') format('woff2'),
       url('/fonts/inter/inter-v12-latin-regular.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/inter/inter-v12-latin-500.woff2') format('woff2'),
       url('/fonts/inter/inter-v12-latin-500.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter/inter-v12-latin-600.woff2') format('woff2'),
       url('/fonts/inter/inter-v12-latin-600.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter/inter-v12-latin-700.woff2') format('woff2'),
       url('/fonts/inter/inter-v12-latin-700.woff') format('woff');
}

/* Playfair Display Font */
@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/playfair/playfair-display-v30-latin-regular.woff2') format('woff2'),
       url('/fonts/playfair/playfair-display-v30-latin-regular.woff') format('woff');
}

@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/playfair/playfair-display-v30-latin-500.woff2') format('woff2'),
       url('/fonts/playfair/playfair-display-v30-latin-500.woff') format('woff');
}

@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/playfair/playfair-display-v30-latin-600.woff2') format('woff2'),
       url('/fonts/playfair/playfair-display-v30-latin-600.woff') format('woff');
}

@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/playfair/playfair-display-v30-latin-700.woff2') format('woff2'),
       url('/fonts/playfair/playfair-display-v30-latin-700.woff') format('woff');
}

@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/playfair/playfair-display-v30-latin-800.woff2') format('woff2'),
       url('/fonts/playfair/playfair-display-v30-latin-800.woff') format('woff');
}

@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/playfair/playfair-display-v30-latin-900.woff2') format('woff2'),
       url('/fonts/playfair/playfair-display-v30-latin-900.woff') format('woff');
}
`;

  fs.writeFileSync(path.join(__dirname, '../app/fonts.css'), cssContent);
  console.log('Generated fonts.css');
}

downloadFonts().catch(console.error);