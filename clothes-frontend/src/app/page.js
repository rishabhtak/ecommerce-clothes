import HeroSection from "@/components/HeroSection/Index";
import MenSectionProduct from "@/components/Carousel/MenSectionProduct";
import WomenSectionProduct from "@/components/Carousel/WomenSectionProduct";
import Services from "@/components/Services/Index";
import Testimonials from "@/components/Testimonials/Index";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MenSectionProduct />
      <WomenSectionProduct />
      <Services />
      <Testimonials />
    </>
  );
}