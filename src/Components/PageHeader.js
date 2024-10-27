import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

const PageHeader = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-10">
      <div className="flex justify-between items-center p-5">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            transform: "translateY(0)"
          }}
        >
          <img src="./../logo.png" alt="autoBlogger" className="h-16" />
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
