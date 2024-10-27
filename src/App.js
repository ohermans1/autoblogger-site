import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import PageHeader from "./Components/PageHeader";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import FAQsSection from "./Components/FAQsSection";
import ReviewsSection from "./Components/ReviewsSection";
import ContactSection from "./Components/ContactSection";
import PricingSection from "./Components/PricingSection";
import PrivacyPolicy from "./Components/PrivacyPolicy"; // Import your PrivacyPolicy component
import TermsAndConditions from "./Components/TermsAndConditions"; // Import your TermsAndConditions component
import BacklinkProgramTerms from "./Components/BacklinkProgramTerms"; // Import your BacklinkProgramTerms component

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
                  <FeaturesSection />
                  <PricingSection />
                  <FAQsSection />
                  <ReviewsSection />
                  <ContactSection />
                </>
              }
            />
            <Route path="/features" element={<FeaturesSection />} />
            <Route path="/pricing" element={<PricingSection />} />
            <Route path="/faqs" element={<FAQsSection />} />
            <Route path="/reviews" element={<ReviewsSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/privacy" element={<PrivacyPolicy />} /> {/* Add Privacy Policy Route */}
            <Route path="/terms" element={<TermsAndConditions />} /> {/* Add Terms and Conditions Route */}
            <Route path="/backlink-terms" element={<BacklinkProgramTerms />} /> {/* Add Backlink Program Terms Route */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
