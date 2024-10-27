import React from "react";

const HeroSection = () => {
  const shopifyUrl = "https://apps.shopify.com/autoblogger";
  const wixUrl = "https://www.wix.com/app-market/web-solution/autoblogger-ai-blog-creator";

  // Function to handle smooth scrolling
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="text-center py-24 bg-gradient-to-r from-gray-50 to-white relative">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-800">
        Welcome to{" "}
        <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-primary no-underline" aria-label="Visit autoBlogger on Shopify">
          autoBlogger
        </a>{" "}
        - Your AI Solution for Effortless Blogging
      </h1>

      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-700">
        Transform Your{" "}
        <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-primary no-underline" aria-label="Visit Shopify">
          Shopify
        </a>{" "}
        Blogging Experience
      </h2>
      <p className="mb-6 text-lg md:text-xl text-gray-600">autoBlogger automates your content creation, allowing you to focus on what truly matters.</p>

      {/* Call-to-action text */}
      <p className="text-xl font-semibold text-gray-700 mb-4">Start your 14-day free trial now:</p>

      <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
        {/* Shopify Badge */}
        <a
          href={shopifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Start your 14-day free trial on Shopify"
          className="transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          <img src="/shopifybadgedark.png" alt="Shopify Badge" className="w-60 h-16 object-cover" />
        </a>

        {/* Wix Badge with aligned smaller text */}
        <div className="flex flex-col items-center">
          <a
            href={wixUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start your 14-day free trial on Wix"
            className="transition-transform duration-200 ease-in-out transform hover:scale-105"
          >
            <img src="/wixbadge.png" alt="Wix Badge" className="w-60 h-16 object-cover" />
          </a>
          {/* New Feature Text with Smaller Font */}
          <p className="text-xs text-gray-500 mt-1">New, currently with limited features</p>
        </div>
      </div>

      {/* Learn More Button with Animation */}
      <button
        onClick={handleScroll}
        className="mt-8 px-6 py-3 bg-primary text-white rounded shadow hover:shadow-lg transition-transform transform hover:scale-105"
        aria-label="Learn more about autoBlogger"
      >
        Learn More
      </button>
    </section>
  );
};

export default HeroSection;
