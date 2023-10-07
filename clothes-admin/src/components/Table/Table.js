"use client";
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  let totalPages = table.getPageCount();
  let currentPage = table.getState().pagination.pageIndex + 1;
  let pageNumbers = [];
  for (let i = currentPage - 3; i <= 7; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pageNumbers.push(i);
  }
  console.log(pageNumbers);

  return (
    <div className="px-4 py-16 mx-auto">
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
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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

      <div className="flex items-center justify-between mt-6">
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
        <div className="items-center hidden md:flex gap-x-3">
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

{
  /* <section className="container px-4 mx-auto">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left"
                      >
                        Company
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        About
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Users
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        License use
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white">
                            Catalog
                          </h2>
                          <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                            catalogapp.io
                          </p>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          Customer
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <h4 className="text-gray-700 dark:text-gray-200">
                            Content curating app
                          </h4>
                          <p className="text-gray-500 dark:text-gray-400">
                            Brings all your news into one place
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                            alt="image"
                          />
                          <img
                            className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                            alt="image"
                          />
                          <img
                            className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                            alt="image"
                          />
                          <img
                            className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                            alt="image"
                          />
                          <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                            +4
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                          <div className="bg-blue-500 w-2/3 h-1.5" />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section> */
}
