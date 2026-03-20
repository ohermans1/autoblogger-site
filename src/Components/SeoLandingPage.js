import React from "react";
import { APP_LISTING_URL, SITE_NAV_ITEMS, STATIC_SEO_PAGES, TRUST_BULLETS, findRelatedPages, getBreadcrumbTrail } from "../seo/pageCatalog";
import { SmartLink } from "./SmartLink";

const renderSectionList = (items, ordered = false) => {
  if (!items.length) {
    return null;
  }

  const ListTag = ordered ? "ol" : "ul";
  const listClassName = ordered ? "list-decimal pl-5 space-y-2 text-gray-700" : "list-disc pl-5 space-y-2 text-gray-700";

  return (
    <ListTag className={listClassName}>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ListTag>
  );
};

const ContentSection = ({ section }) => (
  <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
    <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
    <div className="space-y-3">
      {section.paragraphs.map(paragraph => (
        <p key={paragraph} className="text-gray-700">
          {paragraph}
        </p>
      ))}
    </div>
    {section.items.length > 0 && <div className="mt-4">{renderSectionList(section.items, section.ordered)}</div>}
  </section>
);

const ComparisonTable = ({ table }) => (
  <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{table.title}</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm text-gray-700">
        <thead>
          <tr>
            {table.columns.map(column => (
              <th key={column} className="border-b border-gray-300 px-3 py-2 font-semibold text-gray-900">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map(row => (
            <tr key={row.join("|")} className="align-top">
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`} className="border-b border-gray-200 px-3 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const ProofGallery = ({ items }) => (
  <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
    <div className="mb-4">
      <h2 className="text-2xl font-semibold text-gray-900">Proof Screenshots</h2>
      <p className="mt-2 text-gray-700">Public Shopify App Store screenshots showing autoBlogger featured in 2024 and 2026.</p>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      {items.map(item => (
        <figure key={item.src} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
          </div>
          <a href={item.src} target="_blank" rel="noopener noreferrer" className="block bg-white">
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="block w-full h-auto"
              loading="lazy"
              decoding="async"
            />
          </a>
          {item.caption && <figcaption className="px-4 py-4 text-sm text-gray-600">{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  </section>
);

const SeoLandingPage = ({ page }) => {
  const relatedPages = page ? findRelatedPages(page, STATIC_SEO_PAGES) : [];
  const breadcrumbTrail = page ? getBreadcrumbTrail(page) : [];

  if (!page) {
    return null;
  }

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      <div className="max-w-6xl mx-auto px-5">
        <nav className="flex flex-wrap gap-3 text-sm font-medium text-primary mb-8" aria-label="SEO section navigation">
          {SITE_NAV_ITEMS.map(item => (
            <SmartLink key={item.path} to={item.path} className="hover:underline">
              {item.name}
            </SmartLink>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-6">
          <article className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            {breadcrumbTrail.length > 1 && (
              <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
                {breadcrumbTrail.map((item, index) => {
                  const isLast = index === breadcrumbTrail.length - 1;

                  return (
                    <React.Fragment key={item.path}>
                      {isLast ? (
                        <span className="font-medium text-gray-800">{item.label}</span>
                      ) : (
                        <SmartLink to={item.path} className="hover:text-primary hover:underline">
                          {item.label}
                        </SmartLink>
                      )}
                      {!isLast && <span aria-hidden="true">/</span>}
                    </React.Fragment>
                  );
                })}
              </nav>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{page.heading}</h1>
            <div className="space-y-6">
              <div>
                <p className="text-lg text-gray-700 mb-5">{page.intro}</p>
                {page.bullets.length > 0 && (
                  <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Takeaways</h2>
                    {renderSectionList(page.bullets)}
                  </section>
                )}
              </div>

              {page.comparisonTable && <ComparisonTable table={page.comparisonTable} />}

              {Array.isArray(page.proofGallery) && page.proofGallery.length > 0 && <ProofGallery items={page.proofGallery} />}

              {page.sections.map(section => (
                <ContentSection key={section.title} section={section} />
              ))}

              {page.checklist.length > 0 && (
                <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Action Checklist</h2>
                  {renderSectionList(page.checklist, true)}
                </section>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={page.ctaHref || APP_LISTING_URL}
                className="inline-flex items-center rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow hover:bg-opacity-90 transition"
              >
                {page.ctaLabel || "Start 14-Day Free Trial"}
              </a>
              <SmartLink to="/contact" className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition">
                Contact Support
              </SmartLink>
            </div>
          </article>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Proof and Next Step</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {TRUST_BULLETS.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-gray-700">Use this page as a working brief, then launch implementation inside autoBlogger.</p>
            </section>

            {relatedPages.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Guides</h2>
                <div className="space-y-4">
                  {relatedPages.map(item => (
                    <div key={item.route} className="border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
                      <SmartLink to={item.route} className="font-semibold text-primary hover:underline">
                        {item.heading || item.title}
                      </SmartLink>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {page.faq.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">FAQ Snippets</h2>
                <div className="space-y-3">
                  {page.faq.map(item => (
                    <details key={item.question} className="rounded-xl border border-gray-200 px-4 py-3">
                      <summary className="cursor-pointer font-semibold text-gray-900">{item.question}</summary>
                      <p className="mt-3 text-sm text-gray-700">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default SeoLandingPage;
