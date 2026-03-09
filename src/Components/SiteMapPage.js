import React from "react";
import { STATIC_SEO_PAGES, groupPagesBySection, isIndexablePage } from "../seo/pageCatalog";
import { SmartLink } from "./SmartLink";

const SECTION_ORDER = ["Core", "Solutions", "Resources", "Legal", "Site"];
const SECTION_LABELS = {
  Core: "Core Pages",
  Solutions: "Solutions and Playbooks",
  Resources: "Resources and Templates",
  Legal: "Legal Pages",
  Site: "Site Utilities"
};

const SiteMapPage = () => {
  const sectionMap = groupPagesBySection(STATIC_SEO_PAGES);
  const totalPages = STATIC_SEO_PAGES.filter(isIndexablePage).length;

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100">
      <div className="max-w-6xl mx-auto px-5">
        <nav className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
          <SmartLink to="/" className="hover:text-primary hover:underline">
            Home
          </SmartLink>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-gray-800">HTML Sitemap</span>
        </nav>
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">HTML Sitemap</h1>
        <p className="max-w-3xl mx-auto text-center text-lg text-gray-700 mb-10">
          Browse every important indexable page on the site in one place. This page is designed to make discovery easier for users and crawlers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECTION_ORDER.filter(section => (sectionMap[section] || []).length > 0).map(section => (
            <section key={section} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{SECTION_LABELS[section]}</h2>
              <ul className="space-y-3">
                {sectionMap[section]
                  .slice()
                  .sort((left, right) => left.route.localeCompare(right.route))
                  .map(page => (
                    <li key={page.route} className="border-t border-gray-200 pt-3 first:border-t-0 first:pt-0">
                      <SmartLink to={page.route} className="font-semibold text-primary hover:underline">
                        {page.heading || page.title}
                      </SmartLink>
                      <p className="mt-1 text-sm text-gray-600">{page.description}</p>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">{totalPages} indexable pages listed.</p>
      </div>
    </section>
  );
};

export default SiteMapPage;
