"use client";
import { useEffect, useContext } from "react";
import { CartContext } from "./CartContextProvider";
import { useRouter } from "next/navigation";

const OrderConfirm = () => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const { setSelectAddress, setCartProducts, orderId } =
    useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    setSelectAddress(null);
    setCartProducts([]);
    ls?.removeItem("cart");
  }, []);

  return <div>Order is successfully{orderId}</div>;
};

export default OrderConfirm;
