const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { STATIC_SEO_PAGES, getCanonicalRoute, isIndexablePage } = require("./seo-static-pages-generator");

const HOME_PATH = { url: "/", changefreq: "weekly", priority: 1.0 };

function buildSitemapPaths() {
  const seen = new Set([HOME_PATH.url]);
  const paths = [HOME_PATH];

  STATIC_SEO_PAGES.filter(isIndexablePage).forEach(page => {
    const canonicalRoute = getCanonicalRoute(page);
    if (seen.has(canonicalRoute)) return;

    seen.add(canonicalRoute);
    paths.push({
      url: canonicalRoute,
      changefreq: page.changefreq || "monthly",
      priority: typeof page.priority === "number" ? page.priority : 0.6
    });
  });

  return paths;
}

async function generateSitemap() {
  try {
    const sitemapStream = new SitemapStream({ hostname: "https://autoblogger.bot" });
    const writeStream = createWriteStream("./public/sitemap.xml");
    const lastmodISO = new Date().toISOString();

    sitemapStream.pipe(writeStream);

    buildSitemapPaths().forEach(path => {
      sitemapStream.write({
        ...path,
        lastmodISO
      });
    });

    sitemapStream.end();
    await streamToPromise(sitemapStream);

    console.log("Sitemap has been successfully generated at ./public/sitemap.xml");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}

generateSitemap();
