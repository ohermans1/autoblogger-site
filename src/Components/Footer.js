import React from "react";
import { SmartLink } from "./SmartLink";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src="/logo.png" alt="autoBlogger" width="1200" height="1200" loading="lazy" decoding="async" />
          <p>Consistent SEO publishing for ambitious Shopify stores.</p>
        </div>
        <nav className="site-footer__links" aria-label="Footer navigation">
        <SmartLink to="/privacy">
          Privacy Policy
        </SmartLink>
        <SmartLink to="/terms">
          Terms and Conditions
        </SmartLink>
        <SmartLink to="/premium-extras">
          Premium Extras
        </SmartLink>
        <SmartLink to="/blog">
          Blog
        </SmartLink>
        <SmartLink to="/free-seo-checklist">
          Free SEO Checklist
        </SmartLink>
        <SmartLink to="/site-map">
          HTML Sitemap
        </SmartLink>
        </nav>
      </div>
      <div className="site-footer__bottom">
      <p>&copy; {new Date().getFullYear()} autoBlogger. All rights reserved.</p>
      <p>
        Legal business name: Oliver R Corich-Hermans. autoBlogger is operated by Oliver R Corich-Hermans, Station Road, St Monans, UK.
      </p>
      </div>
    </footer>
  );
};

export default Footer;
