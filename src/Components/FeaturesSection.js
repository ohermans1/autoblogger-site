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
    <section id="features" className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">autoBlogger Features for Shopify SEO Publishing</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">autoBlogger Features for Shopify SEO Publishing</h1>
      )}

      <p className="max-w-4xl mx-auto text-center text-lg text-gray-700 mb-8">
        autoBlogger turns your Shopify blog into a repeatable SEO publishing workflow with content designed for topical coverage and product discovery.
      </p>
      <p className="max-w-4xl mx-auto text-center text-base text-gray-600 mb-8">
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
          Start 14-Day Free Trial
        </a>
      </div>
    </section>
  );
};

export default FeaturesSection;
