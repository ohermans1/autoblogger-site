const fs = require("fs");
const path = require("path");

const SITE_URL = "https://autoblogger.bot";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;
const OUTPUT_ROOT = path.join(__dirname, "public");
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQs", href: "/faqs" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "Other Apps", href: "/other-apps" },
  { label: "Free SEO Checklist", href: "/free-seo-checklist" }
];

const PAGES = [
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    route: "/privacy",
    title: "Privacy Policy | autoBlogger",
    description: "Read the privacy policy for autoBlogger.",
    heading: "autoBlogger Privacy Policy",
    intro:
      "Review how autoBlogger handles personal information and operational data across website and app interactions.",
    bullets: ["Data handling overview", "Policy scope and ownership", "How to contact support for privacy questions", "Reference to the full policy document"]
  },
  {
    route: "/terms",
    title: "Terms and Conditions | autoBlogger",
    description: "Read the terms and conditions for autoBlogger.",
    heading: "autoBlogger Terms and Conditions",
    intro:
      "Review service terms, usage boundaries, and legal conditions for using autoBlogger products and services.",
    bullets: ["Service terms and eligibility", "Billing and cancellation context", "General limitations and responsibilities", "Reference to the full terms document"]
  },
  {
    route: "/autoschema-terms",
    title: "autoSchema Terms and Conditions",
    description: "Read the terms and conditions for autoSchema.",
    heading: "autoSchema Terms and Conditions",
    intro: "Review legal terms for autoSchema usage, eligibility, and service boundaries.",
    bullets: ["Usage and service scope", "Billing and subscription terms", "Limitations and compliance expectations", "Reference to the full terms document"]
  },
  {
    route: "/autoschema-privacy",
    title: "autoSchema Privacy Policy",
    description: "Read the privacy policy for autoSchema.",
    heading: "autoSchema Privacy Policy",
    intro: "Review the privacy practices and data handling policy for autoSchema.",
    bullets: ["Policy scope for autoSchema users", "Data handling and protection notes", "Support contact for policy questions", "Reference to the full privacy document"]
  },
  {
    route: "/backlink-terms",
    title: "Backlink Program Terms | autoBlogger",
    description: "Read the backlink program terms for autoBlogger.",
    heading: "Backlink Program Terms",
    intro: "Review program eligibility, usage rules, and participation expectations for the backlink program.",
    bullets: ["Program participation terms", "Responsibilities and usage boundaries", "Content and link placement context", "Reference to the full terms document"]
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
    ]
  },
  {
    route: "/seo-checklist",
    title: "Free SEO Checklist | autoBlogger",
    description: "Use the free Shopify and Wix SEO checklist on autoBlogger.",
    heading: "Free SEO Checklist",
    intro: "This URL is an alias for the canonical checklist page.",
    bullets: ["Canonical route: /free-seo-checklist", "Checklist includes Shopify and Wix workflows", "Track status and notes per SEO task", "Open the canonical page for full context"],
    canonicalRoute: "/free-seo-checklist",
    robots: "noindex,follow"
  }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
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

function buildSchemaGraph(page, canonicalUrl) {
  const breadcrumb = buildBreadcrumbList(page.route, canonicalUrl, page.heading);
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
      sameAs: ["https://apps.shopify.com/autoblogger"]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "autoBlogger"
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: page.title,
      description: page.description,
      inLanguage: "en"
    }
  ];

  if (breadcrumb) graph.push(breadcrumb);

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function serializeJsonForScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function renderHtml(page) {
  const canonicalRoute = page.canonicalRoute || page.route;
  const canonicalUrl = toAbsolute(canonicalRoute);
  const appUrl = hashRoute(canonicalRoute);
  const robots = page.robots || "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const schema = serializeJsonForScript(buildSchemaGraph(page, canonicalUrl));

  const nav = NAV_LINKS.map(link => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join("");
  const bullets = page.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <meta name="author" content="autoBlogger" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <link rel="alternate" hreflang="en" href="${escapeHtml(canonicalUrl)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="autoBlogger" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}" />
    <script type="application/ld+json">${schema}</script>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Segoe UI, Arial, sans-serif; color: #1f2937; background: #f8fafc; line-height: 1.6; }
      header { background: #ffffff; border-bottom: 1px solid #e5e7eb; }
      .container { width: min(960px, 92%); margin: 0 auto; }
      nav { display: flex; flex-wrap: wrap; gap: 0.7rem; padding: 1rem 0; }
      nav a { text-decoration: none; color: #0f766e; font-weight: 600; }
      main { padding: 2rem 0 3rem; }
      .card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 1.4rem 1.3rem; }
      h1 { margin-top: 0; line-height: 1.25; }
      ul { margin: 1rem 0 0; padding-left: 1.1rem; }
      .actions { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.4rem; }
      .btn-primary, .btn-secondary { padding: 0.65rem 0.95rem; border-radius: 8px; text-decoration: none; font-weight: 700; }
      .btn-primary { background: #0f766e; color: #ffffff; }
      .btn-secondary { background: #ffffff; color: #0f766e; border: 1px solid #99f6e4; }
      footer { color: #4b5563; font-size: 0.92rem; margin-top: 1.4rem; }
    </style>
  </head>
  <body>
    <header>
      <div class="container">
        <nav aria-label="Primary">${nav}</nav>
      </div>
    </header>
    <main>
      <div class="container">
        <article class="card">
          <h1>${escapeHtml(page.heading)}</h1>
          <p>${escapeHtml(page.intro)}</p>
          <ul>${bullets}</ul>
          <div class="actions">
            <a class="btn-primary" href="${escapeHtml(appUrl)}">Open Interactive Version</a>
            <a class="btn-secondary" href="https://apps.shopify.com/autoblogger">View Shopify App Listing</a>
          </div>
          <footer>SEO landing page updated on ${escapeHtml(BUILD_DATE)}.</footer>
        </article>
      </div>
    </main>
  </body>
</html>`;
}

function outputDirectory(route) {
  const clean = route.replace(/^\/+/, "");
  return path.join(OUTPUT_ROOT, clean);
}

function writePage(page) {
  const dir = outputDirectory(page.route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderHtml(page), "utf8");
}

function generatePages() {
  PAGES.forEach(writePage);
  console.log(`Generated ${PAGES.length} static SEO route pages.`);
}

generatePages();
