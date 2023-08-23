"use client";
import ProductCarousel from "./ProductCarousel";

const men_Data = [
  {
    title: "men shirt",
    price: 1000,
    img: "/men-shirt1.webp",
  },
  {
    title: "men t-shirt",
    price: 1000,
    discountPrice: 500,
    discoutPercentage: 50,
    img: "/men-tshirt1.webp",
  },
  {
    title: "men jeans",
    price: 2000,
    img: "/men-jeans1.webp",
  },
  {
    title: "men trouser",
    price: 2000,
    discountPrice: 1500,
    discoutPercentage: 25,
    img: "/men-trousers1.webp",
  },
  {
    title: "men shirt",
    price: 1200,
    img: "/men-shirt2.webp",
  },
];


const MenSectionProduct = () => {
  return (
    <div className="py-16 mx-auto relative">
      <div className="flex justify-center pb-10 lg:pb-14">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold capitalize tracking-wide">
          men's latest fashion
        </h2>
      </div>
      <ProductCarousel data={men_Data} />
    </div>
  );
};

export default MenSectionProduct;
