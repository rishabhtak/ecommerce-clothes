"use client";
import ProductCarousel from "./ProductCarousel";



const WomenSectionProduct = ({ womenProducts }) => {

  return (
    <div className="py-16 mx-auto relative">
      <div className="flex justify-center pb-10 lg:pb-14">
        <h2 className="text-2xl lg:text-3xl font-bold capitalize tracking-wide">
          women's latest fashion
        </h2>
      </div>
      <ProductCarousel data={womenProducts} />
    </div>
  );
};

export default WomenSectionProduct;
