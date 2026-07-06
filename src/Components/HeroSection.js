import React from "react";
import ReactGA from "react-ga4";
import { SmartLink } from "./SmartLink";

const HeroSection = () => {
  const shopifyUrl = "https://apps.shopify.com/autoblogger";

  // Function to handle click events and send to Google Analytics
  const handleAppStoreClick = platform => {
    ReactGA.event({
      category: "App Store Links",
      action: `Clicked ${platform} App Store Link`,
      label: `${platform} App Store Link Click`
    });
  };

  return (
    <section className="text-center pt-12 pb-24 relative">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-800">
        Shopify AI blog automation that publishes SEO-focused posts with product links
      </h1>

      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-700">
        <SmartLink to="/2x-staff-pick" className="text-primary no-underline hover:underline">
          2x Shopify Staff Pick
        </SmartLink>
        :{" "}
        <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-primary no-underline" aria-label="Visit autoBlogger on Shopify">
          autoBlogger
        </a>
      </h2>
      <p className="mb-4 text-base md:text-lg text-gray-600">
        See why autoBlogger is a{" "}
        <SmartLink to="/2x-staff-pick" className="text-primary hover:underline">
          2x Shopify Staff Pick
        </SmartLink>{" "}
        with the 2024 and 2026 Shopify App Store spotlight screenshots.
      </p>
      <p className="mb-6 text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
        autoBlogger turns your{" "}
        <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-primary no-underline" aria-label="Visit Shopify">
          Shopify
        </a>{" "}
        blog into a steady SEO publishing workflow. After a quick setup, it publishes fresh, useful, search-friendly articles with optimized HTML, metadata, FAQs, table of contents, internal
        product links, and relevant imagery.
      </p>
      <p className="mb-6 text-lg md:text-xl text-gray-600">Edit directly in Shopify, share to social channels, and keep a consistent publishing schedule without rebuilding the process each week.</p>
      <p className="mb-6 text-base md:text-lg text-gray-600">
        Want to check the fit first? Review the{" "}
        <SmartLink to="/features" className="text-primary hover:underline">
          feature overview
        </SmartLink>
        , compare{" "}
        <SmartLink to="/pricing" className="text-primary hover:underline">
          pricing
        </SmartLink>
        , read{" "}
        <SmartLink to="/reviews" className="text-primary hover:underline">
          merchant reviews
        </SmartLink>
        , or use the{" "}
        <SmartLink to="/free-seo-checklist" className="text-primary hover:underline">
          free SEO checklist
        </SmartLink>
        .
      </p>

      {/* Call-to-action text */}
      <p className="text-xl font-semibold text-gray-700 mb-4">Start your 14-day free trial on Shopify:</p>

      <div className="flex justify-center items-center">
        {/* Shopify Badge */}
        <a
          href={shopifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Start your 14-day free trial on Shopify"
          className="transition-transform duration-200 ease-in-out transform hover:scale-105"
          onClick={() => handleAppStoreClick("Shopify")}
        >
          <img
            src="/shopifybadgedark.png"
            alt="Install autoBlogger from the Shopify App Store"
            className="w-60 h-16 object-cover rounded-lg grayscale"
            width="240"
            height="64"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
