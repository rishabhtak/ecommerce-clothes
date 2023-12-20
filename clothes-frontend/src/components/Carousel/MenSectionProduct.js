"use client";
import ProductCarousel from "./ProductCarousel";


const MenSectionProduct = ({ menProducts }) => {
  return (
    <div className="py-16 mx-auto relative">
      <div className="flex justify-center pb-10 lg:pb-14">
        <h2 className="text-2xl lg:text-3xl font-bold capitalize tracking-wide">
          men&apos;s latest fashion
        </h2>
      </div>
      <ProductCarousel data={menProducts} />
    </div>
  );
};

export default MenSectionProduct;
