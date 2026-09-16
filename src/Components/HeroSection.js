import React from "react";
import ReactGA from "react-ga4";
import { FiArrowRight, FiCheck, FiFileText, FiLink2, FiSearch, FiZap } from "react-icons/fi";
import { SmartLink } from "./SmartLink";

const shopifyUrl = "https://apps.shopify.com/autoblogger";

const HeroSection = () => {
  const trackTrialClick = () => ReactGA.event({
    category: "App Store Links",
    action: "Clicked Shopify App Store Link",
    label: "Hero trial click"
  });

  return (
    <>
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <SmartLink to="/2x-staff-pick" className="eyebrow-pill">
              <span className="eyebrow-pill__star" aria-hidden="true">★</span> Twice picked by Shopify staff <FiArrowRight aria-hidden="true" />
            </SmartLink>
            <h1>Your Shopify blog, <span>on a roll.</span></h1>
            <p className="hero-lead">
              Meet the original autoBlogger, built for Shopify since 2023. One feature-rich workflow plans topics, creates detailed search-ready articles, links your products, and publishes on schedule.
            </p>
            <p className="hero-positioning">Our pick for the best all-in-one auto blogging tool for Shopify.</p>
            <div className="hero-actions">
              <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="button-primary" onClick={trackTrialClick}>
                Start your 14-day free trial <FiArrowRight aria-hidden="true" />
              </a>
              <SmartLink to="/features" className="button-secondary">Explore the features</SmartLink>
            </div>
            <p className="hero-fineprint"><FiCheck aria-hidden="true" /> Made for Shopify stores <span aria-hidden="true">·</span> Edit posts in Shopify <span aria-hidden="true">·</span> Plans from $9.95/month</p>
          </div>

          <div className="hero-visual" aria-label="Illustration of an autoBlogger article publishing workflow">
            <div className="hero-visual__orbit hero-visual__orbit--one" aria-hidden="true" />
            <div className="hero-visual__orbit hero-visual__orbit--two" aria-hidden="true" />
            <div className="hero-floating hero-floating--top"><FiZap aria-hidden="true" /> Your next post, handled</div>
            <div className="workflow-card">
              <div className="workflow-card__header">
                <div className="workflow-card__identity"><span className="workflow-card__mark"><FiFileText aria-hidden="true" /></span><div><span className="workflow-card__label">autoBlogger studio</span><strong>Upcoming article</strong></div></div>
                <span className="status-pill"><span /> On schedule</span>
              </div>
              <div className="article-preview">
                <div className="article-preview__top"><span className="article-preview__tag">SHOPIFY BLOG</span><span>01 / 03</span></div>
                <div className="article-preview__art" aria-hidden="true"><span /><span /><span /></div>
                <h2>How to find the right fit for your everyday essentials</h2>
                <div className="article-preview__lines" aria-hidden="true"><span /><span /><span /></div>
              </div>
              <div className="workflow-steps">
                <div><FiSearch aria-hidden="true" /><span><strong>Search-ready</strong><small>Built-in SEO</small></span></div>
                <div><FiLink2 aria-hidden="true" /><span><strong>Connected</strong><small>Product links</small></span></div>
                <div><FiCheck aria-hidden="true" /><span><strong>Scheduled</strong><small>Ready to publish</small></span></div>
              </div>
              <div className="workflow-card__footer"><span>One less thing on your to-do list</span><span className="workflow-card__dots" aria-hidden="true"><i /><i /><i /></span></div>
            </div>
            <div className="hero-floating hero-floating--bottom"><span className="hero-floating__pulse" /> Publishing, even when you're busy</div>
          </div>
        </div>
      </section>
      <div className="proof-strip" aria-label="Why merchants choose autoBlogger">
        <div className="proof-strip__inner">
          <span><strong>2×</strong> Shopify Staff Pick</span>
          <span><strong>4.9/5</strong> Shopify App Store rating</span>
          <span><strong>14 days</strong> to try it free</span>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
