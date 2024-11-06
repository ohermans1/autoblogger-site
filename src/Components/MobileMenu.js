import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = ({ isOpen, toggleMenu }) => {
  return (
    isOpen && (
      <div className="md:hidden bg-white shadow-md py-2">
        <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Home
        </NavLink>
        <NavLink to="/features" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Features
        </NavLink>
        <NavLink to="/pricing" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Pricing
        </NavLink>
        <NavLink to="/faqs" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          FAQs
        </NavLink>
        <NavLink to="/reviews" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Reviews
        </NavLink>
        <NavLink to="/contact" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Contact Us
        </NavLink>
        <NavLink to="/free-seo-checklist" onClick={toggleMenu} className={({ isActive }) => `block px-4 py-2 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:bg-gray-200`}>
          Free SEO Checklist
        </NavLink>
      </div>
    )
  );
};

export default MobileMenu;
