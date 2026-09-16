import React from "react";
import { FiArrowRight, FiEdit3, FiLayers, FiSend } from "react-icons/fi";
import { SmartLink } from "./SmartLink";

const steps = [
  { icon: FiLayers, number: "01", title: "Give it your direction", description: "Choose topics, products, keywords, and the publishing pace that suits your store." },
  { icon: FiEdit3, number: "02", title: "Get store-ready articles", description: "autoBlogger creates structured posts with metadata, imagery, FAQs, and relevant product links." },
  { icon: FiSend, number: "03", title: "Keep your blog moving", description: "Schedule posts to publish in Shopify. Review or edit your content whenever you want." }
];

const HowItWorksSection = () => (
  <section className="how-section" aria-labelledby="how-heading">
    <div className="how-section__inner">
      <div className="how-section__intro">
        <span className="section-kicker">THE WAY IT WORKS</span>
        <h2 id="how-heading">From a blank blog to a <em>publishing rhythm.</em></h2>
        <p>More than an AI writer: the original autoBlogger handles the work from your next idea to a published Shopify article.</p>
        <SmartLink to="/features" className="text-link">See all features <FiArrowRight aria-hidden="true" /></SmartLink>
      </div>
      <div className="how-steps">
        {steps.map(({ icon: Icon, number, title, description }) => (
          <article className="how-step" key={number}>
            <span className="how-step__icon"><Icon aria-hidden="true" /></span>
            <span className="how-step__number">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
