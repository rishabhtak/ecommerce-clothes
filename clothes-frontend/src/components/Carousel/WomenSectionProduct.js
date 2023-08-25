"use client";
import ProductCarousel from "./ProductCarousel";

const women_Data = [
  {
    title: "women tops",
    price: 1000,
    img: "/women-tops1.webp",
  },
  {
    title: "women t-shirt",
    price: 1000,
    discountPrice: 500,
    discoutPercentage: 50,
    img: "/women-tshirt1.webp",
  },
  {
    title: "women jeans",
    price: 2000,
    img: "/women-jeans2.webp",
  },
  {
    title: "women trouser",
    price: 2000,
    discountPrice: 1500,
    discoutPercentage: 25,
    img: "/women-trousers1.webp",
  },
  {
    title: "women tshirt",
    price: 1200,
    img: "/women-tshirt2.webp",
  },
];

const WomenSectionProduct = () => {
  return (
    <div className="py-16 mx-auto relative">
      <div className="flex justify-center pb-10 lg:pb-14">
        <h2 className="text-2xl lg:text-3xl font-bold capitalize tracking-wide">
          women's latest fashion
        </h2>
      </div>
      <ProductCarousel data={women_Data} />
    </div>
  );
};

export default WomenSectionProduct;
