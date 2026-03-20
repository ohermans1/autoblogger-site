import fs from "fs";
import path from "path";
import { STATIC_SEO_PAGES } from "./pageCatalog";

const RESOURCE_PAGES = STATIC_SEO_PAGES.filter(
  page =>
    page.route === "/free-seo-checklist" ||
    page.route === "/resources" ||
    page.route.startsWith("/resources/") ||
    page.canonicalRoute === "/free-seo-checklist"
);

function isLocalFileHref(href = "") {
  return href.startsWith("/") && /\.[a-z0-9]+$/i.test(href);
}

function isInternalRouteHref(href = "") {
  return href.startsWith("/") && !isLocalFileHref(href);
}

function toPublicPath(href) {
  return path.join(process.cwd(), "public", href.replace(/^\/+/, ""));
}

test("every resource page has a real asset or tool", () => {
  RESOURCE_PAGES.forEach(page => {
    expect(page.resourceCards.length > 0 || page.tool).toBe(true);
  });
});

test("every local resource asset exists on disk and every internal tool link resolves to a page", () => {
  const knownRoutes = new Set(STATIC_SEO_PAGES.map(page => page.route));

  RESOURCE_PAGES.forEach(page => {
    page.resourceCards.forEach(card => {
      [card.href, card.secondaryHref].forEach(href => {
        if (!href) return;

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
});

test("the ROI resource page includes an actual calculator tool config", () => {
  const roiPage = STATIC_SEO_PAGES.find(page => page.route === "/resources/ecommerce-seo-roi-calculator");

  expect(roiPage?.tool?.key).toBe("seo-roi-calculator");
});

test("the checklist alias inherits the same downloads as the canonical checklist page", () => {
  const canonicalPage = STATIC_SEO_PAGES.find(page => page.route === "/free-seo-checklist");
  const aliasPage = STATIC_SEO_PAGES.find(page => page.route === "/seo-checklist");

  expect(aliasPage?.resourceCards).toEqual(canonicalPage?.resourceCards);
});

test("the resources hub covers every resource detail page", () => {
  const hubPage = STATIC_SEO_PAGES.find(page => page.route === "/resources");
  const childRoutes = STATIC_SEO_PAGES.filter(page => page.route.startsWith("/resources/")).map(page => page.route).sort();
  const linkedRoutes = hubPage?.resourceCards
    .flatMap(card => [card.href, card.secondaryHref])
    .filter(href => href && href.startsWith("/resources/") && !href.startsWith("/resources/downloads/"))
    .sort();

  expect(linkedRoutes).toEqual(childRoutes);
});
