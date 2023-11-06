"use client";
import { useState, useRef } from "react";
import Select from "antd/es/Select";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Yup from "yup";
import deleteImages from "@/app/utils/deleteImages";
import Image from "next/image";

const colorsOption = [
  {
    value: "white",
    label: "White",
  },
  {
    value: "black",
    label: "Black",
  },
  {
    value: "blue",
    label: "Blue",
  },
  {
    value: "yellow",
    label: "Yellow",
  },
  {
    value: "red",
    label: "Red",
  },
  {
    value: "green",
    label: "Green",
  },
  {
    value: "brown",
    label: "Brown",
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

const ProductForm = ({
  _id,
  productName: oldProductName,
  price: oldPrice,
  qty: oldQty,
  category: oldCategory,
  subcategory: oldSubcategory,
  colors: oldColors,
  size: oldSize,
  featured: oldFeatured,
  archived: oldArchived,
  images: oldImages,
  desc: oldDesc,
  slug: oldSlug,
}) => {
  const mdEditor = useRef(null);
  const router = useRouter();
  const [productName, setProductName] = useState(oldProductName || "");
  const [price, setPrice] = useState(oldPrice || "");
  const [qty, setQty] = useState(oldQty || "");
  const [category, setCategory] = useState(oldCategory || "men");
  const [subcategory, setSubcategory] = useState(oldSubcategory || "tshirt");
  const [colors, setColors] = useState(oldColors || []);
  const [size, setSize] = useState(oldSize || []);
  const [featured, setFeatured] = useState(oldFeatured || false);
  const [archived, setArchived] = useState(oldArchived || false);
  const [images, setImages] = useState(oldImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [desc, setDesc] = useState(oldDesc || "");
  const [slug, setSlug] = useState(oldSlug || "");
  const [validationErrors, setValidationErrors] = useState({});

  const productSchema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    price: Yup.number()
      .typeError("Please enter correct value")
      .positive("Please enter correct value")
      .integer("Please enter correct value")
      .required("Product Price is required"),
    qty: Yup.number()
      .typeError("Please enter correct value")
      .positive("Please enter correct value")
      .integer("Please enter correct value")
      .required("Product Quantity is required"),
    colors: Yup.array().min(1, "Select at least one color"),
    size: Yup.array().min(1, "Select at least one size"),
    images: Yup.array().min(1, "Select at least one image"),
    desc: Yup.string().required("Product Description is required"),
  });

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
      if (imageResponse.status === 200) {
        setImages((oldImages) => {
          return [...oldImages, ...imageResponse.links];
        });
      }
      setIsUploading(false);
    }
  }
  async function createProduct(e) {
    e.preventDefault();
    try {
      await productSchema.validate(
        {
          productName,
          price,
          qty,
          colors,
          size,
          images,
          desc,
        },
        { abortEarly: false }
      );

      const data = {
        productName,
        price,
        qty,
        category,
        subcategory,
        colors,
        size,
        featured,
        archived,
        images,
        desc,
        slug,
      };
      if (_id) {
        console.log(_id);
        const response = await fetch(`/api/products`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data, _id }),
        });

        if (response.status === 500 || response.status === 404) {
          toast.error("Something got error, Please try again later");
        } else {
          router.push("/products");
          toast.success("Product updated successfully");
        }
      } else {
        const response = await fetch(`/api/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.status === 500 || response.status === 404) {
          toast.error("Something got error, Please try again later");
        } else {
          toast.success("Product created successfully");
          router.push("/products");
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((validationError) => {
          errors[validationError.path] = validationError.message;
        });
        setValidationErrors(errors);
      } else {
        toast.error("Something got error, Please try again later");
      }
    }
  }

  async function deleteImg(link) {
    let res = await deleteImages(link);
    if (res.result === "ok") {
      const newImages = images.filter((v) => v !== link);
      setImages(newImages);
    }
  }

  const handleEditorChange = ({ text }) => {
    setDesc(text);
  };

  // slug generator

  const generateSlug = (productName) => {
    // Remove spaces and convert to lowercase for the slug
    const formattedTitle = productName.toLowerCase().replace(/\s/g, "-");

    // Generate a random number between 1000 and 9999
    const random = Math.floor(Math.random() * 9000) + 1000;

    setSlug(`${formattedTitle}-${random}`);
  };

  return (
    <div className="py-16">
      <form className="space-y-6 dark:text-gray-100" onSubmit={createProduct}>
        <div className="space-y-1">
          <label htmlFor="name" className="font-medium">
            Product Name *
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              generateSlug(e.target.value);
            }}
            placeholder="Product Name"
            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
          {validationErrors.productName && (
            <p className="text-red-600">{validationErrors.productName}</p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="price" className="font-medium">
            Product Price (in indian rupees) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
          {validationErrors.price && (
            <p className="text-red-600">{validationErrors.price}</p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="price" className="font-medium">
            Product Quantity *
          </label>
          <input
            type="number"
            id="qty"
            name="qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Product Quantity"
            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
          {validationErrors.qty && (
            <p className="text-red-600">{validationErrors.qty}</p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="category" className="font-medium">
            Category *
          </label>
          <select
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
            name="colors"
            id="colors"
            mode="multiple"
            size="large"
            placeholder="Select Colors"
            defaultValue={colors}
            onChange={(e) => setColors(e)}
            style={{
              width: "100%",
            }}
            options={colorsOption}
          />
          {validationErrors.colors && (
            <p className="text-red-600">{validationErrors.colors}</p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="size" className="font-medium">
            Size *
          </label>
          <Select
            name="size"
            id="size"
            mode="multiple"
            size="large"
            placeholder="Select Size"
            defaultValue={size}
            onChange={(e) => setSize(e)}
            style={{
              width: "100%",
            }}
            options={sizeOption}
          />
          {validationErrors.size && (
            <p className="text-red-600">{validationErrors.size}</p>
          )}
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
              checked={featured}
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
              checked={archived}
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
                  className="h-24 w-24 bg-white p-3 shadow-sm rounded-sm border border-gray-200 relative"
                >
                  <Image
                    src={link}
                    alt="image"
                    height={100}
                    width={100}
                    className="rounded-lg"
                  />
                  <div
                    className="top-0 absolute right-0 cursor-pointer"
                    onClick={() => deleteImg(link)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
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
          {validationErrors.images && (
            <p className="text-red-600">{validationErrors.images}</p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="description" className="font-medium">
            Product Description *
          </label>
          <div>
            <Editor
              ref={mdEditor}
              value={desc}
              style={{
                height: "500px",
              }}
              onChange={handleEditorChange}
              
            />
          </div>
          {validationErrors.desc && (
            <p className="text-red-600">{validationErrors.desc}</p>
          )}
        </div>
        <div className="flex gap-4 text-center justify-center">
          <button
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            type="submit"
          >
            Save
          </button>
          <Link
            href="/products"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-red-600 rounded-lg hover:bg-red-500 active:bg-indigo-700 md:text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
