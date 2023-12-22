"use client";
import { createContext, useState, useEffect } from "react";
export const CartContext = createContext({});
const CartContextProvider = ({ children, session }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts, ls]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [ls]);
  const addProduct = (product, selectedColor, selectedSize) => {
    const selectedVariant = product.variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );

    if (selectedVariant) {
      setCartProducts((prev) => [
        ...prev,
        {
          items: {
            product_id: product._id,
            productName: product.productName,
            category: product.category,
            subcategory: product.subcategory,
            variant_id: selectedVariant._id,
            variant_size: selectedSize,
            variant_color: selectedColor,
            variant_price: selectedVariant.price,
            variant_qty: selectedVariant.qty,
            images: product.images,
            slug: product.slug,
          },
          total_quantity: 1,
          total_price: selectedVariant.price,
        },
      ]);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCartProducts = [...cartProducts];
    updatedCartProducts[index].total_quantity = newQuantity;
    updatedCartProducts[index].total_price =
      newQuantity * updatedCartProducts[index].items.variant_price;
    setCartProducts(updatedCartProducts);
  };

  const removeProduct = (index) => {
    const updatedCartProducts = [...cartProducts];
    updatedCartProducts.splice(index, 1);
    setCartProducts(updatedCartProducts);
    ls?.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        updateQuantity,
        removeProduct,
        session,
        setSelectAddress,
        selectAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
