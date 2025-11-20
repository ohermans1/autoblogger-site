import React from "react";

const OtherAppsSection = props => {
  const apps = [
    {
      key: "autollms",
      name: "autoLLMs",
      logo: "/autollms-logo.png", // public folder
      description: "Create and maintain an LLMs.txt so AI tools can easily read and index your store. Simple, automated, SEO-friendly.",
      cta: {
        href: "https://apps.shopify.com/autollm",
        label: "View on Shopify App Store"
      },
      comingSoon: false
    },
    {
      key: "autoschema",
      name: "autoSchema",
      logo: "/autoschema-logo.png", // public folder
      description: "Automatically add Google-friendly structured data (schema) to your store for richer search results and improved SEO.",
      cta: {
        href: "https://apps.shopify.com/autoschema-google-structures",
        label: "View on Shopify App Store"
      },
      comingSoon: false
    }
  ];

  return (
    <section id="other-apps" className="py-16 md:bg-gradient-to-b md:from-white md:to-gray-100">
      {props.home ? <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Other Apps</h3> : <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Other Apps</h1>}

      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map(app => (
          <article key={app.key} className="bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {/* Logo or fallback */}
                <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden text-gray-500 font-bold">
                  {app.logo ? (
                    <img src={app.logo} alt={`${app.name} logo`} className="h-10 w-10 object-contain" loading="lazy" />
                  ) : (
                    <span className="text-sm">AE</span> // fallback initials
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{app.name}</h2>
              </div>

              {app.comingSoon && <span className="inline-flex items-center rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700">Coming soon</span>}
            </div>

            <p className="text-gray-700 mb-6">{app.description}</p>

            <div className="mt-auto">
              {app.cta ? (
                <a
                  href={app.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                  aria-label={`${app.name} – ${app.cta.label}`}
                >
                  {app.cta.label}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed"
                  aria-disabled="true"
                  title="Coming soon"
                >
                  Coming soon
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OtherAppsSection;
