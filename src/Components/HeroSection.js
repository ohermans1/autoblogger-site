import React from "react";
import ReactGA from "react-ga4";

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
        Automatically publish SEO-optimised blogs that link products, build authority, and drive traffic
      </h1>

      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-700">
        2x Shopify Staff Pick:{" "}
        <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-primary no-underline" aria-label="Visit autoBlogger on Shopify">
          autoBlogger
        </a>
      </h2>
      <p className="mb-6 text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
        autoBlogger turns your{" "}
        <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-primary no-underline" aria-label="Visit Shopify">
          Shopify
        </a>{" "}
        blog into an automated SEO engine. After a quick setup, it publishes fresh, engaging, search-engine-friendly articles with optimised HTML, metadata, FAQs, table of contents, internal
        product links, and relevant imagery.
      </p>
      <p className="mb-6 text-lg md:text-xl text-gray-600">Edit directly in Shopify, auto-share to social channels, and set and forget your blogging strategy.</p>
      <p className="mb-6 text-base md:text-lg text-gray-600">
        Need implementation frameworks? Start with our{" "}
        <a href="/solutions" className="text-primary hover:underline">
          SEO solutions hub
        </a>{" "}
        and{" "}
        <a href="/resources" className="text-primary hover:underline">
          free resource library
        </a>
        .
      </p>

      {/* Call-to-action text */}
      <p className="text-xl font-semibold text-gray-700 mb-4">Start your 14-day free trial now:</p>

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
            alt="Shopify Badge"
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
