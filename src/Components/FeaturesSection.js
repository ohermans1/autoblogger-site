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
    { title: "Premium extras", description: "Setup support, content workflow guidance, and structured data bonuses for stores that want more help." },
    { title: "Built for Shopify workflows", description: "Edit directly in Shopify and automatically share to social channels." },
    { title: "14-day free trial", description: "Try autoBlogger before choosing a paid plan." }
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
          Start 14-day free trial
        </a>
      </div>
    </section>
  );
};

export default FeaturesSection;
