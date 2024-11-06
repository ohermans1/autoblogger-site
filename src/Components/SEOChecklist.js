import React from "react";

const SEOChecklist = props => {
  return (
    <section className="py-10 px-4 md:px-12">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Free SEO Checklist for Shopify and Wix</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Free SEO Checklist for Shopify and Wix</h1>
      )}

      {/* SEO Optimised Text */}
      <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 text-center">
        Optimising your website for search engines is essential to driving organic traffic and boosting your visibility online. Our free, downloadable SEO checklists for both Shopify and Wix are
        designed to help you enhance your site’s performance, rankings, and user experience. Whether you're an eCommerce store owner or a content creator, these checklists will guide you through key
        tasks such as optimising page speed, keyword research, on-page SEO, backlinking strategies, and much more.
      </p>

      <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 text-center">
        These SEO checklists have been specifically tailored for Shopify and Wix platforms, ensuring that you can easily implement the best practices in your store or website. With actionable tasks
        that you can track and measure, you'll be well on your way to improving your search engine rankings.
      </p>

      <p className="text-base sm:text-lg text-gray-700 mb-8 text-center">
        Download your platform-specific checklist today and start improving your SEO to drive more traffic, conversions, and success!
      </p>

      {/* Download Links */}
      <div className="flex flex-col sm:flex-row justify-center sm:gap-8">
        <a href="/Wix SEO Checklist.xlsx" className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition mb-4 sm:mb-0" aria-label="Free Shopify SEO checklist download">
          Download Shopify SEO Checklist
        </a>
        <a href="/Shopify SEO Checklist.xlsx" className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition" aria-label="Free Wix SEO checklist download">
          Download Wix SEO Checklist
        </a>
      </div>
    </section>
  );
};

export default SEOChecklist;