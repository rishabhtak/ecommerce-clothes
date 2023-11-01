import ProductDetail from "@/components/Product/ProductDetail";
import { getProduct } from "@/api/products";

const page = async ({ params }) => {
  const data = await getProduct({ slug: params.product });
  if (data.length === 0) return <div>oops no data found</div>;
  const productDetail = data[0];
  return (
    <>
      <ProductDetail productDetail={productDetail} />
    </>
  );
};

export default page;
