import ProductForm from "@/components/Product/ProductForm";
const page = () => {
  return (
    <>
      <div className="max-w-lg">
        <h2 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Add Products
        </h2>
      </div>
      <ProductForm />
    </>
  );
};

export default page;
