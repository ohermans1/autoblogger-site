import React from "react";
import { SmartLink } from "./SmartLink";

const Footer = () => {
  return (
    <footer className="text-center py-4 md:bg-gradient-to-b md:from-white md:to-gray-100">
      <p>&copy; {new Date().getFullYear()} autoBlogger. All rights reserved.</p>
      <div className="mt-2">
        <SmartLink to="/privacy" className="text-primary hover:underline mx-2">
          Privacy Policy
        </SmartLink>
        <span>|</span>
        <SmartLink to="/terms" className="text-primary hover:underline mx-2">
          Terms and Conditions
        </SmartLink>
        <span>|</span>
        <SmartLink to="/premium-extras" className="text-primary hover:underline mx-2">
          Premium Extras
        </SmartLink>
        <span>|</span>
        <SmartLink to="/blog" className="text-primary hover:underline mx-2">
          Blog
        </SmartLink>
        <span>|</span>
        <SmartLink to="/free-seo-checklist" className="text-primary hover:underline mx-2">
          Free SEO Checklist
        </SmartLink>
        <span>|</span>
        <SmartLink to="/site-map" className="text-primary hover:underline mx-2">
          HTML Sitemap
        </SmartLink>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Legal business name: Oliver R Corich-Hermans. autoBlogger is operated by Oliver R Corich-Hermans, Station Road, St Monans, UK.
      </p>
    </footer>
  );
};

export default Footer;
