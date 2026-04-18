import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { RecommendationEngine } from "../components/landing/RecommendationEngine";
import { Destinations } from "../components/landing/Destinations";
import { SurpriseMeGenerator } from "../components/landing/SurpriseMeGenerator";
import { TravelPackages } from "../components/landing/TravelPackages";
import { SpecialOffers } from "../components/landing/SpecialOffers";
import { Testimonials } from "../components/landing/Testimonials";
import { UserReviews } from "../components/landing/UserReviews";
import { FAQ } from "../components/landing/FAQ";
import { CTABanner } from "../components/landing/CTABanner";
import { Footer } from "../components/landing/Footer";
import { AITravelAssistant } from "../components/landing/AITravelAssistant";

export function LandingPage() {
  useDocumentTitle("TourismHub - Discover Your Next Adventure");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-orange-100">
      <a href="#main-content" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg">
        Skip to content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div id="features-section">
          <Features />
        </div>
        <RecommendationEngine />
        <div id="destinations-section">
          <Destinations />
        </div>
        <SurpriseMeGenerator />
        <div id="packages-section">
          <TravelPackages />
        </div>
        <SpecialOffers />
        <Testimonials />
        <div id="reviews-section">
          <UserReviews />
        </div>
        <div id="faq-section">
          <FAQ />
        </div>
        <CTABanner />
      </main>

      <Footer />
      
      {/* AI Chatbot - Floating Button */}
      <AITravelAssistant />
    </div>
  );
}
