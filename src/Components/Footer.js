import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center py-4 md:bg-gradient-to-b md:from-white md:to-gray-100">
      <p>&copy; {new Date().getFullYear()} autoBlogger. All rights reserved.</p>
      <div className="mt-2">
        <Link to="/privacy" className="text-primary hover:underline mx-2">
          Privacy Policy
        </Link>
        <span>|</span>
        <Link to="/terms" className="text-primary hover:underline mx-2">
          Terms and Conditions
        </Link>
        <span>|</span>
        <Link to="/backlink-terms" className="text-primary hover:underline mx-2">
          Backlink Program Terms
        </Link>
        <span>|</span>
        <Link to="/free-extras" className="text-primary hover:underline mx-2">
          Free Extras
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
