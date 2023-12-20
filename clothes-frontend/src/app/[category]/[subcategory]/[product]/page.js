import ProductDetail from "@/components/Product/ProductDetail";
import { getProduct } from "@/lib/products";
import NotFound from "@/app/not-found";
const page = async ({ params }) => {
  const data = await getProduct({ slug: params.product });
  if (data.length === 0) return <NotFound />;
  const productDetail = data[0];
  return (
    <>
      <ProductDetail productDetail={productDetail} />
    </>
  );
};

export default page;
