import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="hidden md:flex ml-auto">
      <NavLink to="/" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Home
      </NavLink>
      <NavLink to="/features" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Features
      </NavLink>
      <NavLink to="/pricing" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Pricing
      </NavLink>
      <NavLink to="/faqs" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        FAQs
      </NavLink>
      <NavLink to="/reviews" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Reviews
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Contact Us
      </NavLink>
      <NavLink to="/other-apps" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Other Apps
      </NavLink>
      <NavLink to="/free-seo-checklist" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Free SEO Checklist
      </NavLink>
    </nav>
  );
};

export default Navigation;
