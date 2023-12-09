"use client";
import { Fragment, useState, useMemo, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import Pagination from "../Pagination";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// todo: testing local storage

export default function ProductFilter({ data, colorOptions, sizeOptions }) {
  const { products, totalProducts } = data;

  const sortOptions = [
    { name: "Price: Low to High", price: "asc", current: false },
    { name: "Price: High to Low", price: "desc", current: false },
  ];

  const filters = [
    {
      id: "colors",
      name: "Colors",
      options: colorOptions,
    },
    {
      id: "size",
      name: "Size",
      options: sizeOptions,
    },
    {
      id: "price",
      name: "Price",
      options: [
        { value: "1-399", label: "₹1 To ₹399", checked: false },
        { value: "400-999", label: "₹400 To ₹999", checked: false },
        { value: "1000-1999", label: "₹1000 To ₹1999", checked: false },
        { value: "2000-2999", label: "₹2000 To ₹2999", checked: false },
        { value: "3000-4999", label: "₹3000 To ₹4999", checked: false },
      ],
    },
    /*  {
      id: "discount",
      name: "Discount Price",
      options: [
        { value: "10%", label: "10% And Above", checked: false },
        { value: "20%", label: "20% And Above", checked: false },
        { value: "30%", label: "30% And Above", checked: false },
        { value: "40%", label: "40% And Above", checked: false },
        { value: "50%", label: "50% And Above", checked: false },
      ],
    },
    {
      id: "availability",
      name: "Availability",
      options: [
        { value: "in_stock", label: "In Stock", checked: false },
        { value: "out_of_stock", label: "Out Of Stock", checked: false },
      ],
    }, */
  ];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});

  const getCheckboxState = useMemo(() => {
    return (sectionId, optionValue) => {
      return filter[sectionId] && filter[sectionId].includes(optionValue);
    };
  }, [filter]);

  const handleFilterChange = (sectionId, optionValue, isChecked) => {
    const newFilter = { ...filter };

    if (isChecked) {
      newFilter[sectionId]
        ? newFilter[sectionId].push(optionValue)
        : (newFilter[sectionId] = [optionValue]);
    } else {
      if (newFilter[sectionId]) {
        // If the sectionId exists and the optionValue is in the array, remove it
        newFilter[sectionId] = newFilter[sectionId].filter(
          (v) => v !== optionValue
        );

        // If the array is empty after removing the optionValue, delete the sectionId
        if (newFilter[sectionId].length === 0) {
          delete newFilter[sectionId];
        }
      }
    }
    setFilter(newFilter);
  };

  useEffect(() => {
    let page = params.get("page") ? Number(params.get("page")) : 1;
    if (page !== 1) {
      params.set("page", 1);
    }

    const sortingParam = params.get("sort");
    if (sortingParam) {
      params.set("sort", sortingParam);
    }
    // Handle filter parameters
    filters.forEach((section) => {
      const filterValues = filter[section.id];
      if (filterValues && filterValues.length > 0) {
        params.set(section.id, filterValues.join(","));
      } else {
        params.delete(section.id);
      }
    });
    replace(`${pathname}?${params}`);
  }, [filter]);

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-black">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    checked={
                                      getCheckboxState(
                                        section.id,
                                        option.value
                                      ) || false
                                    }
                                    onChange={(e) => {
                                      const isChecked = e.target.checked;
                                      handleFilterChange(
                                        section.id,
                                        option.value,
                                        isChecked
                                      );
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Product
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <Link
                            href={{
                              pathname: pathname,
                              query: {
                                ...Object.fromEntries(params),
                                sort: option.price,
                                page: 1,
                              },
                            }}
                            className={classNames(
                              option.current
                                ? "font-medium text-blue-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="text-xl">Filters</h3>

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-black">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                checked={
                                  getCheckboxState(section.id, option.value) ||
                                  false
                                }
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  handleFilterChange(
                                    section.id,
                                    option.value,
                                    isChecked
                                  );
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
            {/* Product grid */}
            {totalProducts ? (
              <div className="lg:col-span-4">
                <ProductCard products={products} />
                <Pagination
                  totalProducts={totalProducts}
                  currentPage={params.get("page")}
                  pathname={pathname}
                  params={params}
                />
              </div>
            ) : (
              <div>No Products Available</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
