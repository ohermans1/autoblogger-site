import React from "react";
import { APP_LISTING_URL, STATIC_SEO_PAGES, findRelatedPages, getBreadcrumbTrail } from "../seo/pageCatalog";
import { SmartLink } from "./SmartLink";
import PageResourceSection from "./PageResourceSection";
import SeoRoiCalculator from "./SeoRoiCalculator";

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

const BlogBreadcrumb = ({ trail }) => {
  if (trail.length <= 1) {
    return null;
  }

  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
      {trail.map((item, index) => {
        const isLast = index === trail.length - 1;

        return (
          <React.Fragment key={item.path}>
            {isLast ? (
              <span className="text-gray-700">{item.label}</span>
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
  );
};

const BlogIndexPage = ({ page, breadcrumbTrail }) => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-4xl px-5">
      <BlogBreadcrumb trail={breadcrumbTrail} />
      <header className="border-b border-gray-200 pb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Blog</p>
        <h1 className="text-4xl font-bold leading-tight text-gray-950 md:text-5xl">{page.heading}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-700">{page.intro}</p>
      </header>

      {page.resourceCards.length > 0 && (
        <section className="py-10" aria-labelledby="latest-posts">
          <h2 id="latest-posts" className="text-2xl font-semibold text-gray-950">
            Latest articles
          </h2>
          <div className="mt-6 divide-y divide-gray-200">
            {page.resourceCards.map(card => (
              <article key={`${card.title}-${card.href}`} className="py-7 first:pt-0">
                {card.eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">{card.eyebrow}</p>}
                <h3 className="text-2xl font-semibold leading-snug text-gray-950">
                  <SmartLink to={card.href} className="hover:text-primary hover:underline">
                    {card.title}
                  </SmartLink>
                </h3>
                {card.meta && <p className="mt-2 text-sm text-gray-500">{card.meta}</p>}
                {card.description && <p className="mt-3 text-lg leading-8 text-gray-700">{card.description}</p>}
                <SmartLink to={card.href} className="mt-4 inline-flex font-semibold text-primary hover:underline">
                  {card.label || "Read article"}
                </SmartLink>
              </article>
            ))}
          </div>
        </section>
      )}

      {page.sections.map(section => (
        <section key={section.title} className="border-t border-gray-200 py-8">
          <h2 className="text-2xl font-semibold text-gray-950">{section.title}</h2>
          <div className="mt-4 space-y-4 text-lg leading-8 text-gray-700">
            {section.paragraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  </section>
);

const formatArticleDate = dateString => {
  if (!dateString) return "";

  try {
    return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${dateString}T00:00:00Z`));
  } catch (_error) {
    return dateString;
  }
};

const BlogArticlePage = ({ page, breadcrumbTrail }) => (
  <section className="bg-white py-16">
    <article className="mx-auto max-w-3xl px-5">
      <BlogBreadcrumb trail={breadcrumbTrail} />
      <header className="mb-10 border-b border-gray-200 pb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Shopify App Store trust</p>
        <h1 className="text-4xl font-bold leading-tight text-gray-950 md:text-5xl">{page.heading}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
          <span>By {page.authorName || "Ollie Hermans"}</span>
          {page.datePublished && (
            <>
              <span aria-hidden="true">|</span>
              <time dateTime={page.datePublished}>{formatArticleDate(page.datePublished)}</time>
            </>
          )}
        </div>
        <p className="mt-6 text-xl leading-8 text-gray-700">{page.intro}</p>
      </header>

      <div className="space-y-10">
        {page.sections.map(section => (
          <section key={section.title}>
            <h2 className="text-2xl font-semibold leading-snug text-gray-950">{section.title}</h2>
            <div className="mt-4 space-y-5 text-lg leading-8 text-gray-700">
              {section.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.items.length > 0 && <div className="mt-5 text-lg leading-8">{renderSectionList(section.items, section.ordered)}</div>}
          </section>
        ))}
      </div>

      {page.resourceCards.length > 0 && (
        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-950">{page.resourceSectionTitle || "Sources"}</h2>
          {page.resourceSectionIntro && <p className="mt-3 text-gray-700">{page.resourceSectionIntro}</p>}
          <ol className="mt-5 space-y-4">
            {page.resourceCards.map(card => (
              <li key={`${card.title}-${card.href}`} className="pl-1">
                <a href={card.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  {card.title}
                </a>
                {card.description && <p className="mt-1 text-sm leading-6 text-gray-600">{card.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {page.faq.length > 0 && (
        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-950">Common questions</h2>
          <div className="mt-5 divide-y divide-gray-200">
            {page.faq.map(item => (
              <details key={item.question} className="py-4">
                <summary className="cursor-pointer font-semibold text-gray-950">{item.question}</summary>
                <p className="mt-3 leading-7 text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-12 border-t border-gray-200 pt-8">
        <SmartLink to="/blog" className="font-semibold text-primary hover:underline">
          Back to the blog
        </SmartLink>
      </footer>
    </article>
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
      <h2 className="text-2xl font-semibold text-gray-900">Seen in the Shopify App Store</h2>
      <p className="mt-2 text-gray-700">Screenshots showing autoBlogger featured in Shopify's spotlight in 2024 and 2026.</p>
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

  if (page.route === "/blog") {
    return <BlogIndexPage page={page} breadcrumbTrail={breadcrumbTrail} />;
  }

  if (page.route.startsWith("/blog/")) {
    return <BlogArticlePage page={page} breadcrumbTrail={breadcrumbTrail} />;
  }

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      <div className="max-w-6xl mx-auto px-5">
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
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">At a glance</h2>
                    {renderSectionList(page.bullets)}
                  </section>
                )}
              </div>

              {page.resourceCards.length > 0 && (
                <PageResourceSection title={page.resourceSectionTitle || "Resources"} intro={page.resourceSectionIntro} cards={page.resourceCards} />
              )}

              {page.tool?.key === "seo-roi-calculator" && <SeoRoiCalculator tool={page.tool} />}

              {page.comparisonTable && <ComparisonTable table={page.comparisonTable} />}

              {Array.isArray(page.proofGallery) && page.proofGallery.length > 0 && <ProofGallery items={page.proofGallery} />}

              {page.sections.map(section => (
                <ContentSection key={section.title} section={section} />
              ))}

              {page.checklist.length > 0 && (
                <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">A quick checklist</h2>
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
            {relatedPages.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">More to explore</h2>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Common questions</h2>
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
