"use client";
import Image from "next/image";
import Link from "next/link";

export default function UserOrders({ orders }) {
  if (orders.length <= 0) {
    return (
      <div className="h-screen pt-20 text-center">
        <div>Your Orders is empty</div>
        <Link
          href="/"
          className="inline-block px-4 py-2 mt-6 bg-blue-500 text-white text-center rounded-md transition duration-300 hover:bg-blue-600"
        >
          Shop Now
        </Link>
      </div>
    );
  }
  return (
    <div>
      {orders &&
        orders.map((order) => (
          <div key={order._id}>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="text-xl sm:text-2xl my-3 sm:my-5 font-bold tracking-tight text-gray-900">
                  Order # {order._id}
                </div>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li
                        key={item.items.variant_id}
                        className="flex flex-col py-6 sm:flex-row"
                      >
                        <div className="sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
                          <Image
                            src={item.items.images[0]}
                            alt={item.items.productName}
                            className="h-full w-full object-cover object-center"
                            height={400}
                            width={400}
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <Link
                                href={`/${item.items.category}/${item.items.subcategory}/${item.items.slug}`}
                              >
                                <h1 className="capitalize">
                                  {item.items.productName}
                                </h1>
                              </Link>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 capitalize">
                              {item.items.category} - {item.items.subcategory}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 capitalize">
                              Size: {item.items.variant_size}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 capitalize">
                              Color: {item.items.variant_color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty: {item.total_quantity}
                              </label>
                            </div>

                            <div className="flex flex-col">
                              <p>Price: ₹{item.items.variant_price}</p>
                              <p>Subtotal: {item.total_price}</p>
                            </div>
                          </div>
                          <div className="text-md my-5 font-bold tracking-tight text-red-900 capitalize">
                            Order Status: {item.orderStatus}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex flex-col my-2 text-base font-medium text-gray-900">
                  <p>Total Price: ₹{order.finalPrice}</p>
                  <p>Total Items in Cart: {order.finalQuantity} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address:
                </p>
                <div className="flex flex-col gap-2 px-4 sm:px-6 py-4 sm:py-6 border-solid border-2 border-gray-200">
                  <p className="text-base sm:text-sm font-semibold leading-6 text-gray-900 capitalize">
                    {order.selectAddress.fullname}
                  </p>
                  <p className="sm:overflow-ellipsis sm:whitespace-nowrap sm:max-w-xs text-xs sm:text-sm leading-5 text-gray-500 capitalize">
                    {order.selectAddress.address}
                  </p>
                  <p className="text-xs sm:text-sm leading-5 text-gray-500">
                    {order.selectAddress.pinCode}
                  </p>
                  <div className="sm:flex sm:items-end">
                    <p className="text-base sm:text-sm leading-6 text-gray-900">
                      Phone: {order.selectAddress.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
