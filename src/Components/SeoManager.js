import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://autoblogger.bot";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;
const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "FAQs", path: "/faqs" },
  { name: "Reviews", path: "/reviews" },
  { name: "Contact", path: "/contact" },
  { name: "Other Apps", path: "/other-apps" },
  { name: "Free SEO Checklist", path: "/free-seo-checklist" }
];

const BREADCRUMB_LABELS = {
  "/": "Home",
  "/features": "Features",
  "/pricing": "Pricing",
  "/other-apps": "Other Apps",
  "/faqs": "FAQs",
  "/reviews": "Reviews",
  "/contact": "Contact",
  "/free-seo-checklist": "Free SEO Checklist",
  "/seo-checklist": "Free SEO Checklist",
  "/privacy": "Privacy Policy",
  "/terms": "Terms and Conditions",
  "/autoschema-terms": "autoSchema Terms",
  "/autoschema-privacy": "autoSchema Privacy Policy",
  "/backlink-terms": "Backlink Program Terms",
  "/premium-extras": "Premium Extras"
};

const PAGE_META = {
  "/": {
    title: "autoBlogger for Shopify | 2x Shopify Staff Pick SEO Blog Automation",
    description:
      "2x Shopify Staff Pick. autoBlogger automatically publishes SEO-optimized Shopify blogs with product links, FAQs, metadata, and social sharing.",
    path: "/",
    type: "website"
  },
  "/features": {
    title: "autoBlogger Features | Automated SEO Blogging for Shopify",
    description:
      "Explore autoBlogger features: automated SEO publishing, product-focused content, metadata, internal links, and social sharing workflows for Shopify.",
    path: "/features",
    type: "article"
  },
  "/pricing": {
    title: "autoBlogger Pricing | Starter, Growth, and Pro Plans",
    description:
      "View autoBlogger pricing for Starter, Growth, and Pro plans. Start with a 14-day trial, then choose the SEO publishing cadence that fits your store.",
    path: "/pricing",
    type: "website"
  },
  "/other-apps": {
    title: "Other Shopify Apps by autoBlogger | autoLLMs, autoSchema, and More",
    description:
      "Discover other Shopify apps from the autoBlogger team, including autoLLMs, autoSchema, autoShip, autoStockist, and autoBuy.",
    path: "/other-apps",
    type: "website"
  },
  "/faqs": {
    title: "autoBlogger FAQs | Setup, Pricing, Publishing, and Support",
    description:
      "Read frequently asked questions about autoBlogger setup, trial terms, publishing frequency, pricing, integrations, and customer support.",
    path: "/faqs",
    type: "article"
  },
  "/reviews": {
    title: "autoBlogger Reviews | Shopify Merchant Feedback",
    description:
      "See recent autoBlogger reviews from Shopify merchants and learn how stores use automated SEO blogging to grow organic traffic.",
    path: "/reviews",
    type: "article"
  },
  "/contact": {
    title: "Contact autoBlogger Support",
    description: "Contact autoBlogger support for setup help, account questions, and product guidance.",
    path: "/contact",
    type: "website"
  },
  "/free-seo-checklist": {
    title: "Free Shopify SEO Checklist and Free Wix SEO Checklist | autoBlogger",
    description:
      "Use this free Shopify SEO checklist and free Wix SEO checklist to improve rankings, fix technical SEO issues, and grow organic traffic.",
    path: "/free-seo-checklist",
    type: "article"
  },
  "/seo-checklist": {
    title: "Free Shopify SEO Checklist and Free Wix SEO Checklist | autoBlogger",
    description:
      "Use this free Shopify SEO checklist and free Wix SEO checklist to improve rankings, fix technical SEO issues, and grow organic traffic.",
    path: "/free-seo-checklist",
    type: "article",
    robots: "noindex,follow"
  },
  "/privacy": {
    title: "Privacy Policy | autoBlogger",
    description: "Read the privacy policy for autoBlogger.",
    path: "/privacy",
    type: "website"
  },
  "/terms": {
    title: "Terms and Conditions | autoBlogger",
    description: "Read the terms and conditions for autoBlogger.",
    path: "/terms",
    type: "website"
  },
  "/autoschema-terms": {
    title: "autoSchema Terms and Conditions",
    description: "Read the terms and conditions for autoSchema.",
    path: "/autoschema-terms",
    type: "website"
  },
  "/autoschema-privacy": {
    title: "autoSchema Privacy Policy",
    description: "Read the privacy policy for autoSchema.",
    path: "/autoschema-privacy",
    type: "website"
  },
  "/backlink-terms": {
    title: "Backlink Program Terms | autoBlogger",
    description: "Read the backlink program terms for autoBlogger.",
    path: "/backlink-terms",
    type: "website"
  },
  "/premium-extras": {
    title: "Premium Extras | autoBlogger",
    description:
      "Learn about premium autoBlogger extras including the backlink program, weekly spotlight articles, and complimentary autoSchema access.",
    path: "/premium-extras",
    type: "article"
  }
};

const FALLBACK_META = {
  title: "Page Not Found | autoBlogger",
  description: "The requested page could not be found. Explore autoBlogger resources from the homepage.",
  path: "/",
  type: "website",
  robots: "noindex,follow"
};

const FAQ_MAIN_ENTITIES = [
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

function normalizePath(pathname) {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function buildAbsoluteUrl(path) {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
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

function buildBreadcrumb(path, canonicalUrl) {
  const currentLabel = BREADCRUMB_LABELS[path];
  if (!currentLabel || path === "/") return null;

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
        name: currentLabel,
        item: canonicalUrl
      }
    ]
  };
}

function buildSchemaGraph(path, meta, canonicalUrl, isKnownPath) {
  const breadcrumb = buildBreadcrumb(path, canonicalUrl);

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
      itemListElement: NAV_ITEMS.map((item, index) => ({
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

  if (path === "/") {
    graph.push({
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
      }
    });
  }

  if (path === "/faqs") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: FAQ_MAIN_ENTITIES.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    });
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
    const isKnownPath = Object.prototype.hasOwnProperty.call(PAGE_META, normalizedPath);
    const meta = isKnownPath ? PAGE_META[normalizedPath] : FALLBACK_META;
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
    setJsonLd(buildSchemaGraph(normalizedPath, meta, canonicalUrl, isKnownPath));
  }, [pathname]);

  return null;
};

export default SeoManager;
