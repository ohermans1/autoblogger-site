import React from "react";
import { obfuscateEmail } from "../Utils/helpers";
import { SmartLink } from "./SmartLink";

const ContactSection = props => {
  const { email, mailto } = obfuscateEmail("support", "autoblogger.bot");

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Get in Touch with autoBlogger Support</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Get in Touch with autoBlogger Support</h1>
      )}

      <p className="text-center text-gray-700 mb-6">If you have any questions, feel free to reach out. We'd love to hear from you.</p>
      <p className="max-w-3xl mx-auto text-center text-base text-gray-600 mb-8">
        You can also browse the{" "}
        <SmartLink to="/faqs" className="text-primary font-semibold hover:underline">
          FAQs
        </SmartLink>
        , the{" "}
        <SmartLink to="/site-map" className="text-primary font-semibold hover:underline">
          HTML sitemap
        </SmartLink>
        , or the{" "}
        <SmartLink to="/resources" className="text-primary font-semibold hover:underline">
          SEO resource library
        </SmartLink>
        .
      </p>

      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-lg text-gray-800">
          You can reach us at{" "}
          <a href={mailto} className="text-primary font-semibold hover:underline">
            {email}
          </a>
          .
        </p>
      </div>

      <div className="text-center mt-8">
        <a
          href="https://apps.shopify.com/autoblogger"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition"
          aria-label="Explore autoBlogger on the Shopify App Store"
        >
          View Shopify App Listing
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
