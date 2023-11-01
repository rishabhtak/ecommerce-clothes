import Link from "next/link";

const Pagination = ({ totalProducts, currentPage, params, pathname }) => {
  // Pagination Number
  let pageNumbers = [];
  let tPage = totalProducts > 0 ? Math.ceil(totalProducts / 9) : totalProducts;
  let cPage = currentPage || 1;
  const maxDisplayedPages = 7;
  let startPage = Math.max(1, cPage - Math.floor(maxDisplayedPages / 2));
  let endPage = Math.min(startPage + maxDisplayedPages - 1, tPage);
  if (endPage - startPage + 1 < maxDisplayedPages) {
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex max-sm:flex-col max-sm:gap-5 items-center justify-between mt-6">
      <Link
        href={{
          pathname: pathname,
          query: {
            ...Object.fromEntries(params),
            page: 1,
          },
        }}
        className={`flex items-center px-5 py-2 text-sm transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ${
          (Number(params.get("page")) || 1) === 1
            ? "pointer-events-none opacity-0"
            : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        First
      </Link>
      <div className="flex flex-col">
        <div className="items-center flex gap-x-3">
          {pageNumbers?.map((pageNumber) => (
            <Link
              href={{
                pathname: pathname,
                query: {
                  ...Object.fromEntries(params),
                  page: pageNumber,
                },
              }}
              className={`px-2 py-1 text-sm rounded-md ${
                (Number(params.get("page")) || 1) === pageNumber
                  ? "text-white bg-blue-500"
                  : "text-blue-500 bg-blue-100/60"
              }`}
              key={pageNumber}
            >
              {pageNumber}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center mt-2">
          Page {cPage} of {tPage}
        </div>
      </div>

      <Link
        href={{
          pathname: pathname,
          query: {
            ...Object.fromEntries(params),
            page: tPage,
          },
        }}
        className={`flex items-center px-5 py-2 text-sm transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100${
          (Number(params.get("page")) || 1) === tPage
            ? "pointer-events-none opacity-0"
            : ""
        }`}
      >
        Last
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Pagination;
