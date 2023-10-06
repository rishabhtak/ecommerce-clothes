import Table from "@/components/Table/Table";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="text-2xl font-semibold">Products</div>
      <Link className="float-right styleButton" href="/products">
        Add Product
      </Link>
      <Table />
    </>
  );
};

export default page;
