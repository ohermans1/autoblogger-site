import React from "react";
import { obfuscateEmail } from "../Utils/helpers"; // Adjust path as necessary

const ContactSection = () => {
  // Use helper function to get obfuscated email and mailto link
  const { email, mailto } = obfuscateEmail("support", "autoblogger.bot");

  return (
    <section className="py-10 bg-gray-100">
      <h3 className="text-2xl font-semibold mb-8 text-center">Contact Us</h3>
      <p className="text-center text-gray-700 mb-6">If you have any questions, feel free to reach out. We’d love to hear from you!</p>

      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-lg text-gray-800">
          You can reach us at:{" "}
          <a href={mailto} className="text-primary font-semibold hover:underline">
            {email}
          </a>
        </p>
      </div>

      <div className="text-center mt-8">
        <a
          href="https://apps.shopify.com/autoblogger"
          className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition"
          aria-label="Explore autoBlogger on the Shopify App Store"
        >
          Discover More About autoBlogger on the Shopify App Store!
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
