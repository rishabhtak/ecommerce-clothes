"use client";
import { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

const mData = [
  {
    id: 1,
    first_name: "Boothe",
    last_name: "Willers",
    email: "bwillers0@msu.edu",
    gender: "Male",
  },
  {
    id: 2,
    first_name: "Antonietta",
    last_name: "Harral",
    email: "aharral1@mysql.com",
    gender: "Female",
  },
  {
    id: 3,
    first_name: "Bat",
    last_name: "Reide",
    email: "breide2@mit.edu",
    gender: "Male",
  },
  {
    id: 4,
    first_name: "Tanitansy",
    last_name: "McCromley",
    email: "tmccromley3@un.org",
    gender: "Female",
  },
  {
    id: 5,
    first_name: "Dosi",
    last_name: "Lytle",
    email: "dlytle4@msu.edu",
    gender: "Female",
  },
  {
    id: 6,
    first_name: "Daile",
    last_name: "Nyssens",
    email: "dnyssens5@purevolume.com",
    gender: "Female",
  },
  {
    id: 7,
    first_name: "Amil",
    last_name: "Suddick",
    email: "asuddick6@geocities.jp",
    gender: "Female",
  },
  {
    id: 8,
    first_name: "Karoline",
    last_name: "Horsewood",
    email: "khorsewood7@mapy.cz",
    gender: "Female",
  },
  {
    id: 9,
    first_name: "Flossi",
    last_name: "Gumby",
    email: "fgumby8@chron.com",
    gender: "Female",
  },
  {
    id: 10,
    first_name: "Skipp",
    last_name: "Meyrick",
    email: "smeyrick9@php.net",
    gender: "Male",
  },
  {
    id: 11,
    first_name: "Hillary",
    last_name: "Di Dello",
    email: "hdidelloa@house.gov",
    gender: "Male",
  },
  {
    id: 12,
    first_name: "Kaycee",
    last_name: "Grooby",
    email: "kgroobyb@list-manage.com",
    gender: "Genderfluid",
  },
  {
    id: 13,
    first_name: "Consuela",
    last_name: "Grassot",
    email: "cgrassotc@psu.edu",
    gender: "Female",
  },
  {
    id: 14,
    first_name: "Dex",
    last_name: "Nendick",
    email: "dnendickd@fastcompany.com",
    gender: "Male",
  },
  {
    id: 15,
    first_name: "Sorcha",
    last_name: "Geekin",
    email: "sgeekine@dagondesign.com",
    gender: "Female",
  },
  {
    id: 16,
    first_name: "Roselia",
    last_name: "Faustin",
    email: "rfaustinf@com.com",
    gender: "Female",
  },
  {
    id: 17,
    first_name: "Roderick",
    last_name: "Basnett",
    email: "rbasnettg@histats.com",
    gender: "Male",
  },
  {
    id: 18,
    first_name: "Sergio",
    last_name: "Ellery",
    email: "selleryh@springer.com",
    gender: "Male",
  },
  {
    id: 19,
    first_name: "Corina",
    last_name: "Jonczyk",
    email: "cjonczyki@cdbaby.com",
    gender: "Female",
  },
  {
    id: 20,
    first_name: "Cort",
    last_name: "Picot",
    email: "cpicotj@imgur.com",
    gender: "Male",
  },
  {
    id: 21,
    first_name: "Alvina",
    last_name: "Whitter",
    email: "awhitterk@house.gov",
    gender: "Female",
  },
  {
    id: 22,
    first_name: "Park",
    last_name: "Benet",
    email: "pbenetl@nbcnews.com",
    gender: "Male",
  },
  {
    id: 23,
    first_name: "Thaddeus",
    last_name: "Middlewick",
    email: "tmiddlewickm@diigo.com",
    gender: "Male",
  },
  {
    id: 24,
    first_name: "Hershel",
    last_name: "Weeks",
    email: "hweeksn@rambler.ru",
    gender: "Male",
  },
  {
    id: 25,
    first_name: "Erek",
    last_name: "Ligertwood",
    email: "eligertwoodo@histats.com",
    gender: "Male",
  },
  {
    id: 26,
    first_name: "Cariotta",
    last_name: "Ingray",
    email: "cingrayp@usa.gov",
    gender: "Female",
  },
  {
    id: 27,
    first_name: "Brita",
    last_name: "Ayrton",
    email: "bayrtonq@ox.ac.uk",
    gender: "Female",
  },
  {
    id: 28,
    first_name: "Celle",
    last_name: "McAirt",
    email: "cmcairtr@msn.com",
    gender: "Female",
  },
  {
    id: 29,
    first_name: "Ardith",
    last_name: "Itzkowicz",
    email: "aitzkowiczs@aboutads.info",
    gender: "Female",
  },
  {
    id: 30,
    first_name: "Marlow",
    last_name: "Belverstone",
    email: "mbelverstonet@goodreads.com",
    gender: "Male",
  },
  {
    id: 31,
    first_name: "Horten",
    last_name: "Seres",
    email: "hseresu@naver.com",
    gender: "Male",
  },
  {
    id: 32,
    first_name: "Gracie",
    last_name: "Pelcheur",
    email: "gpelcheurv@mayoclinic.com",
    gender: "Female",
  },
  {
    id: 33,
    first_name: "Koressa",
    last_name: "Janway",
    email: "kjanwayw@artisteer.com",
    gender: "Female",
  },
  {
    id: 34,
    first_name: "Gradey",
    last_name: "Sabates",
    email: "gsabatesx@ovh.net",
    gender: "Male",
  },
  {
    id: 35,
    first_name: "Bibbye",
    last_name: "Bartak",
    email: "bbartaky@aboutads.info",
    gender: "Female",
  },
  {
    id: 36,
    first_name: "Hana",
    last_name: "Tolussi",
    email: "htolussiz@rakuten.co.jp",
    gender: "Female",
  },
  {
    id: 37,
    first_name: "Jaclin",
    last_name: "Dulany",
    email: "jdulany10@4shared.com",
    gender: "Female",
  },
  {
    id: 38,
    first_name: "Patrizius",
    last_name: "Thebeau",
    email: "pthebeau11@unc.edu",
    gender: "Male",
  },
  {
    id: 39,
    first_name: "Dara",
    last_name: "Gott",
    email: "dgott12@com.com",
    gender: "Female",
  },
  {
    id: 40,
    first_name: "Lois",
    last_name: "Cohan",
    email: "lcohan13@bizjournals.com",
    gender: "Female",
  },
  {
    id: 41,
    first_name: "Mata",
    last_name: "Ardern",
    email: "mardern14@dagondesign.com",
    gender: "Male",
  },
  {
    id: 42,
    first_name: "Lynnett",
    last_name: "Keysel",
    email: "lkeysel15@cocolog-nifty.com",
    gender: "Female",
  },
  {
    id: 43,
    first_name: "Perceval",
    last_name: "Mogra",
    email: "pmogra16@seattletimes.com",
    gender: "Male",
  },
  {
    id: 44,
    first_name: "Scotty",
    last_name: "O'Hanley",
    email: "sohanley17@toplist.cz",
    gender: "Male",
  },
  {
    id: 45,
    first_name: "Cynthea",
    last_name: "Johnikin",
    email: "cjohnikin18@networksolutions.com",
    gender: "Female",
  },
  {
    id: 46,
    first_name: "Donni",
    last_name: "Caccavella",
    email: "dcaccavella19@issuu.com",
    gender: "Female",
  },
  {
    id: 47,
    first_name: "Roma",
    last_name: "Cay",
    email: "rcay1a@printfriendly.com",
    gender: "Male",
  },
  {
    id: 48,
    first_name: "Cazzie",
    last_name: "Buckenhill",
    email: "cbuckenhill1b@scribd.com",
    gender: "Male",
  },
  {
    id: 49,
    first_name: "Perri",
    last_name: "Dickerson",
    email: "pdickerson1c@nih.gov",
    gender: "Female",
  },
  {
    id: 50,
    first_name: "Renaldo",
    last_name: "Skipsey",
    email: "rskipsey1d@who.int",
    gender: "Male",
  },
];
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: () => "Id",
  }),
  columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
    id: "Name",
  }),
  columnHelper.accessor("gender", {
    header: () => "Gender",
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
  }),
];

const Table = () => {
  const [data, setData] = useState(() => [...mData]);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  let totalPages = table.getPageCount();
  let currentPage = table.getState().pagination.pageIndex + 1;
  let pageNumbers = [];
  for (let i = currentPage - 3; i <= 7; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pageNumbers.push(i);
  }

  return (
    <div className="px-4 py-16 mx-auto">
      <div className="relative flex items-center mt-4 md:mt-0">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left"
                        >
                          <div
                            className={`flex items-center gap-x-3 ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <svg
                              className="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.3"
                              />
                            </svg>
                          </div>
                          {
                            { asc: "", desc: "" }[
                              header.column.getIsSorted() ?? null
                            ]
                          }
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-4 text-sm font-medium whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-sm:flex-col max-sm:gap-5 items-center justify-between mt-6">
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          className="flex items-center px-5 py-2 text-sm transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
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
        </button>
        <div className="items-center flex gap-x-3">
          {pageNumbers.map((pagenumber) => (
            <button
              onClick={() => {
                table.setPageIndex(pagenumber - 1);
              }}
              className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60"
              key={pagenumber}
            >
              {pagenumber}
            </button>
          ))}
        </div>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="flex items-center px-5 py-2 text-sm transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
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
        </button>
      </div>
    </div>
  );
};

export default Table;
