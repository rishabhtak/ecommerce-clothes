import HeroSection from "@/components/HeroSection/Index";
import MenSectionProduct from "@/components/Carousel/MenSectionProduct";
import WomenSectionProduct from "@/components/Carousel/WomenSectionProduct";
import Services from "@/components/Services/Index";
import Testimonials from "@/components/Testimonials/Index";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function Home() {
  mongooseConnect();
  const menProducts = await JSON.parse(
    JSON.stringify(
      await Product.find({
        category: "men",
        qty: { $gt: 0 },
        archived: false,
      })
    )
  );
  const womenProducts = await JSON.parse(
    JSON.stringify(
      await Product.find({
        category: "women",
        qty: { $gt: 0 },
        archived: false,
      })
    )
  );

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
