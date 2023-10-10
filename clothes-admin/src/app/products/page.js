import Table from "@/components/Table/Table";
import Link from "next/link";

const page = async () => {
  return (
    <>
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

      <Table />
    </>
  );
};

export default page;
