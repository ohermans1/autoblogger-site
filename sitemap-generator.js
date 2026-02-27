const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

const paths = [
  { url: "/", changefreq: "monthly", priority: 1.0 },
  { url: "/features", changefreq: "monthly", priority: 0.8 },
  { url: "/pricing", changefreq: "monthly", priority: 0.8 },
  { url: "/faqs", changefreq: "monthly", priority: 0.8 },
  { url: "/other-apps", changefreq: "yearly", priority: 0.8 },
  { url: "/free-seo-checklist", changefreq: "monthly", priority: 0.9 },
  { url: "/reviews", changefreq: "monthly", priority: 0.7 },
  { url: "/contact", changefreq: "monthly", priority: 0.5 },
  { url: "/privacy", changefreq: "yearly", priority: 0.3 },
  { url: "/terms", changefreq: "yearly", priority: 0.3 },
  { url: "/backlink-terms", changefreq: "yearly", priority: 0.3 },
  { url: "/premium-extras", changefreq: "monthly", priority: 0.5 },
  { url: "/autoschema-terms", changefreq: "yearly", priority: 0.2 },
  { url: "/autoschema-privacy", changefreq: "yearly", priority: 0.2 }
];

async function generateSitemap() {
  try {
    const sitemapStream = new SitemapStream({ hostname: "https://autoblogger.bot" });
    const writeStream = createWriteStream("./public/sitemap.xml");
    const lastmodISO = new Date().toISOString();

    sitemapStream.pipe(writeStream);

    paths.forEach(path => {
      sitemapStream.write({
        ...path,
        lastmodISO
      });
    });

    sitemapStream.end();

    // Await the completion of the stream
    await streamToPromise(sitemapStream);

    console.log("Sitemap has been successfully generated at ./public/sitemap.xml");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}

generateSitemap();
