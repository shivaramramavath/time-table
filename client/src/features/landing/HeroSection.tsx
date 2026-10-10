import HeroContent from "./HeroContent";
import HeroPreview from "./HeroPreview";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0d] text-white">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <HeroContent />
        <HeroPreview />
      </div>
    </section>
  );
}
