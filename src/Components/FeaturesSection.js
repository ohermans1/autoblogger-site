import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing an icon

const FeaturesSection = props => {
  const appStoreUrl = "https://apps.shopify.com/autoblogger"; // Update with actual URL
  const mediumBlogUrl = "https://medium.com/@ohermans1"; // Update with actual Medium blog URL

  const features = [
    { title: "Set and Forget", description: "Automatically generate and publish up to 7 high-quality blogs per week." },
    { title: "SEO-Friendly", description: "Automatically create SEO-optimised content complete with HTML, metadata, and on-page SEO." },
    { title: "Easy Blog Management", description: "Effortlessly plan, add, delete, and reorder your upcoming blogs." },
    { title: "Seamless Integration", description: "Blogs integrate flawlessly with your Shopify store's interface." },
    { title: "Backlink Program", description: "Opt in for free backlinks from fellow autoBlogger users’ stores to enhance your SEO exposure." },
    { title: "Customisation", description: "Easily tweak or edit published articles directly within Shopify’s blog interface." },
    { title: "Direct Developer Contact and Friendly Support", description: "Get in touch with me, Ollie (the developer and owner), if you encounter any issues or need assistance." },
    {
      title: "Free Medium Spotlight Articles",
      description: (
        <span>
          Opt in to feature your store on our{" "}
          <a href={mediumBlogUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            Medium blog
          </a>
          , gaining additional backlinks and exposure.
        </span>
      )
    },
    {
      title: "Available in Most Languages",
      description: (
        <span>
          Check out the{" "}
          <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            app listing
          </a>{" "}
          for a complete list.
        </span>
      )
    },
    { title: "14-Day Free Trial", description: "Enjoy a no-obligation 14-day free trial to explore all features and see how autoBlogger can transform your blogging experience." }
  ];

  return (
    <section id="features" className="py-16 bg-white md:bg-gradient-to-r md:from-gray-100 md:to-white">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Discover the Powerful Features of autoBlogger</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Discover the Powerful Features of autoBlogger</h1>
      )}
      <div className="max-w-3xl mx-auto">
        <ul className="list-disc list-inside space-y-6 text-lg text-gray-700">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-4">
              <span className="text-primary text-2xl">
                <FaCheckCircle />
              </span>
              <span>
                <strong>{feature.title}:</strong> {feature.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center mt-8">
        <a href={appStoreUrl} className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition" aria-label="Get started with autoBlogger">
          Start Your Free Trial Now!
        </a>
      </div>
    </section>
  );
};

export default FeaturesSection;
