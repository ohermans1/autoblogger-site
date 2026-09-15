import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { SmartLink } from "./SmartLink";

const FeaturesSection = props => {
  const appStoreUrl = "https://apps.shopify.com/autoblogger";

  const features = [
    { title: "Automated publishing", description: "Publish structured, search-ready SEO articles on a recurring schedule." },
    { title: "Topic and product article modes", description: "Create content around customer questions, products, collections, and buying intent, with linked product cards when useful." },
    { title: "Built-in on-page SEO", description: "Every article can include optimized HTML, metadata, overviews, FAQs, table of contents, and tags." },
    { title: "Automatic internal links", description: "Connect blog content to relevant products and collections to improve discovery." },
    { title: "Flexible image controls", description: "Use improved automatic image selection or choose Unsplash images, uploads, Shopify Files, or direct image URLs yourself." },
    { title: "Seasonal campaigns", description: "Create and schedule holiday and sale articles in advance, then keep seasonal promotions moving automatically." },
    { title: "Schedule and calendar view", description: "Choose exact publishing times, review drafts and published posts by day, and see Google indexing status on eligible plans." },
    { title: "Article structure and tone", description: "Enable and rearrange advanced article structures, choose an AI tone, and add multiple SEO keywords at once." },
    { title: "Advanced multi-pass articles", description: "Generate higher-quality articles with enhanced AI imagery using the advanced mode, available in Advanced Settings." },
    { title: "Author cards and disclaimers", description: "Add an author card and a manually written disclaimer to every article from Advanced Settings." },
    { title: "Per-article instructions", description: "Give any upcoming post a short custom prompt for its topic, angle, or approach." },
    { title: "Brand-aware setup", description: "Use useful details from your About, Story, or FAQ page to prepare editable topics, keywords, and a brand profile." },
    { title: "Publishing insights", description: "Track milestones, see why each generated topic suits your store, and review an article value receipt with an SEO scorecard." },
    { title: "Search Opportunities", description: "Turn the last three months of Google Search Console data into ranked, prepared article ideas for your upcoming blogs." },
    { title: "Social sharing and smarter backlinks", description: "Eligible plans can share new articles automatically and use AI to place relevant backlink-network links naturally." },
    { title: "Companion SEO apps", description: "Growth and Volume include autoSchema for structured data and autoLLMs for LLMs.txt support." },
    { title: "Advanced AI and distribution", description: "Growth and Volume use ChatGPT-5.6 and include a featured store article on Medium." },
    { title: "Built for Shopify", description: "Edit published posts directly in Shopify whenever you need to." },
    { title: "Free trial", description: "Try Starter, Growth, or Volume free for 14 days." }
  ];

  return (
    <section id="features" className="content-section content-section--tint">
      {props.home ? (
        <h3 className="section-title">Everything you need to publish consistently</h3>
      ) : (
        <h1 className="section-title">autoBlogger Features for Shopify SEO Publishing</h1>
      )}

      <p className="section-lead">
        autoBlogger turns your Shopify blog into a repeatable SEO publishing workflow with content designed for topical coverage and product discovery.
      </p>
      <p className="section-supporting">
        Want a practical next step? Use the{" "}
        <SmartLink to="/free-seo-checklist" className="text-primary font-semibold hover:underline">
          free SEO checklist
        </SmartLink>
        , compare plans on the{" "}
        <SmartLink to="/pricing" className="text-primary font-semibold hover:underline">
          pricing page
        </SmartLink>
        , and read recent{" "}
        <SmartLink to="/reviews" className="text-primary font-semibold hover:underline">
          merchant reviews
        </SmartLink>
        .
      </p>

      <div className="feature-grid">
        <ul>
          {features.map((feature, index) => (
            <li key={index} className="feature-card">
              <span className="feature-card__icon">
                <FaCheckCircle />
              </span>
              <span>
                <strong>{feature.title}</strong><small>{feature.description}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="section-action">
        <a href={appStoreUrl} className="button-primary" aria-label="Get started with autoBlogger">
          Start free trial
        </a>
      </div>
    </section>
  );
};

export default FeaturesSection;
