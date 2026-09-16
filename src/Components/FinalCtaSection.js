import React from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { SmartLink } from "./SmartLink";

const FinalCtaSection = () => (
  <section className="final-cta" aria-labelledby="final-cta-heading">
    <div className="final-cta__inner">
      <div>
        <span className="section-kicker">READY WHEN YOU ARE</span>
        <h2 id="final-cta-heading">Your next great blog post starts here.</h2>
        <p>Try the Shopify-first tool built to make detailed, connected, consistent blogging part of your routine.</p>
        <div className="final-cta__actions">
          <a className="button-primary" href="https://apps.shopify.com/autoblogger" target="_blank" rel="noopener noreferrer">Try autoBlogger free <FiArrowRight aria-hidden="true" /></a>
          <SmartLink className="button-secondary" to="/contact">Talk to us</SmartLink>
        </div>
        <span className="final-cta__note"><FiCheck aria-hidden="true" /> 14-day trial on every plan</span>
      </div>
      <div className="final-cta__decoration" aria-hidden="true"><span>Write less.</span><span>Publish more.</span><span>Grow steadily.</span></div>
    </div>
  </section>
);

export default FinalCtaSection;
