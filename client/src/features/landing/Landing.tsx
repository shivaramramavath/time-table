import FeatureCards from "./FeatureCards";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-neutral-950 dark:bg-[#0b0b0d] dark:text-white">
      <Navbar />
      <HeroSection />
      <FeatureCards />
    </main>
  );
}
