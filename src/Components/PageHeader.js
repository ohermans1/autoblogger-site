import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

const PageHeader = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-10">
      <div className="flex items-center gap-4 px-5 py-4">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center" aria-label="autoBlogger home">
          <img
            src="/logo.png"
            alt="autoBlogger"
            className="block h-12 w-auto object-contain"
            width="1200"
            height="1200"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </Link>

        {/* Navigation Links */}
        <Navigation />

        {/* Hamburger Menu */}
        <div className="md:hidden ml-auto">
          <GiHamburgerMenu size={24} className="cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
    </header>
  );
};

export default PageHeader;
