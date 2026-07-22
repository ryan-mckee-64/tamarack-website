// app/page.tsx
import Hero from "@/components/sections/Hero";
import CompanyStory from "@/components/sections/CompanyStory";
import WhyTamarack from "@/components/sections/WhyTamarack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyStory />
      <WhyTamarack />
    </>
  );
}