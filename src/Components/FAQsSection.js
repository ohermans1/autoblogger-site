import React, { useState } from "react";
import { obfuscateEmail } from "../Utils/helpers";
import { SmartLink } from "./SmartLink";

const FAQsSection = props => {
  const [openIndex, setOpenIndex] = useState(null);
  const { email: supportEmail, mailto: supportMailto } = obfuscateEmail("support", "autoblogger.bot");

  const faqs = [
    {
      question: "What is autoBlogger?",
      answer: "autoBlogger is a Shopify app that automates SEO blog publishing to help build topical authority, improve product discovery, and drive organic traffic."
    },
    {
      question: "What does 2x Shopify Staff Pick mean?",
      answer: (
        <>
          autoBlogger has been selected as a Shopify Staff Pick twice, highlighting quality, merchant value, and platform fit. See the{" "}
          <SmartLink to="/2x-staff-pick" className="text-primary underline">
            public proof page
          </SmartLink>{" "}
          for the 2024 and 2026 screenshots.
        </>
      )
    },
    {
      question: "How does the 14-day free trial work?",
      answer: "Install from the Shopify App Store and start a 14-day trial. There is no ongoing free plan, so after trial end you can continue on Starter, Growth, or Pro, or cancel."
    },
    {
      question: "How long does setup take?",
      answer: "Most stores can complete setup in a few minutes, then run publishing on autopilot."
    },
    {
      question: "How many articles are published on each plan?",
      answer: "Starter publishes one SEO blog each week, Growth publishes three per week, and Pro publishes daily."
    },
    {
      question: "What does each generated article include?",
      answer: "Posts include optimised HTML, metadata, overviews, FAQs, table of contents, internal product links, and relevant imagery."
    },
    {
      question: "Can I edit content before or after publishing?",
      answer: "Yes. You can edit posts directly inside Shopify at any time."
    },
    {
      question: "Does autoBlogger support social sharing?",
      answer: "Yes. Automatic social sharing is included on Growth and Pro plans."
    },
    {
      question: "What AI model is used?",
      answer: "Growth and Pro include an advanced ChatGPT-5.2 AI model."
    },
    {
      question: "What is the Backlink Program?",
      answer: "The Backlink Program is an optional network that helps participating stores strengthen search authority through relevant backlink opportunities."
    },
    {
      question: "What does autoBlogger work with?",
      answer: "autoBlogger works with Shopify Admin, ChatGPT, AI Backlinks, Facebook, Instagram, and Unsplash."
    },
    {
      question: "Which languages are supported?",
      answer:
        "autoBlogger supports a broad set of languages including English, Chinese (Simplified and Traditional), major European and Asian languages, plus many regional languages. See the app listing for the full and latest language set."
    },
    {
      question: "What is the pricing after the trial?",
      answer: (
        <>
          Starter is $9.95/month (or $99.95/year), Growth is $19.95/month (or $199.95/year), and Pro is $29.95/month (or $299.95/year). See the{" "}
          <a href="https://apps.shopify.com/autoblogger" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            app listing
          </a>{" "}
          for the latest details.
        </>
      )
    },
    {
      question: "Can I cancel at any time?",
      answer: "Yes. Billing is managed through Shopify, and you can cancel according to Shopify's subscription policies."
    },
    {
      question: "How do I contact support?",
      answer: (
        <>
          Email Ollie (developer and owner) at{" "}
          <a href={supportMailto} className="text-primary underline">
            {supportEmail}
          </a>
          .
        </>
      )
    }
  ];

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions about autoBlogger</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions about autoBlogger</h1>
      )}

      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-700 mb-6">Find answers to the most common setup, content, and plan questions below.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded shadow">
              <button
                className="flex justify-between items-center w-full p-4 text-left text-lg font-semibold text-gray-800 bg-gray-200 rounded hover:bg-gray-300 transition"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                {faq.question}
                <span aria-hidden="true">{openIndex === index ? "-" : "+"}</span>
              </button>

              {openIndex === index && (
                <div id={`faq-panel-${index}`} className="p-4 border-t border-gray-200">
                  {typeof faq.answer === "string" ? <p className="text-gray-700">{faq.answer}</p> : <div className="text-gray-700">{faq.answer}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
