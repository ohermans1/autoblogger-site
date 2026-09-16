const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { STATIC_SEO_PAGES, getCanonicalRoute, isIndexablePage } = require("./seo-static-pages-generator");

const HOME_PATH = { url: "/" };

function buildSitemapPaths() {
  const seen = new Set([HOME_PATH.url]);
  const paths = [HOME_PATH];

  STATIC_SEO_PAGES.filter(isIndexablePage).forEach(page => {
    const canonicalRoute = getCanonicalRoute(page);
    if (seen.has(canonicalRoute)) return;

    seen.add(canonicalRoute);
    paths.push({
      url: canonicalRoute === "/" ? canonicalRoute : `${canonicalRoute}/`,
      ...(page.dateModified || page.datePublished ? { lastmod: page.dateModified || page.datePublished } : {})
    });
  });

  return paths;
}

async function generateSitemap() {
  try {
    const sitemapStream = new SitemapStream({ hostname: "https://autoblogger.bot" });
    const writeStream = createWriteStream("./public/sitemap.xml");

    sitemapStream.pipe(writeStream);

    buildSitemapPaths().forEach(path => sitemapStream.write(path));

    sitemapStream.end();
    await streamToPromise(sitemapStream);

    console.log("Sitemap has been successfully generated at ./public/sitemap.xml");
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exitCode = 1;
  }
}

generateSitemap();
