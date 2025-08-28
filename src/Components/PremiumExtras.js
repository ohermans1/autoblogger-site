import React from "react";
import { obfuscateEmail } from "../Utils/helpers"; // Adjust path as necessary

const PremiumExtras = props => {
  const { email, mailto } = obfuscateEmail("support", "autoblogger.bot");

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100 px-4 md:px-16">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Premium Extras</h1>

      {/* Backlink Programme */}
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Backlink Programme (currently Shopify users only)</h2>
      <p className="text-center text-gray-700 mb-6">
        The Backlink Programme is part of our premium extras. By opting in, your store’s link will occasionally be shared on other users’ spotlight articles, giving you more exposure and potentially
        helping to improve your SEO. In exchange, your link will also be featured in the articles of other participants.
      </p>
      <p className="text-center text-gray-700 mb-6">
        This reciprocal link sharing is designed to benefit all stores involved, increasing the likelihood of driving more traffic and improving search engine rankings for everyone. Participation is
        available only on paid plans.
      </p>
      <p className="text-center text-gray-700 mb-6">It’s a simple way to expand your online presence and support other store owners at the same time. Upgrade today to gain access to this feature!</p>

      {/* Weekly Spotlight Articles */}
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 mt-12">Weekly Spotlight Articles (Premium)</h2>

      <p className="text-center text-gray-700 mb-6">
        Paid users are automatically entered into the weekly draw for a chance to win a spotlight article on Medium. This article will not only feature your store but also help with backlinks and
        online visibility. It’s a powerful opportunity to boost your SEO and gain more exposure.
      </p>
      <p className="text-center text-gray-700 mb-6">
        If you're selected, you’ll receive an article showcasing your store. I'll email you a link to the article, so make sure to keep an eye on your spam folder, or mark{" "}
        <a href={mailto} className="text-primary font-semibold hover:underline">
          {email}
        </a>{" "}
        as not spam to ensure you don't miss it. If you're not happy with it, no worries—just let me know and I’ll remove it.
      </p>
      <p className="text-center text-gray-700 mb-6">
        The article will be based on publicly available information about your store, such as your website, products, or any relevant content I can find online.
      </p>
      <p className="text-center text-gray-700 mb-6">
        Examples of previous spotlight articles:{" "}
        <a
          href="https://medium.com/@ohermans1/creating-memorable-nursery-experiences-spotlight-on-newborn-nursery-furniture-d716876e492f"
          className="text-primary font-semibold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Here
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

      {/* autoSchema Access */}
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 mt-12">Free Lifetime Access to autoSchema (Premium Bonus)</h2>
      <p className="text-center text-gray-700 mb-6">
        As a premium subscriber, you’ll also receive free lifetime access to autoSchema, the tool that fully automates your Google Structured Data. Structured Data helps search engines understand your
        site’s content, improving SEO and increasing visibility in search results.
      </p>
      <p className="text-center text-gray-700 mb-6">
        To learn more about Google Structured Data, visit{" "}
        <a
          href="https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data"
          className="text-primary font-semibold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google’s official page
        </a>
        .
      </p>
      <p className="text-center text-gray-700 mb-6">
        To learn more about autoSchema, visit{" "}
        <a href="https://apps.shopify.com/autoschema-google-structures" className="text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
          our Shopify app store listing
        </a>
        .
      </p>
      <p className="text-center text-gray-700 mb-6">To claim this bonus, simply sign up for a premium autoBlogger plan, opt in, and I’ll send you your promo code.</p>
      <p className="text-center text-gray-700 mb-6">
        Be sure to check your spam folder, or mark{" "}
        <a href={`mailto:${email}`} className="text-primary font-semibold hover:underline">
          {email}
        </a>{" "}
        as “not spam” to ensure you don’t miss the code!
      </p>
    </section>
  );
};

export default PremiumExtras;
