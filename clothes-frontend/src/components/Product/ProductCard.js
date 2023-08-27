import Image from "next/image";

export default function ProductCard() {
  const data = [
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
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
          <div className="w-full mt-2 overflow-hidden select-none">
            <h3 className="py-2 font-semibold tracking-wide text-center text-gray-800 uppercase ">
              {element.title}
            </h3>
            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-800">
              <span className="font-semibold text-gray-800">
                {element?.discountPrice ? (
                  <>
                    <span className="mr-2 line-through">₹{element.price}</span>
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
    </div>
  );
}
