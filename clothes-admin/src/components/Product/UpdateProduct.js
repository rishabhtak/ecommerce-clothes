"use client";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

const UpdateProduct = ({ id }) => {
  const [currentProduct, setCurrentProduct] = useState(null);

  async function getProducts() {
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setCurrentProduct(data.products);
      } else {
        setCurrentProduct(null);
      }
    } catch (error) {
      setCurrentProduct(null);
    }
  }
  useEffect(() => {
    getProducts();
  }, [id]);

  return (
    <>
      {currentProduct ? (
        <ProductForm {...currentProduct} />
      ) : (
        <div>Product Details not found</div>
      )}
    </>
  );
};

export default UpdateProduct;
