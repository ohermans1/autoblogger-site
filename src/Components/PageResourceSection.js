import React from "react";
import { SmartLink } from "./SmartLink";

function isExternalHref(href = "") {
  return /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(href) || /^(?:mailto|tel):/i.test(href);
}

function ActionLink({ href, label, download, tone = "primary" }) {
  if (!href || !label) {
    return null;
  }

  const isExternal = isExternalHref(href);
  const className =
    tone === "secondary"
      ? "inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition"
      : "inline-flex items-center rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow hover:bg-opacity-90 transition";

  return (
    <SmartLink
      to={href}
      download={download ? true : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={className}
    >
      {label}
    </SmartLink>
  );
}

const ResourceCard = ({ card }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        {card.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{card.eyebrow}</p>}
        <h3 className="mt-2 text-xl font-semibold text-gray-900">{card.title}</h3>
      </div>
      {card.meta && <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">{card.meta}</span>}
    </div>

    {card.description && <p className="mt-3 text-gray-700">{card.description}</p>}

    {card.items.length > 0 && (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
        {card.items.map(item => (
          <li key={`${card.title}-${item}`}>{item}</li>
        ))}
      </ul>
    )}

    <div className="mt-5 flex flex-wrap gap-3">
      <ActionLink href={card.href} label={card.label} download={card.download} />
      <ActionLink href={card.secondaryHref} label={card.secondaryLabel} download={card.secondaryDownload} tone="secondary" />
    </div>
  </article>
);

const PageResourceSection = ({ title = "Resources", intro = "", cards = [] }) => {
  if (!cards.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {intro && <p className="mt-2 text-gray-700">{intro}</p>}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {cards.map(card => (
          <ResourceCard key={`${card.title}-${card.href || card.secondaryHref || "resource"}`} card={card} />
        ))}
      </div>
    </section>
  );
};

export default PageResourceSection;
