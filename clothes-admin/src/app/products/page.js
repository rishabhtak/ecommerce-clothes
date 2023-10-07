import Table from "@/components/Table/Table";
import Link from "next/link";

const page = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">
        Products
      </h2>
      <Link className="float-right styleButton" href="/products">
        Add Product
      </Link>
      <Table />
    </>
  );
};

export default page;
