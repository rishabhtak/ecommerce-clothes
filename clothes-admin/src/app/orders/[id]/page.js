import OrderDetails from "@/components/Orders/OrderDetails";

const page = async ({ params }) => {
  return (
    <>
      <div className="max-w-lg">
        <h2 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Order Details
        </h2>
      </div>
      <OrderDetails id={params.id} />
    </>
  );
};

export default page;
