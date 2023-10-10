import React from "react";

const ProductForm = () => {
  return (
    <div className="py-16">
      <form className="space-y-6 dark:text-gray-100">
        <div className="space-y-1">
          <label htmlFor="name" className="font-medium">
            Product Name *
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Product Name"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="price" className="font-medium">
            Product Price *
          </label>
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Product Price"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option selected disabled>
              Select Category
            </option>
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
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option selected disabled>
              Select Sub-Category
            </option>
            <option value="tshirt">T-Shirt</option>
            <option value="jeans">Jeans</option>
            <option value="shirt">Shirt</option>
            <option value="trouser">Trousers</option>
            <option value="tops">Tops</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="color" className="font-medium">
            Color *
          </label>
          <select
            required
            name="color"
            id="color"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option selected disabled>
              Select Color
            </option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="Red">Red</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="size" className="font-medium">
            Size *
          </label>
          <select
            required
            name="size"
            id="size"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option selected disabled>
              Select Size
            </option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
            <option value="28">28</option>
            <option value="30">30</option>
            <option value="32">32</option>
            <option value="36">36</option>
            <option value="38">38</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="price" className="font-medium">
            This product will appear on the home page.
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
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
      </form>
    </div>
  );
};

export default ProductForm;
