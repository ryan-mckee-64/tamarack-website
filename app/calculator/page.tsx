// app/calculator/page.tsx
import type { Metadata } from "next";
import BtuCalculator from "@/components/calculator/BtuCalculator";

export const metadata: Metadata = {
  title: "BTU Calculator · Tamarack Industries",
  description: "Estimate the heating requirement for your space in BTU per hour.",
};

export default function CalculatorPage() {
  return (
    <div className="border-b border-[color:var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
        <p className="tech-label text-[color:var(--orange)]">Tools</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold tracking-[-0.02em] text-[color:var(--ink)] md:text-5xl">
          BTU heating calculator
        </h1>
        <p className="font-body mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Estimate how much heat your space needs in BTU per hour, then see which
          Tamarack unit fits. Enter your dimensions and target temperature for a live estimate.
        </p>

        <div className="mt-12">
          <BtuCalculator />
        </div>
      </div>
    </div>
  );
}