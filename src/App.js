import React, { useState, useEffect } from "react";
import { HashRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageHeader from "./Components/PageHeader";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import FAQsSection from "./Components/FAQsSection";
import ReviewsSection from "./Components/ReviewsSection";
import ContactSection from "./Components/ContactSection";
import SEOChecklist from "./Components/SEOChecklist";
import PricingSection from "./Components/PricingSection";
import PrivacyPolicy from "./Components/PrivacyPolicy"; // Import your PrivacyPolicy component
import TermsAndConditions from "./Components/TermsAndConditions"; // Import your TermsAndConditions component
import BacklinkProgramTerms from "./Components/BacklinkProgramTerms"; // Import your BacklinkProgramTerms component
import PremiumExtras from "./Components/PremiumExtras";
import AutoSchemaTerms from "./Components/AutoSchemaTerms";
import AutoSchemaPrivacy from "./Components/AutoSchemaPrivacy";
import OtherAppsSection from "./Components/OtherAppsSection";
import SeoManager from "./Components/SeoManager";
import NotFoundPage from "./Components/NotFoundPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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

        {/* Main Content */}
        <main className="px-5 mt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <FeaturesSection home={true} />
                  <PricingSection home={true} />
                  <FAQsSection home={true} />
                  <ReviewsSection home={true} />
                  <ContactSection home={true} />
                  <OtherAppsSection home={true} />
                </>
              }
            />
            <Route path="/features" element={<FeaturesSection />} />
            <Route path="/pricing" element={<PricingSection />} />
            <Route path="/other-apps" element={<OtherAppsSection />} />
            <Route path="/faqs" element={<FAQsSection />} />
            <Route path="/reviews" element={<ReviewsSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/seo-checklist" element={<Navigate to="/free-seo-checklist" replace />} />
            <Route path="/free-seo-checklist" element={<SEOChecklist />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/autoschema-terms" element={<AutoSchemaTerms />} />
            <Route path="/autoschema-privacy" element={<AutoSchemaPrivacy />} />
            <Route path="/backlink-terms" element={<BacklinkProgramTerms />} />
            <Route path="/premium-extras" element={<PremiumExtras />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
