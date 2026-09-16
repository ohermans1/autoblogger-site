import fs from "fs";
import path from "path";
import { STATIC_SEO_PAGES, buildAbsoluteUrl, getCanonicalRoute, isIndexablePage } from "./pageCatalog";

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

test("the generated contact page has a direct email link instead of a self-link action", () => {
  const html = fs.readFileSync(path.join(process.cwd(), "public", "contact", "index.html"), "utf8");

  expect(html).toContain('href="mailto:support@autoblogger.bot"');
  expect(html).toContain("support@autoblogger.bot");
  expect(html).not.toContain('class="btn-secondary" href="/contact"');
});

test("direct-load pages include the branded navigation and shared stylesheet", () => {
  const html = fs.readFileSync(path.join(process.cwd(), "public", "features", "index.html"), "utf8");

  expect(html).toContain('href="/static-site.css"');
  expect(html).toContain('class="static-brand"');
  expect(html).toContain('class="static-mobile-menu"');
  expect(fs.existsSync(path.join(process.cwd(), "public", "static-site.css"))).toBe(true);
});

test("the direct-load sitemap has a page heading", () => {
  const html = fs.readFileSync(path.join(process.cwd(), "public", "site-map", "index.html"), "utf8");
  expect(html).toMatch(/<h1>HTML Sitemap<\/h1>/);
});

test("canonical URLs match the trailing slash used by hosted directory pages", () => {
  expect(buildAbsoluteUrl("/features")).toBe("https://autoblogger.bot/features/");
  expect(buildAbsoluteUrl("/")).toBe("https://autoblogger.bot/");
  const html = fs.readFileSync(path.join(process.cwd(), "public", "features", "index.html"), "utf8");
  expect(html).toContain('rel="canonical" href="https://autoblogger.bot/features/"');
});

test("software schema uses a real offer and only marks ratings where visible", () => {
  const readGraph = route => {
    const html = fs.readFileSync(path.join(process.cwd(), "public", route, "index.html"), "utf8");
    const match = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
    return JSON.parse(match[1])["@graph"];
  };
  const featuresApp = readGraph("features").find(item => item["@type"] === "SoftwareApplication");
  const reviewsApp = readGraph("reviews").find(item => item["@type"] === "SoftwareApplication");

  expect(featuresApp.offers).toMatchObject({ price: "9.95", priceCurrency: "USD" });
  expect(featuresApp.aggregateRating).toBeUndefined();
  expect(reviewsApp.aggregateRating).toMatchObject({ ratingValue: "4.9", ratingCount: "85" });
  expect(reviewsApp.review).toBeUndefined();
});

test("sitemap includes canonical URLs and only known content modification dates", () => {
  const xml = fs.readFileSync(path.join(process.cwd(), "public", "sitemap.xml"), "utf8");
  expect(xml).toContain("https://autoblogger.bot/features/");
  expect(xml).not.toContain("<changefreq>");
  expect(xml).not.toContain("<priority>");
  expect(xml).toMatch(/<loc>https:\/\/autoblogger\.bot\/features\/<\/loc><\/url>/);
});

test("every indexable direct-load page has one heading and consistent crawl metadata", () => {
  const xml = fs.readFileSync(path.join(process.cwd(), "public", "sitemap.xml"), "utf8");

  STATIC_SEO_PAGES.filter(isIndexablePage).forEach(page => {
    const html = fs.readFileSync(path.join(process.cwd(), "public", page.route.slice(1), "index.html"), "utf8");
    const canonical = buildAbsoluteUrl(getCanonicalRoute(page));

    expect((html.match(/<h1(?:\s|>)/g) || [])).toHaveLength(1);
    expect(html).toContain(`<title>${page.title.replace(/'/g, "&#39;")}</title>`);
    expect(html).toContain('<meta name="description"');
    expect(html).toContain(`rel="canonical" href="${canonical}"`);
    expect(xml).toContain(`<loc>${canonical}</loc>`);
  });
});
