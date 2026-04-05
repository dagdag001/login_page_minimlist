import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { Destinations } from "../components/landing/Destinations";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Testimonials } from "../components/landing/Testimonials";
import { CTABanner } from "../components/landing/CTABanner";
import { Footer } from "../components/landing/Footer";

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
        <Features />
        <Destinations />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
