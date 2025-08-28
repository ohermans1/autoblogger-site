import React from "react";

// Tailwind theme colour utility — uses your custom primary
const themeColor = "bg-primary text-white";

// New pricing data
const pricingPlans = [
  {
    title: "1 Blog Per Week",
    badge: "Free",
    monthlyPrice: "Free",
    yearlyPriceNote: null,
    highlight: "One blog per week",
    featuresTop: ["Set and forget – one-step setup", "Cutting-edge AI models", "SEO optimised content", "FAQs, table of contents, and more", "A related image per blog", "Personalised support"],
    trialNote: null
  },
  {
    title: "3 Blogs Per Week",
    monthlyPrice: "$9.98 / month",
    yearlyPriceNote: "or $99/year and save 17%",
    highlight: "Three blogs per week",
    featuresTop: [
      "All free plan features included",
      "Priority personalised support",
      "Full control over post timing",
      "Backlink Boost: Join our SEO network",
      "Store of the Week: Weekly draw entry",
      "autoSchema: Free lifetime access"
    ],
    trialNote: "14-day free trial"
  },
  {
    title: "7 Blogs Per Week",
    badge: "Most popular",
    monthlyPrice: "$19.99 / month",
    yearlyPriceNote: "or $199/year and save 17%",
    highlight: "A fresh blog every day!",
    featuresTop: [
      "All free plan features included",
      "Priority personalised support",
      "Full control over post timing",
      "Backlink Boost: Join our SEO network",
      "Store of the Week: Weekly draw entry",
      "autoSchema: Free lifetime access"
    ],
    trialNote: "14-day free trial"
  }
];

const PricingSection = props => {
  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Affordable Pricing Plans for autoBlogger</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Affordable Pricing Plans for autoBlogger</h1>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => {
          const isPopular = plan.badge === "Most popular";
          return (
            <div key={index} className={`relative bg-white rounded-lg shadow-lg ring-1 ring-gray-200`}>
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow ${isPopular ? themeColor : "bg-gray-900 text-white"}`}>{plan.badge}</span>
                </div>
              )}

              {/* Header */}
              <div className={`${themeColor} p-6 text-center rounded-t-lg ${isPopular ? "pt-8" : ""}`}>
                <h4 className="text-xl font-bold mb-2">{plan.title}</h4>
                <p className="text-2xl font-semibold">{plan.monthlyPrice}</p>
                {plan.yearlyPriceNote && <p className="mt-1 text-sm opacity-90">{plan.yearlyPriceNote}</p>}
              </div>

              {/* Body */}
              <div className="p-6 text-center">
                {/* Highlight */}
                <p className="text-lg font-medium mb-3">{plan.highlight}</p>

                {/* Separator */}
                <div className="flex items-center justify-center my-4" aria-hidden="true">
                  <span className="mx-2 select-none">———</span>
                </div>

                {/* Features */}
                <ul className="text-left space-y-3">
                  {plan.featuresTop.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-[6px] h-2 w-2 rounded-full bg-gray-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Trial note */}
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
