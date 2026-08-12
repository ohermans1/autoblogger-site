import React from "react";

const PremiumExtras = () => {
  return (
    <section className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100 px-4 md:px-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Premium Plan Extras</h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">Growth and Volume Extras</h2>
            <p className="text-center text-gray-700 mb-4">
              Growth and Volume include the Starter feature set plus the advanced ChatGPT-5.6 model, full publishing schedule control, automatic social sharing, backlink network access, autoSchema,
              autoLLMs, and a featured store article on Medium.
            </p>
            <p className="text-center text-gray-700">
              Growth publishes three SEO blogs each week, while Volume publishes daily. Both plans include a 14-day free trial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">Authority Upgrades</h2>
            <p className="text-center text-gray-700 mb-4">
              Authority includes every Growth feature and publishes three premium SEO articles each week. Articles receive multi-pass AI writing and editing, four premium AI images, access to the most
              advanced available models, greater depth, and enhanced SEO review.
            </p>
            <p className="text-center text-gray-700">
              Authority also includes priority support and article fine-tuning, with a 7-day free trial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">Included Companion Apps</h2>
            <p className="text-center text-gray-700 mb-4">
              Growth, Volume, and Authority include autoSchema and autoLLMs. autoSchema adds structured data to help search engines understand store pages, while autoLLMs supports AI discovery with an
              automatically maintained LLMs.txt file.
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
              Review{" "}
              <a href="https://apps.shopify.com/autoschema-google-structures" className="text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                autoSchema on the Shopify App Store
              </a>
              {" "}or{" "}
              <a href="https://apps.shopify.com/autollm" className="text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                view autoLLMs
              </a>
              . Check the autoBlogger listing for the latest plan details.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PremiumExtras;
