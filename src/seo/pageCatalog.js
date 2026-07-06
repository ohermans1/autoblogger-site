import corePages from "./corePages.json";
import programmaticPages from "./programmaticPages.json";
import pageContentByRoute from "./pageContent.json";
import pageAssetsByRoute from "./pageAssets.json";

export const SITE_URL = "https://autoblogger.bot";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;
export const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
export const APP_LISTING_URL = "https://apps.shopify.com/autoblogger";

export const SITE_NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "FAQs", path: "/faqs" },
  { name: "Reviews", path: "/reviews" },
  { name: "Blog", path: "/blog" },
  { name: "2x Staff Pick", path: "/2x-staff-pick" },
  { name: "Contact", path: "/contact" },
  { name: "Other Apps", path: "/other-apps" },
  { name: "Free SEO Checklist", path: "/free-seo-checklist" }
];

function normalizeSections(sections) {
  if (!Array.isArray(sections)) return [];

  return sections
    .map(section => ({
      title: section?.title || "",
      paragraphs: Array.isArray(section?.paragraphs) ? section.paragraphs : [],
      items: Array.isArray(section?.items) ? section.items : [],
      ordered: Boolean(section?.ordered)
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

function normalizeResourceCards(cards) {
  if (!Array.isArray(cards)) return [];

  return cards
    .map(card => ({
      eyebrow: card?.eyebrow || "",
      title: card?.title || "",
      description: card?.description || "",
      meta: card?.meta || "",
      items: Array.isArray(card?.items) ? card.items : [],
      href: card?.href || "",
      label: card?.label || "",
      download: Boolean(card?.download),
      secondaryHref: card?.secondaryHref || "",
      secondaryLabel: card?.secondaryLabel || "",
      secondaryDownload: Boolean(card?.secondaryDownload)
    }))
    .filter(card => card.title && (card.href || card.secondaryHref));
}

function normalizeTool(tool) {
  if (!tool || typeof tool !== "object" || !tool.key) return null;

  const defaults = tool.defaults || {};

  return {
    key: tool.key,
    title: tool.title || "",
    description: tool.description || "",
    note: tool.note || "",
    defaults: {
      monthlyImpressions: typeof defaults.monthlyImpressions === "number" ? defaults.monthlyImpressions : 20000,
      projectedImpressions: typeof defaults.projectedImpressions === "number" ? defaults.projectedImpressions : 28000,
      currentCtr: typeof defaults.currentCtr === "number" ? defaults.currentCtr : 2.4,
      targetCtr: typeof defaults.targetCtr === "number" ? defaults.targetCtr : 3.8,
      conversionRate: typeof defaults.conversionRate === "number" ? defaults.conversionRate : 2.2,
      averageOrderValue: typeof defaults.averageOrderValue === "number" ? defaults.averageOrderValue : 95
    }
  };
}

export const STATIC_SEO_PAGES = [...corePages, ...programmaticPages].map(page => {
  const content = pageContentByRoute[page.route] || {};
  const assets = pageAssetsByRoute[page.route] || (page.canonicalRoute ? pageAssetsByRoute[page.canonicalRoute] || {} : {});
  const mergedPage = { ...page, ...content, ...assets };

  return {
    ...mergedPage,
    bullets: Array.isArray(mergedPage.bullets) ? mergedPage.bullets : [],
    faq: Array.isArray(mergedPage.faq) ? mergedPage.faq : [],
    tags: Array.isArray(mergedPage.tags) ? mergedPage.tags : [],
    sections: normalizeSections(mergedPage.sections),
    checklist: Array.isArray(mergedPage.checklist) ? mergedPage.checklist : [],
    comparisonTable: normalizeComparisonTable(mergedPage.comparisonTable),
    resourceSectionTitle: mergedPage.resourceSectionTitle || "",
    resourceSectionIntro: mergedPage.resourceSectionIntro || "",
    resourceCards: normalizeResourceCards(mergedPage.resourceCards),
    tool: normalizeTool(mergedPage.tool),
    changefreq: mergedPage.changefreq || "monthly",
    priority: typeof mergedPage.priority === "number" ? mergedPage.priority : 0.6,
    robots: mergedPage.robots || DEFAULT_ROBOTS
  };
});

const PAGE_BY_ROUTE = new Map(STATIC_SEO_PAGES.map(page => [page.route, page]));

export function normalizePath(pathname) {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export function buildAbsoluteUrl(path) {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export function getCanonicalRoute(page) {
  if (!page) return "/";
  return page.canonicalRoute || page.route;
}

export function getPageByRoute(pathname) {
  return PAGE_BY_ROUTE.get(normalizePath(pathname));
}

export function isIndexablePage(page) {
  return !String(page?.robots || "").toLowerCase().includes("noindex");
}

export function hasRoutePrefix(pageOrRoute, prefix) {
  const route = typeof pageOrRoute === "string" ? pageOrRoute : pageOrRoute?.route;
  return route === prefix || route?.startsWith(`${prefix}/`);
}

export function isHubPage(pageOrRoute) {
  const route = typeof pageOrRoute === "string" ? pageOrRoute : pageOrRoute?.route;
  return route === "/blog";
}

export function isGuidePage(pageOrRoute) {
  return hasRoutePrefix(pageOrRoute, "/blog") && !isHubPage(pageOrRoute);
}

export function getPageSection(page) {
  if (page.route === "/site-map") return "Site";
  if (page.route === "/blog" || hasRoutePrefix(page, "/blog")) return "Blog";
  if (["/privacy", "/terms", "/autoschema-terms", "/autoschema-privacy"].includes(page.route)) return "Legal";
  return "Core";
}

export function groupPagesBySection(pages = STATIC_SEO_PAGES) {
  return pages
    .filter(isIndexablePage)
    .reduce((groups, page) => {
      const section = getPageSection(page);
      if (!groups[section]) groups[section] = [];
      groups[section].push(page);
      return groups;
    }, {});
}

export function getBreadcrumbTrail(page) {
  const trail = [{ label: "Home", path: "/" }];

  if (page.route === "/site-map") {
    trail.push({ label: "HTML Sitemap", path: "/site-map" });
    return trail;
  }

  if (hasRoutePrefix(page, "/blog") && page.route !== "/blog") {
    trail.push({ label: "Blog", path: "/blog" });
  }

  trail.push({
    label: page.heading || page.title,
    path: getCanonicalRoute(page)
  });

  return trail;
}

function scoreRelatedness(source, candidate) {
  if (!source.tags.length || !candidate.tags.length) return 0;

  return source.tags.reduce((score, tag) => {
    return candidate.tags.includes(tag) ? score + 1 : score;
  }, 0);
}

export function findRelatedPages(page, pages = STATIC_SEO_PAGES) {
  const candidates = pages.filter(candidate => candidate.route !== page.route && isIndexablePage(candidate));

  if (page.route === "/blog") {
    return candidates.filter(candidate => hasRoutePrefix(candidate, "/blog") && candidate.route !== "/blog").slice(0, 6);
  }

  if (hasRoutePrefix(page, "/blog")) {
    return candidates.filter(candidate => hasRoutePrefix(candidate, "/blog")).slice(0, 4);
  }

  const scored = candidates
    .map(candidate => ({ candidate, score: scoreRelatedness(page, candidate) }))
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(item => item.candidate);

  if (scored.length >= 3) return scored;

  const fallback = candidates.filter(candidate => ["/features", "/pricing", "/reviews", "/free-seo-checklist"].includes(candidate.route)).slice(0, 4);
  return [...scored, ...fallback].slice(0, 4);
}
