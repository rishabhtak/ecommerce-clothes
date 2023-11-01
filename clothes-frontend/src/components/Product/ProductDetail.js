"use client";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Wrapper from "../Wrapper/Index";
import ProductDetailCarousel from "../Carousel/ProductDetailCarousel";
import ReactMarkdown from "react-markdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail({ productDetail }) {
  console.log(productDetail);
  const [selectedColor, setSelectedColor] = useState(productDetail?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productDetail?.size[0]);
  console.log(selectedColor);
  return (
    <Wrapper>
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="rounded-lg lg:block col-span-2 relative">
            <ProductDetailCarousel
              images={productDetail.images}
              productName={productDetail.productName}
            />
          </div>
          <div className="mt-28 lg:mt-0 col-span-1">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-5">
                {productDetail.productName}
              </h1>
            </div>
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ₹{productDetail.price}
            </p>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {productDetail?.colors?.map((color) => (
                      <RadioGroup.Option
                        key={color}
                        value={color}
                        className="cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                      >
                        {({ checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {color}
                            </RadioGroup.Label>
                            <span
                              className={classNames(
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-md border"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {productDetail?.size?.map((size) => (
                      <RadioGroup.Option
                        key={size}
                        value={size}
                        className="cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                      >
                        {({ checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size}
                            </RadioGroup.Label>
                            <span
                              className={classNames(
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-md border"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-32">
          {/* Options */}

          {/* Description and details */}
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-5 lg:mt-5">
            Description
          </h3>

          <div className="prose space-y-6">
            <ReactMarkdown>{productDetail.desc}</ReactMarkdown>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
