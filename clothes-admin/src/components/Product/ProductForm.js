"use client";
import { useState } from "react";
import Select from "antd/es/Select";
import { useRouter } from "next/navigation";

const colorsOption = [
  {
    value: "#FFFFFF",
    label: "White",
  },
  {
    value: "#000000",
    label: "Black",
  },
  {
    value: "#00FFFF",
    label: "Blue",
  },
  {
    value: "#EADDCA",
    label: "Yellow",
  },
  {
    value: "#FF0000",
    label: "Red",
  },
];

const sizeOption = [
  {
    value: "s",
    label: "S",
  },
  {
    value: "m",
    label: "M",
  },
  {
    value: "l",
    label: "L",
  },
  {
    value: "xl",
    label: "XL",
  },
  {
    value: "xxl",
    label: "XXL",
  },
  {
    value: "28",
    label: "28",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "32",
    label: "32",
  },
  {
    value: "34",
    label: "34",
  },
  {
    value: "36",
    label: "36",
  },
];

const ProductForm = () => {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [subcategory, setSubcategory] = useState("tshirt");
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [archived, setArchived] = useState(false);

  async function createProduct(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          price,
          category,
          subcategory,
          colors,
          size,
          featured,
          archived,
        }),
      });
      if (response.status === 200) {
        router.push("/products");
      }
      //  console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="py-16">
      <form className="space-y-6 dark:text-gray-100" onSubmit={createProduct}>
        <div className="space-y-1">
          <label htmlFor="name" className="font-medium">
            Product Name *
          </label>
          <input
            required
            type="text"
            id="productName"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="price" className="font-medium">
            Product Price (in indian rupees) *
          </label>
          <input
            required
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="category" className="font-medium">
            Category *
          </label>
          <select
            required
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="subcategory" className="font-medium">
            Sub-Category *
          </label>
          <select
            required
            name="subcategory"
            id="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="tshirt">T-Shirt</option>
            <option value="jeans">Jeans</option>
            <option value="shirt">Shirt</option>
            <option value="trouser">Trousers</option>
            <option value="tops">Tops</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="color" className="font-medium">
            Colors *
          </label>
          <Select
            required
            name="colors"
            id="colors"
            mode="multiple"
            size="large"
            placeholder="Select Colors"
            defaultValue={[]}
            onChange={(e) => setColors(e)}
            style={{
              width: "100%",
            }}
            options={colorsOption}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="size" className="font-medium">
            Size *
          </label>
          <Select
            required
            name="size"
            id="size"
            mode="multiple"
            size="large"
            placeholder="Select Size"
            defaultValue={[]}
            onChange={(e) => setSize(e)}
            style={{
              width: "100%",
            }}
            options={sizeOption}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="price" className="font-medium">
            This product will appear on the home page.
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              onChange={(e) => setFeatured(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2 font-medium">Featured</span>
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="price" className="font-medium">
            This product will not appear anywhere in the website.
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="archived"
              id="archived"
              onChange={(e) => setArchived(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2 font-medium">Archived</span>
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="name" className="font-medium">
            Product Images *
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
