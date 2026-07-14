import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { SmartNavLink } from "./SmartLink";

const Navigation = () => {
  const navClass = ({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`;

  return (
    <nav className="desktop-nav hidden md:flex" aria-label="Primary">
      <SmartNavLink to="/features" className={navClass}>
        Features
      </SmartNavLink>
      <SmartNavLink to="/pricing" className={navClass}>
        Pricing
      </SmartNavLink>
      <SmartNavLink to="/reviews" className={navClass}>
        Reviews
      </SmartNavLink>
      <SmartNavLink to="/blog" className={navClass}>
        Blog
      </SmartNavLink>
      <details className="nav-dropdown">
        <summary className="nav-link">
          Resources <FiChevronDown aria-hidden="true" />
        </summary>
        <div className="nav-dropdown__menu">
          <SmartNavLink to="/free-seo-checklist" className={navClass}>Free SEO checklist</SmartNavLink>
          <SmartNavLink to="/2x-staff-pick" className={navClass}>2x Staff Pick</SmartNavLink>
          <SmartNavLink to="/faqs" className={navClass}>FAQs</SmartNavLink>
          <SmartNavLink to="/other-apps" className={navClass}>Other apps</SmartNavLink>
          <SmartNavLink to="/contact" className={navClass}>Contact</SmartNavLink>
        </div>
      </details>
      <a className="header-cta" href="https://apps.shopify.com/autoblogger" target="_blank" rel="noopener noreferrer">
        Start free trial
      </a>
    </nav>
  );
};

export default Navigation;
