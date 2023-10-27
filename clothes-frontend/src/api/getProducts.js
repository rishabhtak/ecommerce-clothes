export const getProducts = async () => {
  const res = await fetch(`${process.env.HOST}/products`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
