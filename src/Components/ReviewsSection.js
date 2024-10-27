import React from "react";

const ReviewsSection = props => {
  const trimmedLength = 150; // Set to the length of the shortest review
  const fullReviewsLink = "https://apps.shopify.com/autoblogger"; // Link to the app store listing

  const reviews = [
    {
      site: "SK8 Clothing",
      link: "https://www.sk8clothing.com/",
      rating: "⭐⭐⭐⭐⭐",
      text: "I can't thank AutoBlogger enough for their amazing app. As a busy entrepreneur, I don't have the time to constantly create high-quality blog posts for my website. But with AutoBlogger, it's so easy and efficient to set up and customize blog posts according to my keywords..."
    },
    {
      site: "Tony's Aussie Prints",
      link: "https://www.tonysaussieprints.com.au/",
      rating: "⭐⭐⭐⭐⭐",
      text: "Simple. They are the best things, simple. This is that and more. autoBlogger make a social autoPoster just as simple n easy..."
    },
    {
      site: "Capric Clothes",
      link: "https://capriclothes.com/",
      rating: "⭐⭐⭐⭐⭐",
      text: "Great app. I am very horrible at writing blogs, but I'm using this to take away that problem that I have..."
    }
  ];

  return (
    <section className="py-10 bg-white md:bg-gray-100">
      {props.home ? (
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Reviews from Our Happy autoBlogger Users</h3>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Reviews from Our Happy autoBlogger Users</h1>
      )}

      <h4 className="text-2xl font-semibold mb-4 text-center">
        Current Rating: 4.6 out of 5 stars on the{" "}
        <a href={fullReviewsLink} aria-label="Visit the Shopify App Store to read more reviews">
          Shopify app store!
        </a>
      </h4>
      <p className="text-center mb-8">Here are 3 of the latest reviews from real users' stores:</p>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-bold mb-2">
              <a href={review.link} className="text-blue-600 hover:underline" aria-label={`Visit ${review.site}`}>
                {review.site}
              </a>
            </h4>
            <p className="text-yellow-500 mb-2">{review.rating}</p>
            <p className="text-gray-700">
              {review.text.slice(0, trimmedLength)}
              {review.text.length > trimmedLength ? "..." : ""}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href={fullReviewsLink} className="bg-primary text-white px-6 py-3 rounded shadow hover:bg-opacity-90 transition" aria-label="Visit the Shopify App Store to read more reviews">
          See full reviews here
        </a>
      </div>
    </section>
  );
};

export default ReviewsSection;
