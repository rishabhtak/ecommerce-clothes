"use client";
import { createContext, useState, useEffect } from "react";
export const CartContext = createContext({});
const CartContextProvider = ({ children }) => {
  //  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);
  /*  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []); */
  const addProduct = (product, selectedColor, selectedSize) => {
    const selectedVariant = product.variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );

    if (selectedVariant) {
      setCartProducts((prev) => [
        ...prev,
        { product, variant: selectedVariant },
      ]);
    }
  };

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
