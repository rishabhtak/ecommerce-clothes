import Wrapper from "../Wrapper/Index";
import { FaGift, FaHourglassStart,FaTruck,FaCreditCard } from "react-icons/fa6";

const Services = () => {
  return (
    <div className="py-5 mx-auto">
      <Wrapper>
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col group mb-5">
            <div className="w-full flex justify-center">
              <div className="bg-[#f6425b] rounded-full p-4 w-16 group-hover:ring group-hover:ring-blue-300 group-hover:bg-white">
                <FaGift
                  size={30}
                  className="text-white group-hover:text-black"
                />
              </div>
            </div>
            <p className="text-xl font-semibold mt-2">Items in stock</p>
          </div>
          <div className="flex flex-col group mb-5">
            <div className="w-full flex justify-center">
              <div className="bg-[#f6425b] rounded-full p-4 w-16 group-hover:ring group-hover:ring-blue-300 group-hover:bg-white">
                <FaHourglassStart
                  size={30}
                  className="text-white group-hover:text-black"
                />
              </div>
            </div>
            <p className="text-xl font-semibold mt-2">Same day handling</p>
          </div>
          <div className="flex flex-col group mb-5">
            <div className="w-full flex justify-center">
              <div className="bg-[#f6425b] rounded-full p-4 w-16 group-hover:ring group-hover:ring-blue-300 group-hover:bg-white">
                <FaTruck
                  size={30}
                  className="text-white group-hover:text-black"
                />
              </div>
            </div>
            <p className="text-xl font-semibold mt-2">Fast shipping</p>
          </div>
          <div className="flex flex-col group mb-5">
            <div className="w-full flex justify-center">
              <div className="bg-[#f6425b] rounded-full p-4 w-16 group-hover:ring group-hover:ring-blue-300 group-hover:bg-white">
                <FaCreditCard
                  size={30}
                  className="text-white group-hover:text-black"
                />
              </div>
            </div>
            <p className="text-xl font-semibold mt-2">All payment methods</p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Services;
