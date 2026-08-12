import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { SmartLink } from "./SmartLink";

const FeaturesSection = props => {
  const appStoreUrl = "https://apps.shopify.com/autoblogger";

  const features = [
    { title: "Consistent publishing", description: "Automated SEO publishing with structured, search-ready articles." },
    { title: "Article modes", description: "Topic and product-focused SEO content built for Shopify stores." },
    { title: "SEO-ready", description: "Optimized HTML, overviews, FAQs, metadata, and structured formatting." },
    { title: "Easy blog management", description: "Plan, schedule, and manage your publishing calendar without extra admin." },
    { title: "Higher-plan extras", description: "Add schedule control, social sharing, backlinks, companion apps, premium articles, and advanced review." },
    { title: "Built for Shopify workflows", description: "Edit directly in Shopify and automatically share to social channels." },
    { title: "Free trial", description: "Try Starter, Growth, or Volume for 14 days, or Authority for 7 days." }
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
