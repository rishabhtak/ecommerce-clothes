import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ products  }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {products?.map((element) => (
        <Link
          key={element._id}
          href={`/${element.category}/${element.subcategory}/${element.slug}`}
        >
          <div className="flex flex-col items-center w-full max-w-[280px] mx-auto py-5">
            <Image
              className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md cursor-pointer transition ease-in-out delay-150 hover:-translate-y-3"
              src={element.images[0]}
              alt={element.productName}
              width={624}
              height={832}
            />
            <div className="w-full mt-2 overflow-hidden select-none">
              <h3 className="py-2 font-semibold tracking-wide text-center text-gray-800 uppercase ">
                {element.productName}
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
        </Link>
      ))}
    </div>
  );
}
