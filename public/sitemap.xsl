<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>AURA Villas Bali - XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #2F4A3C;
            background: #F8F4F0;
            margin: 0;
            padding: 20px;
          }
          .header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2F4A3C;
            margin: 0 0 10px 0;
            font-size: 24px;
          }
          .info {
            color: #666;
            font-size: 14px;
          }
          table {
            width: 100%;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          th {
            background: #2F4A3C;
            color: white;
            text-align: left;
            padding: 12px;
            font-size: 14px;
            font-weight: 500;
          }
          td {
            padding: 10px 12px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
          }
          tr:hover {
            background: #f9f9f9;
          }
          tr:last-child td {
            border-bottom: none;
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
            color: #666;
            margin-top: 4px;
          }
          .alternates a {
            margin-right: 10px;
          }
          .priority {
            font-weight: 600;
            color: #2F4A3C;
          }
          .changefreq {
            color: #666;
            text-transform: capitalize;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>AURA Villas Bali - XML Sitemap</h1>
          <p class="info">
            This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
          </p>
        </div>
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th width="50%">URL</th>
              <th width="15%">Priority</th>
              <th width="15%">Change Frequency</th>
              <th width="20%">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <xsl:sort select="sitemap:priority" order="descending"/>
              <tr>
                <td>
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:attribute>
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                  <xsl:if test="xhtml:link">
                    <div class="alternates">
                      <xsl:for-each select="xhtml:link[@rel='alternate']">
                        <a>
                          <xsl:attribute name="href">
                            <xsl:value-of select="@href"/>
                          </xsl:attribute>
                          <xsl:value-of select="@hreflang"/>
                        </a>
                      </xsl:for-each>
                    </div>
                  </xsl:if>
                </td>
                <td class="priority">
                  <xsl:value-of select="concat(sitemap:priority*100,'%')"/>
                </td>
                <td class="changefreq">
                  <xsl:value-of select="sitemap:changefreq"/>
                </td>
                <td>
                  <xsl:value-of select="substring(sitemap:lastmod,1,10)"/>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>