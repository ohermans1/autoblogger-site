import React, { useState } from "react";
import { APP_LISTING_URL, getPageByRoute } from "../seo/pageCatalog";
import { SmartLink } from "./SmartLink";

const renderItems = items => {
  if (!items.length) {
    return null;
  }

  return (
    <ul className="mt-5 list-disc pl-5 space-y-2.5 text-gray-700">
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

const SectionCard = ({ section }) => (
  <article className="w-full rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm md:p-8">
    <h2 className="mb-4 text-2xl font-semibold text-gray-900">{section.title}</h2>
    <div className="space-y-3.5 text-lg leading-8 text-gray-700">
      {section.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
    {renderItems(section.items)}
  </article>
);

const StaffPickPage = () => {
  const page = getPageByRoute("/2x-staff-pick");
  const [openIndex, setOpenIndex] = useState(null);

  if (!page) {
    return null;
  }

  const toggleFaq = index => {
    setOpenIndex(currentIndex => (currentIndex === index ? null : index));
  };

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-50 md:via-white md:to-gray-100">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 rounded-[32px] border border-gray-200 bg-white px-6 py-10 text-center shadow-sm md:px-12 md:py-12">
          <p className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Featured by Shopify twice
          </p>
          <h1 className="mx-auto mb-6 max-w-3xl text-3xl font-bold leading-tight text-gray-900 md:text-5xl">{page.heading}</h1>
          <p className="mx-auto max-w-4xl text-lg leading-8 text-gray-700 md:text-xl">{page.intro}</p>
        </div>

        <div className="mb-12 rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900 md:text-3xl">Seen in the Shopify App Store spotlight</h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-7 text-gray-600 md:text-lg">
            Below are the public App Store screenshots from 2024 and 2026.
          </p>

          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            {page.proofGallery.map(item => (
              <figure key={item.src} className="flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-200 bg-gray-50 shadow-sm">
                <div className="border-b border-gray-200 bg-white px-5 py-4">
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                </div>

                <a href={item.src} target="_blank" rel="noopener noreferrer" className="block bg-white p-3">
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="mx-auto block h-auto w-full rounded-xl"
                    loading="lazy"
                    decoding="async"
                  />
                </a>

                {item.caption && <figcaption className="px-5 py-4 text-sm text-gray-600">{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>

        <div className="mb-12 grid gap-6">
          {page.sections.map(section => (
            <SectionCard key={section.title} section={section} />
          ))}
        </div>

        {page.faq.length > 0 && (
          <div className="mx-auto mb-12 max-w-4xl rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl">Common questions</h2>

            <div className="space-y-4">
              {page.faq.map((item, index) => (
                <div key={item.question} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left text-lg font-semibold text-gray-900 transition hover:bg-gray-100"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`staff-pick-faq-${index}`}
                  >
                    {item.question}
                    <span aria-hidden="true">{openIndex === index ? "-" : "+"}</span>
                  </button>

                  {openIndex === index && (
                    <div id={`staff-pick-faq-${index}`} className="border-t border-gray-200 px-5 py-4">
                      <p className="text-base leading-7 text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-4xl rounded-[32px] border border-gray-200 bg-white p-8 text-center shadow-sm md:p-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">See whether autoBlogger is the right fit</h2>
          <p className="mx-auto mb-6 max-w-3xl text-base leading-7 text-gray-700 md:text-lg">
            If you're thinking about installing autoBlogger, the features, reviews, pricing page, and Shopify App Store listing will give you a clearer picture of how it works and whether it suits your store.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={page.ctaHref || APP_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow transition hover:bg-opacity-90"
            >
              {page.ctaLabel || "View autoBlogger on Shopify"}
            </a>
            <SmartLink to="/reviews" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
              Read merchant reviews
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffPickPage;
