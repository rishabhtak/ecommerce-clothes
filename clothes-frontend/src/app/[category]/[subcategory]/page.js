import ProductFilter from "@/components/Product/ProductFilter";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
const page = async ({ params }) => {
  mongooseConnect();

  const productShirts = await JSON.parse(
    JSON.stringify(
      await Product.find({
        category: `${params.category}`,
        subcategory: `${params.subcategory}`,
        archived: false,
      })
    )
  );
  return (
    <>
      <ProductFilter productShirts={productShirts} />
    </>
  );
};

export default page;
