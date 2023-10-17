"use client";
import { useState, useRef } from "react";
import Select from "antd/es/Select";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import sha1 from "sha1";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

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
  const mdEditor = useRef(null);
  const [value, setValue] = useState("xxx");
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [subcategory, setSubcategory] = useState("tshirt");
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [archived, setArchived] = useState(false);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      let data = new FormData();
      for (const file of files) {
        data.append("file", file);
        data.append("upload_preset", "ecommerceclothes");
      }
      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: data,
      });
      const imageResponse = await res.json();
      setImages((oldImages) => {
        return [...oldImages, ...imageResponse.links];
      });
      setIsUploading(false);
    }
  }
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
          images,
        }),
      });
      if (response.status === 200) {
        router.push("/products");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Deletemages(link) {
    const regex = /\/ecommerceclothes_folder\/([^/]+)\.webp$/;
    const publicId = link.match(regex);
    const url = "ecommerceclothes_folder/" + publicId[1];
    const timestamp = new Date().getTime();
    const string = `public_id=${url}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`;
    const signature = sha1(string);

    const formData = new FormData();
    formData.append("public_id", url);
    formData.append("signature", signature);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );
    const del = await res.json();
    if (del.result === "ok") {
      const newImages = images.filter((v) => v !== link);
      setImages(newImages);
    }
  }

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    console.log(newValue);
    setValue(newValue);
  };

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
          <div className="mb-2 flex flex-wrap gap-1">
            {!!images?.length &&
              images.map((link) => (
                <div
                  key={link}
                  className="h-24 w-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200 relative"
                >
                  <img src={link} alt="" className="rounded-lg" />
                  <button
                    className="top-0 absolute right-0"
                    onClick={() => Deletemages(link)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            {isUploading && (
              <div className="h-24 flex items-center">
                <Spinner />
              </div>
            )}
            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <div>Upload</div>
              <input type="file" onChange={uploadImages} className="hidden" />
            </label>
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="description" className="font-medium">
            Product Description *
          </label>
          <div>
            <Editor
              ref={mdEditor}
              value={value}
              style={{
                height: "500px",
              }}
              onChange={handleEditorChange}
              renderHTML={(text) => <ReactMarkdown children={text} />}
            />
          </div>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
