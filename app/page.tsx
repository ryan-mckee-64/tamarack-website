// app/page.tsx
import Hero from "@/components/sections/Hero";
import ProductOverview from "@/components/sections/ProductOverview";
import WhyTamarack from "@/components/sections/WhyTamarack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductOverview />
      <WhyTamarack />
    </>
  );
}