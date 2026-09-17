import React from "react";

const AsSeenOnPage = () => (
  <section className="as-seen-page">
    <div className="as-seen-page__inner">
      <header className="as-seen-page__header">
        <p className="as-seen-page__eyebrow">Recognition &amp; listings</p>
        <h1>As seen on</h1>
        <p>Places where autoBlogger has been listed or recognized.</p>
      </header>

      <div className="as-seen-page__grid">
        <article className="as-seen-page__card">
          <span className="as-seen-page__label">Directory listing</span>
          <h2>Verified on Directree</h2>
          <p>Find autoBlogger on Directree.</p>
          <a href="https://www.directree.io" target="_blank" rel="noopener noreferrer" aria-label="Visit autoBlogger on Directree (opens in a new tab)">
            <img src="https://www.directree.io/badge/directree-badge-lightmode.svg" alt="Verified on Directree" width="200" height="37" loading="lazy" />
          </a>
        </article>

        <article className="as-seen-page__card">
          <span className="as-seen-page__label">Directory listing</span>
          <h2>Approved on SaaSHub</h2>
          <p>Find autoBlogger on SaaSHub.</p>
          <a href="https://www.saashub.com/autoblogger-bot?utm_source=badge&utm_campaign=badge&utm_content=autoblogger-bot&badge_variant=color&badge_kind=approved" target="_blank" rel="noopener noreferrer" aria-label="Visit autoBlogger on SaaSHub (opens in a new tab)">
            <img className="as-seen-page__saashub-image" src="https://cdn-b.saashub.com/img/badges/approved-color.png?v=1" alt="AutoBlogger.bot badge" loading="lazy" />
          </a>
        </article>

        <article className="as-seen-page__card">
          <span className="as-seen-page__label">Shopify recognition</span>
          <h2>Built for Shopify</h2>
          <p>The Built for Shopify badge for autoBlogger.</p>
          <a href="https://apps.shopify.com/autoblogger" target="_blank" rel="noopener noreferrer" aria-label="View autoBlogger on the Shopify App Store (opens in a new tab)">
            <img className="as-seen-page__shopify-image" src="/built-for-shopify-badge.png" alt="autoBlogger is officially Built for Shopify" width="619" height="619" loading="lazy" />
          </a>
        </article>
      </div>
    </div>
  </section>
);

export default AsSeenOnPage;
