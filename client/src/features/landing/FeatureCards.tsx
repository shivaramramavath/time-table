import { Layers3, MonitorSmartphone, WandSparkles } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    number: "01",
    title: "Design freely",
    description:
      "Build clear, thoughtful interfaces with flexible layouts and reusable design patterns.",
    icon: WandSparkles,
  },
  {
    number: "02",
    title: "Responsive by default",
    description:
      "Create experiences that adapt naturally to desktops, tablets, and mobile screens.",
    icon: MonitorSmartphone,
  },
  {
    number: "03",
    title: "One connected system",
    description:
      "Organize your components and keep your entire product consistent and maintainable.",
    icon: Layers3,
  },
];

export default function FeatureCards() {
  return (
    <section
      id="features"
      className="bg-white px-5 py-20 dark:bg-[#0b0b0d] md:px-8 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              What we offer
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to bring ideas to life.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-500">
            A thoughtful collection of tools and workflows to make digital
            product creation simpler.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.number} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
