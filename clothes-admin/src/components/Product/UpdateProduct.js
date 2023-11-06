"use client";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

const UpdateProduct = ({ id }) => {
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
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
