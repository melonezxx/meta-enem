import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SubjectsSection from "@/components/landing/SubjectsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <SubjectsSection />
      <TestimonialsSection />
      <PricingSection />
      <LandingFooter />
    </main>
  );
}
