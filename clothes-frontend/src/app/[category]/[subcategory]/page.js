import ProductFilter from "@/components/Product/ProductFilter";
import { getAllProducts, getProduct } from "@/lib/products";

const page = async ({ params, searchParams }) => {
  let colors = searchParams.colors
    ? { "variants.color": { $in: searchParams.colors.split(",") } }
    : { "variants.color": { $exists: true } };

  let size = searchParams.size
    ? { "variants.size": { $in: searchParams.size.split(",") } }
    : { "variants.size": { $exists: true } };

  let priceQuery;
  if (searchParams.price) {
    const array = searchParams.price?.split(",");
    const priceRanges = array?.map((range) => {
      const [min, max] = range.split("-");
      return { "variants.price": { $gte: parseInt(min), $lte: parseInt(max) } };
    });

    priceQuery = priceRanges.length > 0 ? { $or: priceRanges } : null;
  } else {
    priceQuery = { "variants.price": { $gte: 1, $lte: 4999 } };
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

  // get all colors and size
  const products = await getProduct(subcategory, category);
  const uniqueColors = [
    ...new Set(
      products?.flatMap((product) =>
        product?.variants?.map((variant) => variant.color)
      )
    ),
  ];

  const colorOptions = uniqueColors?.map((color) => ({
    value: color,
    label: color.charAt(0).toUpperCase() + color.slice(1),
    checked: false,
  }));

  const uniqueSizes = [
    ...new Set(
      products?.flatMap((product) =>
        product?.variants?.map((variant) => variant.size)
      )
    ),
  ];

  const sizeOptions = uniqueSizes?.map((size) => ({
    value: size,
    label: size.toUpperCase(),
    checked: false,
  }));

  return (
    <>
      <ProductFilter
        data={data}
        colorOptions={colorOptions}
        sizeOptions={sizeOptions}
      />
    </>
  );
};

export default page;
