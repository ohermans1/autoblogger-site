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
        <Link to="/premium-extras" className="text-primary hover:underline mx-2">
          Premium Extras
        </Link>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Legal business name: Oliver R Corich-Hermans. autoBlogger is operated by Oliver R Corich-Hermans, Station Road, St Monans, UK.
      </p>
    </footer>
  );
};

export default Footer;
