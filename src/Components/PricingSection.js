import React from "react";

// Define the theme color as a Tailwind class
const themeColor = "bg-primary text-white"; // Tailwind will apply your custom primary color

// Define the pricing plan data
const pricingPlans = [
  {
    title: "1 Blog Per Week",
    price: "$9.99 / month",
    features: ["One blog per week.", "Set and forget - one-step setup.", "SEO-optimized content.", "A related image per blog.", "Access to the backlink program."]
  },
  {
    title: "3 Blogs Per Week",
    price: "$13.99 / month",
    features: ["Three blogs per week.", "Set and forget - one-step setup.", "SEO-optimized content.", "A related image per blog.", "Access to the backlink program."]
  },
  {
    title: "7 Blogs Per Week",
    price: "$24.99 / month",
    features: ["A fresh blog every day!", "Set and forget - one-step setup.", "SEO-optimized content.", "A related image per blog.", "Access to the backlink program."]
  }
];

const PricingSection = props => {
  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Affordable Pricing Plans for autoBlogger</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Affordable Pricing Plans for autoBlogger</h1>
      )}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg">
            <div className={`${themeColor} p-6 text-center rounded-t-lg`}>
              <h4 className="text-xl font-bold mb-2">{plan.title}</h4>
              <p className="text-2xl font-semibold">{plan.price}</p>
            </div>
            <div className="p-6 text-center">
              {plan.features.map((feature, i) => (
                <p key={i} className="mb-4">
                  {feature}
                </p>
              ))}
              <p className="font-light text-gray-600">14-day free trial</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href={"https://apps.shopify.com/autoblogger"} className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition" aria-label="Get started with autoBlogger">
          Start Your Free Trial Now!
        </a>
      </div>
    </section>
  );
};

export default PricingSection;
