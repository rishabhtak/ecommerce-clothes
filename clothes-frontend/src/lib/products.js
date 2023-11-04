import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export const getAllProducts = async ({ combinedQuery, sort, page }) => {
  mongooseConnect();
  const limit = 9;
  const pageNumber = page > 0 ? page - 1 : 0; // Adjusting the page number to start from 0

  const products = await Product.find(combinedQuery)
    .sort(sort)
    .skip(limit * pageNumber) // Adjusting the pagination skip based on page number
    .limit(limit);
  const totalProducts = await Product.find(combinedQuery).count();
  return JSON.parse(JSON.stringify({ products, totalProducts }));
};

export const getProduct = async (query) => {
  mongooseConnect();
  const res = await Product.find(query);
  return JSON.parse(JSON.stringify(res));
};




