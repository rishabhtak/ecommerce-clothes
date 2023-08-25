"use client";
import Carousel from "react-multi-carousel";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const reviewsData = [
  {
    name: "john doe",
    role: "customer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda",
  },
  {
    name: "ema watson",
    role: "customer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda",
  },
  {
    name: "alex white",
    role: "customer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda",
  },
];

const ButtonGroup = ({ next, previous }) => {
  return (
    <div className="absolute top-[24%] md:top-[30%] left-[38%] md:left-[45%] lg:left-[47%] divide-x-4 divide-blue-200">
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

const responsive = {
  sm: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const Testimonials = () => {
  return (
    <div className="px-5 py-16 pb-10 relative">
      <div className="relative text-center bg-fixed bg-origin-padding bg-clip-border bg-cover bg-center bg-[url('/testimonials-image.jpg')] h-[screen]">
        <div className="bg-black/70 w-full overflow-hidden py-16">
          <div className="flex justify-center pt-5 pb-10 lg:pb-14">
            <h2 className="text-3xl text-white font-bold capitalize tracking-wide">
              Reviews
            </h2>
          </div>
          <Carousel
            infinite={true}
            ssr={true}
            draggable={false}
            responsive={responsive}
            arrows={false}
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}
          >
            {reviewsData.map((element, index) => (
              <div key={index} className="py-16 text-white">
                <p className="px-2 lg:px-10 mb-10 w-full">{element.desc}</p>
                <p className="capitalize text-red-400 text-xl">{element.name}</p>
                <p className="capitalize">{element.role}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
