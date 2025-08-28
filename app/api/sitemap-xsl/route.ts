import { NextResponse } from 'next/server';

export async function GET() {
  const xsl = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>AURA Villas Bali - Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2F4A3C;
            margin: 0 0 10px 0;
            font-size: 28px;
          }
          .info {
            color: #666;
            margin-bottom: 30px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            background: #2F4A3C;
            color: white;
            text-align: left;
            padding: 12px;
            font-weight: 500;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
          }
          tr:hover {
            background: #f9f9f9;
          }
          a {
            color: #C96F4A;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .alternates {
            font-size: 12px;
            color: #888;
            margin-top: 4px;
          }
          .lang-link {
            display: inline-block;
            margin-right: 10px;
            padding: 2px 6px;
            background: #f0f0f0;
            border-radius: 3px;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>AURA Villas Bali - XML Sitemap</h1>
          <p class="info">
            This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs for search engines.
          </p>
          <table>
            <thead>
              <tr>
                <th width="60%">URL</th>
                <th width="20%">Language Versions</th>
                <th width="20%">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <div class="alternates">
                      <xsl:for-each select="xhtml:link[@rel='alternate']">
                        <span class="lang-link">
                          <xsl:value-of select="@hreflang"/>
                        </span>
                      </xsl:for-each>
                    </div>
                  </td>
                  <td>
                    <xsl:value-of select="substring(sitemap:lastmod,1,10)"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

  return new NextResponse(xsl, {
    headers: {
      'Content-Type': 'application/xslt+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}