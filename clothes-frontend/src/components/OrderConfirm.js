"use client";
import { useEffect, useContext } from "react";
import { CartContext } from "./CartContextProvider";
import Link from "next/link";
import { redirect } from "next/navigation";

const OrderConfirm = () => {
  console.log("OrderConfirm");
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const { setSelectAddress, setCartProducts } = useContext(CartContext);

  useEffect(() => {
    setSelectAddress(null);
    setCartProducts([]);
    ls?.removeItem("cart");
  }, [ls, setCartProducts, setSelectAddress]);

  /* if (!orderId) {
    return redirect("/");
  } */
  return (
    <div className="flex items-center justify-center py-8 md:py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-3 px-4 text-center">
        <p className="text-lg md:text-4xl font-bold">Thank You For Shopping</p>
        <p className="text-lg md:text-4xl font-bold">
          Your Order is Confirmed.
        </p>
        <p className="text-sm md:text-base">
          Now you can view your Orders or continue Shopping with us
        </p>
        <div className="flex flex-col items-center gap-y-3 md:flex-row md:items-center md:gap-x-5">
          <Link href={"/profile/userorders"}>
            <button className="bg-black text-slate-100 w-full md:w-44 h-12 rounded-full text-base font-semibold mb-3 md:mb-0 md:mr-3 hover:bg-orange-600 duration-300">
              View Orders
            </button>
          </Link>
          <Link href={"/"}>
            <button className="bg-black text-slate-100 w-full md:w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
