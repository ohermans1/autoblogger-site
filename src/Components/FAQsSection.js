import React, { useState } from "react";
import { obfuscateEmail } from "../Utils/helpers"; // Adjust path as necessary

const FAQsSection = props => {
  // State to manage which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);

  // Use the obfuscateEmail function to get the obfuscated email and mailto link
  const { email: supportEmail, mailto: supportMailto } = obfuscateEmail("support", "autoblogger.bot");

  // Sample FAQs data
  const faqs = [
    {
      question: "What is autoBlogger?",
      answer: "autoBlogger is a fully automated blog creation tool that uses AI to generate SEO-friendly content for your Shopify store."
    },
    {
      question: "How does the 14-day free trial work?",
      answer: "You can sign up for a 14-day free trial of autoBlogger with no obligation. After the trial, you can choose to continue using the service or cancel it."
    },
    {
      question: "How long does it take to set up autoBlogger?",
      answer: "Setting up autoBlogger should take only a few minutes, after which it will operate fully automated."
    },
    {
      question: "How many articles can I expect each week?",
      answer: "autoBlogger can generate and publish up to 7 articles per week, keeping your blog fresh and engaging."
    },
    {
      question: "What kind of content does autoBlogger create?",
      answer: "autoBlogger generates high-quality blog posts that are SEO-optimised, including HTML, metadata, and on-page SEO elements."
    },
    {
      question: "What AI model does autoBlogger use?",
      answer: "autoBlogger is continuously updated to utilise the most advanced AI models. Currently, it uses GPT-4."
    },
    {
      question: "Can I customise the articles generated by autoBlogger?",
      answer: "Absolutely! You can easily tweak or edit published articles directly in Shopify’s blog interface."
    },
    {
      question: "What is the Backlink Program?",
      answer: "By opting into our Backlink Program, you can receive free backlinks from other autoBlogger users’ stores to enhance your SEO exposure."
    },
    {
      question: "Is autoBlogger available in multiple languages?",
      answer:
        "Yes, autoBlogger supports multiple languages. Please check the <a href='https://apps.shopify.com/autoblogger' target='_blank' rel='noopener noreferrer' class='text-blue-500 underline'>app listing</a> for a complete list."
    },
    {
      question: "What platforms is autoBlogger currently available on?",
      answer: "autoBlogger is currently available on Shopify, and with limited features on Wix."
    },
    {
      question: "How do I install and set up autoBlogger?",
      answer:
        "You can easily install autoBlogger from the <a href='https://apps.shopify.com/autoblogger' target='_blank' rel='noopener noreferrer' class='text-blue-500 underline'>Shopify App Store</a>. After installation, follow our step-by-step setup guide to get started quickly."
    },
    {
      question: "How does autoBlogger ensure the quality of the generated content?",
      answer: "autoBlogger employs advanced AI algorithms to create high-quality, relevant content. Additionally, you have the option to review and edit all posts before they are published."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, Shopify manages all payments and subscriptions, allowing you to cancel at any time in accordance with their general policies."
    },
    {
      question: "Tell me more about the free spotlight articles on Medium.",
      answer: (
        <>
          The free spotlight articles are an additional service I offer at no charge for autoBlogger users to further boost their backlinks and online exposure. Simply contact me at{" "}
          <a href={supportMailto} className="text-blue-500 underline">
            {supportEmail}
          </a>
          , or check them out on our{" "}
          <a href="https://medium.com/@ohermans1" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Medium page
          </a>
          .
        </>
      )
    },
    {
      question: "How do I contact support?",
      answer: (
        <>
          You can easily reach me, Ollie (the developer and owner), at{" "}
          <a href={supportMailto} className="text-blue-500 underline">
            {supportEmail}
          </a>
          .
        </>
      )
    },
    {
      question: "I have ideas to improve the app; who can I contact?",
      answer: (
        <>
          I'd love to hear your feedback! Please reach out directly to me, Ollie, at{" "}
          <a href={supportMailto} className="text-blue-500 underline">
            {supportEmail}
          </a>
          .
        </>
      )
    },
    {
      question: "What is the pricing for autoBlogger after the free trial?",
      answer:
        "After your 14-day free trial, autoBlogger offers a subscription plan at competitive rates. Please check our <a href='https://apps.shopify.com/autoblogger' target='_blank' rel='noopener noreferrer' class='text-blue-500 underline'>app listing</a> for detailed pricing information."
    },
    {
      question: "How does autoBlogger handle my data and privacy?",
      answer: "We take data security seriously. autoBlogger complies with data protection regulations and ensures that your information is kept secure."
    },
    {
      question: "What is SEO?",
      answer:
        "SEO, or Search Engine Optimisation, is the practice of improving your website's visibility in search engine results, making it easier for potential customers to find your site through organic search."
    },
    {
      question: "How can blogs help with SEO?",
      answer:
        "Blogs can significantly enhance your SEO by providing fresh, relevant content that search engines favour. They help increase your site's keyword diversity and can attract backlinks, boosting your site's authority. autoBlogger automates this entire process, ensuring that you receive consistently generated articles."
    },
    {
      question: "What are other strategies I can implement for better SEO?",
      answer:
        "Blogging is just one piece of the puzzle. In addition to blogging, consider optimising your website's structure, using relevant keywords, improving page load speed, enhancing mobile responsiveness, and building quality backlinks to improve your overall SEO performance."
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
        <p className="text-lg text-gray-700 mb-6">Find answers to your most common questions below:</p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded shadow">
              <button
                className="flex justify-between items-center w-full p-4 text-left text-lg font-semibold text-gray-800 bg-gray-200 rounded hover:bg-gray-300 transition"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
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
