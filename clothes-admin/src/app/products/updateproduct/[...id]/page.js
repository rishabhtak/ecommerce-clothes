import UpdateProduct from "@/components/Product/UpdateProduct";

const page = ({ params }) => {
  //  console.log();

  return (
    <>
      <div className="max-w-lg">
        <h2 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Update Products
        </h2>
      </div>
      <UpdateProduct id={params.id[0]} />
    </>
  );
};

export default page;
