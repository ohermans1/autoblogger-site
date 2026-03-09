const fs = require("fs");
const path = require("path");
const corePages = require("./src/seo/corePages.json");
const programmaticPages = require("./src/seo/programmaticPages.json");

const SITE_URL = "https://autoblogger.bot";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;
const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
const OUTPUT_ROOT = path.join(__dirname, "public");
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const APP_LISTING_URL = "https://apps.shopify.com/autoblogger";

const TRUST_BULLETS = [
  "2x Shopify Staff Pick",
  "4.9 out of 5 average rating on the Shopify App Store",
  "14-day free trial with no long setup process"
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "FAQs", href: "/faqs" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "Other Apps", href: "/other-apps" },
  { label: "Free SEO Checklist", href: "/free-seo-checklist" }
];

const REVIEW_SNIPPETS = [
  {
    author: "SK8 Clothing",
    text: "The app makes blog publishing simple and saves significant time each week.",
    rating: 5
  },
  {
    author: "Tony's Aussie Prints",
    text: "Setup is straightforward and the automated workflow is reliable.",
    rating: 5
  },
  {
    author: "Capric Clothes",
    text: "Helpful for stores that need consistent content without a large team.",
    rating: 5
  }
];

const STATIC_SEO_PAGES = [...corePages, ...programmaticPages].map(page => ({
  ...page,
  bullets: Array.isArray(page.bullets) ? page.bullets : [],
  faq: Array.isArray(page.faq) ? page.faq : [],
  tags: Array.isArray(page.tags) ? page.tags : [],
  changefreq: page.changefreq || "monthly",
  priority: typeof page.priority === "number" ? page.priority : 0.6,
  robots: page.robots || DEFAULT_ROBOTS
}));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toAbsolute(route) {
  if (!route || route === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${route}`;
}

function hashRoute(route) {
  if (!route || route === "/") return `${SITE_URL}/#/`;
  return `${SITE_URL}/#${route}`;
}

function isIndexablePage(page) {
  return !String(page.robots || "").toLowerCase().includes("noindex");
}

function getCanonicalRoute(page) {
  return page.canonicalRoute || page.route;
}

function hasRoutePrefix(page, prefix) {
  return page.route === prefix || page.route.startsWith(`${prefix}/`);
}

function isHubPage(page) {
  return page.route === "/solutions" || page.route === "/resources";
}

function isGuidePage(page) {
  return ["/shopify-seo", "/wix-seo", "/ecommerce-seo", "/resources"].some(prefix => hasRoutePrefix(page, prefix)) && !isHubPage(page);
}

function scoreRelatedness(source, candidate) {
  if (!source.tags.length || !candidate.tags.length) return 0;

  return source.tags.reduce((score, tag) => {
    return candidate.tags.includes(tag) ? score + 1 : score;
  }, 0);
}

function findRelatedPages(page, pages) {
  const candidates = pages.filter(candidate => candidate.route !== page.route && isIndexablePage(candidate));

  if (page.route === "/solutions") {
    return candidates.filter(candidate => ["/shopify-seo", "/wix-seo", "/ecommerce-seo"].some(prefix => hasRoutePrefix(candidate, prefix))).slice(0, 6);
  }

  if (page.route === "/resources") {
    return candidates.filter(candidate => hasRoutePrefix(candidate, "/resources") && candidate.route !== "/resources").slice(0, 6);
  }

  if (hasRoutePrefix(page, "/resources")) {
    return candidates.filter(candidate => hasRoutePrefix(candidate, "/resources") && candidate.route !== page.route).slice(0, 4);
  }

  const scored = candidates
    .map(candidate => ({ candidate, score: scoreRelatedness(page, candidate) }))
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(item => item.candidate);

  if (scored.length >= 3) return scored;

  const fallback = candidates.filter(candidate => ["/free-seo-checklist", "/solutions", "/resources"].includes(candidate.route)).slice(0, 4);
  return [...scored, ...fallback].slice(0, 4);
}

function buildBreadcrumbList(route, canonicalUrl, heading) {
  if (route === "/") return null;

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: heading, item: canonicalUrl }
    ]
  };
}

function buildReviewsGraph() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#autoblogger-app`,
    name: "autoBlogger",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: APP_LISTING_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "22"
    },
    review: REVIEW_SNIPPETS.map(item => ({
      "@type": "Review",
      author: { "@type": "Organization", name: item.author },
      reviewRating: { "@type": "Rating", ratingValue: String(item.rating), bestRating: "5" },
      reviewBody: item.text
    }))
  };
}

function buildFaqGraph(page, canonicalUrl) {
  if (page.faq.length === 0) return null;

  return {
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: page.faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

function buildGuideGraph(page, canonicalUrl) {
  if (!isGuidePage(page) && page.route !== "/free-seo-checklist") return null;

  return {
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: page.title,
    description: page.description,
    image: DEFAULT_OG_IMAGE,
    inLanguage: "en",
    mainEntityOfPage: canonicalUrl,
    author: {
      "@id": `${SITE_URL}/#organization`
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`
    }
  };
}

function buildCollectionGraph(page, canonicalUrl) {
  if (!isHubPage(page)) return null;

  return {
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#collection`,
    name: page.title,
    description: page.description,
    url: canonicalUrl,
    isPartOf: {
      "@id": `${SITE_URL}/#website`
    }
  };
}

function shouldIncludeSoftwareApplication(page) {
  return ["/reviews", "/pricing", "/features", "/solutions", "/free-seo-checklist"].includes(page.route) || hasRoutePrefix(page, "/shopify-seo");
}

function buildSchemaGraph(page, canonicalUrl) {
  const breadcrumb = buildBreadcrumbList(page.route, canonicalUrl, page.heading || page.title);
  const faqGraph = buildFaqGraph(page, canonicalUrl);
  const guideGraph = buildGuideGraph(page, canonicalUrl);
  const collectionGraph = buildCollectionGraph(page, canonicalUrl);

  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "autoBlogger",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE
      },
      sameAs: [APP_LISTING_URL],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@autoblogger.bot"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "autoBlogger",
      publisher: {
        "@id": `${SITE_URL}/#organization`
      }
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#site-navigation`,
      itemListElement: NAV_LINKS.map((item, index) => ({
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: item.label,
        url: toAbsolute(item.href)
      }))
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: page.title,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: breadcrumb ? { "@id": `${canonicalUrl}#breadcrumb` } : undefined
    }
  ];

  if (breadcrumb) graph.push(breadcrumb);
  if (faqGraph) graph.push(faqGraph);
  if (guideGraph) graph.push(guideGraph);
  if (collectionGraph) graph.push(collectionGraph);
  if (shouldIncludeSoftwareApplication(page)) graph.push(buildReviewsGraph());

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function serializeJsonForScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function renderFaqSection(page) {
  if (page.faq.length === 0) return "";

  const items = page.faq
    .map(item => `<details class="faq-item"><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`)
    .join("");

  return `<section class="sub-card"><h2>FAQ Snippets</h2>${items}</section>`;
}

function renderRelatedLinks(page, pages) {
  const related = findRelatedPages(page, pages);
  if (!related.length) return "";

  const links = related
    .map(
      item =>
        `<li><a href="${escapeHtml(item.route)}">${escapeHtml(item.heading || item.title)}</a><span>${escapeHtml(item.description)}</span></li>`
    )
    .join("");

  return `<section class="sub-card"><h2>Related Guides</h2><ul class="related-list">${links}</ul></section>`;
}

function renderTrustAndCta(page, appUrl) {
  const trust = TRUST_BULLETS.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  const ctaLabel = page.ctaLabel || "Start 14-Day Free Trial";
  const ctaHref = page.ctaHref || APP_LISTING_URL;

  return `<section class="sub-card"><h2>Proof and Next Step</h2><ul>${trust}</ul><p>Use this page as your execution checklist, then launch implementation inside autoBlogger.</p><div class="actions"><a class="btn-primary" href="${escapeHtml(
    ctaHref
  )}">${escapeHtml(ctaLabel)}</a><a class="btn-secondary" href="${escapeHtml(appUrl)}">Open Interactive Version</a></div></section>`;
}

function renderHtml(page, pages) {
  const canonicalRoute = getCanonicalRoute(page);
  const canonicalUrl = toAbsolute(canonicalRoute);
  const appUrl = hashRoute(canonicalRoute);
  const schema = serializeJsonForScript(buildSchemaGraph(page, canonicalUrl));
  const nav = NAV_LINKS.map(link => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join("");
  const bullets = page.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="${escapeHtml(page.robots)}" />
    <meta name="author" content="autoBlogger" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <link rel="alternate" hreflang="en" href="${escapeHtml(canonicalUrl)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="autoBlogger" />
    <meta property="og:type" content="${escapeHtml(isGuidePage(page) ? "article" : "website")}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}" />
    <meta property="og:image:alt" content="autoBlogger logo" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}" />
    <meta name="twitter:image:alt" content="autoBlogger logo" />
    <script type="application/ld+json">${schema}</script>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Segoe UI, Arial, sans-serif; color: #1f2937; background: #f8fafc; line-height: 1.6; }
      header { background: #ffffff; border-bottom: 1px solid #e5e7eb; }
      .container { width: min(1080px, 92%); margin: 0 auto; }
      nav { display: flex; flex-wrap: wrap; gap: 0.7rem; padding: 1rem 0; }
      nav a { text-decoration: none; color: #0f766e; font-weight: 600; }
      main { padding: 2rem 0 3rem; }
      .grid { display: grid; gap: 1rem; grid-template-columns: 2fr 1fr; }
      .card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 1.4rem 1.3rem; }
      .sub-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem; margin-top: 1rem; }
      h1 { margin-top: 0; line-height: 1.25; }
      h2 { margin-top: 0; font-size: 1.1rem; }
      ul { margin: 1rem 0 0; padding-left: 1.1rem; }
      .faq-item { border-top: 1px solid #d1d5db; padding: 0.55rem 0; }
      .faq-item summary { font-weight: 700; cursor: pointer; }
      .faq-item p { margin: 0.5rem 0 0; }
      .related-list { list-style: none; margin: 0; padding: 0; }
      .related-list li { border-top: 1px solid #d1d5db; padding: 0.65rem 0; }
      .related-list a { color: #0f766e; font-weight: 700; text-decoration: none; }
      .related-list span { display: block; color: #4b5563; font-size: 0.92rem; }
      .actions { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.2rem; }
      .btn-primary, .btn-secondary { padding: 0.65rem 0.95rem; border-radius: 8px; text-decoration: none; font-weight: 700; }
      .btn-primary { background: #0f766e; color: #ffffff; }
      .btn-secondary { background: #ffffff; color: #0f766e; border: 1px solid #99f6e4; }
      .meta-note { color: #4b5563; font-size: 0.92rem; margin-top: 1rem; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body>
    <header>
      <div class="container">
        <nav aria-label="Primary">${nav}</nav>
      </div>
    </header>
    <main>
      <div class="container grid">
        <article class="card">
          <h1>${escapeHtml(page.heading)}</h1>
          <p>${escapeHtml(page.intro)}</p>
          <ul>${bullets}</ul>
          <div class="actions">
            <a class="btn-primary" href="${escapeHtml(appUrl)}">Open Interactive Version</a>
            <a class="btn-secondary" href="${APP_LISTING_URL}">View Shopify App Listing</a>
          </div>
          <p class="meta-note">SEO landing page updated on ${escapeHtml(BUILD_DATE)}.</p>
        </article>
        <aside>
          ${renderTrustAndCta(page, appUrl)}
          ${renderRelatedLinks(page, pages)}
          ${renderFaqSection(page)}
        </aside>
      </div>
    </main>
  </body>
</html>`;
}

function outputDirectory(route) {
  const clean = route.replace(/^\/+/, "");
  return path.join(OUTPUT_ROOT, clean);
}

function writePage(page, pages) {
  const dir = outputDirectory(page.route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderHtml(page, pages), "utf8");
}

function generatePages(pages = STATIC_SEO_PAGES) {
  pages.forEach(page => {
    writePage(page, pages);
  });
  console.log(`Generated ${pages.length} static SEO route pages.`);
}

if (require.main === module) {
  generatePages();
}

module.exports = {
  STATIC_SEO_PAGES,
  generatePages,
  getCanonicalRoute,
  isIndexablePage
};
