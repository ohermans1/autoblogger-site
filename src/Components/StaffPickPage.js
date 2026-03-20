import React, { useState } from "react";
import { APP_LISTING_URL, getPageByRoute } from "../seo/pageCatalog";
import { SmartLink } from "./SmartLink";

const renderItems = items => {
  if (!items.length) {
    return null;
  }

  return (
    <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

const SectionCard = ({ section }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="mb-3 text-2xl font-semibold text-gray-900">{section.title}</h2>
    <div className="space-y-3 text-gray-700">
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
    <section className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.24em] text-primary">Featured by Shopify twice</p>
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">{page.heading}</h1>

        <p className="mx-auto mb-4 max-w-4xl text-center text-lg text-gray-700">{page.intro}</p>
        <p className="mx-auto mb-10 max-w-4xl text-center text-base text-gray-600">
          Want the fuller picture? Explore the{" "}
          <SmartLink to="/features" className="font-semibold text-primary hover:underline">
            features
          </SmartLink>
          , read the{" "}
          <SmartLink to="/reviews" className="font-semibold text-primary hover:underline">
            merchant reviews
          </SmartLink>
          , and browse the{" "}
          <SmartLink to="/faqs" className="font-semibold text-primary hover:underline">
            FAQs
          </SmartLink>
          .
        </p>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {page.bullets.map(item => (
            <article key={item} className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-base font-medium text-gray-800">{item}</p>
            </article>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900">Seen in the Shopify App Store spotlight</h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-gray-600">
            These screenshots show autoBlogger featured publicly in the Shopify App Store in 2024 and again in 2026.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {page.proofGallery.map(item => (
              <figure key={item.src} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                </div>

                <a href={item.src} target="_blank" rel="noopener noreferrer" className="block bg-white">
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="block h-auto w-full"
                    loading="lazy"
                    decoding="async"
                  />
                </a>

                {item.caption && <figcaption className="px-5 py-4 text-sm text-gray-600">{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {page.sections.map(section => (
            <SectionCard key={section.title} section={section} />
          ))}
        </div>

        {page.faq.length > 0 && (
          <div className="mx-auto mb-12 max-w-3xl">
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">Common questions</h2>

            <div className="space-y-4">
              {page.faq.map((item, index) => (
                <div key={item.question} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-gray-100 px-5 py-4 text-left text-lg font-semibold text-gray-900 transition hover:bg-gray-200"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`staff-pick-faq-${index}`}
                  >
                    {item.question}
                    <span aria-hidden="true">{openIndex === index ? "-" : "+"}</span>
                  </button>

                  {openIndex === index && (
                    <div id={`staff-pick-faq-${index}`} className="border-t border-gray-200 px-5 py-4">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">See why merchants keep shortlisting autoBlogger</h2>
          <p className="mx-auto mb-6 max-w-3xl text-gray-700">
            The Staff Pick history is one useful signal, but it makes the most sense alongside the reviews, features, pricing, and the full Shopify App Store listing.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={page.ctaHref || APP_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow transition hover:bg-opacity-90"
            >
              {page.ctaLabel || "View autoBlogger on Shopify"}
            </a>
            <SmartLink to="/reviews" className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
              Read merchant reviews
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffPickPage;
