import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

const addMinPrice = (products) => {
  if (!products || products.length === 0) {
    return []; // Return an empty array or handle the case when no products are found
  }

  const productsWithMinPrice = products.map((product) => {
    const variants = product.variants || [];

    if (variants.length === 0) {
      // Handle the case where variants array is empty
      return { ...product.toObject(), minPrice: null };
    }

    // Convert product to plain JavaScript objects
    const plainProduct = JSON.parse(JSON.stringify(product.toObject()));
    const minPrice = Math.min(...variants.map((variant) => variant.price));

    return {
      ...plainProduct,
      minPrice,
    };
  });
  return productsWithMinPrice;
};

export const getAllProducts = async ({ combinedQuery, page }) => {
  mongooseConnect();
  const limit = 9;
  const pageNumber = page > 0 ? page - 1 : 0; // Adjusting the page number to start from 0

  const productsData = await Product.find(combinedQuery)
    .skip(limit * pageNumber) // Adjusting the pagination skip based on page number
    .limit(limit);
  const products = addMinPrice(productsData);
  const totalProducts = JSON.parse(
    JSON.stringify(await Product.find(combinedQuery).count())
  );

  return { products, totalProducts };
};

export const getProduct = async (query) => {
  mongooseConnect();
  const products = await Product.find(query);
  return addMinPrice(products);
};

export const getProductByUser = async (query) => {
  mongooseConnect();
  const res = await Order.find(query);
  return JSON.parse(JSON.stringify(res));
};
