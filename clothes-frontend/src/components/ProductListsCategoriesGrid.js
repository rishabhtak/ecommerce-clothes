import Link from "next/link";
import Image from "next/image";
export default function ProductListsCategoriesGrid() {
  const productList = [
    {
      id: 1,
      name: "Men Tshirt",
      img: "/tshirt-men.webp",
      link: "/men/tshirt",
    },
    {
      id: 2,
      name: "Men Shirt",
      img: "/shirt-men.webp",
      link: "/men/shirt",
    },
    {
      id: 3,
      name: "Men Jeans",
      img: "/jeans-men.webp",
      link: "/men/jeans",
    },
    {
      id: 4,
      name: "Men Trouser",
      img: "/trouser-men.webp",
      link: "/men/trouser",
    },
    {
      id: 5,
      name: "Women Tops",
      img: "/tops-women.webp",
      link: "/women/tops",
    },
    {
      id: 6,
      name: "Women Shirt",
      img: "/shirt-women.webp",
      link: "/women/shirt",
    },
    {
      id: 7,
      name: "Women Jeans",
      img: "/jeans-women.webp",
      link: "/women/jeans",
    },
    {
      id: 8,
      name: "Women Trouser",
      img: "/trouser-women.webp",
      link: "/women/trouser",
    },
  ];
  return (
    <div className="mx-auto px-4 py-8 lg:px-8 xl:max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {productList.map((product) => (
          <Link
            key={product.id}
            href={product.link}
            className="group relative block overflow-hidden transition ease-out active:opacity-75 sm:col-span-2 md:col-span-1"
          >
            <Image
              src={product.img}
              width={700}
              height={700}
              alt={product.name}
              className="transform transition ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-25 transition ease-out group-hover:bg-opacity-0" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="rounded-3xl bg-white bg-opacity-95 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:bg-blue-600 group-hover:text-white">
                {product.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
