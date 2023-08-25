"use client";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import Wrapper from "../Wrapper/Index";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const ButtonGroup = ({ next, previous }) => {
  return (
    <div className="absolute top-[18%] md:top-[20%] left-[40%] md:left-[45%] lg:left-[47%] divide-x-4 divide-blue-200">
      <button onClick={() => previous()}>
        <FaArrowLeftLong
          size={30}
          className="mr-2 text-gray-500 transition ease-in-out hover:text-blue-200 duration-300"
        />
      </button>
      <button onClick={() => next()}>
        <FaArrowRightLong
          size={30}
          className="ml-2 text-gray-500 transition ease-in-out hover:text-blue-200 duration-300"
        />
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
        {data.map((element, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-full max-w-[280px] mx-auto py-5"
          >
            <Image
              className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md cursor-pointer transition ease-in-out delay-150 hover:-translate-y-3"
              src={element.img}
              alt={element.title}
              width={624}
              height={832}
            />
            <div className="w-56 mt-2 overflow-hidden md:w-64 select-none">
              <h3 className="py-2 font-semibold tracking-wide text-center text-gray-800 uppercase ">
                {element.title}
              </h3>
              <div className="flex items-center justify-between px-3 py-2 border-t border-gray-800">
                <span className="font-semibold text-gray-800">
                  {element?.discountPrice ? (
                    <>
                      <span className="mr-2 line-through">
                        ₹{element.price}
                      </span>
                      <span>₹{element.discountPrice}</span>
                    </>
                  ) : (
                    <>₹{element.price}</>
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
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default ProductCarousel;
