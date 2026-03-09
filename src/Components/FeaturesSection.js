import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { SmartLink } from "./SmartLink";

const FeaturesSection = props => {
  const appStoreUrl = "https://apps.shopify.com/autoblogger";

  const features = [
    { title: "Set and Forget", description: "Automated SEO publishing with structured, search-ready articles." },
    { title: "Article modes", description: "Topic and product-focused SEO content built for Shopify stores." },
    { title: "SEO-ready", description: "Optimised HTML, overviews, FAQs, metadata, and structured formatting." },
    { title: "Easy blog management", description: "Plan, schedule, and manage your publishing calendar easily." },
    { title: "Backlink Program", description: "Optional backlink network to strengthen search authority." },
    { title: "Built for Shopify workflows", description: "Edit directly in Shopify and automatically share to social channels." },
    { title: "14-Day free trial", description: "Try autoBlogger risk-free before choosing a paid plan." }
  ];

  return (
    <section id="features" className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Discover the Powerful Features of autoBlogger</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Discover the Powerful Features of autoBlogger</h1>
      )}

      <p className="max-w-4xl mx-auto text-center text-lg text-gray-700 mb-8">
        autoBlogger turns your Shopify blog into an automated SEO engine with content designed for topical authority and product discovery.
      </p>
      <p className="max-w-4xl mx-auto text-center text-base text-gray-600 mb-8">
        Need the implementation side too? Explore the{" "}
        <SmartLink to="/solutions" className="text-primary font-semibold hover:underline">
          SEO solutions hub
        </SmartLink>
        , the{" "}
        <SmartLink to="/resources" className="text-primary font-semibold hover:underline">
          resource library
        </SmartLink>
        , and recent{" "}
        <SmartLink to="/reviews" className="text-primary font-semibold hover:underline">
          merchant reviews
        </SmartLink>
        .
      </p>

      <div className="max-w-4xl mx-auto">
        <ul className="list-disc list-inside space-y-6 text-lg text-gray-700">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-4">
              <span className="text-primary text-2xl">
                <FaCheckCircle />
              </span>
              <span>
                <strong>{feature.title}:</strong> {feature.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-8">
        <a href={appStoreUrl} className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition" aria-label="Get started with autoBlogger">
          Start Your Free Trial Now!
        </a>
      </div>
    </section>
  );
};

export default FeaturesSection;
