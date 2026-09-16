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
    },
    {
      site: "OCL",
      link: "https://apps.shopify.com/autoblogger/reviews?ratings%5B%5D=5",
      rating: "5 out of 5",
      text: "It's made it much easier for us to publish good SEO content consistently without it becoming another huge workload. We're seeing steady organic traffic, better indexing, and sales directly from the content."
    },
    {
      site: "Rhia Janta-Cooper Fine Art",
      link: "https://apps.shopify.com/autoblogger/reviews?ratings%5B%5D=5",
      rating: "5 out of 5",
      text: "The software writes insightful articles about my artworks and manages complex, diverse, and engaging blog content with ease. It uses links to my older blogs and artworks."
    },
    {
      site: "JR Colombian Emeralds",
      link: "https://apps.shopify.com/autoblogger/reviews?ratings%5B%5D=5",
      rating: "5 out of 5",
      text: "The app has saved us a tremendous amount of time creating SEO-friendly content. The AI-generated blogs are well-written, easy to customize, and have streamlined our content strategy."
    },
    {
      site: "The Packaging Club",
      link: "https://apps.shopify.com/autoblogger/reviews?ratings%5B%5D=5&page=2",
      rating: "5 out of 5",
      text: "Fantastic blog generation tool. Articles are well written and very well structured, and I've only scratched the surface of training it on keywords and topic direction."
    },
    {
      site: "Jamie Clarke Counselling",
      link: "https://apps.shopify.com/autoblogger/reviews?ratings%5B%5D=5&page=2",
      rating: "5 out of 5",
      text: "Automatically creates relevant blogs for my website and publishes them to Facebook and LinkedIn. It has saved me hours of work, and support is great at answering questions."
    },
    {
      site: "Rakaposhi Organics",
      link: "https://apps.shopify.com/autoblogger/reviews?ratings%5B%5D=5&page=2",
      rating: "5 out of 5",
      text: "Generating high-quality, SEO-optimized blog posts with high customization, all hands-off. The content feels natural and includes images, FAQs, product links, and social sharing."
    }
  ];
  const displayedReviews = props.home ? reviews.slice(3, 6) : reviews;

  return (
    <section className="content-section content-section--tint reviews-section">
      {props.home ? (
        <h2 className="section-title">Good words from busy merchants</h2>
      ) : (
        <h1 className="section-title">Latest autoBlogger Reviews from Shopify Merchants</h1>
      )}

      <h4 className="rating-line">
        <span aria-hidden="true">★★★★★</span> 4.9 out of 5 on the{" "}
        <a href={fullReviewsLink} target="_blank" rel="noopener noreferrer" aria-label="Visit the Shopify App Store to read more reviews">
          Shopify App Store
        </a>
      </h4>
      <p className="section-lead">Real feedback from merchants building a more consistent content workflow.</p>
      {!props.home && <p className="section-supporting">
        See how the product lines up with the{" "}
        <SmartLink to="/2x-staff-pick" className="text-primary font-semibold hover:underline">
          2x Shopify Staff Pick proof
        </SmartLink>
        , the{" "}
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
      </p>}

      <div className="review-grid">
        {displayedReviews.map(review => (
          <article key={review.site} className="review-card">
            <span className="review-card__quote" aria-hidden="true">“</span>
            <h2 className="text-lg font-bold mb-2">
              <a href={review.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" aria-label={`Visit ${review.site}`}>
                {review.site}
              </a>
            </h2>
            <p className="review-card__stars" aria-label={`${review.rating} rating`}>
              ★★★★★
            </p>
            <p className="text-gray-700">
              {review.text.slice(0, trimmedLength)}
              {review.text.length > trimmedLength ? "..." : ""}
            </p>
          </article>
        ))}
      </div>

      <div className="section-action">
        <a href={fullReviewsLink} target="_blank" rel="noopener noreferrer" className="button-secondary" aria-label="Visit the Shopify App Store to read more reviews">
          See full reviews
        </a>
      </div>
    </section>
  );
};

export default ReviewsSection;
