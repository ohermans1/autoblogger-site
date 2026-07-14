import React from "react";
import { obfuscateEmail } from "../Utils/helpers";
import { SmartLink } from "./SmartLink";

const ContactSection = props => {
  const { email, mailto } = obfuscateEmail("support", "autoblogger.bot");

  return (
    <section className="content-section contact-section">
      {props.home ? (
        <h3 className="section-title">Need a hand? We’re here.</h3>
      ) : (
        <h1 className="section-title">Get in Touch with autoBlogger Support</h1>
      )}

      <p className="section-lead">Have a setup, billing, or product question? Send a message and we’ll help.</p>
      <p className="section-supporting">
        You can also browse the{" "}
        <SmartLink to="/faqs" className="text-primary font-semibold hover:underline">
          FAQs
        </SmartLink>
        , the{" "}
        <SmartLink to="/site-map" className="text-primary font-semibold hover:underline">
          HTML sitemap
        </SmartLink>
        , or the{" "}
        <SmartLink to="/free-seo-checklist" className="text-primary font-semibold hover:underline">
          free SEO checklist
        </SmartLink>
        .
      </p>

      <div className="contact-card">
        <p className="text-lg text-gray-800">
          Contact support at{" "}
          <a href={mailto} className="text-primary font-semibold hover:underline">
            {email}
          </a>
          .
        </p>
      </div>

      <div className="section-action">
        <a
          href="https://apps.shopify.com/autoblogger"
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary"
          aria-label="Explore autoBlogger on the Shopify App Store"
        >
          View Shopify App Listing
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
