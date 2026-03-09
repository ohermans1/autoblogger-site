import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  SITE_NAV_ITEMS,
  SITE_URL,
  buildAbsoluteUrl,
  getCanonicalRoute,
  getPageByRoute,
  hasRoutePrefix,
  isGuidePage,
  isHubPage,
  normalizePath
} from "../seo/pageCatalog";

const HOME_META = {
  title: "autoBlogger for Shopify | 2x Shopify Staff Pick SEO Blog Automation",
  description:
    "2x Shopify Staff Pick. autoBlogger automatically publishes SEO-optimized Shopify blogs with product links, FAQs, metadata, and social sharing.",
  path: "/",
  type: "website",
  robots: DEFAULT_ROBOTS
};

const FALLBACK_META = {
  title: "Page Not Found | autoBlogger",
  description: "The requested page could not be found. Explore autoBlogger resources from the homepage.",
  path: "/",
  type: "website",
  robots: "noindex,follow"
};

const HOME_FAQ = [
  {
    question: "What is autoBlogger?",
    answer:
      "autoBlogger is a Shopify app that automates SEO blog publishing to help build topical authority, improve product discovery, and drive organic traffic."
  },
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Install autoBlogger from the Shopify App Store and start a 14-day trial. After trial end, continue on Starter, Growth, or Pro, or cancel."
  },
  {
    question: "How many articles are published on each plan?",
    answer: "Starter publishes one SEO blog each week, Growth publishes three per week, and Pro publishes daily."
  },
  {
    question: "How do I contact support?",
    answer: "Email support@autoblogger.bot for support."
  }
];

const APP_AGGREGATE_RATING = {
  ratingValue: "4.9",
  ratingCount: "22",
  bestRating: "5",
  worstRating: "1"
};

const REVIEW_ENTITIES = [
  {
    author: "SK8 Clothing",
    text: "The app saves time and keeps SEO blog publishing consistent.",
    rating: "5"
  },
  {
    author: "Tony's Aussie Prints",
    text: "Simple setup and reliable automation for regular blog output.",
    rating: "5"
  },
  {
    author: "Capric Clothes",
    text: "Helpful for stores that need consistent content without extra overhead.",
    rating: "5"
  }
];

function resolveOpenGraphType(page) {
  if (!page) return "website";

  if (isGuidePage(page)) return "article";

  return ["/features", "/faqs", "/reviews", "/premium-extras", "/free-seo-checklist"].includes(page.route) ? "article" : "website";
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

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.heading || page.title,
        item: canonicalUrl
      }
    ]
  };
}

function buildSoftwareApplicationGraph(includeReviews) {
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
      description: "Starter plan starts at $9.95 per month"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ...APP_AGGREGATE_RATING
    },
    review: includeReviews
      ? REVIEW_ENTITIES.map(item => ({
          "@type": "Review",
          author: {
            "@type": "Organization",
            name: item.author
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: item.rating,
            bestRating: "5"
          },
          reviewBody: item.text
        }))
      : undefined
  };
}

function buildFaqGraph(path, page, canonicalUrl) {
  const faqItems = path === "/" ? HOME_FAQ : page?.faq || [];

  if (faqItems.length === 0) return null;

  return {
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: faqItems.map(item => ({
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
  if (!page || (!isGuidePage(page) && page.route !== "/free-seo-checklist")) return null;

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

function shouldIncludeSoftwareApplication(path, page) {
  if (path === "/") return true;
  if (!page) return false;

  return ["/reviews", "/pricing", "/features", "/solutions", "/free-seo-checklist"].includes(page.route) || hasRoutePrefix(page, "/shopify-seo");
}

function buildSchemaGraph(path, meta, canonicalUrl, page, isKnownPath) {
  const breadcrumb = buildBreadcrumb(page, canonicalUrl);
  const faqGraph = buildFaqGraph(path, page, canonicalUrl);
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
  if (faqGraph) graph.push(faqGraph);
  if (guideGraph) graph.push(guideGraph);
  if (collectionGraph) graph.push(collectionGraph);

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
    setMetaTag("name", "author", "autoBlogger");
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
