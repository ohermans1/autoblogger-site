import React, { lazy, Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageHeader from "./Components/PageHeader";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import SeoManager from "./Components/SeoManager";
import NotFoundPage from "./Components/NotFoundPage";
import { STATIC_SEO_PAGES } from "./seo/pageCatalog";

const FeaturesSection = lazy(() => import("./Components/FeaturesSection"));
const FAQsSection = lazy(() => import("./Components/FAQsSection"));
const ReviewsSection = lazy(() => import("./Components/ReviewsSection"));
const ContactSection = lazy(() => import("./Components/ContactSection"));
const SEOChecklist = lazy(() => import("./Components/SEOChecklist"));
const PricingSection = lazy(() => import("./Components/PricingSection"));
const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./Components/TermsAndConditions"));
const BacklinkProgramTerms = lazy(() => import("./Components/BacklinkProgramTerms"));
const PremiumExtras = lazy(() => import("./Components/PremiumExtras"));
const AutoSchemaTerms = lazy(() => import("./Components/AutoSchemaTerms"));
const AutoSchemaPrivacy = lazy(() => import("./Components/AutoSchemaPrivacy"));
const OtherAppsSection = lazy(() => import("./Components/OtherAppsSection"));
const SEOPlaybooksSection = lazy(() => import("./Components/SEOPlaybooksSection"));
const SeoLandingPage = lazy(() => import("./Components/SeoLandingPage"));

const CUSTOM_ROUTE_PATHS = new Set([
  "/features",
  "/pricing",
  "/other-apps",
  "/faqs",
  "/reviews",
  "/contact",
  "/free-seo-checklist",
  "/seo-checklist",
  "/privacy",
  "/terms",
  "/autoschema-terms",
  "/autoschema-privacy",
  "/backlink-terms",
  "/premium-extras"
]);

const generatedRoutePages = STATIC_SEO_PAGES.filter(page => !CUSTOM_ROUTE_PATHS.has(page.route));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent || "")) return;

    try {
      window.scrollTo(0, 0);
    } catch (_error) {
      // no-op for environments where scroll APIs are not implemented
    }
  }, [pathname]);

  return null;
};

const SectionFallback = () => <section className="py-10" aria-hidden="true" />;

const lazySection = element => <Suspense fallback={<SectionFallback />}>{element}</Suspense>;

const App = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <ScrollToTop />
      <SeoManager />
      <div className="font-sans text-gray-800 bg-white">
        <PageHeader toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

        <main className="px-5 mt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  {lazySection(<FeaturesSection home={true} />)}
                  {lazySection(<PricingSection home={true} />)}
                  {lazySection(<FAQsSection home={true} />)}
                  {lazySection(<ReviewsSection home={true} />)}
                  {lazySection(<SEOPlaybooksSection home={true} />)}
                  {lazySection(<ContactSection home={true} />)}
                  {lazySection(<OtherAppsSection home={true} />)}
                </>
              }
            />
            <Route path="/features" element={lazySection(<FeaturesSection />)} />
            <Route path="/pricing" element={lazySection(<PricingSection />)} />
            <Route path="/other-apps" element={lazySection(<OtherAppsSection />)} />
            <Route path="/faqs" element={lazySection(<FAQsSection />)} />
            <Route path="/reviews" element={lazySection(<ReviewsSection />)} />
            <Route path="/contact" element={lazySection(<ContactSection />)} />
            <Route path="/seo-checklist" element={<Navigate to="/free-seo-checklist" replace />} />
            <Route path="/free-seo-checklist" element={lazySection(<SEOChecklist />)} />
            <Route path="/privacy" element={lazySection(<PrivacyPolicy />)} />
            <Route path="/terms" element={lazySection(<TermsAndConditions />)} />
            <Route path="/autoschema-terms" element={lazySection(<AutoSchemaTerms />)} />
            <Route path="/autoschema-privacy" element={lazySection(<AutoSchemaPrivacy />)} />
            <Route path="/backlink-terms" element={lazySection(<BacklinkProgramTerms />)} />
            <Route path="/premium-extras" element={lazySection(<PremiumExtras />)} />
            {generatedRoutePages.map(page => (
              <Route key={page.route} path={page.route} element={lazySection(<SeoLandingPage page={page} />)} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
