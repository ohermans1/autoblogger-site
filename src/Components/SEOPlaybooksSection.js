import React from "react";
import { SmartLink } from "./SmartLink";

const solutionPages = [
  {
    href: "/shopify-seo/ai-blog-automation",
    title: "Shopify AI Blog Automation",
    description: "Build a repeatable weekly publishing workflow tied to product and collection demand."
  },
  {
    href: "/shopify-seo/internal-linking-for-products",
    title: "Shopify Internal Linking Blueprint",
    description: "Route blog authority to commercial pages with consistent anchor and target rules."
  },
  {
    href: "/ecommerce-seo/schema-and-faq-rollout",
    title: "Schema and FAQ Rollout",
    description: "Deploy structured data in controlled phases and monitor enhancement coverage."
  },
  {
    href: "/wix-seo/ai-content-ops-playbook",
    title: "Wix SEO Content Ops",
    description: "Run a weekly operating rhythm for publishing, metadata QA, and lead-focused linking."
  },
  {
    href: "/shopify-seo/collection-page-content-plan",
    title: "Shopify Collection Content Plan",
    description: "Strengthen category pages with support content, FAQ blocks, and cleaner internal linking."
  },
  {
    href: "/ecommerce-seo/seasonal-content-calendar",
    title: "Seasonal SEO Content Calendar",
    description: "Publish ahead of demand spikes with a calendar built around merchandising and search intent."
  }
];

const comparisonPages = [
  {
    href: "/shopify-seo/shopify-blog-automation-software-guide",
    title: "Shopify Blog Automation Software Guide",
    description: "Use a buyer-focused checklist for software evaluation instead of comparing tools on features alone."
  },
  {
    href: "/shopify-seo/autoblogger-vs-manual-shopify-blogging",
    title: "autoBlogger vs Manual Blogging",
    description: "Compare automated and manual Shopify blogging across speed, QA discipline, and revenue support."
  },
  {
    href: "/shopify-seo/shopify-seo-blogging-app-comparison",
    title: "Shopify Blogging App Comparison",
    description: "Review the criteria that matter most when comparing SEO blogging tools for Shopify."
  }
];

const resourcePages = [
  { href: "/resources/shopify-seo-content-brief-template", label: "Content Brief Template" },
  { href: "/resources/internal-linking-blueprint", label: "Internal Linking Blueprint" },
  { href: "/resources/schema-qa-checklist", label: "Schema QA Checklist" },
  { href: "/resources/ecommerce-seo-roi-calculator", label: "SEO ROI Calculator Framework" },
  { href: "/resources/ctr-title-test-sheet", label: "CTR Title Test Sheet" },
  { href: "/resources/content-refresh-checklist", label: "Content Refresh Checklist" },
  { href: "/resources/shopify-blog-qa-checklist", label: "Shopify Blog QA Checklist" }
];

const trustSignals = ["2x Shopify Staff Pick", "4.9 out of 5 app rating", "14-day free trial"];

const SEOPlaybooksSection = props => {
  const heading = props.home ? (
    <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">SEO Playbooks and Resources</h3>
  ) : (
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">SEO Playbooks and Resources</h1>
  );

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      {heading}

      <p className="max-w-4xl mx-auto text-center text-lg text-gray-700 mb-8">
        Use these intent-focused SEO playbooks and free resource pages to implement faster, strengthen internal linking, and convert more organic traffic. You can browse the full
        libraries through the{" "}
        <SmartLink to="/solutions" className="text-primary font-semibold hover:underline">
          SEO solutions hub
        </SmartLink>{" "}
        and{" "}
        <SmartLink to="/resources" className="text-primary font-semibold hover:underline">
          free resource library
        </SmartLink>
        .
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {solutionPages.map(item => (
          <article key={item.href} className="bg-white border border-gray-200 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <SmartLink to={item.href} className="text-primary font-semibold hover:underline" aria-label={`Open ${item.title} playbook`}>
              Open Playbook
            </SmartLink>
          </article>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Bottom-of-Funnel Comparison Pages</h2>
          <p className="text-gray-700 mb-5">
            These pages are built for visitors already evaluating workflow options, SEO blogging tools, or the tradeoff between manual and automated publishing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {comparisonPages.map(item => (
              <article key={item.href} className="rounded-lg border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <SmartLink to={item.href} className="text-primary font-semibold hover:underline" aria-label={`Open ${item.title}`}>
                  Open Comparison Page
                </SmartLink>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Free SEO Resource Assets</h2>
        <p className="text-gray-700 mb-4">
          Linkable templates and frameworks built for ecommerce SEO teams. These assets are designed for planning, QA, and reporting workflows.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          {resourcePages.map(item => (
            <SmartLink key={item.href} to={item.href} className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-gray-700 hover:border-primary hover:text-primary transition">
              {item.label}
            </SmartLink>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {trustSignals.map(signal => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
          <div className="md:text-right">
            <a href="https://apps.shopify.com/autoblogger" className="inline-block bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition">
              Start 14-Day Free Trial
            </a>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <SmartLink to="/solutions" className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-gray-700 hover:border-primary hover:text-primary transition">
            Browse All Playbooks
          </SmartLink>
          <SmartLink to="/resources" className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-gray-700 hover:border-primary hover:text-primary transition">
            Browse All Resources
          </SmartLink>
        </div>
      </div>
    </section>
  );
};

export default SEOPlaybooksSection;
