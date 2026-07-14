import React from "react";
import ReactGA from "react-ga4";
import { FiArrowRight, FiCheck, FiEdit3, FiLink, FiSearch } from "react-icons/fi";
import { SmartLink } from "./SmartLink";

const HeroSection = () => {
  const shopifyUrl = "https://apps.shopify.com/autoblogger";

  // Function to handle click events and send to Google Analytics
  const handleAppStoreClick = platform => {
    ReactGA.event({
      category: "App Store Links",
      action: `Clicked ${platform} App Store Link`,
      label: `${platform} App Store Link Click`
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-section__glow hero-section__glow--one" aria-hidden="true" />
      <div className="hero-section__glow hero-section__glow--two" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <SmartLink to="/2x-staff-pick" className="eyebrow-pill">
            <span aria-hidden="true">★</span> 2x Shopify Staff Pick
          </SmartLink>
          <h1>Shopify AI blog automation for an <span>SEO growth engine.</span></h1>
          <p className="hero-lead">
            Publish useful, search-focused articles with optimized structure, relevant imagery, and internal product links—without rebuilding your workflow every week.
          </p>
          <div className="hero-actions">
            <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="button-primary" onClick={() => handleAppStoreClick("Shopify")}>
              Start 14-day free trial <FiArrowRight aria-hidden="true" />
            </a>
            <SmartLink to="/features" className="button-secondary">See how it works</SmartLink>
          </div>
          <div className="hero-trust" aria-label="Product benefits">
            <span><FiCheck aria-hidden="true" /> Built for Shopify</span>
            <span><FiCheck aria-hidden="true" /> No credit card upfront</span>
            <span><FiCheck aria-hidden="true" /> Edit any time</span>
          </div>
        </div>

        <div className="workflow-card" aria-label="Example autoBlogger publishing workflow">
          <div className="workflow-card__header">
            <div>
              <span className="workflow-card__label">Publishing workflow</span>
              <strong>Next article</strong>
            </div>
            <span className="status-pill"><span /> Ready</span>
          </div>
          <div className="article-preview">
            <span className="article-preview__tag">SEO article</span>
            <h2>How to choose the right products for your store</h2>
            <div className="article-preview__lines"><span /><span /><span /></div>
          </div>
          <div className="workflow-steps">
            <div><FiSearch aria-hidden="true" /><span><strong>Search-ready</strong><small>Metadata & structure</small></span></div>
            <div><FiLink aria-hidden="true" /><span><strong>Product links</strong><small>Added automatically</small></span></div>
            <div><FiEdit3 aria-hidden="true" /><span><strong>Fully editable</strong><small>Inside Shopify</small></span></div>
          </div>
          <div className="workflow-card__footer">
            <span>Scheduled for Thursday</span><strong>10:00 AM</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
