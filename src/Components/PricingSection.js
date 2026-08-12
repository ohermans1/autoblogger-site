import React from "react";
import { FiCheck } from "react-icons/fi";
import { SmartLink } from "./SmartLink";

const pricingPlans = [
  {
    title: "Starter (Core)",
    monthlyPrice: "$9.95 / month",
    yearlyPriceNote: "or $99.95/year and save 16%",
    highlight: "Core weekly SEO publishing",
    features: [
      "Weekly SEO blog publishing (1 per week)",
      "Set-and-forget automation",
      "Structured, search-ready articles",
      "FAQs, TLDRs, table of contents, and more",
      "Automatic internal product linking",
      "Optimized HTML and metadata",
      "Relevant AI-selected imagery",
      "Automated holiday and sales articles"
    ],
    trialNote: "14-day free trial"
  },
  {
    title: "Growth",
    badge: "Popular",
    monthlyPrice: "$19.95 / month",
    yearlyPriceNote: "or $199.95/year and save 16%",
    highlight: "Three SEO blogs each week",
    features: [
      "All Starter features included",
      "Three SEO blogs each week",
      "Advanced ChatGPT-5.6 AI model",
      "Full publishing schedule control",
      "Automatic social sharing",
      "Backlink network access",
      "autoSchema and autoLLMs included",
      "Featured store article on Medium"
    ],
    trialNote: "14-day free trial"
  },
  {
    title: "Volume (Daily)",
    monthlyPrice: "$29.95 / month",
    yearlyPriceNote: "or $299.95/year and save 17%",
    highlight: "Daily SEO blog publishing",
    features: [
      "All Starter features included",
      "Daily SEO blog publishing",
      "Advanced ChatGPT-5.6 AI model",
      "Full publishing schedule control",
      "Automatic social sharing",
      "Backlink network access",
      "autoSchema and autoLLMs included",
      "Featured store article on Medium"
    ],
    trialNote: "14-day free trial"
  },
  {
    title: "Authority (Pro)",
    monthlyPrice: "$59.95 / month",
    yearlyPriceNote: "or $599.95/year and save 17%",
    highlight: "Premium SEO content with advanced review",
    features: [
      "All Growth plan features included",
      "Three premium SEO articles each week",
      "Multi-pass AI writing and editing",
      "Four premium AI images per article",
      "Access to our most advanced AI models",
      "Longer, more in-depth articles",
      "Enhanced SEO review and optimization",
      "Priority support and article fine-tuning"
    ],
    trialNote: "7-day free trial"
  }
];

const PricingSection = props => {
  return (
    <section className="content-section pricing-section">
      {props.home ? (
        <h3 className="section-title">Simple pricing that scales with you</h3>
      ) : (
        <h1 className="section-title">Pricing for autoBlogger</h1>
      )}
      <p className="section-lead">Choose the publishing pace and article depth that fit your store. Starter, Growth, and Volume include a 14-day free trial; Authority includes a 7-day free trial.</p>
      <p className="section-supporting">
        Compare what each plan includes with the{" "}
        <SmartLink to="/features" className="text-primary font-semibold hover:underline">
          features overview
        </SmartLink>
        , see what is included in{" "}
        <SmartLink to="/premium-extras" className="text-primary font-semibold hover:underline">
          premium extras
        </SmartLink>
        , and review{" "}
        <SmartLink to="/reviews" className="text-primary font-semibold hover:underline">
          merchant feedback
        </SmartLink>
        .
      </p>

      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => {
          const isPopular = plan.badge === "Popular";

          return (
            <div key={index} className={`pricing-card ${isPopular ? "pricing-card--popular" : ""}`}>
              {plan.badge && (
                <span className="pricing-card__badge">{plan.badge}</span>
              )}

              <div className="pricing-card__header">
                <h4 className="text-xl font-bold mb-2">{plan.title}</h4>
                <p className="text-2xl font-semibold">{plan.monthlyPrice}</p>
                {plan.yearlyPriceNote && <p className="mt-1 text-sm opacity-90">{plan.yearlyPriceNote}</p>}
              </div>

              <div className="pricing-card__body">
                <p className="pricing-card__highlight">{plan.highlight}</p>

                <ul className="pricing-card__features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span className="pricing-check"><FiCheck aria-hidden="true" /></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.trialNote && <p className="pricing-card__trial">{plan.trialNote}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <p className="pricing-billing-note">All prices are in USD. Recurring and usage-based charges are billed every 30 days.</p>

      <div className="section-action">
        <a href="https://apps.shopify.com/autoblogger" className="button-primary" aria-label="Get started with autoBlogger">
          Start Free Trial
        </a>
      </div>
    </section>
  );
};

export default PricingSection;
