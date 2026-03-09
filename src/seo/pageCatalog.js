import corePages from "./corePages.json";
import programmaticPages from "./programmaticPages.json";

export const SITE_URL = "https://autoblogger.bot";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;
export const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
export const APP_LISTING_URL = "https://apps.shopify.com/autoblogger";

export const TRUST_BULLETS = [
  "2x Shopify Staff Pick",
  "4.9 out of 5 average rating on the Shopify App Store",
  "14-day free trial with no long setup process"
];

export const SITE_NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Solutions", path: "/solutions" },
  { name: "Resources", path: "/resources" },
  { name: "FAQs", path: "/faqs" },
  { name: "Reviews", path: "/reviews" },
  { name: "Contact", path: "/contact" },
  { name: "Other Apps", path: "/other-apps" },
  { name: "Free SEO Checklist", path: "/free-seo-checklist" }
];

export const STATIC_SEO_PAGES = [...corePages, ...programmaticPages].map(page => ({
  ...page,
  bullets: Array.isArray(page.bullets) ? page.bullets : [],
  faq: Array.isArray(page.faq) ? page.faq : [],
  tags: Array.isArray(page.tags) ? page.tags : [],
  changefreq: page.changefreq || "monthly",
  priority: typeof page.priority === "number" ? page.priority : 0.6,
  robots: page.robots || DEFAULT_ROBOTS
}));

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
  return route === "/solutions" || route === "/resources";
}

export function isGuidePage(pageOrRoute) {
  return ["/shopify-seo", "/wix-seo", "/ecommerce-seo", "/resources"].some(prefix => hasRoutePrefix(pageOrRoute, prefix)) && !isHubPage(pageOrRoute);
}

function scoreRelatedness(source, candidate) {
  if (!source.tags.length || !candidate.tags.length) return 0;

  return source.tags.reduce((score, tag) => {
    return candidate.tags.includes(tag) ? score + 1 : score;
  }, 0);
}

export function findRelatedPages(page, pages = STATIC_SEO_PAGES) {
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
