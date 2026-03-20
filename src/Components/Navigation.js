import React from "react";
import { SmartNavLink } from "./SmartLink";

const Navigation = () => {
  return (
    <nav className="hidden md:flex ml-auto" aria-label="Primary">
      <SmartNavLink to="/" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Home
      </SmartNavLink>
      <SmartNavLink to="/features" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Features
      </SmartNavLink>
      <SmartNavLink to="/pricing" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Pricing
      </SmartNavLink>
      <SmartNavLink to="/faqs" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        FAQs
      </SmartNavLink>
      <SmartNavLink to="/reviews" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Reviews
      </SmartNavLink>
      <SmartNavLink to="/2x-staff-pick" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        2x Staff Pick
      </SmartNavLink>
      <SmartNavLink to="/contact" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Contact Us
      </SmartNavLink>
      <SmartNavLink to="/other-apps" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Other Apps
      </SmartNavLink>
      <SmartNavLink to="/free-seo-checklist" className={({ isActive }) => `mx-3 ${isActive ? "font-semibold text-primary" : "text-gray-600"} hover:underline`}>
        Free SEO Checklist
      </SmartNavLink>
    </nav>
  );
};

export default Navigation;
