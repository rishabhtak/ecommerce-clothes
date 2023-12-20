"use client";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import Wrapper from "../Wrapper/Index";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import ProductCard from "../Product/ProductCard";

const ButtonGroup = ({ next, previous }) => {
  return (
    <div className="absolute top-[18%] md:top-[20%] left-[40%] md:left-[45%] lg:left-[47%] divide-x-4 divide-blue-200">
      <button onClick={() => previous()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          data-slot="icon"
          className="w-10 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <button onClick={() => next()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          data-slot="icon"
          className="w-10 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};

const ProductCarousel = ({ data }) => {
  const responsive = {
    xl: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    lg: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    md: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    sm: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Wrapper>
      <Carousel
        infinite={true}
        ssr={true}
        draggable={false}
        responsive={responsive}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {data?.map((element) => {
          element._id = element._id.toString();
          return (
            <Link
              key={element._id}
              href={`/${element.category}/${element.subcategory}/${element.slug}`}
            >
              <div className="flex flex-col items-center w-full max-w-[280px] mx-auto py-5">
                <Image
                  className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md pointer-events-none transition ease-in-out delay-150 hover:-translate-y-3"
                  src={element.images[0]}
                  alt={element.productName}
                  width={624}
                  height={832}
                />
                <div className="w-56 mt-2 overflow-hidden md:w-64 select-none">
                  <h3 className="py-2 font-semibold tracking-wide text-center text-gray-800 capitalize">
                    {element.productName}
                  </h3>
                  <div className="flex items-center justify-between px-3 py-2 border-t border-gray-800">
                    <span className="font-semibold text-gray-800">
                      {element?.discountPrice ? (
                        <>
                          <span className="mr-2 line-through">
                            ₹{element.minPrice}
                          </span>
                          <span>₹{element.discountPrice}</span>
                        </>
                      ) : (
                        <>₹{element.minPrice}</>
                      )}
                    </span>
                    <span className="font-semibold text-amber-500">
                      {element?.discoutPercentage
                        ? `${element.discoutPercentage}% Off`
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </Wrapper>
  );
};

export default ProductCarousel;
