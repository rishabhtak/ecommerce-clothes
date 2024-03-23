"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Yup from "yup";
import VariantsTable from "../VariantsTable";
import Image from "next/image";

const ProductForm = ({
  _id,
  productName: oldProductName,
  category: oldCategory,
  subcategory: oldSubcategory,
  featured: oldFeatured,
  archived: oldArchived,
  images: oldImages,
  desc: oldDesc,
  slug: oldSlug,
  variants: oldVariants,
}) => {
  const mdEditor = useRef(null);
  const router = useRouter();
  const [productName, setProductName] = useState(oldProductName || "");
  const [category, setCategory] = useState(oldCategory || "men");
  const [subcategory, setSubcategory] = useState(oldSubcategory || "tshirt");
  const [featured, setFeatured] = useState(oldFeatured || false);
  const [archived, setArchived] = useState(oldArchived || false);
  const [images, setImages] = useState(oldImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [desc, setDesc] = useState(oldDesc || "");
  const [slug, setSlug] = useState(oldSlug || "");
  const [variants, setVariants] = useState(oldVariants || []);
  const [validationErrors, setValidationErrors] = useState({});

  const productSchema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    images: Yup.array().min(1, "Select at least one image"),
    desc: Yup.string().required("Product Description is required"),
    variants: Yup.array().min(1, "Add at least one variant"),
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
          images,
          desc,
          variants,
        },
        { abortEarly: false }
      );

      const data = {
        productName,
        category,
        subcategory,
        featured,
        archived,
        images,
        desc,
        slug,
        variants,
      };
      if (_id) {
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

  async function deleteImg(url) {
    const res = await fetch(`/api/upload/?url=${url}`, {
      method: "DELETE",
    });
    const deletedImageData = await res.json();
     if (deletedImageData.status === 200) {
      setImages((prev) => {
        return prev.filter((elem) => elem !== url);
      });
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
          <VariantsTable variants={variants} setVariants={setVariants} />
        </div>
        {validationErrors.variants && (
          <p className="text-red-600">{validationErrors.variants}</p>
        )}

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
                    alt=""
                    className="rounded-lg"
                    width={100}
                    height={100}
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
              renderHTML={(text) => {
                // eslint-disable-next-line react/no-children-prop
                <ReactMarkdown children={text} />;
              }}
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
