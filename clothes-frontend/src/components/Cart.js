"use client";
import { useContext } from "react";
import { CartContext } from "./CartContextProvider";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { cartProducts, updateQuantity, removeProduct, session } =
    useContext(CartContext);

  // Function to calculate the subtotal
  const calculateSubtotal = () => {
    return cartProducts.reduce((total, item) => {
      return total + item.total_price;
    }, 0);
  };

  // Function to calculate the total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryCharges = 0;
    return subtotal + deliveryCharges;
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="h-screen bg-gray-100 pt-20 text-center">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div>Your cart is empty</div>
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
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartProducts?.map((data, index) => (
            <div
              key={index}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <Image
                src={data?.items?.images[0]}
                alt={data?.items?.productName}
                className="w-full rounded-lg sm:w-40"
                width={100}
                height={100}
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900 capitalize">
                    {data?.items?.productName}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700 capitalize">
                    {data?.items?.category} - {data?.items?.subcategory}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="mr-1">Size</span>
                    <span className="uppercase">
                      {data?.items?.variant_size}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span className="mr-1">Qty</span>
                    <div className="flex items-center">
                      <button
                        disabled={data?.total_quantity === 1}
                        className="bg-gray-200 rounded-md px-2 py-1"
                        onClick={() =>
                          updateQuantity(index, data.total_quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{data?.total_quantity}</span>
                      <button
                        disabled={
                          data?.items?.variant_qty === data?.total_quantity
                        }
                        className="bg-gray-200 rounded-md px-2 py-1"
                        onClick={() =>
                          updateQuantity(index, data.total_quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center capitalize">
                    {data?.items?.variant_qty === data?.total_quantity
                      ? "no more quantity available"
                      : ""}
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      ₹ {data?.items?.variant_price}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => removeProduct(index)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹ {calculateSubtotal().toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Delivery Charges</p>
            <p className="text-gray-700">₹0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">₹ {calculateTotal().toFixed(2)}</p>
              <p className="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          {session ? (
            <Link
              href="/address"
              className="inline-block w-full px-4 py-2 mt-6 bg-blue-500 text-white text-center rounded-md transition duration-300 hover:bg-blue-600"
            >
              Place order
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-block w-full px-4 py-2 mt-6 bg-blue-500 text-white text-center rounded-md transition duration-300 hover:bg-blue-600"
            >
              Login To Place order
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
