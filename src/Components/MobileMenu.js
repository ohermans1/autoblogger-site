import React from "react";
import { SmartNavLink } from "./SmartLink";

const MobileMenu = ({ isOpen, toggleMenu }) => {
  return (
    isOpen && (
      <div className="md:hidden bg-white shadow-md py-2">
        <SmartNavLink to="/" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Home
        </SmartNavLink>
        <SmartNavLink to="/features" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Features
        </SmartNavLink>
        <SmartNavLink to="/pricing" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Pricing
        </SmartNavLink>
        <SmartNavLink to="/faqs" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          FAQs
        </SmartNavLink>
        <SmartNavLink to="/reviews" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Reviews
        </SmartNavLink>
        <SmartNavLink to="/2x-staff-pick" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          2x Staff Pick
        </SmartNavLink>
        <SmartNavLink to="/contact" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Contact Us
        </SmartNavLink>
        <SmartNavLink to="/other-apps" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Other Apps
        </SmartNavLink>
        <SmartNavLink to="/free-seo-checklist" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Free SEO Checklist
        </SmartNavLink>
      </div>
    )
  );
};

export default MobileMenu;
