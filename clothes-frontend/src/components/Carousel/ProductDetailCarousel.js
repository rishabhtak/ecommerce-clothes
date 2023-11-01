"use client";
import Carousel from "react-multi-carousel";
import Image from "next/image";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
};

const ProductDetailCarousel = ({ images, productName }) => {
  // Convert image URLs into an array of objects
  const imageObjects = images?.map((imageUrl) => {
    return {
      src: imageUrl,
      alt: productName,
    };
  });

  const CustomDot = ({ index, onClick, active }) => {
    return (
      <li className={active ? "active" : "inactive"} onClick={() => onClick()}>
        <Image
          src={imageObjects[index].src}
          alt={imageObjects[index].alt}
          width={50}
          height={60}
          className="h-full w-full pl-2 cursor-pointer"
        />
      </li>
    );
  };
  return (
    <Carousel
      responsive={responsive}
      arrows={false}
      draggable={false}
      renderDotsOutside={true}
      showDots
      slidesToSlide={1}
      customDot={<CustomDot />}
      dotListClass="dotClass"
    >
      {imageObjects?.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          height={500}
          width={500}
          className="h-full w-[500px] object-cover object-center"
        />
      ))}
    </Carousel>
  );
};

export default ProductDetailCarousel;
