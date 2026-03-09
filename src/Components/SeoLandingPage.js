import React from "react";
import { Link } from "react-router-dom";
import { APP_LISTING_URL, SITE_NAV_ITEMS, STATIC_SEO_PAGES, TRUST_BULLETS, findRelatedPages } from "../seo/pageCatalog";

const SeoLandingPage = ({ page }) => {
  const relatedPages = page ? findRelatedPages(page, STATIC_SEO_PAGES) : [];

  if (!page) {
    return null;
  }

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      <div className="max-w-6xl mx-auto px-5">
        <nav className="flex flex-wrap gap-3 text-sm font-medium text-primary mb-8" aria-label="SEO section navigation">
          {SITE_NAV_ITEMS.map(item => (
            <Link key={item.path} to={item.path} className="hover:underline">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-6">
          <article className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{page.heading}</h1>
            <p className="text-lg text-gray-700 mb-6">{page.intro}</p>

            {page.bullets.length > 0 && (
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {page.bullets.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={page.ctaHref || APP_LISTING_URL}
                className="inline-flex items-center rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow hover:bg-opacity-90 transition"
              >
                {page.ctaLabel || "Start 14-Day Free Trial"}
              </a>
              <Link to="/contact" className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition">
                Contact Support
              </Link>
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
                      <Link to={item.route} className="font-semibold text-primary hover:underline">
                        {item.heading || item.title}
                      </Link>
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
