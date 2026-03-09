import React from "react";
import { SmartLink } from "./SmartLink";

const themeColor = "bg-primary text-white";

const pricingPlans = [
  {
    title: "Starter",
    monthlyPrice: "$9.95 / month",
    yearlyPriceNote: "or $99.95/year and save 16%",
    highlight: "Weekly SEO publishing for consistent momentum",
    features: [
      "Weekly SEO blog publishing (1 per week)",
      "Set-and-forget automation",
      "Structured, search-ready articles",
      "FAQs, TLDRs, table of contents, and more",
      "Automatic internal product linking",
      "Optimised HTML and metadata",
      "Relevant AI-selected imagery",
      "Personalised support"
    ],
    trialNote: "14-day free trial"
  },
  {
    title: "Growth",
    badge: "Popular",
    monthlyPrice: "$19.95 / month",
    yearlyPriceNote: "or $199.95/year and save 16%",
    highlight: "Higher output with stronger automation controls",
    features: [
      "Three SEO blogs per week",
      "Advanced ChatGPT-5.2 AI model",
      "Full publishing schedule control",
      "Automatic social sharing",
      "Backlink network access",
      "autoSchema and autoLLMs included",
      "Featured store article on Medium",
      "All Starter features included"
    ],
    trialNote: "14-day free trial"
  },
  {
    title: "Pro",
    monthlyPrice: "$29.95 / month",
    yearlyPriceNote: "or $299.95/year and save 17%",
    highlight: "Daily SEO publishing for maximum coverage",
    features: [
      "Daily SEO blog publishing",
      "Advanced ChatGPT-5.2 AI model",
      "Full publishing schedule control",
      "Automatic social sharing",
      "Backlink network access",
      "autoSchema and autoLLMs included",
      "Featured store article on Medium",
      "All Starter features included"
    ],
    trialNote: "14-day free trial"
  }
];

const PricingSection = props => {
  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Pricing for autoBlogger</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Pricing for autoBlogger</h1>
      )}
      <p className="text-center text-gray-700 mb-8">No ongoing free plan. Start with a 14-day free trial, then choose Starter, Growth, or Pro.</p>
      <p className="max-w-4xl mx-auto text-center text-base text-gray-600 mb-8">
        Compare plan depth with the{" "}
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => {
          const isPopular = plan.badge === "Popular";

          return (
            <div key={index} className="relative bg-white rounded-lg shadow-lg ring-1 ring-gray-200">
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow ${isPopular ? themeColor : "bg-gray-900 text-white"}`}>{plan.badge}</span>
                </div>
              )}

              <div className={`${themeColor} p-6 text-center rounded-t-lg ${isPopular ? "pt-8" : ""}`}>
                <h4 className="text-xl font-bold mb-2">{plan.title}</h4>
                <p className="text-2xl font-semibold">{plan.monthlyPrice}</p>
                {plan.yearlyPriceNote && <p className="mt-1 text-sm opacity-90">{plan.yearlyPriceNote}</p>}
              </div>

              <div className="p-6 text-center">
                <p className="text-lg font-medium mb-3">{plan.highlight}</p>

                <div className="flex items-center justify-center my-4" aria-hidden="true">
                  <span className="mx-2 select-none">---</span>
                </div>

                <ul className="text-left space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-[6px] h-2 w-2 rounded-full bg-gray-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.trialNote && <p className="mt-6 font-light text-gray-600">{plan.trialNote}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <a href="https://apps.shopify.com/autoblogger" className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition" aria-label="Get started with autoBlogger">
          Start Your Free Trial Now!
        </a>
      </div>
    </section>
  );
};

export default PricingSection;
