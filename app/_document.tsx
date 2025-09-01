import { Html, Head, Main, NextScript } from 'next/document'
import fs from 'fs'
import path from 'path'

export default function Document() {
  // Read critical CSS at build time
  const criticalCSS = fs.readFileSync(
    path.join(process.cwd(), 'app', 'critical.css'),
    'utf8'
  )

  return (
    <Html lang="en">
      <Head>
        {/* Inline critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/playfair-display-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}