"use client";
import { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { createColumnHelper } from "@tanstack/react-table";
import DialogBox from "../DialogBox";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [id, setId] = useState(null);
  const [images, setImages] = useState(null);

  const handleDelete = (id, data) => {
    setShowDialog(true);
    setId(id);
    setImages(data.images);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("productName", {
      header: () => "Name",
    }),
    columnHelper.accessor("price", {
      header: () => "Price",
    }),
    columnHelper.accessor("images", {
      header: () => "Images",
      cell: (info) => (
        <div className="flex items-center">
          {info?.getValue()?.map((image) => (
            <Image
              className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full shrink-0"
              src={image}
              key={image}
              width={50}
              height={50}
              alt="images"
            />
          ))}
          {info?.getValue()?.length > 4 && (
            <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
              +4
            </p>
          )}
        </div>
      ),
    }),
    columnHelper.accessor("category", {
      header: () => "Category",
    }),
    columnHelper.accessor("actions", {
      header: () => "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-x-6">
          <Link
            href={"/products/updateproduct/" + row.original._id}
            className="text-blue-500"
          >
            Edit
          </Link>
          <button
            className="text-gray-500"
            onClick={() => handleDelete(row.original._id, row.original)}
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  async function getProducts() {
    try {
      const response = await fetch(`/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      toast.error("Error fetching products");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <DialogBox
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        getProducts={getProducts}
        id={id}
        images={images}
      />
      <ToastContainer />
      <div className="items-start justify-between mt-2 md:flex">
        <div className="max-w-lg">
          <h2 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All Products
          </h2>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            href="/products/addproduct"
          >
            Add Product
          </Link>
        </div>
      </div>
      <Table columns={columns} data={products} />
    </>
  );
};

export default Product;
