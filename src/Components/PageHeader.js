import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { SmartLink } from "./SmartLink";

const PageHeader = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Logo */}
        <SmartLink to="/" className="flex shrink-0 items-center" aria-label="autoBlogger home">
          <img
            src="/logo.png"
            alt="autoBlogger"
            className="site-logo"
            width="1200"
            height="1200"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </SmartLink>

        {/* Navigation Links */}
        <Navigation />

        {/* Hamburger Menu */}
        <button
          type="button"
          className="mobile-menu-toggle md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
    </header>
  );
};

export default PageHeader;
