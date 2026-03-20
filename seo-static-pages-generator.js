const fs = require("fs");
const path = require("path");
const corePages = require("./src/seo/corePages.json");
const programmaticPages = require("./src/seo/programmaticPages.json");
const pageContentByRoute = require("./src/seo/pageContent.json");

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
  { label: "2x Staff Pick", href: "/2x-staff-pick" },
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

function normalizeSections(sections) {
  if (!Array.isArray(sections)) return [];

  return sections
    .map(section => ({
      title: section && section.title ? section.title : "",
      paragraphs: Array.isArray(section && section.paragraphs) ? section.paragraphs : [],
      items: Array.isArray(section && section.items) ? section.items : [],
      ordered: Boolean(section && section.ordered)
    }))
    .filter(section => section.title || section.paragraphs.length > 0 || section.items.length > 0);
}

function normalizeComparisonTable(table) {
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows) || table.columns.length === 0) {
    return null;
  }

  return {
    title: table.title || "Comparison Snapshot",
    columns: table.columns,
    rows: table.rows.filter(row => Array.isArray(row) && row.length > 0)
  };
}

const STATIC_SEO_PAGES = [...corePages, ...programmaticPages].map(page => {
  const content = pageContentByRoute[page.route] || {};
  const mergedPage = { ...page, ...content };

  return {
    ...mergedPage,
    bullets: Array.isArray(mergedPage.bullets) ? mergedPage.bullets : [],
    faq: Array.isArray(mergedPage.faq) ? mergedPage.faq : [],
    tags: Array.isArray(mergedPage.tags) ? mergedPage.tags : [],
    sections: normalizeSections(mergedPage.sections),
    checklist: Array.isArray(mergedPage.checklist) ? mergedPage.checklist : [],
    comparisonTable: normalizeComparisonTable(mergedPage.comparisonTable),
    changefreq: mergedPage.changefreq || "monthly",
    priority: typeof mergedPage.priority === "number" ? mergedPage.priority : 0.6,
    robots: mergedPage.robots || DEFAULT_ROBOTS
  };
});

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

function getPageSection(page) {
  if (page.route === "/site-map") return "Site";
  if (page.route === "/solutions" || hasRoutePrefix(page, "/shopify-seo") || hasRoutePrefix(page, "/wix-seo") || hasRoutePrefix(page, "/ecommerce-seo")) return "Solutions";
  if (page.route === "/resources" || hasRoutePrefix(page, "/resources")) return "Resources";
  if (["/privacy", "/terms", "/autoschema-terms", "/autoschema-privacy", "/backlink-terms"].includes(page.route)) return "Legal";
  return "Core";
}

function getBreadcrumbTrail(page) {
  const trail = [{ label: "Home", path: "/" }];

  if (page.route === "/site-map") {
    trail.push({ label: "HTML Sitemap", path: "/site-map" });
    return trail;
  }

  if (isGuidePage(page) && !hasRoutePrefix(page, "/resources")) {
    trail.push({ label: "Solutions", path: "/solutions" });
  }

  if (hasRoutePrefix(page, "/resources") && page.route !== "/resources") {
    trail.push({ label: "Resources", path: "/resources" });
  }

  trail.push({
    label: page.heading || page.title,
    path: getCanonicalRoute(page)
  });

  return trail;
}

function groupPagesBySection(pages) {
  return pages.filter(isIndexablePage).reduce((groups, page) => {
    const section = getPageSection(page);
    if (!groups[section]) groups[section] = [];
    groups[section].push(page);
    return groups;
  }, {});
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

function buildBreadcrumbList(page, canonicalUrl) {
  if (page.route === "/") return null;

  const trail = getBreadcrumbTrail(page);

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: toAbsolute(item.path)
    }))
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

function buildSiteMapGraph(page, canonicalUrl) {
  if (page.route !== "/site-map") return null;

  const listedPages = STATIC_SEO_PAGES.filter(isIndexablePage);

  return {
    "@type": "ItemList",
    "@id": `${canonicalUrl}#sitemap`,
    name: "autoBlogger HTML Sitemap",
    itemListElement: listedPages.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.heading || item.title,
      url: toAbsolute(getCanonicalRoute(item))
    }))
  };
}

function shouldIncludeSoftwareApplication(page) {
  return ["/reviews", "/pricing", "/features", "/solutions", "/free-seo-checklist", "/2x-staff-pick"].includes(page.route) || hasRoutePrefix(page, "/shopify-seo");
}

function buildSchemaGraph(page, canonicalUrl) {
  const breadcrumb = buildBreadcrumbList(page, canonicalUrl);
  const faqGraph = buildFaqGraph(page, canonicalUrl);
  const guideGraph = buildGuideGraph(page, canonicalUrl);
  const collectionGraph = buildCollectionGraph(page, canonicalUrl);
  const siteMapGraph = buildSiteMapGraph(page, canonicalUrl);

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
  if (siteMapGraph) graph.push(siteMapGraph);
  if (shouldIncludeSoftwareApplication(page)) graph.push(buildReviewsGraph());

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function serializeJsonForScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function renderList(items, ordered = false, className = "") {
  if (!items.length) return "";

  const tag = ordered ? "ol" : "ul";
  const classAttribute = className ? ` class="${className}"` : "";
  const listItems = items.map(item => `<li>${escapeHtml(item)}</li>`).join("");

  return `<${tag}${classAttribute}>${listItems}</${tag}>`;
}

function renderQuickTakeaways(page) {
  if (page.bullets.length === 0) return "";

  return `<section class="sub-card"><h2>Quick Takeaways</h2>${renderList(page.bullets)}</section>`;
}

function renderContentSections(page) {
  if (page.sections.length === 0) return "";

  return page.sections
    .map(section => {
      const paragraphs = section.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("");
      const items = section.items.length > 0 ? renderList(section.items, section.ordered) : "";

      return `<section class="sub-card content-section"><h2>${escapeHtml(section.title)}</h2>${paragraphs}${items}</section>`;
    })
    .join("");
}

function renderComparisonTable(page) {
  if (!page.comparisonTable) return "";

  const header = page.comparisonTable.columns.map(column => `<th>${escapeHtml(column)}</th>`).join("");
  const rows = page.comparisonTable.rows
    .map(
      row =>
        `<tr>${row
          .map(cell => `<td>${escapeHtml(cell)}</td>`)
          .join("")}</tr>`
    )
    .join("");

  return `<section class="sub-card"><h2>${escapeHtml(page.comparisonTable.title)}</h2><div class="table-wrap"><table class="comparison-table"><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div></section>`;
}

function renderProofGallery(page) {
  if (!Array.isArray(page.proofGallery) || page.proofGallery.length === 0) return "";

  const items = page.proofGallery
    .map(item => {
      if (!item || !item.src || !item.alt) return "";

      const title = item.title ? `<div class="proof-header"><p>${escapeHtml(item.title)}</p></div>` : "";
      const caption = item.caption ? `<p class="proof-caption">${escapeHtml(item.caption)}</p>` : "";
      const width = typeof item.width === "number" ? ` width="${item.width}"` : "";
      const height = typeof item.height === "number" ? ` height="${item.height}"` : "";

      return `<figure class="proof-card">${title}<a href="${escapeHtml(item.src)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}"${width}${height} loading="lazy" decoding="async" /></a>${caption}</figure>`;
    })
    .filter(Boolean)
    .join("");

  if (!items) return "";

  return `<section class="sub-card"><h2>Proof Screenshots</h2><p>Public Shopify App Store screenshots showing autoBlogger featured in 2024 and 2026.</p><div class="proof-grid">${items}</div></section>`;
}

function renderChecklist(page) {
  if (page.checklist.length === 0) return "";

  return `<section class="sub-card"><h2>Action Checklist</h2>${renderList(page.checklist, true)}</section>`;
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

function renderBreadcrumbNav(page) {
  const trail = getBreadcrumbTrail(page);
  if (trail.length <= 1) return "";

  const items = trail
    .map((item, index) => {
      const isLast = index === trail.length - 1;
      if (isLast) return `<span aria-current="page">${escapeHtml(item.label)}</span>`;
      return `<a href="${escapeHtml(item.path)}">${escapeHtml(item.label)}</a>`;
    })
    .join(`<span aria-hidden="true">/</span>`);

  return `<nav class="breadcrumb" aria-label="Breadcrumb">${items}</nav>`;
}

function renderSiteMapCollection(pages) {
  const sectionLabels = {
    Core: "Core Pages",
    Solutions: "Solutions and Playbooks",
    Resources: "Resources and Templates",
    Legal: "Legal Pages",
    Site: "Site Utilities"
  };

  const grouped = groupPagesBySection(pages);
  const orderedSections = ["Core", "Solutions", "Resources", "Legal", "Site"].filter(section => (grouped[section] || []).length > 0);

  return orderedSections
    .map(section => {
      const items = grouped[section]
        .slice()
        .sort((left, right) => left.route.localeCompare(right.route))
        .map(
          item =>
            `<li><a href="${escapeHtml(item.route)}">${escapeHtml(item.heading || item.title)}</a><span>${escapeHtml(item.description)}</span></li>`
        )
        .join("");

      return `<section class="sub-card"><h2>${escapeHtml(sectionLabels[section])}</h2><ul class="related-list">${items}</ul></section>`;
    })
    .join("");
}

function renderHtml(page, pages) {
  const canonicalRoute = getCanonicalRoute(page);
  const canonicalUrl = toAbsolute(canonicalRoute);
  const appUrl = hashRoute(canonicalRoute);
  const schema = serializeJsonForScript(buildSchemaGraph(page, canonicalUrl));
  const nav = NAV_LINKS.map(link => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join("");
  const primaryContent =
    page.route === "/site-map"
      ? `<p>${escapeHtml(page.intro)}</p>${renderSiteMapCollection(pages)}`
      : `${renderBreadcrumbNav(page)}<p>${escapeHtml(page.intro)}</p>${renderQuickTakeaways(page)}${renderComparisonTable(page)}${renderProofGallery(page)}${renderContentSections(page)}${renderChecklist(page)}`;

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
      .breadcrumb { display: flex; flex-wrap: wrap; gap: 0.55rem; font-size: 0.95rem; margin-bottom: 1rem; color: #4b5563; }
      .breadcrumb a { color: #0f766e; font-weight: 600; text-decoration: none; }
      h1 { margin-top: 0; line-height: 1.25; }
      h2 { margin-top: 0; font-size: 1.1rem; }
      ul { margin: 1rem 0 0; padding-left: 1.1rem; }
      ol { margin: 1rem 0 0; padding-left: 1.2rem; }
      li + li { margin-top: 0.45rem; }
      .content-section p + p { margin-top: 0.85rem; }
      .content-section ul, .content-section ol { margin-top: 1rem; }
      .faq-item { border-top: 1px solid #d1d5db; padding: 0.55rem 0; }
      .faq-item summary { font-weight: 700; cursor: pointer; }
      .faq-item p { margin: 0.5rem 0 0; }
      .table-wrap { overflow-x: auto; }
      .comparison-table { width: 100%; border-collapse: collapse; }
      .comparison-table th, .comparison-table td { border-bottom: 1px solid #d1d5db; padding: 0.75rem; text-align: left; vertical-align: top; }
      .comparison-table th { color: #111827; }
      .proof-grid { display: grid; gap: 1rem; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 1rem; }
      .proof-card { overflow: hidden; border: 1px solid #d1d5db; border-radius: 12px; background: #ffffff; margin: 0; }
      .proof-card a { display: block; background: #ffffff; }
      .proof-card img { display: block; width: 100%; height: auto; }
      .proof-header { border-bottom: 1px solid #e5e7eb; background: #f8fafc; padding: 0.8rem 1rem; }
      .proof-header p { margin: 0; font-weight: 700; color: #111827; }
      .proof-caption { margin: 0; padding: 1rem; color: #4b5563; font-size: 0.95rem; }
      .related-list { list-style: none; margin: 0; padding: 0; }
      .related-list li { border-top: 1px solid #d1d5db; padding: 0.65rem 0; }
      .related-list a { color: #0f766e; font-weight: 700; text-decoration: none; }
      .related-list span { display: block; color: #4b5563; font-size: 0.92rem; }
      .actions { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.2rem; }
      .btn-primary, .btn-secondary { padding: 0.65rem 0.95rem; border-radius: 8px; text-decoration: none; font-weight: 700; }
      .btn-primary { background: #0f766e; color: #ffffff; }
      .btn-secondary { background: #ffffff; color: #0f766e; border: 1px solid #99f6e4; }
      .meta-note { color: #4b5563; font-size: 0.92rem; margin-top: 1rem; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } .proof-grid { grid-template-columns: 1fr; } }
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
          ${primaryContent}
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
