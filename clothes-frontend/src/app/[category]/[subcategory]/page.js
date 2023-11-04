import ProductFilter from "@/components/Product/ProductFilter";
import { getAllProducts } from "@/lib/products";

const page = async ({ params, searchParams }) => {
  let colors = searchParams.colors
    ? { colors: { $in: searchParams.colors.split(",") } }
    : { colors: { $exists: true } };
  let size = searchParams.size
    ? { size: { $in: searchParams.size.split(",") } }
    : { size: { $exists: true } };

  let priceQuery;
  if (searchParams.price) {
    const array = searchParams.price?.split(",");
    const priceRanges = array?.map((range) => {
      const [min, max] = range.split("-");
      return { price: { $gte: parseInt(min), $lte: parseInt(max) } };
    });

    priceQuery = priceRanges.length > 0 ? { $or: priceRanges } : null;
  } else {
    priceQuery = { price: { $gte: 1, $lte: 4999 } };
  }

  let category = params.category ? { category: params.category } : null;
  let subcategory = params.subcategory
    ? { subcategory: params.subcategory }
    : null;

  let sort = searchParams.sort ? { price: searchParams.sort } : null;

  let page = searchParams.page ? Number(searchParams.page) : 1;

  const combinedQuery = {
    $and: [
      category,
      subcategory,
      priceQuery,
      colors,
      size,
      { archived: false },
    ],
  };

  const data = await getAllProducts({ combinedQuery, sort, page });

  return (
    <>
      <ProductFilter data={data} />
    </>
  );
};

export default page;
