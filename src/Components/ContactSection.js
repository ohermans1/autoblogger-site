import React, { useState } from "react";
import { FiArrowRight, FiCheck, FiCopy, FiMail } from "react-icons/fi";
import { obfuscateEmail } from "../Utils/helpers";
import { SmartLink } from "./SmartLink";

const ContactSection = () => {
  const { email, mailto } = obfuscateEmail("support", "autoblogger.bot");
  const [copyStatus, setCopyStatus] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email address copied");
    } catch (_error) {
      setCopyStatus("Select the email address above to copy it");
    }
  };

  return (
    <section className="content-section contact-page" aria-labelledby="contact-heading">
      <div className="contact-page__inner">
        <div className="contact-page__intro">
          <span className="section-kicker">TALK TO THE PERSON BEHIND THE APP</span>
          <h1 id="contact-heading">Let's talk about your Shopify blog.</h1>
          <p>Questions about setup, plans, or a feature? Reach the autoBlogger team directly. We can help you find the right way to use the original Shopify blogging tool for your store.</p>
          <div className="contact-page__trust"><FiCheck aria-hidden="true" /> Direct product support <span aria-hidden="true">·</span> No ticket maze</div>
        </div>

        <div className="contact-page__card">
          <span className="contact-page__icon"><FiMail aria-hidden="true" /></span>
          <h2>Get in touch</h2>
          <p>Send us a note with your store URL and what you need help with. We'll take it from there.</p>
          <a className="contact-page__address" href={mailto}>{email}</a>
          <div className="contact-page__actions">
            <a className="button-primary" href={mailto}>Email support <FiArrowRight aria-hidden="true" /></a>
            <button type="button" className="button-secondary" onClick={copyEmail}><FiCopy aria-hidden="true" /> Copy address</button>
          </div>
          <p className="contact-page__status" role="status" aria-live="polite">{copyStatus || "If an email app doesn't open, copy the address and use your inbox."}</p>
        </div>
      </div>
      <div className="contact-page__links">
        <span>Looking for a quick answer?</span>
        <SmartLink to="/faqs">Read FAQs</SmartLink>
        <SmartLink to="/features">Explore features</SmartLink>
        <SmartLink to="/pricing">Compare plans</SmartLink>
      </div>
    </section>
  );
};

export default ContactSection;
