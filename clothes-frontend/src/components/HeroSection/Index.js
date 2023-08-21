"use client";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="px-5 py-16 mx-auto flex flex-wrap">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-8 relative h-full w-full">
          <Image
            src="/offers-banner.jpg"
            alt="offers banner image"
            height={1080}
            width={1920}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/25">
            <h1 className="text-white text-6xl">hexashop</h1>
            <span>hello how are you</span>
          </div>
        </div>
        <div className="col-span-8 lg:col-span-4">
          <div className="flex flex-col gap-4">
            <div>
              <Image
                src="/women-banner.jpg"
                alt="women banner image"
                height={1080}
                width={1920}
                className="w-full object-cover h-full object-center"
              />
            </div>
            <div>
              <Image
                src="/men-banner.jpg"
                alt="offers banner image"
                height={1080}
                width={1920}
                className="w-full object-cover h-full object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
