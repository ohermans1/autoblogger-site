import React from "react";

const HeroSection = () => {
  const appStoreUrl = "https://apps.shopify.com/autoblogger";
  const demoStoreUrl =
    "https://demo-store-autoblogger.myshopify.com/blogs/news?_bt=BAh7BkkiC19yYWlscwY6BkVUewhJIglkYXRhBjsAVEkiKWRlbW8tc3RvcmUtYXV0b2Jsb2dnZXIubXlzaG9waWZ5LmNvbQY7AEZJIghleHAGOwBUSSIdMjAyNC0xMC0yN1QwNjoyMzozMS41ODNaBjsAVEkiCHB1cgY7AFRJIh5wZXJtYW5lbnRfcGFzc3dvcmRfYnlwYXNzBjsARg%3D%3D--2f4db89014f23a8bae51292bf1585876f495ebff";

  return (
    <section className="text-center py-24 bg-gradient-to-r from-gray-50 to-white relative">
      {/* Optional logo here */}
      {/* <img src="path_to_logo" alt="autoBlogger Logo" className="mx-auto mb-4" /> */}

      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-800">
        Welcome to{" "}
        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-primary no-underline" aria-label="Visit autoBlogger on Shopify">
          autoBlogger
        </a>{" "}
        - Your AI Solution for Effortless Blogging
      </h1>

      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-700">
        Transform Your{" "}
        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-primary no-underline" aria-label="Visit Shopify">
          Shopify
        </a>{" "}
        Blogging Experience
      </h2>
      <p className="mb-6 text-lg md:text-xl text-gray-600">autoBlogger automates your content creation, allowing you to focus on what truly matters.</p>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-8 py-4 rounded shadow hover:shadow-lg transform hover:-translate-y-1 transition w-full md:w-auto"
          aria-label="Get started with autoBlogger on the Shopify App Store"
        >
          Start your 14-day free trial
        </a>
        <a
          href={demoStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-primary text-primary px-8 py-4 rounded shadow hover:bg-gray-200 transform hover:-translate-y-1 transition w-full md:w-auto"
          aria-label="View the autoBlogger demo store"
        >
          View Demo Store
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
