const fs = require("fs");
const path = require("path");
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
  { label: "Free SEO Checklist", href: "/free-seo-checklist" }
];

const CORE_PAGES = [
  {
    route: "/features",
    title: "autoBlogger Features | Automated SEO Blogging for Shopify",
    description:
      "Explore autoBlogger features: automated SEO publishing, product-focused content, metadata, internal links, and social sharing workflows for Shopify.",
    heading: "autoBlogger Features",
    intro:
      "autoBlogger helps Shopify merchants publish SEO-focused content with less manual work. The app combines planning, generation, linking, and distribution in one workflow.",
    bullets: [
      "Automated publishing with structured SEO article formatting",
      "Product-focused and topic-focused blog modes",
      "Built-in metadata, internal links, and FAQ content blocks",
      "Social sharing support and scheduling controls"
    ],
    changefreq: "monthly",
    priority: 0.8,
    tags: ["shopify", "product", "content", "automation"]
  },
  {
    route: "/pricing",
    title: "autoBlogger Pricing | Starter, Growth, and Pro Plans",
    description:
      "View autoBlogger pricing for Starter, Growth, and Pro plans. Start with a 14-day trial, then choose the SEO publishing cadence that fits your store.",
    heading: "autoBlogger Pricing",
    intro:
      "Choose the plan that matches your publishing pace. Start with a 14-day trial and scale from weekly to daily automated SEO blogging as your store grows.",
    bullets: [
      "Starter: weekly SEO publishing",
      "Growth: three SEO posts per week with advanced AI",
      "Pro: daily SEO publishing for maximum content velocity",
      "All paid plans are managed through Shopify billing"
    ],
    changefreq: "monthly",
    priority: 0.8,
    tags: ["shopify", "pricing", "conversion"]
  },
  {
    route: "/other-apps",
    title: "Other Shopify Apps by autoBlogger | autoLLMs, autoSchema, and More",
    description:
      "Discover other Shopify apps from the autoBlogger team, including autoLLMs, autoSchema, autoShip, autoStockist, and autoBuy.",
    heading: "Other Apps by autoBlogger",
    intro:
      "The autoBlogger team builds additional Shopify tools focused on growth, structured data, AI visibility, and storefront conversions.",
    bullets: [
      "autoLLMs for AI-focused indexing readiness",
      "autoSchema for structured data automation",
      "autoShip, autoStockist, and autoBuy for storefront growth",
      "Built for Shopify workflows and merchant usability"
    ],
    changefreq: "yearly",
    priority: 0.8,
    tags: ["shopify", "apps", "growth"]
  },
  {
    route: "/faqs",
    title: "autoBlogger FAQs | Setup, Pricing, Publishing, and Support",
    description:
      "Read frequently asked questions about autoBlogger setup, trial terms, publishing frequency, pricing, integrations, and customer support.",
    heading: "autoBlogger FAQs",
    intro:
      "Find quick answers about setup, plans, publishing frequency, and support. The FAQ page covers the most common merchant questions.",
    bullets: [
      "How autoBlogger works with Shopify",
      "Free trial details and billing model",
      "Publishing cadence per plan",
      "Support contact and onboarding help"
    ],
    changefreq: "monthly",
    priority: 0.8,
    tags: ["faq", "support", "shopify"],
    faq: [
      {
        question: "How fast can merchants start publishing?",
        answer: "Most merchants can complete setup quickly and start automated publishing in the same day."
      },
      {
        question: "Can content be edited after publishing?",
        answer: "Yes. Merchants can edit generated posts directly in Shopify at any time."
      }
    ]
  },
  {
    route: "/reviews",
    title: "autoBlogger Reviews | Shopify Merchant Feedback",
    description:
      "See recent autoBlogger reviews from Shopify merchants and learn how stores use automated SEO blogging to grow organic traffic.",
    heading: "autoBlogger Reviews",
    intro:
      "See how real merchants use autoBlogger to reduce content workload and improve search visibility across product and blog pages.",
    bullets: [
      "Recent merchant feedback from Shopify stores",
      "Examples of SEO publishing outcomes",
      "Use cases for growing organic traffic",
      "Links to full Shopify App Store reviews"
    ],
    changefreq: "monthly",
    priority: 0.7,
    tags: ["reviews", "trust", "conversion"]
  },
  {
    route: "/contact",
    title: "Contact autoBlogger Support",
    description: "Contact autoBlogger support for setup help, account questions, and product guidance.",
    heading: "Contact autoBlogger Support",
    intro:
      "Need help with setup, plans, or account questions? Reach autoBlogger support directly and get practical implementation guidance.",
    bullets: [
      "Support for onboarding and setup",
      "Help with plan selection and publishing strategy",
      "Technical support and troubleshooting",
      "Direct contact with the product team"
    ],
    changefreq: "monthly",
    priority: 0.5,
    tags: ["support", "contact", "conversion"]
  },
  {
    route: "/free-seo-checklist",
    title: "Free Shopify SEO Checklist and Free Wix SEO Checklist | autoBlogger",
    description:
      "Use this free Shopify SEO checklist and free Wix SEO checklist to improve rankings, fix technical SEO issues, and grow organic traffic.",
    heading: "Free Shopify SEO Checklist and Free Wix SEO Checklist",
    intro:
      "Use the interactive checklist to track high-impact SEO tasks across technical SEO, on-page optimization, content publishing, and link building.",
    bullets: [
      "Shopify and Wix-specific SEO task sets",
      "Status tracking and notes for each action",
      "Priority and effort scoring for planning",
      "Weekly workflow for consistent SEO execution"
    ],
    changefreq: "monthly",
    priority: 0.9,
    tags: ["checklist", "shopify", "wix", "seo"]
  },
  {
    route: "/privacy",
    title: "Privacy Policy | autoBlogger",
    description: "Read the privacy policy for autoBlogger.",
    heading: "autoBlogger Privacy Policy",
    intro:
      "Review how autoBlogger handles personal information and operational data across website and app interactions.",
    bullets: [
      "Data handling overview",
      "Policy scope and ownership",
      "How to contact support for privacy questions",
      "Reference to the full policy document"
    ],
    changefreq: "yearly",
    priority: 0.3,
    tags: ["legal"]
  },
  {
    route: "/terms",
    title: "Terms and Conditions | autoBlogger",
    description: "Read the terms and conditions for autoBlogger.",
    heading: "autoBlogger Terms and Conditions",
    intro:
      "Review service terms, usage boundaries, and legal conditions for using autoBlogger products and services.",
    bullets: [
      "Service terms and eligibility",
      "Billing and cancellation context",
      "General limitations and responsibilities",
      "Reference to the full terms document"
    ],
    changefreq: "yearly",
    priority: 0.3,
    tags: ["legal"]
  },
  {
    route: "/autoschema-terms",
    title: "autoSchema Terms and Conditions",
    description: "Read the terms and conditions for autoSchema.",
    heading: "autoSchema Terms and Conditions",
    intro: "Review legal terms for autoSchema usage, eligibility, and service boundaries.",
    bullets: [
      "Usage and service scope",
      "Billing and subscription terms",
      "Limitations and compliance expectations",
      "Reference to the full terms document"
    ],
    changefreq: "yearly",
    priority: 0.2,
    tags: ["legal", "schema"]
  },
  {
    route: "/autoschema-privacy",
    title: "autoSchema Privacy Policy",
    description: "Read the privacy policy for autoSchema.",
    heading: "autoSchema Privacy Policy",
    intro: "Review the privacy practices and data handling policy for autoSchema.",
    bullets: [
      "Policy scope for autoSchema users",
      "Data handling and protection notes",
      "Support contact for policy questions",
      "Reference to the full privacy document"
    ],
    changefreq: "yearly",
    priority: 0.2,
    tags: ["legal", "schema"]
  },
  {
    route: "/backlink-terms",
    title: "Backlink Program Terms | autoBlogger",
    description: "Read the backlink program terms for autoBlogger.",
    heading: "Backlink Program Terms",
    intro: "Review program eligibility, usage rules, and participation expectations for the backlink program.",
    bullets: [
      "Program participation terms",
      "Responsibilities and usage boundaries",
      "Content and link placement context",
      "Reference to the full terms document"
    ],
    changefreq: "yearly",
    priority: 0.3,
    tags: ["legal", "backlinks"]
  },
  {
    route: "/premium-extras",
    title: "Premium Extras | autoBlogger",
    description:
      "Learn about premium autoBlogger extras including the backlink program, weekly spotlight articles, and complimentary autoSchema access.",
    heading: "autoBlogger Premium Extras",
    intro: "Premium plans include additional growth-focused programs beyond automated SEO blogging.",
    bullets: [
      "Backlink program participation",
      "Weekly spotlight article opportunities",
      "Complimentary access to autoSchema bonus",
      "Designed for stronger organic visibility"
    ],
    changefreq: "monthly",
    priority: 0.5,
    tags: ["conversion", "backlinks", "growth"]
  },
  {
    route: "/seo-checklist",
    title: "Free SEO Checklist | autoBlogger",
    description: "Use the free Shopify and Wix SEO checklist on autoBlogger.",
    heading: "Free SEO Checklist",
    intro: "This URL is an alias for the canonical checklist page.",
    bullets: [
      "Canonical route: /free-seo-checklist",
      "Checklist includes Shopify and Wix workflows",
      "Track status and notes per SEO task",
      "Open the canonical page for full context"
    ],
    canonicalRoute: "/free-seo-checklist",
    robots: "noindex,follow",
    changefreq: "yearly",
    priority: 0.1,
    tags: ["checklist", "alias"]
  }
];

const STATIC_SEO_PAGES = [...CORE_PAGES, ...programmaticPages].map(page => ({
  ...page,
  bullets: Array.isArray(page.bullets) ? page.bullets : [],
  tags: Array.isArray(page.tags) ? page.tags : [],
  changefreq: page.changefreq || "monthly",
  priority: typeof page.priority === "number" ? page.priority : 0.6,
  robots: page.robots || DEFAULT_ROBOTS
}));

const PAGE_BY_ROUTE = new Map(STATIC_SEO_PAGES.map(page => [page.route, page]));

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

function scoreRelatedness(source, candidate) {
  const sourceTags = source.tags || [];
  const candidateTags = candidate.tags || [];

  if (!sourceTags.length || !candidateTags.length) return 0;

  let score = 0;
  sourceTags.forEach(tag => {
    if (candidateTags.includes(tag)) score += 1;
  });

  return score;
}

function findRelatedPages(page, pages) {
  const candidates = pages.filter(candidate => {
    if (candidate.route === page.route) return false;
    return isIndexablePage(candidate);
  });

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

  const fallback = candidates
    .filter(candidate => ["/free-seo-checklist", "/solutions", "/resources"].includes(candidate.route))
    .slice(0, 4);

  return [...scored, ...fallback].slice(0, 4);
}

function buildBreadcrumbList(route, canonicalUrl, heading) {
  if (route === "/") return null;

  return {
    "@type": "BreadcrumbList",
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
  if (!Array.isArray(page.faq) || page.faq.length === 0) return null;

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

function buildSchemaGraph(page, canonicalUrl) {
  const breadcrumb = buildBreadcrumbList(page.route, canonicalUrl, page.heading);
  const faqGraph = buildFaqGraph(page, canonicalUrl);

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
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/resources`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: page.title,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` }
    }
  ];

  if (breadcrumb) graph.push(breadcrumb);
  if (faqGraph) graph.push(faqGraph);

  if (["/reviews", "/pricing", "/features", "/solutions", "/free-seo-checklist"].includes(page.route) || hasRoutePrefix(page, "/shopify-seo")) {
    graph.push(buildReviewsGraph());
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function serializeJsonForScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function renderFaqSection(page) {
  if (!Array.isArray(page.faq) || page.faq.length === 0) return "";

  const items = page.faq
    .map(
      item => `<details class=\"faq-item\"><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`
    )
    .join("");

  return `<section class=\"sub-card\"><h2>FAQ Snippets</h2>${items}</section>`;
}

function renderRelatedLinks(page, pages) {
  const related = findRelatedPages(page, pages);
  if (!related.length) return "";

  const links = related
    .map(
      item =>
        `<li><a href=\"${escapeHtml(item.route)}\">${escapeHtml(item.heading || item.title)}</a><span>${escapeHtml(item.description)}</span></li>`
    )
    .join("");

  return `<section class=\"sub-card\"><h2>Related Guides</h2><ul class=\"related-list\">${links}</ul></section>`;
}

function renderTrustAndCta(page, appUrl) {
  const trust = TRUST_BULLETS.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  const ctaLabel = page.ctaLabel || "Start 14-Day Free Trial";
  const ctaHref = page.ctaHref || APP_LISTING_URL;

  return `<section class=\"sub-card\"><h2>Proof and Next Step</h2><ul>${trust}</ul><p>Use this page as your execution checklist, then launch implementation inside autoBlogger.</p><div class=\"actions\"><a class=\"btn-primary\" href=\"${escapeHtml(
    ctaHref
  )}\">${escapeHtml(ctaLabel)}</a><a class=\"btn-secondary\" href=\"${escapeHtml(appUrl)}\">Open Interactive Version</a></div></section>`;
}

function renderHtml(page, pages) {
  const canonicalRoute = getCanonicalRoute(page);
  const canonicalUrl = toAbsolute(canonicalRoute);
  const appUrl = hashRoute(canonicalRoute);
  const schema = serializeJsonForScript(buildSchemaGraph(page, canonicalUrl));
  const nav = NAV_LINKS.map(link => `<a href=\"${link.href}\">${escapeHtml(link.label)}</a>`).join("");
  const bullets = page.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join("");

  return `<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />
    <title>${escapeHtml(page.title)}</title>
    <meta name=\"description\" content=\"${escapeHtml(page.description)}\" />
    <meta name=\"robots\" content=\"${escapeHtml(page.robots)}\" />
    <meta name=\"author\" content=\"autoBlogger\" />
    <link rel=\"canonical\" href=\"${escapeHtml(canonicalUrl)}\" />
    <link rel=\"alternate\" hreflang=\"en\" href=\"${escapeHtml(canonicalUrl)}\" />
    <link rel=\"alternate\" hreflang=\"x-default\" href=\"${escapeHtml(canonicalUrl)}\" />
    <meta property=\"og:site_name\" content=\"autoBlogger\" />
    <meta property=\"og:type\" content=\"website\" />
    <meta property=\"og:title\" content=\"${escapeHtml(page.title)}\" />
    <meta property=\"og:description\" content=\"${escapeHtml(page.description)}\" />
    <meta property=\"og:url\" content=\"${escapeHtml(canonicalUrl)}\" />
    <meta property=\"og:image\" content=\"${escapeHtml(DEFAULT_OG_IMAGE)}\" />
    <meta property=\"og:locale\" content=\"en_US\" />
    <meta name=\"twitter:card\" content=\"summary_large_image\" />
    <meta name=\"twitter:title\" content=\"${escapeHtml(page.title)}\" />
    <meta name=\"twitter:description\" content=\"${escapeHtml(page.description)}\" />
    <meta name=\"twitter:image\" content=\"${escapeHtml(DEFAULT_OG_IMAGE)}\" />
    <script type=\"application/ld+json\">${schema}</script>
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
      <div class=\"container\">
        <nav aria-label=\"Primary\">${nav}</nav>
      </div>
    </header>
    <main>
      <div class=\"container grid\">
        <article class=\"card\">
          <h1>${escapeHtml(page.heading)}</h1>
          <p>${escapeHtml(page.intro)}</p>
          <ul>${bullets}</ul>
          <div class=\"actions\">
            <a class=\"btn-primary\" href=\"${escapeHtml(appUrl)}\">Open Interactive Version</a>
            <a class=\"btn-secondary\" href=\"${APP_LISTING_URL}\">View Shopify App Listing</a>
          </div>
          <p class=\"meta-note\">SEO landing page updated on ${escapeHtml(BUILD_DATE)}.</p>
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
