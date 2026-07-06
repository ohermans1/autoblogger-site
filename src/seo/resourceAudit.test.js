import fs from "fs";
import path from "path";
import { STATIC_SEO_PAGES } from "./pageCatalog";

const REMOVED_ROUTE_PREFIXES = ["/ai-recommendations", "/solutions", "/shopify-seo", "/wix-seo", "/ecommerce-seo", "/resources"];
const CHECKLIST_ROUTES = ["/free-seo-checklist", "/seo-checklist"];

function isLocalFileHref(href = "") {
  return href.startsWith("/") && /\.[a-z0-9]+$/i.test(href);
}

function isInternalRouteHref(href = "") {
  return href.startsWith("/") && !isLocalFileHref(href);
}

function toPublicPath(href) {
  return path.join(process.cwd(), "public", href.replace(/^\/+/, ""));
}

test("removed programmatic and AI recommendation routes are not in the static catalog", () => {
  const routes = STATIC_SEO_PAGES.map(page => page.route);

  REMOVED_ROUTE_PREFIXES.forEach(prefix => {
    expect(routes.some(route => route === prefix || route.startsWith(`${prefix}/`))).toBe(false);
  });
});

test("checklist download assets exist", () => {
  CHECKLIST_ROUTES.forEach(route => {
    const page = STATIC_SEO_PAGES.find(item => item.route === route);
    expect(page?.resourceCards.length).toBeGreaterThan(0);

    page.resourceCards.forEach(card => {
      [card.href, card.secondaryHref].forEach(href => {
        if (!isLocalFileHref(href)) return;
        expect(fs.existsSync(toPublicPath(href))).toBe(true);
      });
    });
  });
});

test("the checklist alias inherits the same downloads as the canonical checklist page", () => {
  const canonicalPage = STATIC_SEO_PAGES.find(page => page.route === "/free-seo-checklist");
  const aliasPage = STATIC_SEO_PAGES.find(page => page.route === "/seo-checklist");

  expect(aliasPage?.resourceCards).toEqual(canonicalPage?.resourceCards);
});

test("internal SEO catalog links resolve to known routes or local files", () => {
  const knownRoutes = new Set(STATIC_SEO_PAGES.map(page => page.route));

  STATIC_SEO_PAGES.forEach(page => {
    const hrefs = [
      page.ctaHref,
      ...page.resourceCards.flatMap(card => [card.href, card.secondaryHref])
    ].filter(Boolean);

    hrefs.forEach(href => {
      if (isLocalFileHref(href)) {
        expect(fs.existsSync(toPublicPath(href))).toBe(true);
        return;
      }

      if (isInternalRouteHref(href)) {
        expect(knownRoutes.has(href)).toBe(true);
      }
    });
  });
});
