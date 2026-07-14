import React from "react";
import { SmartNavLink } from "./SmartLink";

const MobileMenu = ({ isOpen, toggleMenu }) => {
  const linkClass = ({ isActive }) => `mobile-nav__link ${isActive ? "mobile-nav__link--active" : ""}`;

  return (
    isOpen && (
      <nav id="mobile-navigation" className="mobile-nav md:hidden" aria-label="Mobile navigation">
        <SmartNavLink to="/" onClick={toggleMenu} className={linkClass}>
          Home
        </SmartNavLink>
        <SmartNavLink to="/features" onClick={toggleMenu} className={linkClass}>
          Features
        </SmartNavLink>
        <SmartNavLink to="/pricing" onClick={toggleMenu} className={linkClass}>
          Pricing
        </SmartNavLink>
        <SmartNavLink to="/faqs" onClick={toggleMenu} className={linkClass}>
          FAQs
        </SmartNavLink>
        <SmartNavLink to="/reviews" onClick={toggleMenu} className={linkClass}>
          Reviews
        </SmartNavLink>
        <SmartNavLink to="/blog" onClick={toggleMenu} className={linkClass}>
          Blog
        </SmartNavLink>
        <SmartNavLink to="/2x-staff-pick" onClick={toggleMenu} className={linkClass}>
          2x Staff Pick
        </SmartNavLink>
        <SmartNavLink to="/contact" onClick={toggleMenu} className={linkClass}>
          Contact Us
        </SmartNavLink>
        <SmartNavLink to="/other-apps" onClick={toggleMenu} className={linkClass}>
          Other Apps
        </SmartNavLink>
        <SmartNavLink to="/free-seo-checklist" onClick={toggleMenu} className={linkClass}>
          Free SEO Checklist
        </SmartNavLink>
        <a href="https://apps.shopify.com/autoblogger" target="_blank" rel="noopener noreferrer" className="mobile-nav__cta" onClick={toggleMenu}>
          Start 14-day free trial
        </a>
      </nav>
    )
  );
};

export default MobileMenu;
