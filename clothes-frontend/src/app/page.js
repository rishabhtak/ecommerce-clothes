import HeroSection from "@/components/HeroSection/Index";
import MenSectionProduct from "@/components/Carousel/MenSectionProduct";
import WomenSectionProduct from "@/components/Carousel/WomenSectionProduct";
import Services from "@/components/Services/Index";
import Testimonials from "@/components/Testimonials/Index";
import { getProduct } from "@/api/products";
export default async function Home() {
  
  const menProducts = await getProduct({
    category: "men",
    qty: { $gt: 0 },
    archived: false,
    featured: true,
  });

  const womenProducts = await getProduct({
    category: "women",
    qty: { $gt: 0 },
    archived: false,
    featured: true,
  });

  return (
    <>
      <HeroSection />
      <MenSectionProduct menProducts={menProducts} />
      <WomenSectionProduct womenProducts={womenProducts} />
      <Services />
      <Testimonials />
    </>
  );
}
