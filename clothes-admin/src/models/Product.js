import { model, Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
