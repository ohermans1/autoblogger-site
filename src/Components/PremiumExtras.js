import React from "react";

const PremiumExtras = () => {
  return (
    <section className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100 px-4 md:px-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Premium Extras</h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">Priority Setup Support</h2>
            <p className="text-center text-gray-700 mb-4">
              Premium plans may include additional support beyond automated blog publishing. These extras are designed to help merchants set up cleaner content workflows, review settings, and
              understand how the app fits their store.
            </p>
            <p className="text-center text-gray-700">
              autoBlogger does not guarantee rankings, traffic, or search placement. The goal is to make publishing easier and keep the setup aligned with good SEO practice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">Content Workflow Review</h2>
            <p className="text-center text-gray-700 mb-4">
              Eligible users may receive practical guidance on topic setup, article structure, product-linking choices, metadata, and publishing frequency.
            </p>
            <p className="text-center text-gray-700">
              This support is focused on your own store content and app configuration rather than third-party link placement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">autoSchema Bonus</h2>
            <p className="text-center text-gray-700 mb-4">
              Premium subscribers may receive complimentary access to autoSchema, a Shopify app that helps add structured data so search engines can better understand store pages.
            </p>
            <p className="text-center text-gray-700 mb-4">
              To learn more about structured data, visit{" "}
              <a
                href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
                className="text-primary font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google's structured data documentation
              </a>
              .
            </p>
            <p className="text-center text-gray-700">
              To review autoSchema, visit{" "}
              <a href="https://apps.shopify.com/autoschema-google-structures" className="text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                the Shopify App Store listing
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PremiumExtras;
