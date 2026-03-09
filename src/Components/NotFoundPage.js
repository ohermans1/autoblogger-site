import React from "react";
import { SmartLink } from "./SmartLink";

const NotFoundPage = () => {
  return (
    <section className="max-w-3xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-700 mb-8">The page you requested does not exist. Use one of the links below to continue browsing.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <SmartLink to="/" className="bg-primary text-white px-5 py-2 rounded shadow hover:bg-opacity-90 transition">
          Home
        </SmartLink>
        <SmartLink to="/features" className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100 transition">
          Features
        </SmartLink>
        <SmartLink to="/pricing" className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100 transition">
          Pricing
        </SmartLink>
        <SmartLink to="/free-seo-checklist" className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100 transition">
          Free SEO Checklist
        </SmartLink>
        <SmartLink to="/site-map" className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100 transition">
          HTML Sitemap
        </SmartLink>
      </div>
    </section>
  );
};

export default NotFoundPage;
