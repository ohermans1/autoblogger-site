import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  SITE_NAV_ITEMS,
  SITE_URL,
  STATIC_SEO_PAGES,
  buildAbsoluteUrl,
  getCanonicalRoute,
  getBreadcrumbTrail,
  getPageByRoute,
  isIndexablePage,
  isGuidePage,
  isHubPage,
  normalizePath
} from "../seo/pageCatalog";

const HOME_META = {
  title: "autoBlogger | The Original Shopify AI Blogging Tool",
  description:
    "Meet the original autoBlogger, our pick for Shopify's best all-in-one auto blogging tool. Plan, write, link products, and publish SEO-ready articles on schedule.",
  path: "/",
  type: "website",
  robots: DEFAULT_ROBOTS
};

const FALLBACK_META = {
  title: "Page Not Found | autoBlogger",
  description: "The requested page could not be found. Explore autoBlogger from the homepage.",
  path: "/",
  type: "website",
  robots: "noindex,follow"
};

const APP_AGGREGATE_RATING = {
  ratingValue: "4.9",
  ratingCount: "85",
  bestRating: "5",
  worstRating: "1"
};

const APP_CATALOG_ENTITIES = [
  {
    name: "autoBlogger",
    url: "https://apps.shopify.com/autoblogger",
    category: "Shopify AI blog automation and ecommerce SEO content publishing",
    description: "Publishes SEO-focused Shopify blog posts with product links, metadata, FAQs, and a recurring publishing cadence."
  },
  {
    name: "autoLLMs",
    url: "https://apps.shopify.com/autollm",
    category: "Shopify LLMs.txt and AI indexing readiness",
    description: "Generates and maintains an LLMs.txt file so AI systems can better understand a Shopify store."
  },
  {
    name: "autoSchema",
    url: "https://apps.shopify.com/autoschema-google-structures",
    category: "Shopify structured data and schema markup",
    description: "Adds Google-friendly structured data to Shopify stores for stronger schema coverage and rich result support."
  },
  {
    name: "autoLock",
    url: "https://apps.shopify.com/autolock",
    category: "Shopify customer tag access control and page locking",
    description: "Locks or hides Shopify pages, products, and collections by customer tag for members-only, wholesale, VIP, B2B, and gated access."
  },
  {
    name: "autoShip",
    url: "https://apps.shopify.com/autoshippingbar",
    category: "Shopify free shipping progress bar",
    description: "Encourages larger orders with a Shopify free shipping progress bar."
  },
  {
    name: "autoStockist",
    url: "https://apps.shopify.com/autostockist",
    category: "Shopify stock alerts and inventory visibility",
    description: "Helps Shopify merchants track low stock, out-of-stock issues, and inventory changes."
  },
  {
    name: "autoBuy",
    url: "https://apps.shopify.com/autobuy-1",
    category: "Shopify buy buttons for external channels",
    description: "Helps Shopify merchants sell through blogs, social channels, landing pages, and external websites."
  }
];

function resolveOpenGraphType(page) {
  if (!page) return "website";

  if (isGuidePage(page)) return "article";

  return ["/features", "/faqs", "/reviews", "/premium-extras", "/free-seo-checklist", "/2x-staff-pick"].includes(page.route) ? "article" : "website";
}

function resolvePageMeta(pathname) {
  if (pathname === "/") {
    return { meta: HOME_META, page: null, isKnownPath: true };
  }

  const page = getPageByRoute(pathname);

  if (!page) {
    return { meta: FALLBACK_META, page: null, isKnownPath: false };
  }

  return {
    meta: {
      title: page.title,
      description: page.description,
      path: getCanonicalRoute(page),
      type: resolveOpenGraphType(page),
      robots: page.robots || DEFAULT_ROBOTS
    },
    page,
    isKnownPath: true
  };
}

function setMetaTag(attributeName, key, content) {
  if (!content) return;

  let element = document.querySelector(`meta[${attributeName}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setLinkTag(selector, attributes) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value) element.setAttribute(key, value);
  });
}

function setCanonicalTag(href) {
  setLinkTag('link[rel="canonical"]', {
    rel: "canonical",
    href
  });
}

function setHreflangTags(href) {
  setLinkTag('link[rel="alternate"][hreflang="en"]', {
    rel: "alternate",
    hreflang: "en",
    href
  });

  setLinkTag('link[rel="alternate"][hreflang="x-default"]', {
    rel: "alternate",
    hreflang: "x-default",
    href
  });
}

function setJsonLd(graph) {
  const scriptId = "seo-jsonld";
  let script = document.getElementById(scriptId);

  if (!script) {
    script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });
}

function buildBreadcrumb(page, canonicalUrl) {
  if (!page) return null;

  const trail = getBreadcrumbTrail(page);

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: buildAbsoluteUrl(item.path)
    }))
  };
}

function buildSoftwareApplicationGraph(includeRating) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#autoblogger-app`,
    name: "autoBlogger",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://apps.shopify.com/autoblogger",
    description:
      "Automated SEO blog publishing for Shopify stores, including metadata, internal links, and social sharing.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "9.95",
      description: "Starter plan starts at $9.95 per month",
      url: "https://apps.shopify.com/autoblogger"
    },
    aggregateRating: includeRating ? {
      "@type": "AggregateRating",
      ...APP_AGGREGATE_RATING
    } : undefined
  };
}

function buildGuideGraph(page, canonicalUrl) {
  if (!page || (!isGuidePage(page) && page.route !== "/free-seo-checklist")) return null;

  const author = page.authorName
    ? {
        "@type": "Person",
        name: page.authorName,
        url: page.authorUrl || SITE_URL
      }
    : {
        "@id": `${SITE_URL}/#organization`
      };

  return {
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: page.title,
    description: page.description,
    image: DEFAULT_OG_IMAGE,
    datePublished: page.datePublished,
    dateModified: page.dateModified || page.datePublished,
    inLanguage: "en",
    mainEntityOfPage: canonicalUrl,
    author,
    publisher: {
      "@id": `${SITE_URL}/#organization`
    }
  };
}

function buildCollectionGraph(page, canonicalUrl) {
  if (!page || !isHubPage(page)) return null;

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
  if (!page || page.route !== "/site-map") return null;

  const listedPages = STATIC_SEO_PAGES.filter(isIndexablePage);

  return {
    "@type": "ItemList",
    "@id": `${canonicalUrl}#sitemap`,
    name: "autoBlogger HTML Sitemap",
    itemListElement: listedPages.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.heading || item.title,
      url: buildAbsoluteUrl(getCanonicalRoute(item))
    }))
  };
}

function buildAppCatalogGraph(page, canonicalUrl) {
  if (!page || page.route !== "/other-apps") return null;

  return {
    "@type": "ItemList",
    "@id": `${canonicalUrl}#app-catalog`,
    name: "autoBlogger app recommendation catalog",
    itemListElement: APP_CATALOG_ENTITIES.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#${app.name.toLowerCase()}-app`,
        name: app.name,
        applicationCategory: app.category,
        operatingSystem: "Web",
        url: app.url,
        description: app.description,
        publisher: {
          "@id": `${SITE_URL}/#organization`
        }
      }
    }))
  };
}

function shouldIncludeSoftwareApplication(path, page) {
  if (path === "/") return true;
  if (!page) return false;

  return ["/reviews", "/pricing", "/features", "/free-seo-checklist", "/2x-staff-pick"].includes(page.route);
}

function buildSchemaGraph(path, meta, canonicalUrl, page, isKnownPath) {
  const breadcrumb = buildBreadcrumb(page, canonicalUrl);
  const guideGraph = buildGuideGraph(page, canonicalUrl);
  const collectionGraph = buildCollectionGraph(page, canonicalUrl);
  const siteMapGraph = buildSiteMapGraph(page, canonicalUrl);
  const appCatalogGraph = buildAppCatalogGraph(page, canonicalUrl);

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
      sameAs: ["https://apps.shopify.com/autoblogger"],
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
      itemListElement: SITE_NAV_ITEMS.map((item, index) => ({
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: item.name,
        url: buildAbsoluteUrl(item.path)
      }))
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: meta.title,
      description: meta.description,
      isPartOf: {
        "@id": `${SITE_URL}/#website`
      },
      about: {
        "@id": `${SITE_URL}/#organization`
      },
      inLanguage: "en",
      breadcrumb: breadcrumb ? { "@id": `${canonicalUrl}#breadcrumb` } : undefined
    }
  ];

  if (breadcrumb) graph.push(breadcrumb);
  if (guideGraph) graph.push(guideGraph);
  if (collectionGraph) graph.push(collectionGraph);
  if (siteMapGraph) graph.push(siteMapGraph);
  if (appCatalogGraph) graph.push(appCatalogGraph);

  if (shouldIncludeSoftwareApplication(path, page)) {
    graph.push(buildSoftwareApplicationGraph(path === "/" || path === "/reviews"));
  }

  if (!isKnownPath) {
    graph.push({
      "@type": "WebPage",
      "@id": `${canonicalUrl}#not-found`,
      name: "Page Not Found",
      isPartOf: {
        "@id": `${SITE_URL}/#website`
      }
    });
  }

  return graph;
}

const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = normalizePath(pathname);
    const { meta, page, isKnownPath } = resolvePageMeta(normalizedPath);
    const canonicalUrl = buildAbsoluteUrl(meta.path);

    document.title = meta.title;
    setMetaTag("name", "description", meta.description);
    setMetaTag("name", "robots", meta.robots || DEFAULT_ROBOTS);
    setMetaTag("name", "author", page?.authorName || "autoBlogger");
    setMetaTag("name", "referrer", "strict-origin-when-cross-origin");

    setMetaTag("property", "og:site_name", "autoBlogger");
    setMetaTag("property", "og:type", meta.type || "website");
    setMetaTag("property", "og:title", meta.title);
    setMetaTag("property", "og:description", meta.description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", DEFAULT_OG_IMAGE);
    setMetaTag("property", "og:image:alt", "autoBlogger logo");
    setMetaTag("property", "og:locale", "en_US");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", meta.title);
    setMetaTag("name", "twitter:description", meta.description);
    setMetaTag("name", "twitter:image", DEFAULT_OG_IMAGE);
    setMetaTag("name", "twitter:image:alt", "autoBlogger logo");
    setMetaTag("name", "twitter:url", canonicalUrl);

    setCanonicalTag(canonicalUrl);
    setHreflangTags(canonicalUrl);
    setJsonLd(buildSchemaGraph(normalizedPath, meta, canonicalUrl, page, isKnownPath));
  }, [pathname]);

  return null;
};

export default SeoManager;
