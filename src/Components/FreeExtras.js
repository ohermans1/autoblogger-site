import React from "react";
import { obfuscateEmail } from "../Utils/helpers";

const FreeExtras = () => {
  const { email, mailto } = obfuscateEmail("support", "autoblogger.bot");

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100 px-4 md:px-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Free Extras</h1>

        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Backlink Programme (Premium)</h2>
        <p className="text-center text-gray-700 mb-6">
          By opting into the backlink programme, your store's link will occasionally be shared on other users' spotlight articles, giving you more exposure and potentially helping to improve your
          SEO. In exchange, your link will also be featured in the articles of other participants.
        </p>
        <p className="text-center text-gray-700 mb-6">
          This reciprocal link sharing is designed to benefit all stores involved, increasing the likelihood of driving more traffic and improving search engine rankings for everyone. If you're
          interested in participating, just opt in through autoBlogger, and I'll make sure you're included in the programme.
        </p>
        <p className="text-center text-gray-700 mb-6">
          It's a simple way to expand your online presence and support other store owners at the same time. Opting in is completely free, and there's no obligation—just an opportunity for more
          visibility and potential SEO benefits.
        </p>

        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 mt-12">Free Weekly Spotlight Articles (Wix and Shopify Users)</h2>
        <p className="text-center text-gray-700 mb-6">
          Enter the weekly draw for a chance to win a free spotlight article on Medium. This article will feature your store and may help with backlinks and online visibility.
        </p>
        <p className="text-center text-gray-700 mb-6">
          If you're selected, you'll receive an article showcasing your store. I'll email you a link, so keep an eye on your spam folder or mark{" "}
          <a href={mailto} className="text-primary font-semibold hover:underline">
            {email}
          </a>{" "}
          as not spam. If you're not happy with the article, let me know and I'll remove it.
        </p>
        <p className="text-center text-gray-700 mb-6">
          The article will be based on publicly available information about your store, such as your website, products, or other relevant content available online.
        </p>
        <p className="text-center text-gray-700 mb-6">
          You can view examples of previous spotlight articles{" "}
          <a
            href="https://medium.com/@ohermans1/creating-memorable-nursery-experiences-spotlight-on-newborn-nursery-furniture-d716876e492f"
            className="text-primary font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{" "}
          and{" "}
          <a
            href="https://medium.com/@ohermans1/spotlight-on-sk8-clothing-your-friendly-neighborhood-skate-shop-f1d2f4504b47"
            className="text-primary font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 mt-12">Free Lifetime Access to autoSchema</h2>
        <p className="text-center text-gray-700 mb-6">
          Get free access to autoSchema, the tool that automates your Google structured data. Structured data helps search engines understand your site's content and can improve its visibility in
          search results.
        </p>
        <p className="text-center text-gray-700 mb-6">
          Learn more in{" "}
          <a
            href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
            className="text-primary font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's structured data documentation
          </a>{" "}
          or visit the{" "}
          <a
            href="https://apps.shopify.com/autoschema-google-structures"
            className="text-primary font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            autoSchema Shopify App Store listing
          </a>
          .
        </p>
        <p className="text-center text-gray-700 mb-6">To claim this offer, sign up for autoBlogger on Shopify, opt in, and I'll send you a promo code.</p>
        <p className="text-center text-gray-700 mb-6">
          Check your spam folder or mark{" "}
          <a href={mailto} className="text-primary font-semibold hover:underline">
            {email}
          </a>{" "}
          as not spam so you don't miss the code.
        </p>
      </div>
    </section>
  );
};

export default FreeExtras;
