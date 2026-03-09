import React from "react";
import { SmartLink } from "./SmartLink";

const ReviewsSection = props => {
  const trimmedLength = 150;
  const fullReviewsLink = "https://apps.shopify.com/autoblogger";

  const reviews = [
    {
      site: "SK8 Clothing",
      link: "https://www.sk8clothing.com/",
      rating: "5 out of 5",
      text: "I can't thank autoBlogger enough for the app. As a busy entrepreneur, I don't have time to create high-quality blog posts constantly, and this makes the workflow much easier."
    },
    {
      site: "Tony's Aussie Prints",
      link: "https://www.tonysaussieprints.com.au/",
      rating: "5 out of 5",
      text: "Simple products tend to win, and autoBlogger keeps publishing straightforward and easy to manage for a store that wants consistent output."
    },
    {
      site: "Capric Clothes",
      link: "https://capriclothes.com/",
      rating: "5 out of 5",
      text: "Helpful for merchants who are not natural blog writers but still need a steady SEO content workflow to support products and collections."
    }
  ];

  return (
    <section className="py-16 md:bg-gradient-to-b md:from-gray-100 md:to-white">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Reviews from Our Happy autoBlogger Users</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Reviews from Our Happy autoBlogger Users</h1>
      )}

      <h4 className="text-2xl font-semibold mb-4 text-center">
        Current Rating: 4.9 out of 5 stars on the{" "}
        <a href={fullReviewsLink} target="_blank" rel="noopener noreferrer" aria-label="Visit the Shopify App Store to read more reviews">
          Shopify App Store
        </a>
      </h4>
      <p className="text-center mb-8">Here are three recent reviews from real merchant stores.</p>
      <p className="max-w-4xl mx-auto text-center text-base text-gray-600 mb-8">
        See how the product lines up with the{" "}
        <SmartLink to="/features" className="text-primary font-semibold hover:underline">
          feature set
        </SmartLink>
        , the{" "}
        <SmartLink to="/pricing" className="text-primary font-semibold hover:underline">
          pricing plans
        </SmartLink>
        , and the{" "}
        <SmartLink to="/free-seo-checklist" className="text-primary font-semibold hover:underline">
          free SEO checklist
        </SmartLink>
        .
      </p>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(review => (
          <article key={review.site} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-2">
              <a href={review.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" aria-label={`Visit ${review.site}`}>
                {review.site}
              </a>
            </h2>
            <p className="text-amber-600 mb-2 font-semibold" aria-label={`${review.rating} rating`}>
              {review.rating}
            </p>
            <p className="text-gray-700">
              {review.text.slice(0, trimmedLength)}
              {review.text.length > trimmedLength ? "..." : ""}
            </p>
          </article>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href={fullReviewsLink} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition" aria-label="Visit the Shopify App Store to read more reviews">
          See full reviews
        </a>
      </div>
    </section>
  );
};

export default ReviewsSection;
